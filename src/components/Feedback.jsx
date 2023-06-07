import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { createFeedbackService } from "../services/feedback.services"
import { Orbit } from '@uiball/loaders'

function Feedback( ) {

    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [feedbackImprovement, setFeedbackImprovement] = useState([]);
    const [feedbackLikes, setFeedbackLikes] = useState([]);

    
    const handleCloseModal = () => {
        setShowModal(false);
      };
    
      const handleOpenModal = () => {
        setShowModal(true);
      };

      const handleSendFeedback = async () => {
        const newFeedback = {
          contentLike: feedbackLikes,
          contentDislike: feedbackImprovement
        }
        try {
          await createFeedbackService(newFeedback)
          
          setShowModal(false);
          setShowAlert(true);
          setFeedbackImprovement([])
          setFeedbackLikes([])
        } catch (err) {
          console.log(err);

        }
        
      };
      const handleImprovementChange = (event) => {
        setFeedbackImprovement(event.target.value);
      };
    
      const handleLikesChange = (event) => {
        setFeedbackLikes(event.target.value);
      };
      
  return (
    <>
        <Button variant="primary" onClick={handleOpenModal}>
        Envíame tu Feedback
        </Button>

        <Modal show={showModal} onHide={handleCloseModal} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Que podria mejorar</Form.Label>
              <Form.Control
                as="textarea" rows={3}
                type="text"
                placeholder="... tu texto aquí"
                autoFocus
                value={feedbackImprovement}
                onChange={handleImprovementChange}
              />
            </Form.Group>
            <Form.Group className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Que te ha gustado</Form.Label>
              <Form.Control
                as="textarea" rows={3}
                type="text"
                placeholder="... tu texto aquí"
                value={feedbackLikes}
                onChange={handleLikesChange}
              />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSendFeedback}>
          Enviar Feedback
          </Button>
        </Modal.Footer>
      </Modal>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>¡Gracias por enviar tu Feedback!</Alert.Heading>
          <p>
            Leo todos y cada uno de vuestros Feedbacks y me sirven muchísimo para seguir mejorando.
          </p>
        </Alert>
      )}
    </>
  )
}

export default Feedback