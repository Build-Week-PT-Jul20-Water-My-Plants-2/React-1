import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom'

const schema = yup.object().shape({
    username: yup.string()
        .required('Please enter username.')
        .min(2),
    password: yup.string()
        .required('Please enter password.')
        .min(6)
})

const defaultFormState = {
    username: '',
    password: '',
}

const defaultErrorState = {
    username: '',
    password: ''
}


function LoginForm() {

    const [formState, setFormState] = useState(defaultFormState);
    const [errors, setErrors] = useState(defaultErrorState);
    const [isDisabled, setIsDisabled] = useState(true);
    const history = useHistory();

    useEffect(() => {
        schema.isValid(formState).then(valid => setIsDisabled(!valid));
    }, [formState])

    const validate = e => {
        e.persist();
        yup.reach(schema, e.target.name).validate(e.target.value)
            .then(valid => setErrors({ ...errors, [e.target.name]: '' }))
            .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('form Submitted:', formState);
        axios.post("https://watermyplants1.herokuapp.com/api/auth/login", formState)
            .then(res => {
                console.log('res:', res.data);
                setFormState(defaultFormState);
                history.push('/')
            })
            .catch(err => console.log(err));
    }
    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'username' || e.target.name === 'password') {
            validate(e);
        }
    }


    return (
        <FormContainer>
            <header>
                <h1 className='text-center'>Welcome Back!</h1>
            </header>
            <Form className="login-form" onSubmit={handleSubmit}>
                <FormGroup >
                    <Label>Username </Label>
                    <Input type='text' name='username' value={formState.username} onChange={handleChange}></Input>
                    {errors.username.length > 0 && <p style={{ color: 'orange', marginBottom: '-.75rem' }}>{errors.username}</p>}
                    <Label>Password</Label>
                    <Input type='password' name='password' value={formState.password} onChange={handleChange}></Input>
                    {errors.password.length > 0 && <p style={{ color: 'orange', marginBottom: '-.75rem' }}>{errors.password}</p>}
                </FormGroup>
                <Button disabled={isDisabled} className='btn-lg btn-block' type='submit' name='submit' color="success">
                    Login
                </Button>
                <div className='text-center pt-3'>Don't have an account?
                    <a href='/Sign-up'> Sign Up</a>
                </div>
            </Form>
        </FormContainer>
    )
}

const FormContainer = styled.div`
   
`
export default LoginForm;