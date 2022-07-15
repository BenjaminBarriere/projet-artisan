import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import { useDispatch } from "react-redux"
import { editInfos } from "../../feature/infos.slice"
import "./Infos.scss"
import { useState } from "react"
const phoneRegExp = /^(?=.*\d)[\d ]+$/

const schema = yup.object().shape({
   siteTitle: yup.string().required(),
   siteSubTitle: yup.string().required(),
   presentationTitle: yup.string().required(),
   presentationContent: yup.string().required(),
   adresse: yup.string().required(),
   telephone: yup
      .string()
      .required()
      .matches(phoneRegExp, "Num de tel non valide"),
   codepostal: yup
      .string()
      .required()
      .matches(phoneRegExp, "Code postal non valide"),
   ville: yup.string().required(),
})

const Infos = () => {
   const {
      register,
      handleSubmit,
      formState,
      formState: { errors },
      setValue,
      watch,
   } = useForm({
      mode: "onTouched",
      resolver: yupResolver(schema),
   })
   const { isSubmitting } = formState
   const dispatch = useDispatch()
   const infos = useSelector((state) => state.infos.infos)
   let tmp_info = []
   let srcImage = ""

   if (infos != null) {
      tmp_info = infos[0]
      srcImage = tmp_info.presentationImage.substr(1)
   }
   const token = localStorage.getItem("token")

   const blobToBase64 = (blob) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      return new Promise((resolve) => {
         reader.onloadend = () => {
            resolve(reader.result)
         }
      })
   }

   const onSubmit = async (data) => {
      let id = tmp_info._id
      data.modifImage = false
      console.log()
      if (data.presentationImage.length !== 0) {
         await blobToBase64(data.presentationImage[0]).then((res) => {
            data.presentationImage = res
            data.modifImage = true
         })
         console.log("salut")
      } else {
         data.presentationImage = tmp_info.presentationImage
      }

      axios
         .put(`http://192.168.1.21:3005/api/v1/infos/${id}`, data, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            dispatch(editInfos([data, id]))

            console.log(res.data.msg)
         })
         .catch((error) => {
            console.log(error.response.data)
         })
   }

   return (
      <div className="admin-infos">
         <form className="form-infos" onSubmit={handleSubmit(onSubmit)}>
            <label className="pageTitle">
               Titre de la page:
               <input
                  id="siteTitle"
                  type="text"
                  defaultValue={tmp_info.siteTitle}
                  {...register("siteTitle")}
               />
               {errors.siteTitle && (
                  <span className="error">{errors.siteTitle.message}</span>
               )}
            </label>
            <label className="pageSubtitle">
               Sous-Titre de la page:
               <input
                  id="siteSubTitle"
                  type="text"
                  defaultValue={tmp_info.siteSubTitle}
                  {...register("siteSubTitle")}
               />
               {errors.siteSubTitle && (
                  <span className="error">{errors.siteSubTitle.message}</span>
               )}
            </label>
            <label className="presTitle">
               Titre de la présentation:
               <input
                  id="presentationTitle"
                  type="text"
                  defaultValue={tmp_info.presentationTitle}
                  {...register("presentationTitle")}
               />
               {errors.presentationTitle && (
                  <span className="error">
                     {errors.presentationTitle.message}
                  </span>
               )}
            </label>
            <label className="presImage">
               Image de la présentation:
               <div className="image-pres">
                  <img src={`http://192.168.1.21:3005${srcImage}`} />
                  <input
                     id="presentationImage"
                     type="file"
                     {...register("presentationImage")}
                  />
               </div>
               {errors.presentationImage && (
                  <span className="error">
                     {errors.presentationImage.message}
                  </span>
               )}
            </label>
            <label className="presContent">
               Texte de la présentation:
               <textarea
                  id="presentationContent"
                  defaultValue={tmp_info.presentationContent}
                  {...register("presentationContent")}
               ></textarea>
               {errors.presentationContent && (
                  <span className="error">
                     {errors.presentationContent.message}
                  </span>
               )}
            </label>
            <label className="postal">
               Code postal:
               <input
                  id="codepostal"
                  type="text"
                  defaultValue={tmp_info.codepostal}
                  {...register("codepostal")}
               />
               {errors.codepostal && (
                  <span className="error">{errors.codepostal.message}</span>
               )}
            </label>
            <label className="city">
               Ville:
               <input
                  id="ville"
                  type="text"
                  defaultValue={tmp_info.ville}
                  {...register("ville")}
               />
               {errors.ville && (
                  <span className="error">{errors.ville.message}</span>
               )}
            </label>
            <label className="adresse">
               Adresse:
               <input
                  id="adresse"
                  type="text"
                  defaultValue={tmp_info.adresse}
                  {...register("adresse")}
               />
               {errors.adresse && (
                  <span className="error">{errors.adresse.message}</span>
               )}
            </label>
            <label className="tel">
               Telephone:
               <input
                  id="telephone"
                  type="text"
                  defaultValue={tmp_info.telephone}
                  {...register("telephone")}
               />
               {errors.telephone && (
                  <span className="error">{errors.telephone.message}</span>
               )}
            </label>
            <button type="submit" disabled={isSubmitting} className="submit">
               Valider
            </button>
         </form>
      </div>
   )
}

export default Infos
