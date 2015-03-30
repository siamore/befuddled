const React = require('react');

const { Jumbotron, Button, Grid, Row, Col, Input, Well } = require('react-bootstrap');

let SignUp = React.createClass({ 

  render() {
    return(
			<Grid>
				<Row>
					<Col md={6} xs={12}>
						<Well>
							<Input type='text' label='I Number' placeholder='Enter I Number' />
							<Input type='password' placeholder="Enter Password" label='Password' />
							<Input type='password' placeholder="Repeat your Password" label='Confirm Password' />
							<Input type='submit' value='Sign Up!' />
						</Well>
					</Col>
				</Row>
			</Grid>
		);
  }
});

module.exports = SignUp;  


