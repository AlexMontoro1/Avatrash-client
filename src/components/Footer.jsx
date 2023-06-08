import Feedback from "./Feedback"
import { FaLinkedin, FaGithub } from 'react-icons/fa';


function Footer() {
  return (
    <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', backgroundColor: 'lightgray', padding: '10px', textAlign: 'center' }}>
    <footer className="d-flex justify-content-evenly">
     <h5 style={{ marginTop: 5 }}>Developed by Alejandro Montoro</h5>  <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/alejandro-montoro-jim%C3%A9nez-2807b487/"><FaLinkedin size={35}/></a> <a target="_blank" rel="noreferrer" href="https://github.com/AlexMontoro1"><FaGithub size={35}/></a> <Feedback />
    </footer>
  </div>
  )
}

export default Footer