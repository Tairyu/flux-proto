'use strict';
const React = require('react');
const ApplicationStore = require('../stores/ApplicationStore');
const FluxibleMixin = require('fluxible').FluxibleMixin;

const Html = React.createClass({
  mixins: [FluxibleMixin],
  render: function() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{this.getStore(ApplicationStore).getPageTitle()}</title>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css" />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        <script src="/public/js/main.js"></script>
      </html>
    );
  }
});

module.exports = Html;
