import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAvatarDetailsService, deleteAvatarService } from "../../services/avatar.services"
import { createCommentService } from "../../services/comment.services"
import {
  accessoryOptions,
  backgroundColorOptions,
  backgroundTypeOptions,
  accessoriesColorOptions,
  clothesColorOptions,
  clothesOptions,
  clothesGraphicOptions,
  eyebrowsOptions,
  eyesOptions,
  facialHairOptions,
  facialHairColorOptions,
  hairColorOptions,
  hatColorOptions,
  mouthOptions,
  skinColorOptions,
  topOptions,
  styleOptions,
} from '../../utils/avatarOptions.js';

function AvatarDetails() {

  const { avatarId } = useParams()

  let navigate = useNavigate()

  const [ avatarDetails, setAvatarDetails ] = useState()
  const [ isLoading, setIsLoading ] = useState(true)
  const [ createComment, setCreateComment ] = useState()

  const getData = async () => {
    try {
      const response = await getAvatarDetailsService(avatarId)
      console.log(response);
      setAvatarDetails(response.data.avatar)
      setIsLoading(false)
    } catch (err) {
      navigate("/error")
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteAvatarService(avatarId)
      // redireccionamos a "/todos"
      navigate("/profile")
    } catch (err) {
      console.log(err);
    }
  }

  const handleCreateComment = () => {
    try {
      
    } catch (error) {
      
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
    <h3>{avatarDetails.name}</h3>
    <img
      src={`data:image/svg+xml;utf8,${encodeURIComponent(
        avatarDetails.json.svg
      )}`}
      alt="avatar"
      style={{ width: "300px", height: "300px" }}
    />
    <ul>
      <li>
        Accesorio: {accessoryOptions[avatarDetails.accessories[0]]} - Color:{" "}
        {accessoriesColorOptions[avatarDetails.accessoriesColor[0]]}
      </li>
      <li>
        Color del fondo: {backgroundColorOptions[avatarDetails.backgroundColor]}
      </li>
      <li>
        Color de la ropa: {clothesColorOptions[avatarDetails.clothesColor]}
      </li>
      <li>
        Tipo de ropa: {clothesOptions[avatarDetails.clothes]}
      </li>
      <li>
        Gráfico de la ropa: {clothesGraphicOptions[avatarDetails.clothesGraphic]}
      </li>
      <li>
        Tipo de cejas: {eyebrowsOptions[avatarDetails.eyebrows]}
      </li>
      <li>
        Tipo de ojos: {eyesOptions[avatarDetails.eyes]}
      </li>
      <li>
        Tipo de vello facial: {facialHairOptions[avatarDetails.facialHair]}
      </li>
      <li>
        Color del vello facial: {facialHairColorOptions[avatarDetails.facialHairColor]}
      </li>
      <li>
        Color del cabello: {hairColorOptions[avatarDetails.hairColor]}
      </li>
      <li>
        Color del sombrero: {hatColorOptions[avatarDetails.hatColor]}
      </li>
      <li>
        Tipo de boca: {mouthOptions[avatarDetails.mouth]}
      </li>
      <li>
        Color de la piel: {skinColorOptions[avatarDetails.skinColor]}
      </li>
      <li>
        Tipo de camiseta: {topOptions[avatarDetails.top]}
      </li>
      <li>
        Estilo del avatar: {styleOptions[avatarDetails.style]}
      </li>
    </ul>
    <button onClick={handleDelete}>Borrar</button>
    <Link to={`/avatar/${avatarId}/edit`}>
          <button>Editar</button>
        </Link>
  </div>
  )
}

export default AvatarDetails