import React, { ReactNode, useContext } from 'react';
import LayoutContext from '../contexts/LayoutContext';
import Header from './Header';
import Profile from './Profile';

import styles from './Layout.module.scss';
import classCompactor from '../helpers/classCompator';

const Layout = ({
  children,
  centered,
}: {
  children: ReactNode;
  centered?: boolean;
}) => {
  const { isProfileOpen } = useContext(LayoutContext);

  return (
    <>
      <Header />
      <div className={styles.mainWrapper}>
        <main
          className={classCompactor([
            styles.main,
            isProfileOpen ? 'profile-open' : '',
            centered ? 'centered' : '',
          ])}
        >
          {children}
        </main>
        <aside
          className={[
            styles.asideProfile,
            isProfileOpen ? 'profile-open' : '',
          ].join(' ')}
        >
          <Profile />
        </aside>
      </div>
      <footer className={styles.footer}>
        Zaratan © {new Date().getFullYear()}
      </footer>
    </>
  );
};

export default Layout;
