import React from 'react';
import Head from 'next/head';
import styled from 'styled-components'

import Header from './header';
import { UserProvider } from '../lib/user';

const Main = styled.main`
  color: ${props => props.theme.theme.text.primary};
  background-color: ${props => props.theme.theme.bg.secondary};
  margin: 0;
  padding: 10px 10px 0 10px;
  min-height: calc(100vh - 70px);
`

const Content = styled.div`
  max-width: ${props => props.theme.theme.contentWidths[0]};
  margin: auto;
`

const Layout = ({ user, loading = false, children }) => (
  <UserProvider value={{ user, loading }}>
    <Head>
      <title>Next.js with Auth0</title>
    </Head>

    <Header />

    <Main>
      <Content >{children}</Content>
    </Main>

    <style jsx>{`
      .container {
        max-width: 42rem;
        margin: 1.5rem auto;
      }
    `}</style>
    <style jsx global>{`
      body {
        margin: 0;
        color: #333;
      }
    `}</style>
  </UserProvider>
);

export default Layout;
