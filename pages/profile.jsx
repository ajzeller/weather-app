import React from 'react';
import styled, { css } from 'styled-components'

import auth0 from '../lib/auth0';
import { fetchUser } from '../lib/user';
import { useFetchUser } from '../lib/user';
import Layout from '../components/layout';
import moment from 'moment'

const Panel = styled.div`
  padding: 15px;
  background-color: ${props => props.theme.theme.bg.secondary};
  border-radius: 5px;
  box-shadow: 0 1px 7px 0px rgba(0,0,0,0.1);
`

const ProfileImg = styled.img`
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
`

const Login = styled.span`
  color: ${props => props.theme.theme.text.tertiary};
`

const PanelGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

export default function Profile() {
  const { user, loading } = useFetchUser();
  const login = user && moment(user.updated_at, moment.ISO_8601).format('LLL')
  console.log(login)
  console.log(user)

  return(
    <Layout user={user} loading={loading}>
      { user && (
        <Panel>
          <PanelGroup>
            <ProfileImg src={user.picture} />
            <h3>{user.name}</h3>
          </PanelGroup>
        
          <Login>Last Login: {login}</Login>
        </Panel>
      )}
      
  
      <div>
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      </div>
    </Layout>
  )
};

// Profile.getInitialProps = async ({ req, res }) => {
//   if (typeof window === 'undefined') {
//     const session = await auth0.getSession(req);
//     if (!session || !session.user) {
//       res.writeHead(302, {
//         Location: '/api/login'
//       });
//       res.end();
//       return;
//     }
//     return { user: session.user };
//   }

//   const user = await fetchUser();
//   return { user };
// };

// export default Profile;
