import Navbar from "../layouts/Navbar"
import "./Header.scss"
import { useSelector } from "react-redux"

const Header = () => {
   const infos = useSelector((state) => state.infos.infos)
   let tmp_info = []

   if (infos != null) tmp_info = infos[0]

   return (
      <header id="top" className="header">
         <Navbar />
         <div className="title">
            <h1>{tmp_info.siteTitle}</h1>
            <h2>{tmp_info.siteSubTitle}</h2>
         </div>
      </header>
   )
}

export default Header
