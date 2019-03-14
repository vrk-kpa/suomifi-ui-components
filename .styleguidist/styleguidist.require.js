var React = require('react');
var ReactDOM = require('react-dom');

var { DropdownItem } = require('../src/core/Dropdown/Dropdown');
var { MenuItem, MenuLink } = require('../src/core/Menu/Menu');
global.DropdownItem = DropdownItem;
global.MenuItem = MenuItem;
global.MenuLink = MenuLink;

import '../src/core/theme/fontFaces.css';

if (process.env.NODE_ENV !== 'production') {
  var axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}
