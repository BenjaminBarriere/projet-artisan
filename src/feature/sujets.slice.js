import { createSlice } from "@reduxjs/toolkit"

export const sujetsSlice = createSlice({
   name: "sujets",
   initialState: {
      sujets: null,
   },
   reducers: {
      setSujetsData: (state, { payload }) => {
         state.sujets = payload
      },
      addSujets: (state, { payload }) => {
         state.sujets.push(payload)
      },
      editSujets: (state, { payload }) => {
         state.sujets = state.sujets.map((sujet) => {
            if (sujet._id === payload[1]) {
               return {
                  ...sujet,
                  sujet: payload[0],
               }
            } else {
               return sujet
            }
         })
      },
      deleteSujets: (state, { payload }) => {
         state.sujets = state.sujets.filter((sujet) => sujet._id !== payload)
      },
   },
})

export const { setSujetsData, addSujets, editSujets, deleteSujets } =
   sujetsSlice.actions
export default sujetsSlice.reducer
