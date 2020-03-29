import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import ReccomendedCarousel from "../components/ReccomendedCarousel";
import FormControl from "react-bootstrap/FormControl";
import IosSearch from "react-ionicons/lib/IosSearch";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
import axios from "axios";

import NewsCard from "../components/NewsCard";
import NewsModal from "../components/NewsModal";
import {
  updateModalData,
  showModal,
  closeModal
} from "../redux/actions/modal.actions";

function Home(props) {
  const [date, setDate] = useState(new Date());
  const [likes, setLikes] = useState([]);
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => props.closeModal();

  const handleShow = event => {
    const apiData = results.response.docs[event.target.value];
    let url = "";

    if (apiData.multimedia.length > 0) {
      url = `https://www.nytimes.com/${apiData.multimedia[2].url}`;
    } else {
      url = "/static/image-placeholder.jpg";
    }

    props.updateModalData(url, apiData);
    props.showModal();
  };

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

  function renderCardImage(url) {
    if (url) {
      return (
        <Card.Img
          variant="top"
          style={{ objectFit: "cover", height: "10rem" }}
          src={`https://www.nytimes.com/${url}`}
        />
      );
    } else {
      return (
        <Card.Img
          variant="top"
          style={{ objectFit: "cover", height: "10rem" }}
          src="/static/image-placeholder.jpg"
        />
      );
    }
  }

  function renderCards() {
    if (results.response) {
      return results.response.docs.map((element, id) => {
        let title = element.headline.main;
        const url =
          element.multimedia.length > 0 ? element.multimedia[0].url : null;
        if (title.length > 55) {
          title = `${title.slice(0, 55)}...`;
        }
        const image = renderCardImage(url);
        return (
          <div className="col-4" key={id}>
            <NewsCard
              title={title}
              handleShow={handleShow}
              image={image}
              id={id}
            />
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
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">NYT Article Search</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Likes</Nav.Link>
          </Nav>
          <Form inline onSubmit={handleFormSubmit}>
            <DatePicker
              selected={date}
              onChange={date => setDate(date)}
              value={date}
            />
            <InputGroup style={{ marginLeft: 25 }} className="mr-sm-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <IosSearch />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                style={{ width: 400 }}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={e => setTitle(e.target.value)}
                value={title}
              />
            </InputGroup>
            {renderButton()}
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <div className="container">
        <div className="input-background">
          <div style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
            <h2>Recommended Articles</h2>
          </div>
          <hr />
          <div style={{ marginBottom: 15, marginTop: 15 }}>
            <ReccomendedCarousel />
          </div>

          <hr />
          <div className="row" style={{ marginTop: 20 }}>
            {renderCards()}
          </div>
          <NewsModal
            modalData={props.modal}
            show={props.show}
            handleClose={handleClose}
          />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.modalData,
    show: state.modalData.show
  };
};

export default connect(mapStateToProps, {
  updateModalData,
  closeModal,
  showModal
})(Home);
