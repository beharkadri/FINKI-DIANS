import NavigationMenu from '../NavigationMenu/NavigationMenu';

import styles from './Layout.module.scss';

const Layout = ({ refs, children }) => {
  return (
    <main className={styles.layout}>
      <NavigationMenu refs={refs} />
      <div className={styles.right}>{children}</div>
    </main>
  );
};

export default Layout;
