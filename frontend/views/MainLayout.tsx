import cn from 'classnames';
import React, { PropsWithChildren, ReactElement, useReducer } from 'react';
import { Outlet, useHref, useLocation, useNavigate } from 'react-router-dom';
import { AppLayout, DrawerToggle } from 'react-vaadin-components/dist/components/AppLayout.js';
import { Scroller } from 'react-vaadin-components/dist/components/Scroller.js';
import { Nav, NavItem } from '../thirdParty.js';
import { defaultState, LocationContext, reducer } from './locationStore.js';
import views from './views.js';

type NavLinkProps = Readonly<{
  icon?: string;
  path: string;
  title?: string;
}>;

function NavLink({ icon, path, title }: PropsWithChildren<NavLinkProps>) {
  const href = useHref(path);
  const navigate = useNavigate();

  return (
    <NavItem
      path={href}
      onClick={(e) => {
        e.preventDefault();
        navigate(path);
      }}
    >
      <span className={cn(icon, 'nav-item-icon')} slot="prefix" aria-hidden="true"></span>
      {title ?? 'Unknown'}
    </NavItem>
  );
}

export default function MainLayout(): ReactElement<unknown> | null {
  const { pathname } = useLocation();
  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    path: pathname,
    title: views[pathname]?.title ?? '',
  });

  const context = {
    dispatch,
    state,
  };

  return (
    <LocationContext.Provider value={context}>
      <AppLayout className={cn('block', 'h-full')} primarySection="drawer">
        <header slot="drawer">
          <h1 className="text-l m-0">{state.appName}</h1>
        </header>
        <Scroller slot="drawer" scroll-direction="vertical">
          <Nav aria-label={state.appName}>
            {Object.entries(views).map(([path, info]) => (
              <NavLink key={path} path={path} {...info} />
            ))}
          </Nav>
        </Scroller>
        <footer slot="drawer"></footer>

        <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
        <h2 slot="navbar" className="text-l m-0">
          {state.title}
        </h2>

        <Outlet />
      </AppLayout>
    </LocationContext.Provider>
  );
}
