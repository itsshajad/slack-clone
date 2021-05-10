import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Message = ({ message, timestamp, user, userImage }) => {
  const [notImg, setNotImg] = useState(true);
  const checkState = (e, s) => {
    setNotImg(s);
  };
  return (
    <MessageContainer>
      {notImg && (
        <img
          onError={() => checkState(this, false)}
          src={userImage}
          alt={user}
        />
      )}
      <div>
        <Typography variant="subtitle1">
          {user}{' '}
          <Typography variant="caption">
            {' '}
            {new Date(timestamp?.toDate()).toUTCString()}
          </Typography>
        </Typography>
        <Typography variant="body2">{message}</Typography>
      </div>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  > div {
    padding-left: 15px;
  }
  > img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 8px;
    overflow: hidden;
  }
`;
