'use strict';

const React = require('react');
const Fluxible = require('fluxible');
const routrPlugin = require('fluxible-plugin-routr');

// create new fluxible instance
let app = new Fluxible({
  component: React.createFactory(require('./components/Application.jsx'))
});

// add routes to the routr plugin
app.plug(routrPlugin({
  routes: require('./configs/routes')
}));

// register stores
app.registerStore(require('./stores/ApplicationStore'));

module.exports = app;
