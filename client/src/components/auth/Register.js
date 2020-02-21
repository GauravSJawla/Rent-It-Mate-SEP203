
//import statements from core packages
import React,{Fragment, useState} from 'react';
import Redirect from 'react-router-dom';
import propTypes from 'prop-types';

//Component for Register
const Register = (register, isAuthenticated) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password : '',
        password2 : ''
    });

    const {name,username,email,password,password2} = formData;

    //OnChange event Handler
    const onChange = (event) =>
        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        });

    // On submit event handler
    const onSubmit = (event) => {
        event.preventDefault();
        if(password != password2){
            alert('Passwords do not match');
            console.log('Passwords do not match');
        }
        else{
            console.log(username);
            register({name,username,email,password});
        }
    };

    if(isAuthenticated){
        return <Redirect to ='/'/>;
    }


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

export default Register;