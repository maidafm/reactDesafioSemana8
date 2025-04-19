import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container fluid className='bg-dark text-white d-flex align-items-center justify-content-center vh-100'>
      <Row>
        <Col className='text-center'>
          <h1 className='display-4'>404 - Not Found</h1>
          <p>Lo sentimos, la página que estás buscando no existe.</p>
          <Button variant="secondary" as={Link} to={"/"}>
            Volver al Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
