import React from 'react';
import { Link } from 'react-router-dom';
import { useOptionsLang } from '/@/store/options/hooks';
import LogoZh from '/@/assets/images/logo_zh.png';
import LogoEn from '/@/assets/images/logo_en.png';

export default function Logo() {
  const [optionsLang] = useOptionsLang();
  return (
    <Link to="/" className="header_logo">
      {optionsLang === 'zh-CN' ? <img src={LogoZh} alt="" /> : <img src={LogoEn} alt="" />}
    </Link>
  );
}
