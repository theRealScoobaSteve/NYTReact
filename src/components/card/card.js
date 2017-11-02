import React, {Component} from "react"

export const CARD = props =>
{
    return <div className="card" style={{width: 20}}>
                <div className="card-body">
                    <h4 className="card-title">{props.title}</h4>
                    <p className="card-text">{props.text}</p>
                    <a className="btn btn-primary">{props.submitBtn}</a>
                </div>
            </div>
}