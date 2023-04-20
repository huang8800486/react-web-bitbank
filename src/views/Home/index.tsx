import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useOptionsInvitedAddress, useOptionsScreen, useOptionsScroll } from '/@/store/options/hooks';
import appContext from './../appContext'; // 全局共享数据中间件
export default function Home() {
  const { message } = useContext(appContext);
  const [optionsInvitedAddress, setOptionsInvitedAddress] = useOptionsInvitedAddress();
  const [optionsScreen] = useOptionsScreen();
  const [optionsScroll] = useOptionsScroll();
  const setAddress = () => {
    setOptionsInvitedAddress('Home-1221');
  };
  return (
    <>
      {/* <Link to="/">Home</Link> | <Link to="detail">Detail {message}</Link>
      <div style={{ height: '1000px' }}>
        <span style={{ position: 'fixed' }}>
          Home页面 optionsInvitedAddress: {optionsInvitedAddress} {optionsScreen.clientWidth} {optionsScreen.index}{' '}
          {optionsScroll.scrollTop}
        </span>
      </div>
      <button onClick={setAddress}>点击</button> */}
    </>
  );
}
