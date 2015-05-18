const React = require('react');
const imm = require('immstruct');
const immut = require('immutable');

const { Pager, PageItem, Button, Grid, Row, Col, Accordion, PageHeader, Well, ButtonGroup } = require('react-bootstrap');

let appState = imm('state');

let Test = React.createClass({
  getInitialState: function () {
    var selectedQuiz = appState.cursor(['selectedQuiz']).deref().toJS();
    return {margintop: {
      marginTop: "2em"
    } 
    };
  },
  render() {
    return(
			<Grid>
				<Row>
					<PageHeader className="text-center"> This might work, well there's only one way to see! </PageHeader>
					<Col md={6} xs={12} mdPush={3}>
						<a className="btn btn-default btn-lg btn-block">Block level button</a>
						<a className="btn btn-default btn-lg btn-block">Block level button</a>
						<a className="btn btn-default btn-lg btn-block">Block level button</a>
						<a className="btn btn-default btn-lg btn-block">Block level button</a>
					</Col>
				</Row>
        <Row md={2} xs={12} mdOffset={5} style={this.state.margintop}>
          <div className="text-center">
            <ButtonGroup>
              <Button>First</Button>
              <Button>&laquo;</Button>
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
              <Button>4</Button>
              <Button>5</Button>
              <Button>&raquo;</Button>
              <Button>Last</Button>
            </ButtonGroup>
          </div>
        </Row>
			</Grid>
		);
  }
});

module.exports = Test;
