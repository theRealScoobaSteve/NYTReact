import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import FormControl from "react-bootstrap/FormControl";
import IosSearch from "react-ionicons/lib/IosSearch";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import axios from "axios";

function Home() {
  const [date, setDate] = useState(new Date());
  const [favorites, setFavorites] = useState([]);
  const [results, setresults] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (favorites) {
      // Makes a call to the api for all of the favorited articles in the
      // Database if the isFavorites attribute is set to true
      axios
        .post("/api/favorites", {
          params: {
            isFavorites: true
          }
        })
        .then(response => {
          // Changes the state for a rerender when the favorites come back
          setFavorites(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  });

  function handleFormSubmit(event) {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    axios
      .post("/api/search", {
        params: {
          month: input.month,
          title: input.title,
          year: input.year
        }
      })
      .then(response => {
        if (response.data) {
          setresults(response.data);
        }
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
      </div>
    </div>
  );
}

export default React.memo(Home);
