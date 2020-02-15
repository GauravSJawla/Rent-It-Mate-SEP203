// import statements for core react packages
import React, { Fragment, useState } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import propTypes from 'prop-types';

//component for Register
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password : '',
        password2 : ''
    });

    const {name,username,email,password,password2} = formData;

    const onChange = (event) =>
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        });

    // On submit event handler
        const onSubmit = (event) => {
            event.preventDefault();
            if(password != password2){
                console.log('Passwords do not match');
            }
            else{
                console.log(username);
                const config = {
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                };
                const body = JSON.stringify({name,username,email,password});
                try{
                    const res = await axios.post('/api/users', body, config).
                                then(console.log(res.formData)); 
                }
                catch(err){
                    const error = err.response.data.errors;
                    if(error){
                        error.forEach(err => console.log(err));
                    }
                }
                return <Redirect to = '/' />;
            }
        };
      
    // html code for register page
        return (
            <Fragment>
                <h2 className='page-title'>Create your Account</h2>
                <form className = 'form' onSubmit = {event => onSubmit(event)}>
                    <div className = 'form-group'>
                            <input type = 'text'
                            placeholder = 'Name'
                            name = 'name' 
                            value = {name}
                            onChange = {e => onChange(e)}
                            required/>
                    </div>
                    <div className = 'form-group'>
                        <input type = 'text'
                        placeholder = 'Username'
                        name = 'name' 
                        value = {name}
                        onChange = {e => onChange(e)}
                        required/>
                    </div>
                    <div className = 'form-group'>
                        <input type = 'email'
                        placeholder = 'Email Id'
                        name = 'email' 
                        value = {email}
                        onChange = {e => onChange(e)}
                        required/>
                    </div>
                    <div className = 'form-group'>
                        <input type = 'password'
                        placeholder = 'Password'
                        name = 'password' 
                        value = {password}
                        onChange = {e => onChange(e)}
                        required/>
                    </div>
                    <div className = 'form-group'>
                        <input type = 'password'
                        placeholder = 'Retype Password'
                        name = 'password2' 
                        value = {password2}
                        onChange = {e => onChange(e)}
                        required/>
                    </div>  
                    <div>
                        <input type = 'submit' className = 'btn btn-primary' value = 'Create your account'/>
                    </div>
                </form>
           </Fragment>
        );
    };
    
export default connect(Register);
    
    