import React from "react"
import {Navbar,Button} from 'react-bootstrap'
import note from '../img/notes.svg'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

function Nav({handleLogout,name}){
    return(<>
    <Navbar fixed="top" className="w-100">
        <Navbar.Brand style={{width:'45%'}}><img src={note} style={{width:'10%'}}/></Navbar.Brand>
        <Navbar.Brand className="w-33 " style={{width:'33%', fontSize:'2rem'}}>Noter App</Navbar.Brand>
        <div className="ml-auto" style={{fontSize:'1.2rem'}}>{name}</div>
        <div className="mr-4 ml-auto" onClick={handleLogout}><ExitToAppIcon style={{color:'#f3594a'}} fontSize="large"/></div>
    </Navbar>
    </>)
}

export default Nav;