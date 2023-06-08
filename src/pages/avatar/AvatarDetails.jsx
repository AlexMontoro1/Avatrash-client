import { useEffect, useState, useContext } from "react";
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import { Container, Row, Col, Button, Modal, Form, Card } from 'react-bootstrap';
import { AuthContext } from "../../context/auth.context";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAvatarDetailsService, deleteAvatarService, likeAvatarService, editAvatarService  } from "../../services/avatar.services"
import { createCommentService, deleteCommentService } from "../../services/comment.services"
import { Orbit } from '@uiball/loaders'
import {
  accessoryOptions,
  backgroundColorOptions,
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

  const { user, isLoggedIn } = useContext(AuthContext)

  const { avatarId } = useParams()

  let navigate = useNavigate()

  const [ avatarDetails, setAvatarDetails ] = useState()
  const [ isLoading, setIsLoading ] = useState(true)
  const [ createComment, setCreateComment ] = useState("")
  const [ allComments, setAllComments ] = useState([])
  const [likesNumber, setLikesNumber] = useState(0);
  const [showCommentsModal, setShowCommentsModal] = useState(false);



  const getData = async () => {
    try {
      const response = await getAvatarDetailsService(avatarId)
      setAvatarDetails(response.data.avatar)
      setAllComments(response.data.comment)
      setLikesNumber(response.data.avatar.likes.length)
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

  const handleLikes = async () => {
    try {
      const response = await likeAvatarService(avatarId);
      console.log(response.data);
      const likes = response.data.length
      setLikesNumber(likes)
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownload = () => {
    console.log(avatarDetails);
    if (avatarDetails) {
      const avatar = createAvatar(avataaars, {
          backgroundRotation: 0,
          translateX: 0,
          translateY: 0,
          clip: true,
          randomizeIds: false,
        accessories: avatarDetails.accessories,
        accessoriesColor: avatarDetails.accessoriesColor,
        //base: ["default"],
        backgroundColor: avatarDetails.backgroundColor,
        clothesColor: avatarDetails.clothesColor,
        clothing: avatarDetails.clothing,
        clothingGraphic: avatarDetails.clothingGraphic,
        eyebrows: avatarDetails.eyebrows,
        eyes: avatarDetails.eyes,
        facialHair: avatarDetails.facialHair,
        facialHairProbability: 100,
        facialHairColor: avatarDetails.facialHairColor,
        hairColor: avatarDetails.hairColor,
        hatColor: avatarDetails.hatColor,
        mouth: avatarDetails.mouth,
        nose: ["default"],
        skinColor: avatarDetails.skinColor,
        topProbability: 100,
        top: avatarDetails.top,
        accessoriesProbability: 100,
        style: avatarDetails.style,
      });
      const png = avatar.png();
      png.toFile('avatar.png');
    }
  };
  const handleOpenCommentsModal = () => {
    setShowCommentsModal(true);
  };

  const handleCloseCommentsModal = () => {
    setShowCommentsModal(false);
  };
  

  if (isLoading) {
    return <Orbit 
    size={25}
    speed={1.5} 
    color="black" 
   />;
  }

  const isAuthenticatedUser = avatarDetails.owner?.toString() === user?._id?.toString();
  const canEditOrDelete = isAuthenticatedUser ? (
    <div>
    <button onClick={handleDelete} className="btn btn-danger" style={{marginLeft: 20}}>Borrar</button>
    <Link to={`/avatar/${avatarId}/edit`}>
      <button className="btn btn-primary" style={{marginLeft: 20}}>Editar</button>
    </Link>
  </div>
  ) : null;

  return (
    <Container style={{ color: "white" , marginTop: "20px"}}>
      <Row>
      <Col xs={12} md={6}>
        <Card>
          <Card.Body>
            <div className="text-center">
              <h3>{avatarDetails.name}</h3>
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  avatarDetails.json.svg
                )}`}
                alt="avatar"
                style={{ width: "300px", height: "300px", margin: "auto" }}
              />
              <button onClick={handleDownload} className="btn btn-warning mt-3">Descargar Avatar</button>
            </div>
            {isLoggedIn && (
        <div>
        <h3>Likes: {likesNumber}</h3>
        <button onClick={handleLikes} className="btn btn-primary">
          <span style={{color: "red"}}>❤️</span> Like
        </button>
      </div>
      )}
          </Card.Body>
        </Card>
      </Col>
    <Col xs={12} md={6}>
    <Card>
          <Card.Body>
            <Card.Title>Detalles del Avatar</Card.Title>
            <ul className="list-unstyled">
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
    </Card.Body>
        </Card>
    </Col>
    </Row>
    <Row>
        <Col xs={12}>
          <h2>Comentarios</h2>
          <Button variant="primary" onClick={handleOpenCommentsModal}>
            Ver Comentarios
          </Button>
        </Col>
      </Row>

      <Modal show={showCommentsModal} onHide={handleCloseCommentsModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Comentarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="comments-container">
            {allComments.map(({ author, content, _id }) => {
              const isAuthenticatedUser =
                author && author._id === (user && user._id);
              return (
                <div key={_id} className="comment card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Comentario de {author && author.username}</h5>
                    <p className="card-text">{content}</p>
                    {isAuthenticatedUser && (
                      <button
                        onClick={() => handleSubmitDeleteComment(_id)}
                        className="btn btn-danger"
                      >
                        Borrar comentario
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
        {isLoggedIn && (
          <Row >
          <Col xs={12}>
          <h3>Agregar Comentario</h3>
          
          <form onSubmit={handleSubmitCreateComment}>
            <Form.Control style={{width: "30%", marginBottom: 10}} type="text" name="comment" onChange={(e) => setCreateComment(e.target.value)} value={createComment}/>
            <Button variant="primary" type="submit">Agregar Comentario</Button>
          </form>
          </Col>
        </Row>
        )}
        
        </Container>
  )
}

export default AvatarDetails