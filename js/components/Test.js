const React = require('react');
const imm = require('immstruct');
const immut = require('immutable');
const Router = require('react-router');

const { Pager, PageItem, Button, Grid, Row, Col, Accordion, PageHeader, Well, ButtonGroup } = require('react-bootstrap');

let appState = imm('state');

let Test = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function () {
    return {
      questions: appState.cursor(['selectedQuiz']).deref().toJS().questions,
      currentQuestion: this.context.router.getCurrentParams().qno - 1,
      responses: []
    };
  },
  componentWillReceiveProps: function() {
    //Have to implement this as react router does not rerender when navigating
    //to the same route because of an optimization.
    this.setState({
      currentQuestion: this.context.router.getCurrentParams().qno - 1
    });
  },
  buttonMaker: function (option, index){
    let btnStyle = "primary";
    let currentAnswer = this.state.responses[this.state.currentQuestion];
    if(currentAnswer)
      btnStyle = (currentAnswer === index + 1)? "success":"primary";
    return (
      <Button key={index} bsStyle={btnStyle} bsSize='large' block
        onClick={this.clicky}>{(index + 1).toString() + ". "} {option}
      </Button>
    );
  },
  goToNextQtn: function () {
    this.context.router.transitionTo('test',
      // Adding 2, 1 for the array index offset and 1 to go to the next question
      {quizID: this.context.router.getCurrentParams().quizID, qno: parseInt(this.state.currentQuestion) + 2 }
    );
  },
  goToPrevQtn: function() {
    this.context.router.transitionTo('test',
      // works because the currentQuestion is one less than the actual qno
      {quizID: this.context.router.getCurrentParams().quizID, qno: this.state.currentQuestion }
    );
  },
  clicky: function (ev){
   let rid=ev.currentTarget.getAttribute("data-reactid");
   let key=parseInt(rid.substr(rid.indexOf("$")+1));
   //Key is the index offset pointing to the option selected
   this.state.responses[this.state.currentQuestion] = key + 1;
   this.goToNextQtn();
  },
  render: function() {
    return(
			<Grid>
				<Row>
					<PageHeader className="text-center"> {this.state.questions[this.state.currentQuestion].text} </PageHeader>
					<Col md={6} xs={12} mdPush={3}>
            {this.state.questions[this.state.currentQuestion].options.map(this.buttonMaker,this)}
					</Col>
				</Row>
        <Row style={{marginTop: "2em"}}>
          <Button className="pull-left" onClick={this.goToPrevQtn}>&laquo; Previous</Button>
          <Button className="pull-right" onClick={this.goToNextQtn}>Next &raquo;</Button>
        </Row>
			</Grid>
		);
  }
});

module.exports = Test;
