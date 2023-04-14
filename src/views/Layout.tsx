import { Outlet } from 'react-router-dom';
import HeaderTop from './../components/HeaderTop';
export default function Layout() {
  return (
    <>
      <HeaderTop />
      <Outlet />;
    </>
  );
}
