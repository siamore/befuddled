const React = require('react');
const $ = require('jquery');
const imm = require('immstruct');
const immut = require('immutable');

const { Button, Grid, Row, Col, PageHeader } = require('react-bootstrap');

let appState = imm('state');

let Intro = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    let selectedQuiz = appState.cursor(['selectedQuiz','id']).deref();
    let usr = appState.cursor(['user']).toJS();
    let response = $.ajax({
      type: "GET",
      url: "/api/quiz_sets/" + selectedQuiz,
      datatype: "json",
      contentType: "application/json; charset=utf-8",
      context: this,
      headers: {
        "Authorization": "Basic " + btoa(usr.ino + ":" + usr.password)
      },
      async: false,
      success: (response) => response,
      error: () => alert("Please check your credentials")
    });
    var quizData = JSON.parse(response.responseText);
    appState.cursor(['selectedQuiz']).update(()=>immut.fromJS(quizData));
    return quizData;
  },
  clicky: function (event) {
    this.context.router.transitionTo('test',{quizID:this.state.id, qno:1});
  },
  render() {
    return(
      <Grid>
				<Row>
          <Col md={12} xs={12}>
            <PageHeader>
              {this.state.name}
            </PageHeader>
          </Col>
				</Row>
        <Row>
          <Col md={12} xs={12}>
            <h3>{this.state.description}</h3>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <label>Maximum Score: </label> {this.state.MaxScore}
          </Col>
          <Col md={6} xs={12}>
            <label>Minimum Score: </label> {this.state.MinScore}
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <label>Number of questions: </label> {this.state.questions.length}
          </Col>
          <Col md={6} xs={12}>
            <label>Time to complete quiz: </label> {this.state.time} minutes
          </Col>
        </Row>
        <Row>
          <Col md={2} xs={12} mdOffset={5}>
            <Button bsStyle='primary' onClick={this.clicky}>Begin Quiz!</Button>
          </Col>
        </Row>
			</Grid>
		);
  }
});

module.exports = Intro;
