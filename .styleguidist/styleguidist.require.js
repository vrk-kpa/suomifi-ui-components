var React = require('react');
var ReactDOM = require('react-dom');

var ReachMenuButton = require('@reach/menu-button');
var { MenuItem: DropdownItem } = ReachMenuButton;
global.DropdownItem = DropdownItem;

import '../src/core/theme/fontFaces.css';

if (process.env.NODE_ENV !== 'production') {
  var axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}
