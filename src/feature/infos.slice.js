import { createSlice } from "@reduxjs/toolkit"

export const infosSlice = createSlice({
   name: "infos",
   initialState: {
      infos: null,
   },
   reducers: {
      setInfosData: (state, { payload }) => {
         state.infos = payload
      },
      addInfos: (state, { payload }) => {
         state.infos.push(payload)
      },
      editInfos: (state, { payload }) => {
         state.infos = state.infos.map((info) => {
            if (info._id === payload[1]) {
               return {
                  ...info,
                  siteTitle: payload[0].siteTitle,
                  siteSubTitle: payload[0].siteSubTitle,
                  presentationTitle: payload[0].presentationTitle,
                  presentationImage: payload[0].presentationImage,
                  presentationContent: payload[0].presentationContent,
                  adresse: payload[0].adresse,
                  telephone: payload[0].telephone,
                  codepostal: payload[0].codepostal,
                  ville: payload[0].ville,
               }
            } else {
               return info
            }
         })
      },
   },
})

export const { setInfosData, addInfos, editInfos } = infosSlice.actions
export default infosSlice.reducer
