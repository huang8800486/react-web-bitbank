// 1.模板中的逻辑尽量保持精简
// 2.复杂的多分支逻辑, 收缩为一个函数, 通过专门的函数来写分支逻辑, 模板中只负责调用
function isTrue(type: number) {
  if (type === 1) {
    return <span>is true 1</span>;
  }
  if (type === 2) {
    return <span>is true 2</span>;
  }
}
export default function Layout() {
  return (
    <>
      <div>{isTrue(1)}</div>
      <div>{isTrue(2)}</div>
    </>
  );
}


// import { Outlet } from 'react-router-dom';
// import HeaderTop from './../components/HeaderTop';
// export default function Layout() {
//   return (
//     <>
//       <HeaderTop />
//       <Outlet />;
//     </>
//   );
// }
