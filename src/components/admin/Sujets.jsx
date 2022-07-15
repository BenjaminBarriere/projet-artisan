import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faBan } from "@fortawesome/free-solid-svg-icons"
import "./Sujets.scss"
import { useState } from "react"
import axios from "axios"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useDispatch } from "react-redux"
import { addSujets, deleteSujets, editSujets } from "../../feature/sujets.slice"

library.add(faPen)
library.add(faCheck)
library.add(faPlus)
library.add(faBan)

const Sujets = () => {
   const [idSujet, setIdSujet] = useState([""])
   const [idToDelete, setIdToDelete] = useState("")
   const [show, setShow] = useState(false)
   const [showAddForm, setShowAddForm] = useState(false)
   const dispatch = useDispatch()
   const sujets = useSelector((state) => state.sujets.sujets)
   const token = localStorage.getItem("token")
   let tmp_sujets = []

   // On fait ca pour eviter les erreurs quand ca se fait trop vite + pouvoir s'en servir apres
   // Si on ne passe pas par tmp_??? , ca va bugger au premier render !
   if (sujets != null) tmp_sujets = sujets

   // Activer le champ pour la modif d'un sujet
   const enableModif = (e, id) => {
      setIdSujet((idSujet) => [...idSujet, id])
   }

   // Effectuer la modif d'un sujet
   const sendModif = (e, id, index) => {
      let sujet = document.getElementById("inp" + id).value
      let data = {
         sujet: sujet,
      }
      if (sujet === tmp_sujets[index].sujet) {
         let array = [...idSujet]
         let index = array.indexOf(id)
         if (index !== -1) array.splice(index, 1)

         setIdSujet(array)
      } else {
         axios
            .put(`http://192.168.1.21:3005/api/v1/sujets/${id}`, data, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            })
            .then((res) => {
               dispatch(editSujets([res.data.sujet, id]))

               let array = [...idSujet]
               let index = array.indexOf(id)
               if (index !== -1) array.splice(index, 1)

               setIdSujet(array)
            })
            .catch((error) => {
               console.log(error)
            })
      }
   }

   const handleClose = () => setShow(false)

   const handleShow = (id) => {
      setIdToDelete(id)
      setShow(true)
   }

   const deleteSujet = () => {
      let idSujet = idToDelete

      axios
         .delete(`http://192.168.1.21:3005/api/v1/sujets/${idSujet}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            dispatch(deleteSujets(idSujet))
            setIdToDelete("")
            setShow(false)
         })
         .catch((error) => {
            console.log(error)
         })
   }

   const hideAddForm = () => {
      setShowAddForm(false)
   }

   const showAddModal = () => {
      setShowAddForm(true)
   }

   const addNewSujet = (e) => {
      e.preventDefault()
      let data = {
         sujet: e.target[1].value,
      }

      axios
         .post(`http://192.168.1.21:3005/api/v1/sujets/`, data, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            let data = {
               _id: res.data.insertedId,
               sujet: e.target[1].value,
            }

            dispatch(addSujets(data))
            setShowAddForm(false)
         })
         .catch((error) => {
            console.log(error)
         })
   }

   return (
      <div className="form-sujet">
         <table>
            <thead>
               <tr>
                  <th>Sujet</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
               </tr>
            </thead>
            <tbody>
               {tmp_sujets.map((option, index) => (
                  <tr key={option._id}>
                     <td>
                        <input
                           className="sujet"
                           id={"inp" + option._id}
                           name={option._id}
                           defaultValue={option.sujet}
                           disabled={
                              idSujet.includes(option._id) ? false : true
                           }
                        />
                     </td>
                     <td className="icone-sujet">
                        {idSujet.includes(option._id) ? (
                           <button
                              id={"vld" + option._id}
                              name={"vld" + option._id}
                              onClick={(e) => {
                                 sendModif(e, option._id, index)
                              }}
                           >
                              <FontAwesomeIcon icon="check" />
                           </button>
                        ) : (
                           <button
                              id={"mdf" + option._id}
                              name={"mdf" + option._id}
                              onClick={(e) => {
                                 enableModif(e, option._id)
                              }}
                           >
                              <FontAwesomeIcon icon="pen" />
                           </button>
                        )}
                     </td>
                     <td className="icone-sujet">
                        <button
                           onClick={() => {
                              handleShow(option._id)
                           }}
                        >
                           <FontAwesomeIcon icon="ban" />
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Valider la suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Etes-vous sur de bien vouloir supprimer le sujet ?
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Non
               </Button>
               <Button variant="primary" onClick={deleteSujet}>
                  Oui
               </Button>
            </Modal.Footer>
         </Modal>

         <div className="add">
            <button className="add-sujet" onClick={showAddModal}>
               <FontAwesomeIcon icon="plus" />
            </button>
         </div>

         <Modal show={showAddForm} onHide={hideAddForm}>
            <form onSubmit={addNewSujet}>
               <Modal.Header closeButton>
                  <Modal.Title>Ajouter un sujet</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <label>
                     Libellé du nouveau sujet:
                     <input type="text" name="newsujet" />
                  </label>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={hideAddForm}>
                     Annuler
                  </Button>
                  <Button variant="primary" type="submit">
                     Valider
                  </Button>
               </Modal.Footer>
            </form>
         </Modal>
      </div>
   )
}

export default Sujets
