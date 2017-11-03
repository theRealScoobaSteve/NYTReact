import React, { Component } from 'react'
import AXIOS from "axios"
import './App.css'
import HEADER from "./components/header"
import FORM from "./components/Form"
import CARD from "./components/card"
import {CONTAINER, ROW, COL} from "./components/grid"

export default class Main extends Component {
    constructor(props)
	{
		super(props)
		this.state = 
		{
			results: [{
				title: "HELLO",
				text: "WORLD",
				_id: 0
            },
            {
				title: "HELLO1",
				text: "WORLD1",
				_id: 1
			}],
			favorites: [],
			title: "",
			month: "",
			year: ""
		}
    }
    // componentDidMount()
	// {
	// 	axios.get('/api/favorites', 
	// 	{
	// 		params: 
	// 		{
	// 		    all: true
	// 		}
	// 	})
	// 	.then(response =>
	// 	{
	// 		console.log(response);
	// 		this.setState({results: response})
	// 	})
	// 	.catch(error =>
	// 	{
	// 		console.log(error);
	// 	});
	// }

	// HandleSearch = () =>
	// {
	// 	axios.post('/api/search', 
	// 	{
	// 		params: 
	// 		{
	// 			month: this.state.month,
	// 			title: this.state.title,
	// 			year: this.state.year,
	// 			favorite: false
	// 		}
	// 	})
	// 	.then(response =>
	// 	{
	// 		console.log(response);
	// 	})
	// 	.catch(error =>
	// 	{
	// 		console.log(error);
	// 	});
	// }

	// SaveArticles = () => 
	// {
	// 	axios.update('/api/favorites', 
	// 	{
	// 		params: 
	// 		{
	// 			title: this.state.title,
	// 			favorite: true
	// 		}
	// 	})
	// 	.then(response =>
	// 	{
	// 		console.log(response);
	// 		this.setState({results: response})
	// 	})
	// 	.catch(error =>
	// 	{
	// 		console.log(error);
	// 	});
	// }

	HandleInputChange = event => 
	{
		// Getting the value and name of the input which triggered the change
		let value = event.target.value;
		const data = event.target.name;
		console.log(data)
		// Updating the input's state
		this.setState(
		{
			[data]: value
		})
	}
	
	HandleFormSubmit = event => 
	{
		// Preventing the default behavior of the form submit (which is to refresh the page)
		event.preventDefault();

		this.setState(
		{
			title: "",
			month: "",
			year: "",
		})
    }
    
    render() {
        return(
            <CONTAINER>
                <ROW>
                    <COL size="md-12">
                        <HEADER />
                    </COL>	
                </ROW>
                <ROW>
                    <COL size="md-12">
                        <FORM HandleInputChange={this.HandleInputChange} HandleFormSubmit={this.HandleFormSubmit} 
                        title={this.state.title} year={this.state.year} month={this.state.month}/>
                    </COL>
                </ROW>
                <ROW>
                    {this.state.results.length > 0 ? this.state.results.map(item =>
                    (
                        <CARD key={item._id} title={item.title} text={item.text} submitBtn="Submit" />
                    )) :
                    (<h1>No Results</h1>)}
                </ROW>
		    </CONTAINER>
        )
    }
}