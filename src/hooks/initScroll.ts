import { useEffect, useCallback } from 'react';
import { useOptionsScroll } from '/@/store/options/hooks';
export function useScrollHooks() {
  const getScrollOffsets = (w: Window) => {
    w = w || window;
    //除了IE8及更早版本以外,其他浏览器都能用
    if (w.pageXOffset != null) {
      return { x: w.pageXOffset, y: w.pageYOffset };
    }

    //对于标准模式下的IE(或任何浏览器)
    const d = w.document;
    if (document.compatMode == 'CSS1Compat') {
      //不记得就在浏览器输入document.compatMode
      return {
        x: d.documentElement.scrollLeft,
        y: d.documentElement.scrollTop,
      };
    }
    //对怪异模式下的浏览器
    return { x: d.body.scrollLeft, y: d.body.scrollTop };
  };
  const [optionsScroll, setOptionsScroll] = useOptionsScroll();
  const scrollChange = useCallback(() => {
    const data = getScrollOffsets(window);
    setOptionsScroll({
      scrollLeft: data.x,
      scrollTop: data.y,
    });
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', scrollChange);
  }, []);
  return { scrollChange };
}
