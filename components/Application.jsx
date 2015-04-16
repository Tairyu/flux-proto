'use strict';
const React = require('react');
const Nav = require('./Nav.jsx');
const Home = require('./Home.jsx');
const About = require('./About.jsx');
const HairLength = require('./HairLength.jsx');
const ApplicationStore = require('../stores/ApplicationStore');
const RouterMixin = require('flux-router-component').RouterMixin;
const FluxibleMixin = require('fluxible').FluxibleMixin;

const Application = React.createClass({
  mixins: [RouterMixin, FluxibleMixin],
  statics: {
    storeListeners: [ApplicationStore]
  },
  getInitialState: function() {
    return this.getState();
  },
  getState: function() {
    const appStore = this.getStore(ApplicationStore);
    return {
      currentPageName: appStore.getCurrentPageName(),
      pageTitle: appStore.getPageTitle(),
      route: appStore.getCurrentRoute(),
      pages: appStore.getPages()
    };
  },
  onChange: function() {
    this.setState(this.getState());
  },
  render: function() {
    let output = '';
    switch (this.state.currentPageName) {
      case 'home':
        output = <Home/>;
        break;
      case 'about':
        output = <About/>;
        break;
    }
    return (
      <div>
        <Nav selected={this.state.currentPageName} links={this.state.pages} />
        {output}
        <HairLength />
      </div>
    );
  },

  componentDidUpdate: function(prevProps, prevState) {
    const newState = this.state;
    if (newState.pageTitle === prevState.pageTitle) {
      return;
    }
    document.title = newState.pageTitle;
  }
});

module.exports = Application;
