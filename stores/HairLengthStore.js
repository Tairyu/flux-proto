'use strict';
const createStore = require('fluxible/addons').createStore;

const HairLengthStore = createStore({
  storeName: 'HairLengthStore',

  handlers: {
    'RECEIVE_HAIR_LENGTHS_SUCCESS': 'handleLoaded'
  },

  initialize: function() {
    this.available = 0;
    this.loaded = 0;
    this.details = [];
  },

  handleLoaded: function(payload) {
    this.available = +payload.results_available;
    this.loaded = +payload.results_returned;
    this.details = payload.hair_length;
    console.log(this);
    this.emitChange();
  },

  dehydrate: function() {
    return {
      available: this.available,
      loaded: this.loaded,
      details: this.details
    };
  },

  rehydrate: function(state) {
    this.available = state.available;
    this.loaded = state.loaded;
    this.details = state.details;
  }
});

module.exports = HairLengthStore;
