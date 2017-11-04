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
			results: [],
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

	SaveArticles = () => 
	{
		AXIOS.post('/api/addfav', 
		{
			params: 
			{
				title: this.state.title,
				favorite: true
			}
		})
		.then(response =>
		{
			console.log(response);
			this.setState({results: response})
		})
		.catch(error =>
		{
			console.log(error);
		});
	}

	HandleInputChange = event => 
	{
		// Getting the value and name of the input which triggered the change
		let value = event.target.value;
		const name = event.target.name;
		console.log(name)
		// Updating the input's state
		this.setState(
		{
			[name]: value
		})
		console.log("HandleInputChange " + this.state)
	}
	
	HandleFormSubmit = event => 
	{
		// Preventing the default behavior of the form submit (which is to refresh the page)
		event.preventDefault()

		console.log("HandleFormSubmit " + this.state)
		AXIOS.post('/api/search', 
		{
			params: 
			{
				month: this.state.month,
				title: this.state.title,
				year: this.state.year,
				favorite: false
			}
		})
		.then(response =>
		{
			this.setState(
			{
				results: response.data
			})
			console.log(this.state.results)
		})
		.catch(error =>
		{
			console.log(error)
		})

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
                    {this.state.results ? this.state.results.map(item  =>
                    (
                        <CARD key={item._id} title={item.headline.main} text={item.snippet} submitBtn="Favorite" />
                    )) :
                    (<h1>No Results</h1>)}
                </ROW>
				<ROW>

				</ROW>
		    </CONTAINER>
        )
    }
}