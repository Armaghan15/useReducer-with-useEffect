import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// Reducer for emailState
const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return {
        value: action.enteredValue,
        isValid: action.enteredValue.includes("@"),
      };

    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.includes("@") };

    default:
      return { value: "", isValid: false };
  }
};

// Reducer for passwordState
const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return {
        value: action.enteredValue,
        isValid: action.enteredValue.trim().length > 6,
      };

    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.trim().length > 6 };

    default:
      return { value: "", isValid: false };
  }
};

// The Login Component
const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  // useReducer for email
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  // useReducer for password
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // Extracting isValid from the emailState and giving it a new name, emailIsValid
  const { isValid: emailIsValid } = emailState;

  // Extracting isValid from the passwordState and giving it a new name, passwordIsValid
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  // Method for Changing the state of enteredEmail and validating the form via the entered Email and enteredPassword State
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", enteredValue: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.value.trim().length > 6
    // );
  };

  // Method for Changing the state of enteredPassword and validating the via the entered password and enteredEmail state
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", enteredValue: event.target.value });

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.value.includes("@")
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
