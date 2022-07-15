import { useNavigate } from "react-router-dom"
import "./HeaderAdmin.scss"

const HeaderAdmin = ({ onClick }) => {
   const navigate = useNavigate()

   const disconnect = () => {
      onClick()
   }

   const goHomePage = () => {
      navigate("/")
   }

   return (
      <header className="admin-header">
         <button onClick={goHomePage}>Accueil</button>
         <h1>ADMINISTRATION DU SITE</h1>
         <button onClick={disconnect}>Se deconnectez</button>
      </header>
   )
}

export default HeaderAdmin
