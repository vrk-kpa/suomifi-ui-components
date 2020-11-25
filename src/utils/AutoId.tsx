/** Based heavily on https://github.com/reach/reach-ui/tree/develop/packages/auto-id */
/* As a11y API's needs element IDs and requiring user to give those all not suitable, we generate them automatically.
 * Generating random IDs are not working as those will not match with the client & server side rendering.
 *
 * Idea of the AutoId is to patch incremented id after the first render.
 */
import { useState, useEffect } from 'react';
import { useEnhancedEffect } from './common';

let serverHandoffComplete = false;
let theId = 0;
const genId = () => {
  theId += 1;
  return theId;
};

const useId = (idFromProps?: string | null) => {
  const initialId = idFromProps || (serverHandoffComplete ? genId() : null);

  const [id, setId] = useState(initialId);

  useEnhancedEffect(() => {
    if (id === null) {
      setId(genId());
    }
  }, []);

  useEffect(() => {
    if (serverHandoffComplete === false) {
      serverHandoffComplete = true;
    }
  }, []);
  return id != null ? String(id) : undefined;
};

export const AutoId = ({
  id,
  children,
}: {
  id?: string;
  children: (someId: string) => JSX.Element;
}) => {
  const generatedId = useId(id);
  return children && generatedId ? children(generatedId) : null;
};
