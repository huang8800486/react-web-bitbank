import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOptionsInvitedAddress } from '/@/store/options/hooks';
import appContext from './../appContext'; // 全局共享数据中间件
export default function Home() {
  const { message } = useContext(appContext);
  const [optionsInvitedAddress, setOptionsInvitedAddress] = useOptionsInvitedAddress();
  const navigate = useNavigate();
  const setAddress = () => {
    setOptionsInvitedAddress('Home-1221');
    navigate('/detail?id=10001', { replace: true });
  };
  return (
    <>
      <Link to="/">Home</Link> | <Link to="detail">Detail {message}</Link>
      <div>Home页面 optionsInvitedAddress: {optionsInvitedAddress}</div>
      <div onClick={setAddress}>点击</div>
    </>
  );
}
