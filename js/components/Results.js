const React = require('react');

const { Jumbotron, ButtonToolbar, Button, Grid, Row, Col, Accordion, PageHeader, Well } = require('react-bootstrap');

let Results = React.createClass({ 

  render() {
    return(
			<Grid>
				<Row>
					<Col xs={12} md={12}>
						<Jumbotron>
							<h1>Congrats!</h1>
							<p>You have scored 50 points on this quiz.<small> Yo well done.</small> </p>
							<ButtonToolbar>
    							<Button bsStyle='success' href='#'>Go to the Home Page</Button>
    							<Button bsStyle='primary' href='#'>Review your answers</Button>
    						</ButtonToolbar>
						</Jumbotron>
					</Col>
				</Row>
			</Grid>
		);
  }
});

module.exports = Results;