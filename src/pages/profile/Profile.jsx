import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfileService } from "../../services/profile.services"

function Profile() {
  const navigate = useNavigate()

  const [ user, setUser ] = useState()
  const [ isLoading, setIsLoading ] = useState(true)

  const getData = async () => {
    try {
      const response = await getProfileService()
     
      setUser(response.data)
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
        <h4>Usuario: {user.user.username}</h4>
        <h4>Correo: {user.user.email}</h4>
        <p>Creado el dia: {new Date(user.user.createdAt).toLocaleString()}</p>
        <Link to="/profile/edit"><button>Editar Perfil</button></Link>
        </div>
        }
      
    
    </div>
    
    
  )
}

export default Profile