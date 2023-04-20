import { useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderTop from './../components/HeaderTop';
import { useScreenWidth } from '/@/hooks/initScreen';
import { useScrollHooks } from '/@/hooks/initScroll';
import { useOptionsDarkMode } from '/@/store/options/hooks';
function Layout() {
  const { screenChange } = useScreenWidth();
  const { scrollChange } = useScrollHooks();
  const [optionsDarkMode, setOptionsDarkMode] = useOptionsDarkMode();
  useEffect(() => {
    setOptionsDarkMode(optionsDarkMode);
    screenChange();
    scrollChange();
  }, []);
  return (
    <>
      <HeaderTop />
      <Outlet />;
    </>
  );
}
export default Layout;
