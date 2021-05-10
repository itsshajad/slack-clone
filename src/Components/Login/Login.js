import { Button, Paper, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { auth, provider } from '../../firebase';

const Login = (props) => {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <LoginContainer>
      <Paper>
        <img
          src="https://miro.medium.com/max/1200/1*ZuWjNCWt2eE4gaWFLFxvbA.png"
          alt=""
        />
        <Typography gutterBottom variant="h6">
          Sign in to the slack
        </Typography>
        <Button variant="contained" color="secondary" onClick={signIn}>
          Sign in with google
        </Button>
      </Paper>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  > .MuiPaper-elevation1 {
    min-width: 200px;
    padding: 50px;
    > img {
      width: 100px;
      margin: 8px auto;
      display: block;
    }
  }
`;
