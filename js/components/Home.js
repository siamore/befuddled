const React = require('react');
const $ = require('jquery');
const imm = require('immstruct');

const { Button, Grid, Row, Col, PageHeader } = require('react-bootstrap');

let appState = imm('state');

let Home = React.createClass({
  getInitialState: function() {
    return appState.cursor(['user']).deref();
  },
  render() {
    function clicky(){
      console.log(this);
    }
    function buttonMaker(quizSet, index){
      return (
        <Col md={3} xs={12}>
          <Button bsStyle='primary' onClick={clicky} key={quizSet.id} bsSize='large'>
            {quizSet.name}
          </Button>
        </Col>
      );
    }
    return(
			<Grid>
				<Row>
          <Col md={12} xs={12}>
            <PageHeader>
              {this.state.name}<small>{this.state.ino}</small>
            </PageHeader>
          </Col>
          {this.state.testsAvailable.map(buttonMaker)}
				</Row>
			</Grid>
		);
  }
});

module.exports = Home;
