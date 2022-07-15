import { HashLink as Link } from "react-router-hash-link"
import "./Footer.scss"

const Footer = () => {
   return (
      <footer className="footer">
         <nav>
            <ul>
               <li>
                  <Link smooth to="/#">
                     Mentions légales
                  </Link>
               </li>
               <li>
                  <Link smooth to="/#top">
                     Plan du site
                  </Link>
               </li>
               <li>
                  <span> © Copyright </span>
               </li>
            </ul>
         </nav>
      </footer>
   )
}

export default Footer
