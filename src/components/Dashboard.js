import React, { useState, useEffect} from "react"
import { Card, Button, Modal} from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import CreateNodeModal from './modals/CreateNoteModal'
import UpdateNoteModal from './modals/UpdateNoteModal'
import {db} from '../firebase'
import parse from 'html-react-parser'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import Nav from "./Nav";

export default function Dashboard() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState([])
  const [selected,setSelected] = useState({title:'',note:''})
  const [isNoteOpen, setNoteOpen] = useState(false)
  const [isCreateModalOpen, setCreateModal] = useState(false)
  const [isUpdateNoteModal, setUpdateModal] = useState(false)
  const { currentUser, logout } = useAuth()
  const history = useHistory()
    function getNotes(){
      db.collection("notes").where("email","==",currentUser.email).orderBy("timestamp","desc").onSnapshot(function(querySnapshot){
        setNotes(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }))
        );
      })
    }
  
  useEffect(()=>{
      setTimeout(()=>{
          setLoading(false)
      },10)
      getNotes()
  },[])

  function deleteNote(id){
    db.collection('notes').doc(id).delete()
  }
  
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const openCreateModal = () => {setCreateModal(true)}
  const closeCreateModal = () => {setCreateModal(false)}
  const openNote = (id) => {
    setSelected(notes.find(n=>n.id==id))
    setNoteOpen(true)
    console.log(selected)}
  const closeNote = () => {setNoteOpen(false)}
  const openUpdateModal = (id) => { setSelected(notes.find(n=>n.id==id))
    setUpdateModal(true)}
  const closeUpdateModal = () => {setUpdateModal(false)}

if(loading) return <></>
  else return (
    <>
      <Nav handleLogout={handleLogout} name={currentUser.displayName}/>
      <div className="w-100 text-center add">
        <Button onClick={openCreateModal}>
          <AddIcon/>
        </Button>
        {isCreateModalOpen && <CreateNodeModal show={isCreateModalOpen} handleClose={closeCreateModal} currentUser={currentUser}/>}
      </div>

      <div className="notes-grid">
        {notes && notes.map(n=>(<Card className="note" key={n.id}>
        <Card.Body onClick={()=>openNote(n.id)}><strong>{n.title}</strong><br/>{n.note.replace(/<[^>]*>?/gm, ' ').slice(0,20)}</Card.Body>
        <Card.Footer className="note-footer">
        <EditIcon style={{color:'#f3594a'}} fontSize="small" onClick={()=> openUpdateModal(n.id)}/><DeleteIcon style={{color:'#f3594a'}} fontSize="small" onClick={()=>deleteNote(n.id)}/>
        {isUpdateNoteModal && <UpdateNoteModal show={isUpdateNoteModal} handleClose={closeUpdateModal} selected={selected}/>}
        </Card.Footer>
        </Card>))}
        <Modal show={isNoteOpen} onHide={closeNote}>
          <Modal.Header closeButton><Modal.Title>{selected.title}</Modal.Title></Modal.Header>
          <Modal.Body>{parse(selected.note)}</Modal.Body>
        </Modal>
      </div>
    </>
  )
}