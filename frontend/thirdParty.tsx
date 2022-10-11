import {Nav as VcfNav} from '@vaadin-component-factory/vcf-nav/src/vcf-nav.js';
import {NavItem as VcfNavItem} from '@vaadin-component-factory/vcf-nav/src/vcf-nav-item.js';
import { createComponent } from '@lit-labs/react';
import React from 'react';

export const Nav = createComponent(
  React,
  'vcf-nav',
  VcfNav
);

export const NavItem = createComponent(
  React,
  'vcf-nav-item',
  VcfNavItem
);
