import Chantier from "../components/chantiers/Chantier"
import "./LastsChantiers.scss"
import { useState } from "react"
import Carousel from "react-bootstrap/Carousel"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const LastChantiers = () => {
   const infos = useSelector((state) => state.chantiers.chantiers)
   const navigate = useNavigate()
   let chantiers = []

   if (infos != null) chantiers = infos

   const goPageChantier = () => {
      navigate("/chantiers")
   }

   return (
      <div id="chantiers" className="block-chantiers">
         <h2>Mes derniers chantiers</h2>
         <Carousel interval={null}>
            {chantiers.slice(0, 5).map((infoChantier) => (
               <Carousel.Item key={infoChantier._id}>
                  <div className="last-chantiers">
                     <Chantier
                        titre={infoChantier.chantierTitle}
                        contenu={infoChantier.chantierContent}
                        image={`http://192.168.1.21:3005${infoChantier.chantierImage.substr(
                           1
                        )}`}
                     />
                  </div>
               </Carousel.Item>
            ))}
         </Carousel>
         <div className="button-chantiers">
            <button onClick={goPageChantier}>Voir tout les chantiers</button>
         </div>
      </div>
   )
}

export default LastChantiers
