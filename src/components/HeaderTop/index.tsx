import React, { useMemo, useState } from 'react';
import { useOptionsScreen, useOptionsLang } from '/@/store/options/hooks';
import { useTranslation } from 'react-i18next';
import Navigation from './components/Navigation';
import SmallIcon from './components/SmallIcon';
import { useWeb3React } from '/@/wagmi';
import Logo from './components/Logo';
import { useConnect } from 'wagmi';

export default function HeaderTop(): JSX.Element {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  const [optionsScreen] = useOptionsScreen();
  const [optionsLang, setOptionsLang] = useOptionsLang();
  const [smallFlag, setSmallFlag] = useState(false);

  const getSmallScreen = useMemo(() => {
    return optionsScreen.index <= 2;
  }, [optionsScreen]);

  const switchNav = () => {
    if (smallFlag) {
      setTimeout(() => {
        setSmallFlag(!smallFlag);
      }, 300);
    } else {
      setSmallFlag(!smallFlag);
    }
  };

  return (
    <div className="header_top">
      <div className="header_content clearfix">
        <div className="header_left">
          {getSmallScreen && <SmallIcon smallFlag={smallFlag} switchNav={switchNav} />}
          <Logo />
          {account}account
          {!getSmallScreen && <Navigation />}
        </div>
        <div className="header_right">
          <div className="other_content">
            {connectors.map((connector) => (
              <div key={connector.id}>
                <button disabled={!connector.ready} onClick={() => connect({ connector })}>
                  {connector.name}
                  {isLoading && pendingConnector?.id === connector.id && ' (connecting)'}
                </button>
                <span>----</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
