'use strict';

const React = require('react');
const Fluxible = require('fluxible');
const routrPlugin = require('fluxible-plugin-routr');
const fetchrPlugin = require('fluxible-plugin-fetchr');

// create new fluxible instance
const app = new Fluxible({
  component: React.createFactory(require('./components/Application.jsx'))
});

// add routes to the routr plugin
app.plug(routrPlugin({
  routes: require('./configs/routes')
}));
app.plug(fetchrPlugin({
  xhrPath: '/api'
}));

// register stores
app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/HairLengthStore'));

module.exports = app;
