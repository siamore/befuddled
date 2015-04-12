const React = require('react');
const { Navbar, Nav, Input, Button, Grid, Col, Row, NavItem } =
  require('react-bootstrap');
const { NavItemLink } = require('react-router-bootstrap');
const $ = require('jquery');
const imm = require('immstruct');

let ContactUs = require('./ContactUs.js');
let appState = imm('state');

var userLoggedInStateSlice = appState.reference(['app','loggedIn']);

let Toolbar = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function(){
    this.unobserve = userLoggedInStateSlice.observe($.proxy(function () {
      this.forceUpdate();
      console.log(userLoggedInStateSlice.cursor().deref());
    },this));
  },
  componentWillUnmount: function(){
    this.unobserve();
  },
  getLoginButtons: function(){
    if(userLoggedInStateSlice.cursor().deref()){
      return (
        <div className="pull-right">
          <form className="navbar-form" role="login">
            <div className="input-group">
              <Button bsStyle="danger" onClick={this.bail}>Log Out
                </Button>
            </div>
          </form>
        </div>
      );} else return (
        <div className="pull-right">
          <form className="navbar-form" role="login">
            <div className="input-group">
              <Input type="text" placeholder="I Number" className="input-sm"
                ref="ino" />
              <Input type="text" placeholder="Password" className="input-sm"
                ref="pass" />
              <div className="input-group-btn">
                <Button bsStyle="success" bsSize="small" onClick={this.loginYo}>
                Log In </Button>
              </div>
            </div>
          </form>
        </div>
    );
  },
  loginYo: $.proxy(function(){
    let ino = this.refs.ino.getValue();

    if(!/^(i|I)\d{6}$/.test(ino)){
			alert("I-Number is incorrect");
			return;
		}

    $.ajax({
      type: "GET",
      url: "/api/users/" + this.refs.ino.getValue(),
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      context: this,
      headers: {
        "Authorization": "Basic " + btoa(ino + ":" + this.refs.pass.getValue())
      },
      success: function(data){
        userLoggedInStateSlice.cursor().update(() => true);

        this.context.router.transitionTo('home');
        console.log(data);
      },
      error: () => alert("Please check your credentials")
    });
  },this),
  bail: $.proxy(function(){
    $.ajax({
      type: "GET",
      url: "/api/users/logout",
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      context: this,
      async: false,
      username: "log",
      password: "out",
      error: function(){
        userLoggedInStateSlice.cursor().update(() => false);
        this.context.router.transitionTo('sign_up');
      }
    });
  },this),
  render() {
		return(
      <div className="navbar navbar-default navbar-static-top"
        role="navigation">

      	<div className="navbar-header">
      		<button type="button" className="navbar-toggle" data-toggle="collapse"
            data-target=".navbar-ex1-collapse">
      		<span className="sr-only">Toggle navigation</span>
      		<span className="icon-bar"></span>
      		<span className="icon-bar"></span>
      		<span className="icon-bar"></span>
      		</button>
      		<a className="navbar-brand" rel="home" href="#">Befuddled</a>
      	</div>

      	<div className="collapse navbar-collapse navbar-ex1-collapse">

      		<ul className="nav navbar-nav">
            <NavItemLink to="contact_us" >Contact Us! </NavItemLink>
      		</ul>

          { this.getLoginButtons() }

      	</div>
      </div>
		);
  }
});

module.exports = Toolbar;
