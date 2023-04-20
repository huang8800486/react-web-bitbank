import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getImages } from '/@/utils/common';

export default function Navigation() {
  const { t } = useTranslation();
  const timer = useRef<number>();
  const [moreFlag, setMoveFlag] = useState<boolean>(false);

  const mouseEnter = () => {
    setMoveFlag(true);
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const mouseLeave = () => {
    timer.current = window.setTimeout(() => {
      setMoveFlag(false);
    }, 300);
  };

  return (
    <div className="header_nav">
      <div className="nav_item">
        <Link to="/market" className="nav_top">
          {t('common.discoverRouterTitle')}
        </Link>
      </div>
      <div className="nav_item">
        <Link to="/market" className="nav_top">
          {t('common.rankingRouterTitle')}
        </Link>
      </div>
      <div className="nav_item" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        <a href={undefined} className={`nav_top ${moreFlag ? 'on' : ''}`}>
          {t('common.more')} <img className="down" src={getImages('down_img.png')} alt="" />
        </a>
        {moreFlag && (
          <div className="sub_nav_item" onMouseEnter={mouseEnter}>
            <a href={undefined}>{t('common.aboutRouterTitle')}</a>
            <a href={undefined}>{t('common.fAQRouterTitle')}</a>
          </div>
        )}
      </div>
    </div>
  );
}
