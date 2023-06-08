import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { loginService } from "../../services/auth.services";
import Dropdown from "react-bootstrap/Dropdown";

import { AuthContext } from "../../context/auth.context";
function Login() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService({ email, password });

      const token = response.data.authToken;

      //1 guardamos el token en un lugar seguro del navegador (localStorage)

      localStorage.setItem("authToken", token);

      //2, validamos el token para saver quien es el usuario y saber si esta logueado

      await authenticateUser();

      handleCloseModal();
      navigate("/")
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
      <Dropdown.Item onClick={handleOpenModal}>
        Iniciar Sesión
      </Dropdown.Item>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="text"
                placeholder="...ejemplo@ejemplo.com"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="... contraseña"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <br />

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
