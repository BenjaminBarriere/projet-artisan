import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import photo from "../../assets/images/chantier.jpg"
import "./Chantiers.scss"
import { useRef, useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import axios from "axios"
import { useDispatch } from "react-redux"
import {
   addChantiers,
   deleteChantiers,
   editChantiers,
} from "../../feature/chantiers.slice"
import Resizer from "react-image-file-resizer"

library.add(faPen)
library.add(faCheck)
library.add(faUpload)

const Chantiers = () => {
   const token = localStorage.getItem("token")
   const infos = useSelector((state) => state.chantiers.chantiers)
   const [show, setShow] = useState(false)
   const [showAddForm, setShowAddForm] = useState(false)
   const dispatch = useDispatch()
   const uploadInput = useRef([])

   const [idTitle, setIdTitle] = useState([""]) //  Tableau des ids dont le titre est en modification
   const [idContent, setIdContent] = useState([""]) //  Tableau des ids dont le contenu est en modification
   const [idDate, setIdDate] = useState([""]) //  Tableau des ids dont la date est en modification
   const [idImage, setIdImage] = useState([""]) //  Tableau des ids dont l'image' est en modification
   const [idToDelete, setIdToDelete] = useState("") // On stocke l'id a delete
   const [nameToDelete, setNameToDelete] = useState("") // On stocke l'id a delete

   let chantiers = []

   if (infos != null) chantiers = infos

   const enableModifContent = (e, id) => {
      setIdContent((idContent) => [...idContent, id])
   }

   const enableModifTitle = (e, id) => {
      setIdTitle((idTitle) => [...idTitle, id])
   }

   const enableModifDate = (e, id) => {
      setIdDate((idDate) => [...idDate, id])
   }

   const changeContent = (e, index) => {
      let chantier = chantiers[index]
      let content = document.getElementById("txt" + chantier._id).value

      if (content === chantier.chantierContent) {
         let array = [...idContent]
         let index = array.indexOf(chantier._id)
         if (index !== -1) array.splice(index, 1)

         setIdContent(array)
      } else {
         let data = {
            chantierTitle: chantier.chantierTitle,
            chantierContent: content,
            chantierImage: chantier.chantierImage,
            chantierDate: chantier.chantierDate,
            modifImage: false,
         }

         axios
            .put(
               `http://192.168.1.21:3005/api/v1/chantiers/${chantier._id}`,
               data,
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            )
            .then((res) => {
               console.log(res.data)
               let data = {
                  chantierTitle: res.data.chantierTitle,
                  chantierContent: res.data.chantierContent,
                  chantierImage: res.data.chantierImage,
                  chantierDate: res.data.chantierDate,
               }
               dispatch(editChantiers([data, chantier._id]))

               let array = [...idContent]
               let index = array.indexOf(chantier._id)
               if (index !== -1) array.splice(index, 1)

               setIdContent(array)
            })
            .catch((error) => {
               console.log(error)
            })
      }
   }

   const changeTitle = (e, index) => {
      let chantier = chantiers[index]
      let title = document.getElementById("inp" + chantier._id).value

      if (title === chantier.chantierTitle) {
         let array = [...idTitle]
         let index = array.indexOf(chantier._id)
         if (index !== -1) array.splice(index, 1)

         setIdTitle(array)
      } else {
         let data = {
            chantierTitle: title,
            chantierContent: chantier.chantierContent,
            chantierImage: chantier.chantierImage,
            chantierDate: chantier.chantierDate,
            modifImage: false,
         }

         axios
            .put(
               `http://192.168.1.21:3005/api/v1/chantiers/${chantier._id}`,
               data,
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            )
            .then((res) => {
               console.log(res.data)
               let data = {
                  chantierTitle: res.data.chantierTitle,
                  chantierContent: res.data.chantierContent,
                  chantierImage: res.data.chantierImage,
                  chantierDate: res.data.chantierDate,
               }
               dispatch(editChantiers([data, chantier._id]))

               let array = [...idTitle]
               let index = array.indexOf(chantier._id)
               if (index !== -1) array.splice(index, 1)

               setIdTitle(array)
            })
            .catch((error) => {
               console.log(error)
            })
      }
   }

   const changeDate = (e, index) => {
      let chantier = chantiers[index]
      let date = document.getElementById("dat" + chantier._id).value
      date = date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2)

      if (date === chantier.chantierDate) {
         let array = [...idDate]
         let index = array.indexOf(chantier._id)
         if (index !== -1) array.splice(index, 1)

         setIdDate(array)
      } else {
         let data = {
            chantierTitle: chantier.chantierTitle,
            chantierContent: chantier.chantierContent,
            chantierImage: chantier.chantierImage,
            chantierDate: date,
            modifImage: false,
         }

         axios
            .put(
               `http://192.168.1.21:3005/api/v1/chantiers/${chantier._id}`,
               data,
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            )
            .then((res) => {
               console.log(res.data)
               let data = {
                  chantierTitle: res.data.chantierTitle,
                  chantierContent: res.data.chantierContent,
                  chantierImage: res.data.chantierImage,
                  chantierDate: res.data.chantierDate,
               }
               dispatch(editChantiers([data, chantier._id]))

               let array = [...idDate]
               let index = array.indexOf(chantier._id)
               if (index !== -1) array.splice(index, 1)

               setIdDate(array)
            })
            .catch((error) => {
               console.log(error)
            })
      }
   }

   const handleClose = () => setShow(false)

   const handleShow = (id, name) => {
      setIdToDelete(id)
      setNameToDelete(name)
      setShow(true)
   }

   const deleteChantier = () => {
      let idChantier = idToDelete

      axios
         .delete(`http://192.168.1.21:3005/api/v1/chantiers/${idChantier}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            dispatch(deleteChantiers(idChantier))
            setIdToDelete("")
            setShow(false)
         })
         .catch((error) => {
            console.log(error)
         })
   }

   const clickUploadInput = (e, id, index) => {
      uploadInput.current[index].click()
      setIdImage((idImage) => [...idImage, id])
   }

   const resizeFile = (file) =>
      new Promise((resolve) => {
         Resizer.imageFileResizer(
            file,
            600,
            600,
            "PNG",
            100,
            0,
            (uri) => {
               resolve(uri)
            },
            "base64"
         )
      })

   const fileSelectedHandler = async (event, index) => {
      let chantier = chantiers[index]
      console.log(index)
      let image = await resizeFile(event.target.files[0])

      console.log(image)
      let data = {
         chantierTitle: chantier.chantierTitle,
         chantierContent: chantier.chantierContent,
         chantierImage: image,
         chantierDate: chantier.chantierDate,
         modifImage: true,
      }

      // console.log(data)
      axios
         .put(
            `http://192.168.1.21:3005/api/v1/chantiers/${chantier._id}`,
            data,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         )
         .then((res) => {
            console.log(res.data)
            let data = {
               chantierTitle: res.data.chantierTitle,
               chantierContent: res.data.chantierContent,
               chantierImage: res.data.chantierImage,
               chantierDate: res.data.chantierDate,
            }
            dispatch(editChantiers([data, chantier._id]))

            let array = [...idDate]
            let index = array.indexOf(chantier._id)
            if (index !== -1) array.splice(index, 1)

            setIdDate(array)
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

   const addNewChantier = async (e) => {
      e.preventDefault()
      let image = ""
      if (e.target[4].files[0] !== undefined) {
         image = await resizeFile(e.target[4].files[0])
      }

      let date = e.target[3].value
      date = date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2)

      let data = {
         chantierTitle: e.target[1].value,
         chantierContent: e.target[2].value,
         chantierImage: image,
         chantierDate: date,
      }

      axios
         .post(`http://192.168.1.21:3005/api/v1/chantiers/`, data, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => {
            let data = {
               _id: res.data.result.insertedId,
               chantierTitle: e.target[1].value,
               chantierContent: e.target[2].value,
               chantierImage: res.data.chantierImage,
               chantierDate: res.data.chantierDate,
            }

            dispatch(addChantiers(data))
            setShowAddForm(false)
         })
         .catch((error) => {
            console.log(error)
         })
   }

   return (
      <div className="chantiers">
         <div className="add-chantier">
            <button onClick={showAddModal}>Ajouter un chantier</button>
         </div>

         {chantiers.map((chantier, index) => (
            <div className="chantier-card" key={chantier._id}>
               <div className="chantier">
                  <div className="image-chantiers">
                     <img
                        id={"img" + chantier._id}
                        name={"img" + chantier._id}
                        src={`http://192.168.1.21:3005${chantier.chantierImage.substr(
                           1
                        )}`}
                        alt="Artisan"
                     />
                     <input
                        id={"upi" + chantier._id}
                        name={"upi" + chantier._id}
                        key={"upi" + chantier._id}
                        type="file"
                        ref={(el) => (uploadInput.current[index] = el)}
                        onChange={(e) => fileSelectedHandler(e, index)}
                        hidden
                     />
                     <button
                        onClick={(e) =>
                           clickUploadInput(e, chantier._id, index)
                        }
                     >
                        <FontAwesomeIcon icon="upload" />
                     </button>
                  </div>
                  <div className="infos-chantiers">
                     <div className="titre">
                        <input
                           id={"inp" + chantier._id}
                           name={"inp" + chantier._id}
                           type="text"
                           defaultValue={chantier.chantierTitle}
                           disabled={
                              idTitle.includes(chantier._id) ? false : true
                           }
                        />
                        {idTitle.includes(chantier._id) ? (
                           <button
                              id={"mip" + chantier._id}
                              name={"mip" + chantier._id}
                              onClick={(e) => {
                                 changeTitle(e, index)
                              }}
                           >
                              <FontAwesomeIcon icon="check" />
                           </button>
                        ) : (
                           <button
                              id={"mip" + chantier._id}
                              name={"mip" + chantier._id}
                              onClick={(e) => {
                                 enableModifTitle(e, chantier._id)
                              }}
                           >
                              <FontAwesomeIcon icon="pen" />
                           </button>
                        )}
                     </div>
                     <div className="contenu">
                        <textarea
                           id={"txt" + chantier._id}
                           name={"txt" + chantier._id}
                           type="text"
                           defaultValue={chantier.chantierContent}
                           disabled={
                              idContent.includes(chantier._id) ? false : true
                           }
                        ></textarea>
                        {idContent.includes(chantier._id) ? (
                           <button
                              id={"mcn" + chantier._id}
                              name={"mcn" + chantier._id}
                              onClick={(e) => {
                                 changeContent(e, index)
                              }}
                           >
                              <FontAwesomeIcon icon="check" />
                           </button>
                        ) : (
                           <button
                              id={"mcn" + chantier._id}
                              name={"mcn" + chantier._id}
                              onClick={(e) => {
                                 enableModifContent(e, chantier._id)
                              }}
                           >
                              <FontAwesomeIcon icon="pen" />
                           </button>
                        )}
                     </div>
                  </div>
               </div>
               <div className="chantier-bottom">
                  <label className="date-chantier">
                     Date du chantier:
                     <input
                        id={"dat" + chantier._id}
                        name={"dat" + chantier._id}
                        type="date"
                        defaultValue={
                           chantier.chantierDate.substr(0, 4) +
                           "-" +
                           chantier.chantierDate.substr(4, 2) +
                           "-" +
                           chantier.chantierDate.substr(6, 2)
                        }
                        disabled={idDate.includes(chantier._id) ? false : true}
                     />
                     {idDate.includes(chantier._id) ? (
                        <button
                           id={"mdt" + chantier._id}
                           name={"mdt" + chantier._id}
                           onClick={(e) => {
                              changeDate(e, index)
                           }}
                        >
                           <FontAwesomeIcon icon="check" />
                        </button>
                     ) : (
                        <button
                           id={"mdt" + chantier._id}
                           name={"mdt" + chantier._id}
                           onClick={(e) => {
                              enableModifDate(e, chantier._id)
                           }}
                        >
                           <FontAwesomeIcon icon="pen" />
                        </button>
                     )}
                  </label>
                  <button
                     id={"del" + chantier._id}
                     name={"del" + chantier._id}
                     onClick={() => {
                        handleShow(chantier._id, chantier.chantierTitle)
                     }}
                  >
                     Supprimer le chantier
                  </button>
               </div>
            </div>
         ))}

         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Valider la suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Etes-vous sur de bien vouloir supprimer le chantier "
               {nameToDelete}" ?
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Non
               </Button>
               <Button variant="primary" onClick={deleteChantier}>
                  Oui
               </Button>
            </Modal.Footer>
         </Modal>

         <Modal show={showAddForm} onHide={hideAddForm}>
            <form onSubmit={addNewChantier}>
               <Modal.Header closeButton>
                  <Modal.Title>Ajouter un chantier</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <label>
                     Titre du nouveau chantier:
                     <input type="text" name="newsujet" />
                  </label>
                  <label>
                     Contenu du nouveau chantier:
                     <textarea type="date" name="newsujet" />
                  </label>
                  <label>
                     Date du nouveau chantier:
                     <input type="date" name="newsujet" />
                  </label>
                  <label>
                     Image du nouveau chantier:
                     <input type="file" name="newsujet" />
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

export default Chantiers
