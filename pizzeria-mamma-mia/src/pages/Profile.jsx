import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Profile() {

  const { getUser, logout, user, token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getUser();
    }
  }
  , []);

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <Container fluid className='bg-light min-vh-100 pt-5'>
      <Row>
        <Col md={6} lg={5} className='mx-auto text-center'>
            <h2>Perfil del Usuario</h2>
                <p><strong>Email:</strong> {user.email} </p> 
              <Button 
              variant='dark'
              onClick={handleLogout}>
                Cerrar Sesión
              </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
