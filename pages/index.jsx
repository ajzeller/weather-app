import React, {useState, useEffect} from 'react';
import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';
import ListItem from '../components/ListItem'
import ListInput from '../components/ListInput'
import Link from 'next/link';
import styled, { css } from 'styled-components'

const baseUrl = process.env.BASE_URL.replace(/\/+$/, '')

const LinkStyled = styled.a`
  color: ${props => props.theme.theme.text.primary};
  text-decoration: none;
  border-bottom: 3px solid ${props => props.theme.theme.bg.primary};
  font-weight: ${props => props.theme.theme.fontWeights.link};
  &:hover {cursor: pointer;}
`

export default function Index( {data} ) {
  const { user, loading } = useFetchUser();
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState( [ ] )
  const [todosLoaded, setTodosLoaded] = useState(false)

  console.log(`loading: ${loading}`)

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  useEffect(() => {
    if(user){
      console.log('useEffect')
      getTodos()
    }
    
  }, [user] )

  // todos

  const getTodos = async () => {
    const res = await fetch(baseUrl + '/api/todos')
    const json = await res.json()
    console.log(`getTodos: ${json}`)
    setTodos(json)
    setTodosLoaded(true)
  }

  const addTodo = async () => {
    const res = await fetch(baseUrl + '/api/todos', {
      method: 'post',
      body: JSON.stringify({
        text: todo
      })
    })
    const get = await getTodos()
    setTodo('')
  }

  const deleteTodo = async (id) => {
    const res = await fetch(baseUrl + '/api/todos', {
      method: 'delete',
      body: JSON.stringify({_id: id})
    })
    const get = await getTodos()
  }

  const toggleChecked = async (id) => {
    console.log('toggleChecked')
    const todoItem = todos.find( item => item._id == id)
    const res = await fetch(baseUrl + '/api/todos', {
      method: 'put',
      body: JSON.stringify( todoItem )
    })
    const get = await getTodos()
  }

  console.log(todos)
  // console.log(user)

  return (
    <Layout user={user} loading={loading}>
      { todosLoaded &&
        todos.map( item => (
        <ListItem 
          key={item._id} 
          isChecked={item.isChecked} 
          text={item.text} 
          handleDelete={ () => deleteTodo(item._id) } 
          toggleChecked={ () => toggleChecked(item._id) }
        /> ))

        }
      {todosLoaded && <ListInput 
        text={todo} 
        handleChange={handleChange} 
        handleAdd={addTodo} 
        handleClear={() => setTodo('')}
      />}

      {/* Only show after fetchUser loads */}
      {!user && !loading && 
      <p><LinkStyled href='/api/login'>Login</LinkStyled> to make your own list or try the <Link href="/demo">
  <LinkStyled>demo</LinkStyled>
</Link></p>}
    </Layout>
  );
}

// Index.getInitialProps = async () => {
//   const res = await fetch(baseUrl + '/api/todos')
//   const json = await res.json() 
//   console.log(`initialProps: ${JSON.stringify(json)}`)
//   return { data: json }
// }