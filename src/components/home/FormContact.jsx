import "./FormContact.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSelector } from "react-redux"
import axios from "axios"

library.add(faPhone)
library.add(faHome)

// Liste des messages d'erreurs
const errorMessages = {
   name_empty: "Le nom doit être renseigné.",
   name_invalid: "Le nom doit faire entre 2 et 32 caracteres.",
   email_empty: "L'email doit être renseigné.",
   email_invalid: "L'email spécifié est incorrect.",
   subject_chose: "Veuillez choisir un sujet s.v.p",
   subject_empty: "Le sujet doit être renseigné.",
   subject_invalid: "Le sujet ne doit pas contenir de caractères spéciaux.",
   subject_invalid: "Le sujet ne doit pas faire plus de 256 caractères.",
   message_empty: "Le message doit être renseigné.",
   message_invalid: "Le message ne doit pas faire plus de 4000 caractères.",
}

const schema = yup.object().shape({
   nom: yup
      .string()
      .required(errorMessages["name_empty"])
      .min(2, errorMessages["name_invalid"])
      .max(32, errorMessages["name_invalid"]),
   email: yup
      .string()
      .email(errorMessages["email_invalid"])
      .required(errorMessages["email_empty"]),
   sujet: yup
      .string()
      .test("", errorMessages["subject_chose"], (value) =>
         value === "chose" ? false : true
      ),
   sujetLibre: yup
      .string()
      .max(256, errorMessages["subject_invalid"])
      .when("sujet", {
         is: "autre",
         then: yup.string().required(errorMessages["subject_empty"]),
      }),
   message: yup
      .string()
      .max(4000, errorMessages["message_empty"])
      .required(errorMessages["message_invalid"]),
})

const FormContact = () => {
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

   const infos = useSelector((state) => state.infos.infos)
   let tmp_info = []

   const sujets = useSelector((state) => state.sujets.sujets)
   let tmp_sujets = []

   // On fait ca pour eviter les erreurs quand ca se fait trop vite + pouvoir s'en servir apres
   // Si on ne passe pas par tmp_??? , ca va bugger au premier render !
   if (infos != null) tmp_info = infos[0]
   if (sujets != null) tmp_sujets = sujets

   const [freeSubjectReqired, setFreeSubjectReqired] = useState(false)
   const [subject, setSubject] = useState("chose")

   useEffect(() => {
      if (subject === "autre") setFreeSubjectReqired(true)
      else setFreeSubjectReqired(false)
      // setValue mit pour etre sur que react hook form prennent une valeur par defaut, sinon bug potentiel !!
   }, [subject])

   const onSubmit = (data) => {
      console.log(data) // A ENLEVER AVANT FIN PROJET
      axios
         .post(`${process.env.REACT_APP_API_HOST}/api/v1/mail/`, data)
         .then((res) => {
            alert("Message envoyé")
         })
         .catch((error) => {
            console.log(error)
         })
   }

   return (
      <form className="form-contact" onSubmit={handleSubmit(onSubmit)}>
         {/* nom */}
         <label className="name form-group" htmlFor="nom">
            Nom:
            <input
               id="nom"
               type=" text"
               className="form-control"
               {...register("nom")}
            />
            {errors.nom && <span className="error">{errors.nom.message}</span>}
         </label>
         {/* email */}
         <label className="mail form-group" htmlFor="email">
            E-mail:
            <input
               id="email"
               type="email"
               className="form-control"
               {...register("email")}
            />
            {errors.email && (
               <span className="error">{errors.email.message}</span>
            )}
         </label>
         {/* select sujet */}
         <label className="sujet form-group" htmlFor="sujet">
            Sujet:
            <select
               id="sujet"
               name="sujet"
               className="form-control"
               value={subject}
               {...register("sujet", {
                  onChange: (e) => {
                     setSubject(e.target.value)
                  },
               })}
            >
               <option key={"chose"} value="chose" disabled hidden>
                  -- Veuillez choisir un sujet s.v.p --
               </option>
               {tmp_sujets != [] &&
                  tmp_sujets.map((option) => (
                     <option key={option._id} value={option._id}>
                        {option.sujet}
                     </option>
                  ))}
               <option key={"autre"} value="autre">
                  Autre (veuillez renseigner le sujet)
               </option>
            </select>
            {errors.sujet && (
               <span className="error">{errors.sujet.message}</span>
            )}
         </label>
         {/* input sujet libre */}
         <label
            className={
               freeSubjectReqired
                  ? "sujet-input form-group"
                  : "sujet-input form-group hidden"
            }
            htmlFor="sujetLibre"
         >
            Sujet à renseigner:
            <input
               id="sujetLibre"
               type="text"
               className="form-control"
               {...register("sujetLibre")}
            />
            {errors.sujetLibre && (
               <span className="error">{errors.sujetLibre.message}</span>
            )}
         </label>
         {/* message */}
         <label className="message form-group" htmlFor="message">
            Message:
            <textarea
               id="message"
               className="form-control"
               {...register("message")}
            ></textarea>
            {errors.message && (
               <span className="error">{errors.message.message}</span>
            )}
         </label>
         <button type="submit" className="submit" disabled={isSubmitting}>
            Envoyer
         </button>
         {/* infos autres */}
         <div className="tel">
            <FontAwesomeIcon icon="phone" />
            <a href="tel:0123456789" title="Contact par téléphone">
               {tmp_info.telephone}
            </a>
         </div>
         <div className="address">
            <FontAwesomeIcon icon="home" />
            <address>
               {tmp_info.adresse}
               <br />
               {tmp_info.codepostal + " " + tmp_info.ville}
            </address>
         </div>
      </form>
   )
}

export default FormContact
