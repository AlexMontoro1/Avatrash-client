import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfileService, uploadImage } from "../../services/profile.services"
import { Orbit } from '@uiball/loaders'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


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

  const handleAvatarClick = (avatarId) => {
    window.location.href = `/avatar/${avatarId}`;
  };
  return (
    
    <div style={styles.container}>
    {isLoading === true ? (
      <Orbit size={25} speed={1.5} color="black" />
    ) : (
      <div>
        {user && user.image && (
          <img src={user.image} alt="Imagen de perfil" width="200px" />
        )}
        <form onSubmit={handleImageUpload}>
          <input type="file" onChange={handleImageChange} />
          <button className="btn btn-primary" type="submit">Subir Imagen</button>
        </form>
        <h4>Usuario: {user.username}</h4>
        <h4>Correo: {user.email}</h4>
        <p>Creado el día: {new Date(user.createdAt).toLocaleString()}</p>
        <Link to="/profile/edit">
          <button className="btn btn-primary">Editar Perfil</button>
        </Link>
      </div>
    )}
   <Carousel showArrows={true} infiniteLoop={true}>
        {avatars.map((avatar) => (
          <div key={avatar._id} onClick={() => handleAvatarClick(avatar._id)}>
            <h3>{avatar.name}</h3>
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                avatar.json.svg
              )}`}
              alt="avatar"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
        ))}
      </Carousel>
  </div>
    
    
  )
}

export default Profile


const styles = {
  container: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};