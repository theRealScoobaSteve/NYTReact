import React, {Component} from "react"
import {COL} from "../grid"
import "./card.css"

const CARD = props =>
{
    return (
    <COL size="4">  
        <div className="card" style={{width: "20rem"}}>
                <div className="card-body">
                    <h4 className="card-title">{props.title}</h4>
                    <p className="card-text">{props.text}</p>
                    <a className="btn btn-primary">{props.submitBtn}</a>
                </div>
            </div>
    </COL>
    )
}

export default CARD