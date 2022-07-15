import "./Chantier.scss"

const Chantier = ({ titre, contenu, image }) => {
   return (
      <div className="Chantier">
         <img src={image} alt="Artisan" />
         <div className="infos-chantiers">
            <h3>{titre}</h3>
            <p>{contenu}</p>
         </div>
      </div>
   )
}

export default Chantier
