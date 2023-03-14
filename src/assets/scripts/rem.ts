// 配置rem单位
const setRem = () => {
  (function (doc: Document, win: Window) {
    const docEl: HTMLElement = doc.documentElement;
    const resizeEvt: string = 'orientationchange' in win ? 'orientationchange' : 'resize';

    function recalc() {
      const clientWidth: number = docEl.clientWidth || win.innerWidth;
      //设计稿是750px
      let initSize: number = (clientWidth / 750) * 200;
      if (clientWidth >= 768) {
        initSize = 204.533;
      } else if (clientWidth < 320) {
        initSize = 85;
      }
      const fontSize = initSize;
      docEl.style.fontSize = fontSize + 'px';
    }
    doc.addEventListener('DOMContendLoaded', recalc, false);

    //转屏
    win.addEventListener(resizeEvt, recalc, false);

    //pageshow,缓存相关
    win.addEventListener(
      'pageshow',
      function (e) {
        if (e.persisted) {
          recalc();
        }
      },
      false
    );

    // 初始化
    recalc();
  })(document, window);
};
const config = () => {
  setRem(); // 配置rem单位
};
export default config;
