import "./Chantiers.scss"
import Chantier from "../components/chantiers/Chantier"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Chantiers = () => {
   const infos = useSelector((state) => state.chantiers.chantiers)
   const navigate = useNavigate()
   let chantiers = []

   if (infos != null) chantiers = infos

   const goHomePage = () => {
      navigate("/")
   }

   return (
      <div className="page-chantiers">
         <header>
            <button onClick={goHomePage}>Accueil</button>
            <h1> Mes chantiers</h1>
         </header>
         <main>
            {chantiers.map((infoChantier) => (
               <Chantier
                  key={infoChantier._id}
                  titre={infoChantier.chantierTitle}
                  contenu={infoChantier.chantierContent}
                  image={`${
                     process.env.REACT_APP_API_HOST
                  }${infoChantier.chantierImage.substr(1)}`}
               />
            ))}
         </main>
      </div>
   )
}

export default Chantiers
