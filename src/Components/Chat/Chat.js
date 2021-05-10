import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { InfoOutlined, StarOutlineOutlined } from '@material-ui/icons';
import { CircularProgress, Divider, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

import { selectRoomId } from '../../features/appSlice';
import { db } from '../../firebase';

import ChatInput from './ChatInput';
import Message from './Message';

const Chat = (props) => {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection('rooms')
        .doc(roomId)
        .collection('message')
        .orderBy('timestamp', 'asc')
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      block: 'start',
    });
  }, [roomId, loading]);

  const channelName = roomDetails?.data().name;

  return (
    <ChatContainer>
      <ChatHeader>
        <div>
          <div>
            <Typography variant="h6">{channelName}</Typography>
            <StarOutlineOutlined />
          </div>
          <div>
            <InfoOutlined />
            <Typography variant="subtitle1">Details</Typography>
          </div>
        </div>
        <Divider />
      </ChatHeader>
      <ChatMessage>
        {loading ? (
          <LoadingChat>
            <CircularProgress />
          </LoadingChat>
        ) : (
          <>
            {roomMessages?.docs.length < 1 && (
              <Typography variant="body1" align="center">
                No Msg to show
              </Typography>
            )}
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}

            <ChatBottom ref={chatRef} />
          </>
        )}
      </ChatMessage>
      <ChatInput
        chatRef={chatRef}
        channelName={channelName}
        channelId={roomId}
      />
    </ChatContainer>
  );
};

export default Chat;

const LoadingChat = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: calc(100vh - 290px);
`;
const ChatBottom = styled.div`
  padding-bottom: 145px;
`;
const ChatContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  position: relative;
`;
const ChatHeader = styled.div`
  position: sticky;
  top: 0;
  > div {
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    padding: 20px;
  }
  > div > div {
    display: flex;
    align-items: center;
    > .MuiSvgIcon-root {
      margin-left: 15px;
      cursor: pointer;
      margin-right: 15px;
    }
  }
`;

const ChatMessage = styled.div``;
