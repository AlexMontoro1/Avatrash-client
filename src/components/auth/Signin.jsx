import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinService } from "../../services/auth.services";
import { Button, Modal, Form } from "react-bootstrap";

function Signin() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const user = {
        username,
        email,
        password,
      };

      await signinService(user);
      handleCloseModal();
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleOpenModal}>
        Registrarse
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignin}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="...usuario"
                value={username}
                onChange={handleUsernameChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="...ejemplo@ejemplo.com"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="...contraseña"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <br />

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Signin;
