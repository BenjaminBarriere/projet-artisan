import "./Presentation.scss"
import { useSelector } from "react-redux"

const Presentation = () => {
   const infos = useSelector((state) => state.infos.infos)
   let tmp_info = []
   let image = ""

   if (infos != null) {
      tmp_info = infos[0]
      image = tmp_info.presentationImage.substr(1)
   }

   return (
      <div id="presentation" className="block-presentation">
         <h2>{tmp_info.presentationTitle}</h2>

         <div className="presentation">
            <img src={`http://192.168.1.21:3005${image}`} alt="Artisan" />
            <p>{tmp_info.presentationContent}</p>
         </div>
      </div>
   )
}

export default Presentation
