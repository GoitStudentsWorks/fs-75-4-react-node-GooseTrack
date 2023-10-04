import { Suspense } from 'react';
import { useState, useEffect } from 'react'; //?
import { Outlet } from 'react-router-dom';

import SideBar from 'components/SideBar/SideBar';
import Header from 'components/Header/Header';

import { globalTheme } from 'theme'; //?
import { DivStyled } from 'pages/MainLayout/MainLayoutStyled.styled';
import { Container } from '../../stylesheet/Container.styled';

export default function MainLayout() {
  const mediaQuery = window.matchMedia(
    `(min-width: ${globalTheme.breakpoints.desktop})`
  ); //?

  const [showSideBar, setShowSideBar] = useState(mediaQuery.matches); //?

  useEffect(() => {
    const handleResize = evt => {
      setShowSideBar(evt.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    // console.log('useEffect', showSideBar); //!

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [mediaQuery]); //?

  const onSideBar = () => {
    setShowSideBar(prevState => !prevState);
    console.log('onSideBar'); //!
    console.log('onSideBar', showSideBar); //!
  }; //?

  const onRedirect = () => {
    setShowSideBar(false);
    console.log('onRedirect'); //!
    console.log(showSideBar); //!
  }; //?

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        {(mediaQuery.matches || showSideBar) && (
          <SideBar onSideBar={onSideBar} onRedirect={onRedirect} />
        )}
        <DivStyled>
          <Header onSideBar={onSideBar} />
          <Outlet />
        </DivStyled>
      </Container>
    </Suspense>
  );
}

// (mediaQuery.matches || showSideBar) //!
