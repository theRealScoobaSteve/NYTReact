import React, { Component } from "react";
import "./Form.css";

const FORM = props => 
{
		return (
			<div>
				<form className="form" onSubmit={props.HandleFormSubmit}>
					<input
					value={props.title}
					name="title"
					onChange={props.HandleInputChange}
					type="text"
					placeholder="Title"
					/>
					<input
					value={props.year}
					name="year"
					onChange={props.HandleInputChange}
					type="text"
					placeholder="Year(YYYY)"
					/>
					<input
					value={props.month}
					name="month"
					onChange={props.HandleInputChange}
					type="test"
					placeholder="Month(MM)"
					/>
					<button type="Submit">Submit</button>
				</form>
			</div>
		)
}

export default FORM;
