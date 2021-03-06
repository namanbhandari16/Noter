import React,{useRef,useState} from 'react'
import {Card, Button, Form,Alert,Row,Col} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link,useHistory} from 'react-router-dom'
import loginimg from '../img/login.svg'
function Login(){
    const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    //e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Wrong email or password")
    }

    setLoading(false)
  }
  function handleGuest(){
    emailRef.current.value="guest@guest.com"
    passwordRef.current.value="123456"
    handleSubmit()
  }
    return(<>
        <Row>
          <Col><img src={loginimg} style={{width:'60%', marginTop:'25%'}}/></Col>
          <Col>
          <Card className="w-75 m-4">
            <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit" onClick={handleSubmit}>
              Login
            </Button>
            <Button disabled={loading} className="w-100 mt-3" onClick={handleGuest}>Login from guest account</Button>
            </Form>
            </Card.Body>
        </Card>
        <div className="w=100 text-center m-2">
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>
        </Col>
        </Row>
    </>)
}

export default Login;