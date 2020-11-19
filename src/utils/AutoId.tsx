/** Based heavily on https://github.com/reach/reach-ui/tree/develop/packages/auto-id */
import React, { useState, useEffect } from 'react';

let serverHandoffComplete = false;
let theId = 0;
const genId = () => {
  theId += 1;
  return theId;
};

function canUseDOM() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

const useIsomorphicLayoutEffect = canUseDOM()
  ? React.useLayoutEffect
  : React.useEffect;

const useId = (idFromProps?: string | null) => {
  const initialId = idFromProps || (serverHandoffComplete ? genId() : null);

  const [id, setId] = useState(initialId);

  useIsomorphicLayoutEffect(() => {
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
