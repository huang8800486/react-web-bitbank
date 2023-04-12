import React from 'react';

export default function HeaderTop(): JSX.Element {
  return (
    <>
      <div className="header_top">
        <div className="header_wrap">
          <div className="header_box">
            <button type="button" className="logo_wrap">
              <span>Free People DAO</span>
            </button>
            <div className="wallet_box_wrap"></div>
          </div>
        </div>
      </div>
    </>
  );
}
