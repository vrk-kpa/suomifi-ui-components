/** Based heavily on https://github.com/reach/reach-ui/tree/develop/packages/auto-id */
/* As a11y API's needs element IDs and requiring user to give those all not suitable, we generate them automatically.
 * Generating random IDs are not working as those will not match with the client & server side rendering.
 *
 * Idea of the AutoId is to patch incremented id after the first render.
 */
import { useState, useEffect } from 'react';
import { useEnhancedEffect } from '../../../utils/common';
import { useConfig } from '../ConfigProvider/ConfigProvider';

let autoId = 0;
let clientRender = false;

const generateNextId = (prefix?: string) => {
  autoId += 1;
  console.log('idPrefix', prefix);
  if (prefix) {
    return `${prefix}-${autoId}`;
  }
  return autoId;
};

const useGeneratedId = (propId?: string | null, idPrefix?: string) => {
  const startId = propId || (clientRender ? generateNextId() : null);
  const [generatedId, setId] = useState(startId);

  useEnhancedEffect(() => {
    if (generatedId === null) {
      setId(generateNextId(idPrefix));
    }
  }, []);

  useEffect(() => {
    if (!clientRender) {
      clientRender = true;
    }
  }, []);
  return generatedId != null ? String(generatedId) : undefined;
};

/**
 * Returns automatically generated id if one was not provided.
 */
export const AutoId = ({
  id,
  children,
}: {
  id?: string;
  children: (passedId: string) => JSX.Element;
}) => {
  const { idPrefix } = useConfig();
  const generatedId = useGeneratedId(id, idPrefix);
  return children(!!generatedId ? generatedId : '');
};
