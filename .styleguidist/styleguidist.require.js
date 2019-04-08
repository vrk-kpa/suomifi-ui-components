var React = require('react');
var ReactDOM = require('react-dom');

var { Component } = require('../src/components');
global.Component = Component;

var { DropdownItem, MenuItem, MenuLink } = require('../src');
global.DropdownItem = DropdownItem;
global.MenuItem = MenuItem;
global.MenuLink = MenuLink;

import '../src/core/theme/fontFaces.css';

if (process.env.NODE_ENV !== 'production') {
  var axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}
