import axios from "axios"
import { useEffect, useState } from "react"
import Login from "../components/admin/Login"
import HeaderAdmin from "../layouts/HeaderAdmin"
import NavMenu from "../layouts/NavMenu"
import Infos from "../components/admin/Infos"
import Sujets from "../components/admin/Sujets"
import Chantiers from "../components/admin/Chantiers"
import "./Admin.scss"

const Admin = () => {
   const tokenTmp = localStorage.getItem("token")
   const [token, setToken] = useState(tokenTmp)
   const [pageValue, setPageValue] = useState("infos")

   const login = (data) => {
      axios
         .post(`http://192.168.1.21:3005/api/v1/login/`, data)
         .then((res) => {
            localStorage.setItem("token", res.data.token)
            setToken(res.data.token)
         })
         .catch((error) => {})
   }

   const disconnect = () => {
      localStorage.removeItem("token")
      setToken(null)
   }

   const changePageValue = (pageValue) => {
      setPageValue(pageValue)
   }

   return (
      <div className="admin">
         <HeaderAdmin onClick={disconnect} />
         {token === null ? (
            <Login onSubmit={login} />
         ) : (
            <div className="page-admin">
               <NavMenu onClick={changePageValue} />
               {pageValue === "infos" && <Infos />}
               {pageValue === "sujets" && <Sujets />}
               {pageValue === "chantiers" && <Chantiers />}
               {pageValue === "config" && <h2>CONFIG TO ADD</h2>}
            </div>
         )}
      </div>
   )
}

export default Admin
