import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const patt = new RegExp(/^[a-zA-Z]*$/);
  // const pass = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
  const pass = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
  const [enteredUsername, setEnteredUsername] = useState('');
  const [usernameIsValid, setUsernameIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [error,setError]=useState(false);
  const [errorPass,setErrorPass]=useState(false);
  const history = useHistory()

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
    setFormIsValid(
      patt.test(enteredUsername) && enteredPassword.trim().match(pass)
    );
     };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(
      event.target.value.trim().match(pass) && patt.test(enteredUsername)
    );
   console.log(pass.test(event.target.value))
    
  };

  const validateUsernameHandler = () => {
 
    const res = patt.test(enteredUsername);
    // console.log(res)
    setUsernameIsValid(res);
    if(res){
      setError(false)
    } else {
      setError(true)
      
    }
    // setUsernameIsValid(enteredUsername.includes('@'));
  };

  const validatePasswordHandler = () => {
    if(enteredPassword.trim().match(pass)){
      setErrorPass(false);
    } else {
      setErrorPass(true)
    }
    setPasswordIsValid(enteredPassword.trim().match(pass));
    
  };

  const submitHandler = (event) => {
    event.preventDefault();
    //  console.log(enteredUsername,enteredPassword);
     const res = patt.test(enteredUsername);
        if(!res){
          return setError(true);
        }
        if(res && enteredPassword.trim().length >= 8){
          props.onLogin(enteredUsername, enteredPassword);
    history.push('/dashboard')
        }
    
  };


  return (    
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            usernameIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="username">Username</label>
          <input
          required
            type="username"
            id="user"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            onBlur={validateUsernameHandler}
          />
         
        </div>
        {error && <p style={{color:"red"}}>Please Enter a Valid Username eg:test,TEST,test</p>}
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        {errorPass && <p style={{color:"red"}}>Please Enter alphanumric password minimum 8 characters eg:Testing123</p>}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
