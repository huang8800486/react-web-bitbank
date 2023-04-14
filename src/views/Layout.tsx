import { Outlet } from 'react-router-dom';
import HeaderTop from './../components/HeaderTop';
import { observer } from 'mobx-react-lite';
import { useStore } from '/@/mobx';
function Layout() {
  const { listStore, counterStrong } = useStore();
  const { count, addCounter } = counterStrong;
  const { list, addList } = listStore;
  return (
    <>
      <div onClick={addList}>list:{list}</div>
      <div onClick={addCounter}>count:{count}</div>
      <HeaderTop />
      <Outlet />;
    </>
  );
}
export default observer(Layout);
