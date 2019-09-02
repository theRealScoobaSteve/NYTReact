import React, {Component} from "react"
import {COL} from "../grid"
import BUTTON from "../button"
import "./card.css"

const CARD = props =>
{
    return (
    <COL size="4">  
        <div className="card" style={{width: "20rem", margin: "25px"}}>
            <div className="card-body">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text">{props.text}</p>
                <BUTTON className="btn btn-primary" value={props.id} onClick={props.favorited}>
                    {props.submitBtn} 
                </BUTTON>
                {props.reRouteBtn ? 
                 <a href={props.link} target="_blank">
                 <BUTTON className="btn btn-primary">
                 {props.reRouteBtn} 
                 </BUTTON>
                 </a> : 
                 null}
            </div>
        </div>
    </COL>
    )
}

export default CARD