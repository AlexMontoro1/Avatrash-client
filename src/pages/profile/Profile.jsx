import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfileService, uploadImage } from "../../services/profile.services"
import { Orbit } from '@uiball/loaders'



function Profile() {
  const navigate = useNavigate()

  const [ user, setUser ] = useState()
  const [ isLoading, setIsLoading ] = useState(true)
  const [avatars, setAvatars] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const getData = async () => {
    try {
      const response = await getProfileService()
      console.log(response.data);
      setUser(response.data.user)
      setAvatars(response.data.avatars)
      setIsLoading(false)

    } catch (err) {
      console.log(err)
      navigate("/error")
    }
  }

  useEffect(()=> {
    getData()
  },[])

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();

    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await uploadImage(formData);
        console.log(response);
        const newImageUrl = response.data.imageUrl;

       
        setUser((prevUser) => ({
          ...prevUser,
          image: newImageUrl
        }));
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    
    <div>
      {isLoading === true ? <Orbit 
 size={25}
 speed={1.5} 
 color="black" 
/> : 
      <div>
        {user && user.image && (
            <img src={user.image} alt="Imagen de perfil" width="200px" />
          )}
        <form onSubmit={handleImageUpload}>
          <input type="file" onChange={handleImageChange} />
          <button type="submit">Subir Imagen</button>
        </form>
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