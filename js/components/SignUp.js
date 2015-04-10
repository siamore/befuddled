const React = require('react');
const Router = require('react-router');
const $ = require('jquery');

const { Jumbotron, Button, Grid, Row, Col, Input, Well } = 
	require('react-bootstrap');

let SignUp = React.createClass({ 
	signUp: $.proxy(function(){

		var pass = this.refs.pass.getValue();
		var repeat = this.refs.repeat.getValue();

		if(pass !== repeat) {
			alert("Passwords not matching!");
			return;
		}

		$.ajax({
			type: "POST",
			url: "/api/users",
			datatype : "json",
		  contentType: "application/json; charset=utf-8",
			data: JSON.stringify({
				name: this.refs.name.getValue(),
				ino: this.refs.ino.getValue(),
				password: this.refs.pass.getValue()
			}),
			success: function(data) { 
				console.log(data); 
				alert("done"); 
				
			},
			// failure: function(err) { console.log(err); alert("Error"); }
			statusCode: {
		        500: function(err) {
		        	alert(JSON.parse(err.error().responseText).err); []
	        }
      }
		});
	},this),
  render() {
    return(
			<Grid>
				<Row>
					<Col md={6} xs={12}>
						<Well>
							<Input type='text' label='Name' ref="name"
								placeholder='Enter your name' />
							<Input type='text' label='I Number' ref="ino"
								placeholder='Enter I Number' />
							<Input type='password' placeholder="Enter Password" ref="pass"
								label='Password' />
							<Input type='password' placeholder="Repeat your Password"
								ref="repeat" label='Confirm Password' />
							<Input type='submit' value='Sign Up!' onClick={this.signUp} />
						</Well>
					</Col>
				</Row>
			</Grid>
		);
  }
});

module.exports = SignUp;  


