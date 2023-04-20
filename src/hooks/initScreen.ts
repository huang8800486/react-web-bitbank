import { useEffect, useCallback } from 'react';
import { useOptionsScreen } from '/@/store/options/hooks';
import { setScrrenIndex, setScrrenType } from '/@/utils/mediaWidth';
export function useScreenWidth() {
  const [optionsScreen, setOptionsScreen] = useOptionsScreen();
  const screenChange = useCallback(() => {
    const width = document.documentElement.clientWidth || window.innerWidth;
    const height = document.documentElement.clientHeight || window.innerHeight;
    setOptionsScreen({
      clientWidth: width,
      clientHeight: height,
      index: setScrrenIndex(width) || 0,
      type: setScrrenType(setScrrenIndex(width)) || 'xs',
    });
  }, []);
  useEffect(() => {
    window.onresize = () => {
      return (() => {
        screenChange();
      })();
    };
  }, []);
  return { screenChange };
}
