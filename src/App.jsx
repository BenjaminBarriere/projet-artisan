import { BrowserRouter, Routes, Route } from "react-router-dom"
import Chantiers from "./pages/Chantiers"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/scss/vendors/reset.scss"
import { useDispatch } from "react-redux"
import { setInfosData } from "./feature/infos.slice"
import { setChantiersData } from "./feature/chantiers.slice"
import { setSujetsData } from "./feature/sujets.slice"
import axios from "axios"

const App = () => {
   const dispatch = useDispatch()

   axios.get(`http://192.168.1.21:3005/api/v1/infos/`).then((res) => {
      dispatch(setInfosData(res.data))
   })

   axios.get(`http://192.168.1.21:3005/api/v1/chantiers/`).then((res) => {
      dispatch(setChantiersData(res.data))
   })

   axios.get(`http://192.168.1.21:3005/api/v1/sujets/`).then((res) => {
      dispatch(setSujetsData(res.data))
   })

   return (
      <BrowserRouter>
         <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/chantiers" element={<Chantiers />}></Route>
            <Route path="/administration" element={<Admin />}></Route>
         </Routes>
      </BrowserRouter>
   )
}

export default App
