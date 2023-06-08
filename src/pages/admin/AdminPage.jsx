import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeedbackService } from "../../services/feedback.services"
import { Orbit } from '@uiball/loaders'
import { Container, Row, Col } from "react-bootstrap";

function AdminPage() {

  const navigate = useNavigate()

  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

 const getData = async () => {
 
  try {
    const response = await getFeedbackService()
    
    setFeedback(response.data)
    setIsLoading(false)
  } catch (err) {
    navigate("/error")
  }
  
 }

 useEffect(()=> {
  getData()
 }, [])

 if (isLoading) {
  return (
    <div className="App">
      <Orbit 
      textAlign="center"
      size={25}
      speed={1.5} 
      color="black" 
      />
    </div>
  );
}

 return (

  
  <Container style={{textAlign: "center", color: "white"}}>
    <Row>
      <Col xs={12}>
        <h1 className="text-center">Página de administrador</h1>
        <h2 className="text-center">Feedback enviado:</h2>
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
        <h3>Qué podría mejorar:</h3>
        <ul style={{listStyle: "none"}}>
          {feedback.map(({ contentDislike, _id }) => (
            <li key={_id}>{contentDislike}</li>
          ))}
        </ul>
      </Col>
      <Col xs={6}>
        <h3>Qué te ha gustado:</h3>
        <ul style={{listStyle: "none"}}>
          {feedback.map(({ contentLike, _id }) => (
            <li key={_id}>{contentLike}</li>
          ))}
        </ul>
      </Col>
    </Row>
  </Container>

   
);
}

export default AdminPage;