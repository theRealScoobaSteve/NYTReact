import React, { Component } from "react";
import "./Form.css";

const FORM = props => 
{
		return (
			<div>
				<form className="form">
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
					placeholder="Year"
					/>
					<input
					value={props.month}
					name="month"
					onChange={props.HandleInputChange}
					type="test"
					placeholder="Month"
					/>
					<button onClick={props.HandleFormSubmit}>Submit</button>
				</form>
			</div>
		)
}

export default FORM;
