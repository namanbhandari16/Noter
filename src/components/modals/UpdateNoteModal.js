import React,{useState} from "react"
import {Modal,Form,Button} from "react-bootstrap"
import ReactQuill from 'react-quill'
import {db} from '../../firebase'

function UpdateNoteModal({show,handleClose,selected}){
    const [title, setTitle] = useState(selected.title)
    const [note,setNote] = useState(selected.note)
    function handleSubmit(){
        db.collection('notes').doc(selected.id).update({title:title,note:note})
        handleClose()
    }
    return(<>
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Update Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                <Form.Control type="text" value={title} placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                <ReactQuill value={note} onChange={(e)=> setNote(e)}/>
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default UpdateNoteModal;