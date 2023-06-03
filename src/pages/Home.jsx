import { Link } from "react-router-dom"


function Home() {
  return (
    <div>
      <Link to="/avatar/create"><button>Crear Avatar</button></Link>
    </div>
  )
}

export default Home