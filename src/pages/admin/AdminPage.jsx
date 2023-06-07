import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFeedbackService } from "../../services/feedback.services"
import { Orbit } from '@uiball/loaders'

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

    
      <div>
        <h1>Página de administrador</h1>
        <h2>Feedback enviado:</h2>
        {feedback.map(({ contentDislike, contentLike, _id }) => (
          <div key={_id}>
            <p>Qué podría mejorar: {contentDislike}</p>
            <p>Qué te ha gustado: {contentLike}</p>
          </div>
        ))}
      </div>
   
);
}

export default AdminPage;