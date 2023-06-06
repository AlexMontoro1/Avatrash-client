import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAvatarDetailsService, deleteAvatarService } from "../../services/avatar.services"
import { createCommentService, deleteCommentService } from "../../services/comment.services"
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

  const { user } = useContext(AuthContext)

  const { avatarId } = useParams()

  let navigate = useNavigate()

  const [ avatarDetails, setAvatarDetails ] = useState()
  const [ isLoading, setIsLoading ] = useState(true)
  const [ createComment, setCreateComment ] = useState("")
  const [ allComments, setAllComments ] = useState([])



  const getData = async () => {
    try {
      const response = await getAvatarDetailsService(avatarId)
      setAvatarDetails(response.data.avatar)
      setAllComments(response.data.comment)
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
      navigate("/profile")
    } catch (err) {
      console.log(err);
    }
  }
 

  const handleSubmitCreateComment = async (e) => {
    e.preventDefault()
    const newComment = {
      content: createComment,
    }
    try {
      await createCommentService(avatarId, newComment)
      const response = await getAvatarDetailsService(avatarId)
      const comments = response.data.comment
      console.log(comments)
      setAllComments(comments)
      setCreateComment("")
      ;
    } catch (error) {
      
    }
  }
  const handleSubmitDeleteComment = async (commentId) => {
    try {    
      const response = await getAvatarDetailsService(avatarId)
      const comments = response.data.comment
      await deleteCommentService(avatarId, commentId)
      const searchComment = comments.filter((eachComment) => {
        return eachComment._id !== commentId
      })
      setAllComments(searchComment);
    } catch (error) {
      navigate("/error")
    }
  }

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isAuthenticatedUser = avatarDetails.owner === user._id;
  const canEditOrDelete = isAuthenticatedUser ? (
    <div>
      <button onClick={handleDelete}>Borrar</button>
      <Link to={`/avatar/${avatarId}/edit`}>
        <button>Editar</button>
      </Link>
    </div>
  ) : null;

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
        Accesorio: {accessoryOptions[avatarDetails.accessories]} - Color:{" "}
        {accessoriesColorOptions[avatarDetails.accessoriesColor]}
      </li>
      <li>
        Color del fondo: {backgroundColorOptions[avatarDetails.backgroundColor]}
      </li>
      <li>
        Color de la ropa: {clothesColorOptions[avatarDetails.clothesColor]}
      </li>
      <li>
        Tipo de ropa: {clothesOptions[avatarDetails.clothing]}
      </li>
      <li>
        Gráfico de la ropa: {clothesGraphicOptions[avatarDetails.clothingGraphic]}
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
    {canEditOrDelete}
        <div>
          {allComments.map(({author, content, _id})=> {
            const isAuthenticatedUser = author && author._id === (user && user._id);
            return (
              <div key={_id}>
                <p>Comentario de {author && author.username}</p>
              <p>{content}</p>
              {isAuthenticatedUser && (
        <button onClick={() => handleSubmitDeleteComment(_id)}>
          Borrar comentario
        </button>
      )}
              </div>
              )}
            )
          }
          
        </div>
        <div>
          <h3>Agregar Comentario</h3>

          <form onSubmit={handleSubmitCreateComment}>
            <input type="text" name="comment" onChange={(e) => setCreateComment(e.target.value)} value={createComment}/>
            <button type="submit">Agregar Comentario</button>
          </form>
        </div>
  </div>
  )
}

export default AvatarDetails