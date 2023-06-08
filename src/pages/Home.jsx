import { Link } from "react-router-dom"
import avatrashImage from "../images/avatrash.png";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function Home() {

  const { isLoggedIn } = useContext(AuthContext);
  

  const handleCreateButtonClick = () => {
    if (!isLoggedIn) {
      window.alert("Necesitas estar logeado para crear un avatar.");
    }
  };

  return (
     <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <div>
        <img src={avatrashImage} alt="avatrash logo" width="200" height="200" />
      </div>
      <div style={{ marginTop: "auto" }}>
        <Link to="/avatar/create">
          <button className="glowing-btn" onClick={handleCreateButtonClick}>
            <span className="glowing-txt">
              C<span className="faulty-letter">RE</span>ATE
            </span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home