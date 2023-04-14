import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useOptionsInvitedAddress } from '/@/store/options/hooks';
import appContext from './../appContext'; // 全局共享数据中间件
export default function Home() {
  const { message } = useContext(appContext);
  const [optionsInvitedAddress, setOptionsInvitedAddress] = useOptionsInvitedAddress();
  const setAddress = () => {
    setOptionsInvitedAddress('Home-1221');
  };
  return (
    <>
      <Link to="/">Home</Link> | <Link to="detail">Detail {message}</Link>
      <div>Home页面 optionsInvitedAddress: {optionsInvitedAddress}</div>
      <button onClick={setAddress}>点击</button>
    </>
  );
}
