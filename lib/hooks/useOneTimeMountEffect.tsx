import { useEffect, useRef } from "react";

const useOneTimeMountEffect = (functionOnMount: () => void) => {
  const didLogRef = useRef(false);

  return useEffect(() => {
    if (didLogRef.current === false) {
      didLogRef.current = true;
      functionOnMount();
    }
  }, []);
};

export { useOneTimeMountEffect };
