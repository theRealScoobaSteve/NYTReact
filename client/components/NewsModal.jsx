import MdThumbsUp from "react-ionicons/lib/MdThumbsUp";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React from "react";

export default function NewsModal({ show, handleClose, modalData }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalData.headline || null}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Image src={modalData.image} fluid />
          </Row>
          <Row style={{ marginTop: 15 }}>
            <p>{modalData.snippet || null}</p>
          </Row>
          <Row>
            <label>Source: {modalData.source}</label>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col md={8}>
              <Button variant="primary">View Article</Button>
            </Col>
            <Col md={2}>
              <Button variant="info">
                <MdThumbsUp color="white" />
              </Button>
            </Col>
            <Col md={2}>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
}
