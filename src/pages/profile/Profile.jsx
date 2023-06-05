import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfileService } from "../../services/profile.services"

function Profile() {
  const navigate = useNavigate()

  const [ user, setUser ] = useState()
  const [ isLoading, setIsLoading ] = useState(true)
  const [avatars, setAvatars] = useState([]);

  const getData = async () => {
    try {
      const response = await getProfileService()
      console.log(response.data);
      setUser(response.data.user)
      setAvatars(response.data.avatars)
      setIsLoading(false)

    } catch (err) {
      navigate("/error")
    }
  }

  useEffect(()=> {
    getData()
  },[])
  return (
    
    <div>
      {isLoading === true ? <h3>...Cargando</h3> : 
      <div>
        <h4>Usuario: {user.username}</h4>
        <h4>Correo: {user.email}</h4>
        <p>Creado el dia: {new Date(user.createdAt).toLocaleString()}</p>
        <Link to="/profile/edit"><button>Editar Perfil</button></Link>
        </div>
        }
        {avatars.map((avatar) => {
          return(
            <div key={avatar._id}>
            <h3>{avatar.name}</h3>
            <Link to={`/avatar/${avatar._id}`}>
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(avatar.json.svg)}`}
              alt="avatar"
              style={{ width: '150px', height: '150px' }}
            />
            </Link>
            
          </div>
          )
          
          })}
    
    </div>
    
    
  )
}

export default Profile