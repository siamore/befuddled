const React = require('react');

const { Jumbotron, Button, Grid, Row, Col } = require('react-bootstrap');

let ContactUs = React.createClass({

  render() {
    return(
			<Grid>
				<Row>
					<Col xs={12} md={12}>
						<Jumbotron>
							<h1>Hello, fellow quizzer!</h1>
							<p>You can email me for any queries, just click the button. </p>
							<Button href='mailto:bubba@forrest.com?subject=Regarding%20the%20Befuddled%20quiz%20app'>Email me!</Button>
						</Jumbotron>
					</Col>
				</Row>
			</Grid>
		);
  }
});

module.exports = ContactUs;
