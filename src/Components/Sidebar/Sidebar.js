import React, { useEffect, useRef } from 'react';
import { Typography } from '@material-ui/core';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  BookmarkBorder,
  Create,
  Drafts,
  FiberManualRecord,
  Inbox,
  InsertComment,
  PeopleAlt,
  Apps,
  FileCopy,
  ExpandLess,
  Add,
  ExpandMore,
} from '@material-ui/icons';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import SidebarOption from './SidebarOption';
import { auth, db } from '../../firebase';

const Sidebar = (props) => {
  const [channels] = useCollection(db.collection('rooms'));

  const [user] = useAuthState(auth);

  const dragbar = useRef();
  const sidebarContainer = useRef();

  useEffect(() => {
    dragbar.current.onmouseDown = (e) => {
      document.body.addEventListner('mousemove', resize);
      console.log(e);
    };
  }, []);

  const resize = (e) => {
    sidebarContainer.style.minWidth = e.pageX + 'px';
  };

  return (
    <SidebarContainer ref={sidebarContainer}>
      <SidebarHeader>
        <SidebarInfo>
          <Typography variant="h6" gutterBottom>
            Company Name
          </Typography>
          <Typography variant="body2">
            <FiberManualRecord />
            {user?.displayName}
          </Typography>
        </SidebarInfo>
        <Create />
      </SidebarHeader>

      <SidebarOption Icon={InsertComment} title="Threads" />
      <SidebarOption Icon={Inbox} title="Mentions & Reactions" />
      <SidebarOption Icon={Drafts} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
      <SidebarOption Icon={PeopleAlt} title="People & user groups" />
      <SidebarOption Icon={Apps} title="App" />
      <SidebarOption Icon={FileCopy} title="File browser" />
      <SidebarOption Icon={ExpandLess} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMore} title="Channels" />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title="Add channel" />
      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}

      <DragaBar id="dragbar" ref={dragbar} />
    </SidebarContainer>
  );
};

export default Sidebar;
const DragaBar = styled.div`
  background-color: var(--slack-color-shades1);
  position: absolute;
  width: 4px;
  top: 0;
  right: 0;
  height: 100%;
  bottom: 0;
  :hover {
    cursor: col-resize;
  }
`;
const SidebarContainer = styled.aside`
  position: relative;
  min-width: 265px;
  color: #d4d4d4;
  background-color: var(--slack-color-shades1);
  border-top: 1px solid var(--white2);
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid var(--white2);
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--white2);
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  > :hover {
    opacity: 0.9;
  }
  > .MuiSvgIcon-root {
    padding: 8px;
    font-size: 2.3rem;
    background-color: #fff;
    color: var(--slack-color);
    border-radius: 50%;
    cursor: pointer;
  }
`;
const SidebarInfo = styled.div`
  > .MuiTypography-body2 {
    display: flex;
    align-items: center;
    > .MuiSvgIcon-root {
      font-size: 14px;
      color: #17ad17;
      margin-right: 2px;
    }
  }
`;
