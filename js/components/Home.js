const React = require('react');
const $ = require('jquery');
const imm = require('immstruct');

const { Button, Grid, Row, Col, PageHeader } = require('react-bootstrap');

let appState = imm('state');

let Home = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return appState.cursor(['user']).toJS();
  },
  buttonMaker: function (quizSet, index){
    return (
      <Col md={3} xs={12}>
        <Button bsStyle='primary' onClick={this.clicky} key={quizSet.id} bsSize='large'>
          {quizSet.name}
        </Button>
      </Col>
    );
  },
  clicky: function (ev){
   let rid=ev.currentTarget.getAttribute("data-reactid");
   let key=rid.substr(rid.indexOf("$")+1);
   appState.cursor(['selectedQuiz','id']).update(() => key);
   this.context.router.transitionTo('intro');
  },
  render() {
    return(
			<Grid>
				<Row>
          <Col md={12} xs={12}>
            <PageHeader>
              {this.state.name}<small>{this.state.ino}</small>
            </PageHeader>
          </Col>
          {this.state.testsAvailable.map(this.buttonMaker,this)}
				</Row>
			</Grid>
		);
  }
});

module.exports = Home;
