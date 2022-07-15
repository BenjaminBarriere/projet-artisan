import "./NavMenu.scss"

const NavMenu = ({ onClick }) => {
   const changePage = (event) => {
      onClick(event.target.value)
   }

   return (
      <ul className="menu-admin">
         <li>
            <button value="infos" onClick={changePage}>
               Infos
            </button>
         </li>
         <li>
            <button value="sujets" onClick={changePage}>
               Sujets
            </button>
         </li>
         <li>
            <button value="chantiers" onClick={changePage}>
               Chantiers
            </button>
         </li>
         <li hidden>
            <button value="config" onClick={changePage} className="last-child">
               Config
            </button>
         </li>
      </ul>
   )
}

export default NavMenu
