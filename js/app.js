const React = require('react');  

const Router = require('react-router'),
	{ Route, RouteHandler, DefaultRoute } = Router;


let LoginHandler = require('./components/Login.js');
let ContactUsHandler = require('./components/ContactUs.js');
let Toolbar = require('./components/Toolbar.js');
let SignUp = require('./components/SignUp.js');
let Home = require('./components/Home.js');
let Test = require('./components/Test.js');

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
		<DefaultRoute handler={Test}/>
  </Route>
);

Router.run(routes, function (Handler) {  
  React.render(<Handler/>, document.body);
});
