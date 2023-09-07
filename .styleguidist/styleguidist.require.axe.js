import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV !== 'production') {
  var axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}
