import React,{useRef,useState} from 'react'
import {Card, Button, Form,Alert,Row,Col} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'
import notes from '../img/notes.svg'

function Signup(){
    const emailRef = useRef()
    const nameRef=useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
        }
        else if(passwordRef.current.value.length<6){
          return setError("Password should be of 6 or more characters")
        }

        try {
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value)
        .then(e=>{setError(e)
        if(!e) history.push("/")})
        
        } catch {
        setError("Failed to create an account")
        }
        if(!error)
        {console.log('qwertrtttttttttt')}
        setLoading(false)
    }

    return(<>
        <Row>
        <Col><img src={notes} style={{width:'60%',marginTop:'25%'}}/></Col>
        <Col>
        <Card className="w-75 m-4">
            <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
            </Form>
            </Card.Body>
        </Card>
        <div className="w-75 text-center m-4">
            Already have an account? <Link to="login">Log In</Link>
        </div>
        </Col>
        </Row>
    </>)
}

export default Signup;