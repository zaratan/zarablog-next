import React, { ReactNode, useContext } from 'react';
import styled from 'styled-components';
import LayoutContext from '../contexts/LayoutContext';
import Header from './Header';

const Main = styled.main<{ profileOpen: boolean }>`
  background-color: ${(props) => props.theme.base3};
  width: 100%;
  max-width: inherit;
  align-self: flex-start;
  flex-shrink: 1;
  @media only screen and (max-width: 700px) {
    display: ${(props) => (props.profileOpen ? `none` : `flex`)};
  }
`;

const MainWrapper = styled.div`
  background-color: ${(props) => props.theme.base3};
  width: 100%;
  max-width: inherit;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  padding-top: 40px;
`;

const Footer = styled.footer`
  background-color: ${(props) => props.theme.base2};
  color: ${(props) => props.theme.yellow};
  display: flex;
  justify-content: center;
  height: 25px;
  align-items: center;
`;

const AsideProfile = styled.aside<{ profileOpen: boolean }>`
  display: ${(props) => (props.profileOpen ? `block` : `none`)};

  @media only screen and (min-width: 700px) {
    width: 400px;
    min-width: 400px;
    border-left: 1px solid ${(props) => props.theme.yellow};
  }
  @media only screen and (max-width: 800px) {
    min-width: 300px;
  }
  @media only screen and (max-width: 700px) {
    min-width: 100px;
  }
`;

const Layout = ({ children }: { children: ReactNode }) => {
  const { isProfileOpen } = useContext(LayoutContext);

  return (
    <>
      <Header />
      <MainWrapper>
        <Main profileOpen={isProfileOpen}>{children}</Main>
        <AsideProfile profileOpen={isProfileOpen}>
          <div>Profile</div>
        </AsideProfile>
      </MainWrapper>
      <Footer>Zaratan © {new Date().getFullYear()}</Footer>
    </>
  );
};

export default Layout;
