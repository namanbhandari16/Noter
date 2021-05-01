import React, {Component} from "react"
import {Modal, Button, Form} from "react-bootstrap"
import firebase from 'firebase'
import {db} from '../../firebase'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

class CreateNoteModal extends Component{
    constructor(props){
        super(props)
        this.state={
            title:null,
            note:null
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(){
        if(this.state.title && this.state.title.length>0){
            if(this.state.note && this.state.note.length>0){
            db.collection("notes").add({
                email:this.props.currentUser.email,
                title:this.state.title,
                note:this.state.note,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            })
        }}
        this.props.handleClose()
    }
    render(){
        return(<>
        <Modal size="lg" backdrop="static" show={this.props.show} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> Create a Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group>
                <Form.Control type="text" placeholder="Title" onChange={(e)=>this.setState({title:e.target.value})}/>
                </Form.Group>
                <Form.Group>
                {/*<Form.Control type="text" placeholder="Note" onChange={(e)=>this.setState({note:e.target.value})}/>*/}
                <ReactQuill onChange={(e)=> this.setState({note:e})}/>
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.handleClose}>Cancel</Button>
                <Button onClick={this.handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
        </>)
    }
}

export default CreateNoteModal