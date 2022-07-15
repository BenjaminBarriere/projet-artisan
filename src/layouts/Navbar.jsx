import { HashLink as Link } from "react-router-hash-link"
import "./Navbar.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faUserTie } from "@fortawesome/free-solid-svg-icons"
import { faHammer } from "@fortawesome/free-solid-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"

library.add(faHome)
library.add(faUserTie)
library.add(faHammer)
library.add(faEnvelope)

const Navbar = () => {
   return (
      <div className="navbar">
         <nav>
            <ul>
               <li>
                  <Link smooth to="/#top">
                     <FontAwesomeIcon icon="home" />
                     Accueil
                  </Link>
               </li>
               <li>
                  <Link smooth to="/#presentation">
                     <FontAwesomeIcon icon="user-tie" />
                     Presentation
                  </Link>
               </li>
               <li>
                  <Link smooth to="/#chantiers">
                     <FontAwesomeIcon icon="hammer" />
                     Chantiers
                  </Link>
               </li>
               <li>
                  <Link smooth to="/#contact">
                     <FontAwesomeIcon icon="envelope" />
                     Contact
                  </Link>
               </li>
            </ul>
         </nav>
      </div>
   )
}

export default Navbar
