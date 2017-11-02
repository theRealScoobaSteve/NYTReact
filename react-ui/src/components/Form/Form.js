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
					name="title"
					onChange={this.props.HandleInputChange}
					type="text"
					placeholder="Title"
					/>
					<input
					value={this.props.year}
					name="year"
					onChange={this.props.HandleInputChange}
					type="text"
					placeholder="Year"
					/>
					<input
					value={this.props.month}
					name="month"
					onChange={this.props.HandleInputChange}
					type="test"
					placeholder="Month"
					/>
					<button onClick={this.props.HandleFormSubmit}>Submit</button>
				</form>
			</div>
		);
	}
}

export default FORM;
