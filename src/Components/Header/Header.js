import React from 'react';
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { AccessTime, HelpOutline, Search } from '@material-ui/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const Header = (props) => {
  const [user] = useAuthState(auth);

  console.log(user);

  return (
    <HeaderContainer>
      {/* header left */}
      <HeaderLeft>
        <UserAvatar
          onClick={() => auth.signOut()}
          src={user?.photoURL}
          alt={user?.displayName}
        />
        <AccessTime />
      </HeaderLeft>

      {/* header search */}
      <HeaderSearch>
        <Search />
        <input type="text" placeholder="Search Company" />
      </HeaderSearch>

      {/* header right */}
      <HeaderRight>
        <HelpOutline />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: var(--slack-color);
  color: var(--white);
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  flex: 0.3;
  > .MuiSvgIcon-root {
    cursor: pointer;
  }
`;
const HeaderSearch = styled.div`
  flex: 0.4;
  display: flex;
  align-items: center;
  padding: 5px 15px;
  border-radius: 4px;
  background-color: #330e33;
  border: 1px solid #aba5ab;
  > input {
    background-color: transparent;
    color: var(--white);
    outline: none;
    max-width: 30vh;
    text-align: center;
    width: 100%;
    border: none;
  }
`;
const HeaderRight = styled.div`
  flex: 0.3;
  > .MuiSvgIcon-root {
    display: block;
    margin-left: auto;
    margin-right: 15px;
    cursor: pointer;
  }
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
