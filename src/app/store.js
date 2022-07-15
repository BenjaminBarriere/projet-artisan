import { configureStore } from "@reduxjs/toolkit"
import infosReducer from "../feature/infos.slice"
import chantierReducer from "../feature/chantiers.slice"
import sujetsReducer from "../feature/sujets.slice"

export default configureStore({
   reducer: {
      infos: infosReducer,
      chantiers: chantierReducer,
      sujets: sujetsReducer,
   },
})
