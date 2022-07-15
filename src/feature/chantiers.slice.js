import { createSlice } from "@reduxjs/toolkit"

export const chantiersSlice = createSlice({
   name: "chantiers",
   initialState: {
      chantiers: null,
   },
   reducers: {
      setChantiersData: (state, { payload }) => {
         state.chantiers = payload
      },
      addChantiers: (state, { payload }) => {
         state.chantiers.push(payload)
      },
      editChantiers: (state, { payload }) => {
         state.chantiers = state.chantiers.map((chantier) => {
            if (chantier._id === payload[1]) {
               return {
                  ...chantier,
                  chantierTitle: payload[0].chantierTitle,
                  chantierContent: payload[0].chantierContent,
                  chantierImage: payload[0].chantierImage,
                  chantierDate: payload[0].chantierDate,
               }
            } else {
               return chantier
            }
         })
      },
      deleteChantiers: (state, { payload }) => {
         state.chantiers = state.chantiers.filter(
            (chantier) => chantier._id !== payload
         )
      },
   },
})

export const {
   setChantiersData,
   addChantiers,
   editChantiers,
   deleteChantiers,
} = chantiersSlice.actions
export default chantiersSlice.reducer
