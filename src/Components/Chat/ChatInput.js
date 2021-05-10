import React, { useRef, useState } from 'react';
import firebase from 'firebase';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }
    input &&
      db.collection('rooms').doc(channelId).collection('message').add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user?.displayName,
        userImage: user?.photoURL,
      });

    chatRef?.current?.scrollIntoView({
      block: 'start',
    });

    setInput('');
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          ref={inputRef}
          type="text"
          placeholder={`Message ${channelName}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button disableTouchRipple hidden type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;
const ChatInputContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  max-width: calc(100% - 265px);
  width: 100%;
  z-index: 1;
  background-color: #fff;
  padding: 20px;
  > form {
    border: 1px solid rgb(0 0 0 / 26%);
    display: flex;
    border-radius: 8px;
    > input {
      outline: none;
      border: none;
      margin-left: 15px;
      width: 100%;
    }
  }
`;
