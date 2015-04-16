'use strict';

/**
 * This leverages Express to create and run the http server.
 * A fluxible context is created and executes the navigateAction
 * based on the URL. Once completed, the store state is dehydrated
 * and the application is rendered via React.
 */

require('babel/register');

const express = require('express');
const serialize = require('serialize-javascript');
const navigateAction = require('flux-router-component').navigateAction;
const debug = require('debug')('flux-proto');
const React = require('react');
const app = require('./app');
const htmlComponent = React.createFactory(require('./components/Html.jsx'));

const server = express();
server.set('state namespace', 'App');
server.use('/public', express.static(__dirname + '/build'));

const fetchrPlugin = app.getPlugin('FetchrPlugin');
fetchrPlugin.registerService(require('./services/hairLength'));
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use(function(req, res, next) {
  const context = app.createContext();

  debug('Executing navigate action');
  context.getActionContext().executeAction(navigateAction, {
    url: req.url
  }, function(err) {
    if (err) {
      if (err.status && err.status === 404) {
        next();
      } else {
        next(err);
      }
      return;
    }

    debug('Exposing context state');
    const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

    debug('Rendering Application component into html');
    const html = React.renderToStaticMarkup(htmlComponent({
      context: context.getComponentContext(),
      state: exposed,
      markup: React.renderToString(context.createElement())
    }));

    debug('Sending markup');
    res.type('html');
    res.write('<!DOCTYPE html>' + html);
    res.end();
  });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
