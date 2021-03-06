'use strict';
const createStore = require('fluxible/addons').createStore;
const routesConfig = require('../configs/routes');

const ApplicationStore = createStore({
  storeName: 'ApplicationStore',
  handlers: {
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate'
  },
  initialize: function() {
    this.currentPageName = null;
    this.currentPage = null;
    this.currentRoute = null;
    this.pages = routesConfig;
    this.pageTitle = '';
  },
  handleNavigate: function(route) {
    if (this.currentRoute && (this.currentRoute.url === route.url)) {
      return;
    }

    const pageName = route.config.page;
    const page = this.pages[pageName];

    this.currentPageName = pageName;
    this.currentPage = page;
    this.currentRoute = route;
    this.emitChange();
  },
  getCurrentPageName: function() {
    return this.currentPageName;
  },
  getPageTitle: function() {
    return this.pageTitle;
  },
  getCurrentRoute: function() {
    return this.currentRoute;
  },
  getPages: function() {
    return this.pages;
  },
  dehydrate: function() {
    return {
      currentPageName: this.currentPageName,
      currentPage: this.currentPage,
      pages: this.pages,
      route: this.currentRoute,
      pageTitle: this.pageTitle
    };
  },
  rehydrate: function(state) {
    this.currentPageName = state.currentPageName;
    this.currentPage = state.currentPage;
    this.pages = state.pages;
    this.currentRoute = state.route;
    this.pageTitle = state.pageTitle;
  }
});

module.exports = ApplicationStore;
