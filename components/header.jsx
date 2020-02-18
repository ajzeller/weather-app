import React from 'react';
import Link from 'next/link';
import Toggler from './toggler'
import styled from 'styled-components'
import LoadingIcon from './loading-icon'


import { useUser } from '../lib/user';

const Nav = styled.nav`
  max-width: ${props => props.theme.theme.contentWidths[0]};
  margin: auto;
  display: flex;
  align-items: center;
  padding: 15px 15px;
  color: ${props => props.theme.theme.text.primary};
  justify-content: space-between;

  a {
    color: ${props => props.theme.theme.text.primary};
  }
`

const StyledHeader = styled.header`
  background-color: ${props => props.theme.theme.bg.primary};
  /* border-bottom: 1px solid #E9E6E9; */
`

const HeaderGroup = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 15px;
  }
`

const ProfileImg = styled.img`
  width: 30px;
  border-radius: 100%;
  display: block;
`

const Header = () => {
  const { user, loading } = useUser();

  return (
    <StyledHeader>
      <Nav>
        <HeaderGroup>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
        </HeaderGroup>
            
        <HeaderGroup>
          {!loading &&
            (user ? (
              <>
                  <a href="/shows">My TV Shows</a>
                  <a href="/api/logout">Logout</a>
                  <Link href="/profile" >
                    <a><ProfileImg src={user.picture} alt="profile-photo"/></a>
                  </Link>
                  
              </>
            ) : (
              <>
                  <a href="/api/login">Login</a>
              </>
            ))}
          <Toggler />
        </HeaderGroup>
      </Nav>

      <style jsx>{`
        header {
        }
        nav {
          max-width: 42rem;
          margin: 10px auto;
          display: flex;
          align-items: center;
          padding: 5px 15px;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:nth-child(2) {
          margin-right: auto;
        }
        a {
          text-decoration: none;
          vertical-align: center;
        }
        button {
          font-size: 1rem;
          color: #fff;
          cursor: pointer;
          border: none;
          background: none;
        }
      `}</style>
    </StyledHeader>
  );
};

export default Header;
