import React from 'react';
import ReactDOM from 'react-dom';

import { Component } from '../src/components';
global.Component = Component;

import { DropdownItem, MenuItem, MenuLink } from '../src';
global.DropdownItem = DropdownItem;
global.MenuItem = MenuItem;
global.MenuLink = MenuLink;

import '../src/core/theme/fontFaces.css';

if (process.env.NODE_ENV !== 'production') {
  var axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}
