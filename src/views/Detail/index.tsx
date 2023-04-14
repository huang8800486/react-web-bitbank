import { Link, useSearchParams } from 'react-router-dom';
import { useOptionsInvitedAddress } from '/@/store/options/hooks';
export default function Detail() {
  const [params] = useSearchParams();
  const id = params.get('id');
  console.log('params', params.get('id'));
  const [optionsInvitedAddress, setOptionsInvitedAddress] = useOptionsInvitedAddress();
  const setAddress = () => {
    setOptionsInvitedAddress('Detail-123');
  };
  return (
    <>
      <Link to="/">Home</Link> | <Link to="detail">Detail</Link>
      <div>
        Detail页面 optionsInvitedAddress: {optionsInvitedAddress}得到的id: {id}
      </div>
      <button onClick={setAddress}>Detail点击</button>
    </>
  );
}
