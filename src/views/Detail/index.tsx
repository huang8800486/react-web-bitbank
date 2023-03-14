import { Link, Outlet } from 'react-router-dom';
import { useOptionsInvitedAddress } from '/@/store/options/hooks';
export default function Detail() {
  const [optionsInvitedAddress, setOptionsInvitedAddress] = useOptionsInvitedAddress();
  const setAddress = () => {
    setOptionsInvitedAddress('Detail-123');
  };
  return (
    <>
      <Link to="/">Home</Link> | <Link to="detail">Detail</Link>
      <div>Detail页面 optionsInvitedAddress: {optionsInvitedAddress}</div>
      <button onClick={setAddress}>Detail点击</button>
    </>
  );
}
