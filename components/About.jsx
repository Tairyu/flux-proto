'use strict';
const React = require('react');

const About = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <p>This is a description of the site.</p>
    );
  }
});

module.exports = About;
