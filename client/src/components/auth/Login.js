import React,{Fragment , useState} from 'react';
import {connect} from 'react-redux';
import {Redirect , Link } from 'react-router-dom';
import propTypes from 'prop-types';


//Import login from other component
import {login} from '../../actions/auth';


const Login = ({login , isAuthenticated}) => {
    const [formData , setFormData] = useState ({
        username :'',
        password:''
    });

    const { username , password} = formData;

    //OnChange event Handler
    const onChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });

    // On submit event handler
    const onSubmit = (e) => {
        e.preventDefault();
        if(username == null){
            alert('Username is not there');
        }
        else{
            login({username,password});
        }
    };

    if(isAuthenticated){
        return <Redirect to ='/login'/>;
    };
    return(
        <Fragment>
           <div>
           <form className= 'form' onSubmit = {e => onSubmit(e)}>
           <div className = 'form-group'>
                            <input type = 'text'
                            placeholder = 'Username'
                            name = 'username' 
                            value = {username}
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
                <input type="submit" className = 'btn btn-primary 'value="Login" />
                <Link to='/register'>
                Sign Up ?
                </Link>
                </form>
           </div>
        </Fragment>
    )
}

Login.propTypes = {
    login : propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { login }
  )(Login);