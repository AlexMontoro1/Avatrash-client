import { Link, useNavigate } from "react-router-dom";
import { getAvatarsService } from "../services/avatar.services"
import { useEffect, useState } from "react";

function Catalog() {

  const navigate = useNavigate()

  const [ avatars, setAvatars ] = useState()
  const [ isLoading, setIsLoading ] = useState(true)

  const getData = async () => {
    try {
      // const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todo`)
      const response = await getAvatarsService()
      setAvatars(response.data)
      setIsLoading(false)
    } catch (err) {
      navigate("/error");
    }
  }

  useEffect(()=> {
    getData()
  }, [])

  return (
    <div>
      {isLoading ? <h3>... Cargando</h3> : avatars.map((avatar) => {
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

export default Catalog