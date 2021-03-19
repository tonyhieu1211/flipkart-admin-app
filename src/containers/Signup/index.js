import React, { useEffect, useState } from 'react'
import { Container,Form,Button,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions';
import Layout from '../../components/Layout';
import Input from '../../components/UI/input';

function Signup() {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!user.loading){
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        }
    },[user.loading]);

    const userSignUp = (e) => {
        e.preventDefault();

        const user = {
            firstName, lastName,username, email, password
        }

        console.log(user);
        dispatch(signup(user));
    }

    if(auth.authenticated){
        return <Redirect to = {`/`} />
    }

    if(user.loading){
        return <p>Loading...</p>
    }
    
    return (
        <Layout>
            <Container>
                {user.message}
                <Row style={{marginTop:'50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit = {userSignUp}>
                            <Row>
                                <Col md={6}>
                                    <Input 
                                        label="First name"
                                        placeholder="First name"
                                        value = { firstName }
                                        type="text"
                                        onChange={(e)=> setFirstName(e.target.value) }
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input 
                                        label="Last name"
                                        placeholder="Last name"
                                        value = { lastName }
                                        type="text"
                                        onChange={(e)=> setLastName(e.target.value) }
                                    />
                                </Col>
                            </Row>
                            <Input 
                                label="Username"
                                placeholder="Username"
                                value = { username }
                                type="text"
                                onChange={ (e)=> setUsername(e.target.value) } 
                            />

                            <Input 
                                label="Email"
                                placeholder="Email"
                                value = { email }
                                type="email"
                                onChange={ (e)=> setEmail(e.target.value) } 
                            />

                            <Input
                                label="Password"
                                placeholder="Password"
                                value = { password }
                                type="password"
                                onChange={(e) => setPassword(e.target.value) }
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                
            </Container>
        </Layout>
    )
}

export default Signup
