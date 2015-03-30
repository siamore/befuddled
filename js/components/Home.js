const React = require('react');

const { Button, Grid, Row, Col, PageHeader } = require('react-bootstrap');

let Home = React.createClass({ 

  render() {
    return(
			<Grid>
				<Row>
					<col md={12} xs={12}>
						<PageHeader>Manjunath K.S <small>I303424</small></PageHeader>
					</col>
					<Col md={3} xs={12}>
						<Button bsStyle='primary' bsSize='large'>ABAP 201</Button>
					</Col>
				</Row>
			</Grid>
		);
  }
});

module.exports = Home;
