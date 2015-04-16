'use strict';
const React = require('react');
const NavLink = require('flux-router-component').NavLink;

const Nav = React.createClass({
  getDefaultProps: function() {
    return {
      selected: 'home',
      links: {}
    };
  },
  render: function() {
    const selected = this.props.selected;
    const links = this.props.links;

    const linkHTML = Object.keys(links).map(function(name) {
      let className = '';
      const link = links[name];

      if (selected === name) {
        className = 'pure-menu-selected';
      }

      return (
        <li className={className} key={link.path}>
          <NavLink routeName={link.page}>{link.title}</NavLink>
        </li>
      );
    });

    return (
      <ul className="pure-menu pure-menu-open pure-menu-horizontal">
        {linkHTML}
      </ul>
    );
  }
});

module.exports = Nav;
