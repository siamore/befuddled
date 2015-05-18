const React = require('react');
const imm = require('immstruct');

const Router = require('react-router'),
	{ Route, RouteHandler, DefaultRoute } = Router;

let Toolbar = require('./components/Toolbar.js');

let SignUp = require('./components/SignUp.js');
let ContactUsHandler = require('./components/ContactUs.js');
let Home = require('./components/Home.js');
let Test = require('./components/Test.js');
let Results = require('./components/Results.js');
let Intro = require("./components/Intro.js");

let appState = imm('state',{
	app: {
		loggedIn: false,
		selectedQuiz: {id: undefined}
	},
	user: {
		name: undefined,
		ino: undefined,
		password: undefined,
		testsTaken: [],
		testsAvailable: []
	}
});

let App = React.createClass({
  render() {
    return (
			<div>
				<Toolbar />
				{/* this is the importTant part */}
				<RouteHandler/>
			</div>
    );
  }
});

let routes = (
  <Route name="app" path="/" handler={App}>
		<Route name="home" path="/home" handler={Home} />
		<Route name="test" path="/test" handler={Test} />
    <Route name="contact_us" path="/contact_us" handler={ContactUsHandler}/>
		<Route name="sign_up" path="/sign_up" handler={SignUp}/>
		<Route name="intro" path="/intro" handler={Intro}/>
		<DefaultRoute handler={SignUp}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
