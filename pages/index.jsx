import React, {useState} from 'react';

import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';

export default function Home() {
  const { user, loading } = useFetchUser();
  const [inputText, setInputText] = useState('')

  const handleChange = (e) => {
    setInputText(e.target.value)
  }

  // example GET request
  const addUser = async () => {
    const res = await fetch('http://localhost:3000/api/mongotest', {
      method: 'post',
      body: JSON.stringify({
        inputText
      })
    })
  }

  return (
    <Layout user={user} loading={loading}>
      <h1>Next.js Boilerplate</h1>
      <p>With Auth0, MongoDB, Styled Components, Dark Mode</p>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
          <p>
            To test the login click in <i>Login</i>
          </p>
          <p>
            Once you have logged in you should be able to click in <i>Profile</i> and <i>Logout</i>
          </p>
        </>
      )}

      <hr />

      {user && (
        <>
          <h2>User Info (client rendered)</h2>
          <p></p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
      <input type="text" 
      value={inputText} 
      onChange={handleChange} 
      placeholder='type new todo item here' 
      required></input>
      <button onClick={addUser}>Add user</button>
    </Layout>
  );
}
