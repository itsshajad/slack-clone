import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import { db } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../../../features/appSlice';

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
  const dispatch = useDispatch();
  const addChannelHandler = () => {
    const channelName = prompt('Enter Your Channel Name');

    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
      });
    }
  };
  const selectChannelHandler = () => {
    if (id) {
      dispatch(enterRoom({ roomId: id }));
    }
  };
  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannelHandler : selectChannelHandler}
    >
      {Icon && <Icon fontSize="small" style={{ marginRight: '10px' }} />}
      {Icon ? (
        <Typography variant="body1">{title}</Typography>
      ) : (
        <SidebarOptionChannel variant="body1">
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  min-height: 40px;
  padding: 6px 10px;
  user-select: none;
  :hover {
    opacity: 0.9;
    background-color: var(--slack-color);
  }
`;
const SidebarOptionChannel = styled(Typography)`
  padding: 3px 0;
  > span {
    padding: 10px;
  }
`;
