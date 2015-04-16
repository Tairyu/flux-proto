'use strict';
const React = require('react');
const FluxibleMixin = require('fluxible').FluxibleMixin;
const HairLengthStore = require('../stores/HairLengthStore');

const HairLength = React.createClass({
  mixins: [FluxibleMixin],
  getInitialState: function() {
    return {};
  },
  render: function() {
    const hairLengthStore = this.getStore(HairLengthStore);

    const hairLengthItems = hairLengthStore.details.map(function(detail) {
      return (
        <li><span>{detail.code}</span> <span>{detail.name}</span></li>
      );
    });

    return (
      <ul>{hairLengthItems}</ul>
    );
  }
});

module.exports = HairLength;
