import React from 'react';
// import { Counter } from './features/counter/Counter';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import Chat from './Components/Chat';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import { CircularProgress } from '@material-ui/core';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <LoadingContent>
          <img
            src="https://miro.medium.com/max/1200/1*ZuWjNCWt2eE4gaWFLFxvbA.png"
            alt="Loading"
          />
          <CircularProgress color="secondary" />
        </LoadingContent>
      </AppLoading>
    );
  }

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  height: 100vh;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  img {
    width: 100%;
    margin-bottom: 25px;
  }
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppBody = styled.section`
  display: flex;
  height: calc(100vh - 56px);
`;
