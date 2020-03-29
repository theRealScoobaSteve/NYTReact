import MdThumbsUp from "react-ionicons/lib/MdThumbsUp";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React from "react";

export default function NewsCard({ image, title, handleShow, id, handleLike }) {
  return (
    <Card style={{ marginBottom: 25, height: "20rem" }}>
      {image}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row>
            <Col md={6}></Col>
            <Col md={3}>
              <Button variant="primary" value={id} onClick={handleShow}>
                View
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="info">
                <MdThumbsUp color="white" />
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}
