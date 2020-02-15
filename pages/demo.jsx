import React, {useState, useEffect} from 'react';
import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';
import ListItem from '../components/ListItem'
import ListInput from '../components/ListInput'

const baseUrl = process.env.BASE_URL.replace(/\/+$/, '')

export default function Index( ) {

  const initialTodos = [
    {
      text: 'Finish freeCodeCamp',
      isChecked: true
    },
    {
      text: 'Build a todo-list',
      isChecked: true
    },
    {
      text: 'Implement dark mode',
      isChecked: true
    },
    {
      text: 'Learn Next.js',
      isChecked: false
    },
    {
      text: 'Master React',
      isChecked: false
    }
  ]
  const { user, loading } = useFetchUser();
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState(initialTodos)

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

  const addTodo = () => {
    const newTodo = {
      text: todo,
      isChecked: false
    }

    setTodos( prev => ([...prev, newTodo]) )
    setTodo('')
  }

  const deleteTodo = (index) => {
    setTodos(prev => (
      prev.filter( (item, i) => i !== index )
    ))
  }

  const toggleChecked = (index) => {
    console.log('togglechecked')

    setTodos(prev => (prev.map( (item, i) => {
      if(index == i){
        return{
          ...item,
          isChecked: !item.isChecked
        }
      }
      return item
    })))
  }

  console.log(todos)

  return (
    <Layout user={user} loading={loading}>
        {todos.map( (item, i) => (
        <ListItem 
          key={i} 
          isChecked={item.isChecked} 
          text={item.text} 
          handleDelete={ () => deleteTodo(i) } 
          toggleChecked={ () => toggleChecked(i) }
        /> ))}

        
      <ListInput 
        text={todo} 
        handleChange={handleChange} 
        handleAdd={addTodo} 
        handleClear={() => setTodo('')}
      />
      
      {/* Only show after fetchUser loads */}
    </Layout>
  );
}