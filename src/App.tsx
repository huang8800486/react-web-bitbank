import { useStore } from '/@/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WagmiProvider } from '/@/wagmi';
import { client } from '/@/wagmi/wagmi';

import Home from './views/Home';
import Detail from './views/Detail';
import Layout from './views/Layout';
import '/@/locales';
import '/@/assets/styles/index.styl';
function App() {
  const store = useStore();
  return (
    <WagmiProvider client={client}>
      <Provider store={store}>
        {/* 声明一个非hash模式的路由 */}
        <BrowserRouter>
          {/* 路由对应的组件渲染 */}
          <Routes>
            {/* 指定路径和组件的对应关系, path代表路径, element代表组件 */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="detail" element={<Detail />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </WagmiProvider>
  );
}

export default App;
