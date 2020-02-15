// import statements for core react packages
import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import propTypes from 'prop-types';

//component for Register
const Register = () => {

    // On submit event handler
        const onsubmit = (event) => {
            if(password != password2){
                console.log('Passwords do not match');
            }
            else{
    
            }
        };
      
    // html code for register page
        return (
            <Fragment>
                <h2 className='page-title'>Create your Account</h2>
                <form className = 'form' onSubmit = {event => onSubmit(event)}>
                    <div className = 'form-group'>
                        <input type = 'text'
                        placeholder = 'Username'
                        name = 'name' 
                        value = {name}
                        required/>
                    </div>
                    <div className = 'form-group'>
                        <input type = 'password'
                        placeholder = 'Password'
                        name = 'password' 
                        value = {password}
                        required/>
                    </div>
                    <div className = 'form-group'>
                        <input type = 'password'
                        placeholder = 'Retype Password'
                        name = 'password2' 
                        value = {password2}
                        required/>
                    </div>
                    <div className = 'form-group'>
                        <input type = 'email'
                        placeholder = 'Email Id'
                        name = 'email' 
                        value = {email}
                        required/>
                    </div>
    
                </form>
            </Fragment>
    
        )
    
    };
    
export default Register;
    
    