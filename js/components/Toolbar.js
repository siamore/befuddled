const React = require('react');

const { Navbar, Nav } = require('react-bootstrap');

const { NavItemLink } = require('react-router-bootstrap');

let ContactUs = require('./ContactUs.js');
let Toolbar = React.createClass({ 

  render() {
		return(
			<Navbar brand='Befuddled' >
				<Nav right > 
					<NavItemLink to="contact_us" >Contact Us! </NavItemLink>
				</Nav>
			</Navbar>
		);
  }
});

module.exports = Toolbar;
