import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import FormControl from "react-bootstrap/FormControl";
import IosSearch from "react-ionicons/lib/IosSearch";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import Card from "react-bootstrap/Card";
import axios from "axios";

function Home() {
  const [date, setDate] = useState(new Date());
  const [favorites, setFavorites] = useState([]);
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState("");

  // useEffect(() => {
  //   if (favorites) {
  //     // Makes a call to the api for all of the favorited articles in the
  //     // Database if the isFavorites attribute is set to true
  //     axios
  //       .post("/api/favorites", {
  //         params: {
  //           isFavorites: true
  //         }
  //       })
  //       .then(response => {
  //         // Changes the state for a rerender when the favorites come back
  //         setFavorites(response.data);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }
  // });

  function handleFormSubmit(event) {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    axios
      .post("http://localhost:3001/api/articles", {
        query: title
      })
      .then(({ data }) => {
        setResults(data.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
    setDate(new Date());
    setTitle("");
  }

  // function saveArticle(event) {
  //   // Grabs the articles _id
  //   const DATA = event.target.value;

  //   // Loops through then all the search results and looks for a matching _id
  //   // and saves it
  //   this.state.results.forEach(element => {
  //     if (element._id === DATA) {
  //       //Updates the value in the database based on the _id
  //       axios
  //         .post("/api/favorite", {
  //           params: {
  //             _id: DATA
  //           }
  //         })
  //         .then(response => {})
  //         .catch(error => {
  //           console.log(error);
  //         });

  //       let newArray = this.state.favorites.slice();

  //       if (newArray.indexOf(element)) {
  //         newArray.push(element);
  //       }

  //       this.setState({ favorites: newArray });
  //     }
  //   });
  // }

  // DeleteFavorite = event => {
  //   event.preventDefault();

  //   let data = event.target.value;
  //   console.log(data);

  //   axios
  //     .post("/api/removefav", {
  //       params: {
  //         _id: data,
  //       },
  //     })
  //     .then(res => {
  //       if (res.data.report) {
  //         //Makes a call to the api for all of the favorited articles in the
  //         //Database if the isFavorites attribute is set to true
  //         axios
  //           .post("/api/favorites", {
  //             params: {
  //               isFavorites: true,
  //             },
  //           })
  //           .then(response => {
  //             console.log("response " + response);
  //             //Changes the state for a rerender when the favorites come back
  //             this.setState({ favorites: response.data });
  //             console.log(this.state.favorites);
  //           })
  //           .catch(error => {
  //             console.log(error);
  //           });
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  function renderCards() {
    if (results.response) {
      return results.response.docs.map(element => (
        <div className="col-3">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      ));
    } else {
      return <div></div>;
    }
  }

  return (
    <div className="container">
      <Jumbotron>
        <h1>React New York Times Article Search</h1>
        <hr />
        <p>Search for a news article on a given date</p>
      </Jumbotron>
      <div className="input-background">
        <form onSubmit={handleFormSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <IosSearch />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Article Title"
              aria-label="Article Title"
              aria-describedby="basic-addon1"
              style={{ marginRight: 30 }}
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
            <DatePicker selected={date} onChange={date => setDate(date)} />
          </InputGroup>
          <Button
            type="submit"
            value="Submit"
            variant="primary"
            size="md"
            active
          >
            Submit
          </Button>
        </form>
        <div className="row">{renderCards()}</div>
      </div>
    </div>
  );
}

export default React.memo(Home);
