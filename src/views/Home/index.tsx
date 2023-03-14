import { Link } from 'react-router-dom';
import { useOptionsInvitedAddress } from '/@/store/options/hooks';

export default function Home() {
  const [optionsInvitedAddress, setOptionsInvitedAddress] = useOptionsInvitedAddress();
  const setAddress = () => {
    setOptionsInvitedAddress('Home-1221');
  };
  return (
    <>
      <Link to="/">Home</Link> | <Link to="detail">Detail</Link>
      <div>Home页面 optionsInvitedAddress: {optionsInvitedAddress}</div>
      <button onClick={setAddress}>点击</button>
    </>
  );
}
