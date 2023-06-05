import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileService, editProfileService } from "../../services/profile.services";

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
    <div>
      <h3>Editar Perfil</h3>

<form onSubmit={handleSubmit}>
  <label htmlFor="username">Nombre de usuario</label>
  <input
    type="text"
    name="username"
    onChange={handleUsernameChange}
    value={username}
  />
  <br />

  <label htmlFor="email">Correo electrónico</label>
  <input
    type="email"
    name="email"
    onChange={handleEmailChange}
    value={email}
  />
<br />
  <label htmlFor="password">Nueva contraseña</label>
  <input
    type="password"
    name="password"
    onChange={handlePasswordChange}
    checked={password}
  />
<br />
{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
  <button type="submit">Editar</button>
</form>
    </div>
  )
}

export default EditProfile