import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import { Item } from '@hilla/react-components/Item.js';
import { Scroller } from '@hilla/react-components/Scroller.js';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import css from './MainLayout.module.scss';
import views, { RequiredViewInfoMap } from './views.js';

export default function MainLayout() {
  const { pathname } = useLocation();
  const currentTitle = views[pathname]?.title ?? 'Unknown';

  return (
    <AppLayout className="block h-full" primarySection="drawer">
      <header slot="drawer">
        <h1 className="text-l m-0">react-ref-hilla-app</h1>
      </header>
      <Scroller slot="drawer" scroll-direction="vertical">
        <nav>
          {Object.entries(views as RequiredViewInfoMap).map(([path, { icon: pageIcon, title: pageTitle }]) => (
            <Item>
              <NavLink className={css.navlink} key={path} to={path}>
                <span className={`${pageIcon} nav-item-icon`} slot="prefix" aria-hidden="true"></span>
                {pageTitle}
              </NavLink>
            </Item>
          ))}
        </nav>
      </Scroller>
      <footer slot="drawer"></footer>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h2 slot="navbar" className="text-l m-0">
        {currentTitle}
      </h2>

      <Outlet />
    </AppLayout>
  );
}
