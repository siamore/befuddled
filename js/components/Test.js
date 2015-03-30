const React = require('react');

const { Pager, PageItem, Button, Grid, Row, Col, Accordion, PageHeader, Well } = require('react-bootstrap');

let Test = React.createClass({ 

  render() {
    return(
			<Grid>
				<Row>
					<PageHeader> This might work, well there's only one way to see! </PageHeader>
					<Col md={6} xs={12} mdPush={3}>
						<a href="#" className="btn btn-default btn-lg btn-block">Block level button</a>						
						<a href="#" className="btn btn-default btn-lg btn-block">Block level button</a>						
						<a href="#" className="btn btn-default btn-lg btn-block">Block level button</a>						
						<a href="#" className="btn btn-default btn-lg btn-block">Block level button</a>						
					</Col>
				</Row>
				<Pager>
					<PageItem previous href='#'>&larr; Previous Question</PageItem>
					<PageItem next href='#'>Next Question &rarr;</PageItem>
				</Pager>
			</Grid>
		);
  }
});

module.exports = Test;  



