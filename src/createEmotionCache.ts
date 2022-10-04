"use strict";

import createCache, { EmotionCache } from "@emotion/cache";

const getInsertionPoint = (): HTMLMetaElement | undefined => {
  if (typeof document !== "undefined") {
    const insertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    );
    if (insertionPoint != null) {
      return insertionPoint;
    }
  }
};

const createEmotionCache = (): EmotionCache => {
  return createCache({ key: "mui-style", prepend: true, insertionPoint: getInsertionPoint() });
};

export default createEmotionCache;
