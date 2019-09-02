import React, { Component } from "react";
import "./Form.css";

const FORM = props => {
  return (
    // eslint-disable-next-line no-use-before-define
    <div id="background">
      <h1>Search For A News Article!</h1>
      <form className="form" onSubmit={props.HandleFormSubmit}>
        <input
          className="form-input"
          value={props.title}
          name="title"
          onChange={props.HandleInputChange}
          type="text"
          placeholder="Title"
        />
        <input
          className="form-input"
          value={props.year}
          name="year"
          onChange={props.HandleInputChange}
          type="text"
          placeholder="Year(YYYY)"
        />
        <input
          className="form-input"
          value={props.month}
          name="month"
          onChange={props.HandleInputChange}
          type="test"
          placeholder="Month(MM)"
        />
        <button type="Submit" className="form-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FORM;
