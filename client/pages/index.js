import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import FormControl from "react-bootstrap/FormControl";
import IosSearch from "react-ionicons/lib/IosSearch";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import axios from "axios";

function Home() {
  const [date, setDate] = useState(new Date());
  const [favorites, setFavorites] = useState([]);
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  function handleFormSubmit(event) {
    event.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:3001/api/articles", {
        query: title
      })
      .then(({ data }) => {
        setResults(data.data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
    setDate(new Date());
    setTitle("");
  }

  function renderCards() {
    if (results.response) {
      return results.response.docs.map(element => {
        let title = element.headline.main;

        if (title.length > 55) {
          title = `${title.slice(0, 55)}...`;
        }

        return (
          <div className="col-4" key={element._id}>
            <Card style={{ marginBottom: 25, height: "20rem" }}>
              <Card.Img
                variant="top"
                style={{ objectFit: "cover", height: "10rem" }}
                src={`https://www.nytimes.com/${element.multimedia[0].url}`}
              />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" onClick={handleShow}>
                  View
                </Button>
              </Card.Footer>
            </Card>
            <Modal
              show={show}
              onHide={handleClose}
              centered
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton>
                <Modal.Title>{element.headline.main}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{element.snippet}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      });
    } else {
      if (!loading) {
        return <div></div>;
      }
    }
  }

  function renderButton() {
    if (!loading) {
      return (
        <Button
          type="submit"
          value="Submit"
          variant="primary"
          size="md"
          active={loading}
        >
          Submit
        </Button>
      );
    } else {
      return (
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      );
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
          {renderButton()}
        </form>
        <div className="row" style={{ marginTop: 20 }}>
          {renderCards()}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Home);
