import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileService, editProfileService } from "../../services/profile.services";
import { Form, Button, Container } from "react-bootstrap";

function EditProfile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        username,
        email,
        password
      }
      await editProfileService(updatedUser)
      navigate("/profile")
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  }

  const getData = async () => {
    try {
      const response = await getProfileService()
      const { username, email, password } = response.data.user
      setUsername(username)
      setEmail(email)
      setPassword(password)
    } catch (err) {
      navigate("/error")
    }
  }

  useEffect(()=> {
    getData()
  },[])

  return (
    <Container className="text-center mt-4" style={{ width: "300px" }}>
      <h3 style={{color: "white"}}>Editar Perfil</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={handleUsernameChange}
            value={username}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleEmailChange}
            value={email}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Nueva contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handlePasswordChange}
          />
        </Form.Group>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <Button variant="primary" type="submit" style={{marginTop: 10}}>
          Editar
        </Button>
      </Form>
    </Container>
  )
}

export default EditProfile