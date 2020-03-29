import IosArrowForward from "react-ionicons/lib/IosArrowForward";
import IosArrowBack from "react-ionicons/lib/IosArrowBack";
import React, { useState, useEffect } from "react";
import ItemsCarousel from "react-items-carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import axios from "axios";

import NewsCard from "./NewsCard";
import {
  updateModalData,
  showModal,
  closeModal
} from "../redux/actions/modal.actions";

function ReccomendedCarousel(props) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const [reccomended, setReccomended] = useState([]);

  useEffect(() => {
    if (reccomended.length == 0) {
      axios
        .post("http://localhost:3001/api/articles", {
          query: ""
        })
        .then(({ data }) => {
          setReccomended(data.data[0]);
        })
        .catch(error => {
          console.log(error);
        });
    }
  });

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

  const handleClose = () => props.closeModal();

  const handleShow = event => {
    const apiData = reccomended.response.docs[event.target.value];
    let url = "";

    if (apiData.multimedia.length > 0) {
      url = `https://www.nytimes.com/${apiData.multimedia[2].url}`;
    } else {
      url = "/static/image-placeholder.jpg";
    }

    props.updateModalData(url, apiData);
    props.showModal();
  };

  function generateReccomendedCards() {
    if (reccomended.response) {
      return reccomended.response.docs.map((element, id) => {
        let title = element.headline.main;
        const url =
          element.multimedia.length > 0 ? element.multimedia[0].url : null;
        if (title.length > 55) {
          title = `${title.slice(0, 55)}...`;
        }
        const image = renderCardImage(url);
        return (
          <div key={id}>
            <NewsCard
              title={title}
              handleShow={handleShow}
              image={image}
              id={id}
            />
          </div>
        );
      });
    }
  }

  return (
    <ItemsCarousel
      requestToChangeActive={setActiveItemIndex}
      activeItemIndex={activeItemIndex}
      numberOfCards={3}
      gutter={20}
      leftChevron={
        <Button style={{ marginRight: 30 }}>
          <IosArrowBack color="white" />
        </Button>
      }
      rightChevron={
        <Button style={{ marginLeft: 30 }}>
          <IosArrowForward color="white" />
        </Button>
      }
      outsideChevron
      chevronWidth={chevronWidth}
      infiniteLoop={true}
    >
      {generateReccomendedCards()}
    </ItemsCarousel>
  );
}

const mapStateToProps = state => ({
  modal: state.modalData
});

export default connect(mapStateToProps, {
  updateModalData,
  closeModal,
  showModal
})(ReccomendedCarousel);
