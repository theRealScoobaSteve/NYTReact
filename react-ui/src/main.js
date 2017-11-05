import React, { Component } from 'react'
import AXIOS from "axios"
import './App.css'
import HEADER from "./components/header"
import FORM from "./components/Form"
import CARD from "./components/card"
import {CONTAINER, ROW, COL} from "./components/grid"

//This is the main body of the entire page, It is also the only
//stateful component in the entire site.
export default class Main extends Component {
    constructor(props)
	{
		super(props)
		this.state = 
		{
			results: [],	//Results from the search
			favorites: [],	//If a article is favorited
			title: "",		//Title being searched
			month: "",		//Month being searched
			year: ""		//Year being searched
		}
	}
	
	//On page load this method is called
    componentDidMount()
	{
		//Makes a call to the api for all of the favorited articles in the
		//Database if the isFavorites attribute is set to true
		AXIOS.post('/api/favorites', 
		{
			params: 
			{
			    isFavorites: true
			}
		})
		.then(response =>
		{	
			//Changes the state for a rerender when the favorites come back
			this.setState({favorites: response.data})
		})
		.catch(error =>
		{
			console.log(error);
		});
	}

	SaveArticles = event => 
	{
		//Grabs the articles _id 
		const DATA = event.target.value

		//Loops through then all the search results and looks for a matching _id
		//and saves it
		this.state.results.forEach(element =>
		{
			if(element._id === DATA)	
			{
				//Updates the value in the database based on the _id
				AXIOS.post('/api/addfav', 
				{
					params: 
					{
						"_id": DATA
					}
				})
				.then(response =>
				{
					console.log(response);
				})
				.catch(error =>
				{
					console.log(error);
				});

				let newArray = this.state.favorites.slice(); 
				
				if(newArray.indexOf(element))
				{
					newArray.push(element); 
				}
				  
				this.setState({favorites: newArray})
			}
		})
	}

	HandleInputChange = event => 
	{
		// Getting the value and name of the input which triggered the change
		let value = event.target.value;
		const name = event.target.name;
		// Updating the input's state
		this.setState(
		{
			[name]: value
		})
	}
	
	HandleFormSubmit = event => 
	{
		// Preventing the default behavior of the form submit (which is to refresh the page)
		event.preventDefault()
		AXIOS.post('/api/search', 
		{
			params: 
			{
				month: this.state.month,
				title: this.state.title,
				year: this.state.year
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
	
	DeleteFavorite = (event) =>
	{
		const DATA = event.target.value
		AXIOS.post('/api/removefav', 
		{
			params: 
			{
				"_id": DATA
			}
		})
		.then(response =>
		{
			AXIOS.post('/api/favorites', 
			{
				params: 
				{
					isFavorites: true
				}
			})
			.then(response =>
			{	
				this.setState({favorites: response.data})
			})
			.catch(error =>
			{
				console.log(error);
			});
		})
		.catch(error =>
		{
			console.log(error);
		});
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
					<h1>Search Results</h1>
				</ROW>
                <ROW>
                    {this.state.results ? this.state.results.map((item, index ) =>
                    (
                        <CARD key={index} id={item._id} favorited={this.SaveArticles} title={item.headline.main} 
						text={item.snippet} submitBtn="Favorite" link={item.web_url} reRouteBtn="Full Article"/>
                    )) :
                    (<h1>No Results</h1>)}
                </ROW>
				<ROW>
					<h1>Favorited Articles</h1>
				</ROW>
				<ROW>
					{this.state.favorites ? this.state.favorites.map((item, index ) =>
                    (
                        <CARD key={index} id={item._id} link={item.web_url} favorited={this.DeleteFavorite} title={item.headline.main}
						 text={item.snippet} submitBtn="UnFavorite" reRouteBtn="Full Article"/>
                    )) :
                    (<h1>No Results</h1>)}
				</ROW>
		    </CONTAINER>
        )
    }
}