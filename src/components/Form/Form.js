import React, { Component } from "react";
import "./Form.css";

class FORM extends Component {

	render(){
		// Notice how each input has a `value`, `name`, and `onChange` prop
		return (
			<div>
				<form className="form">
					<input
					value={this.props.title}
					index="title"
					onChange={this.props.HandleInputChange}
					type="text"
					placeholder="First Name"
					/>
					<input
					value={this.props.year}
					index="year"
					onChange={this.props.HandleInputChange}
					type="text"
					placeholder="Last Name"
					/>
					<input
					value={this.props.month}
					index="month"
					onChange={this.props.HandleInputChange}
					type="test"
					placeholder="Password"
					/>
					<button onClick={this.props.HandleFormSubmit}>Submit</button>
				</form>
			</div>
		);
	}
}

export default FORM;
