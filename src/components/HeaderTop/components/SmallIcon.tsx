import React from 'react';

interface Props {
  smallFlag: boolean;
  switchNav: () => void;
}

const SmallIcon: React.FC<React.PropsWithChildren<Props>> = ({ smallFlag, switchNav }) => {
  return (
    <div className={`nav_wrap ${smallFlag ? 'on' : ''}`} onClick={switchNav}>
      <div className="span_box">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
export default SmallIcon;
