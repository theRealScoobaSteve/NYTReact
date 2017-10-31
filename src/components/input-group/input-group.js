import React, { Component } from 'react'

const INPUT_GROUP = (props) =>
<div className="input-group input-group-lg">
    <input type="text" class="form-control" placeholder={props.inputType} 
    aria-label={props.inputType} aria-describedby="sizing-addon1"  />
</div>


export default INPUT_GROUP