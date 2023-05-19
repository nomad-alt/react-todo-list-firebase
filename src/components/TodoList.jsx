import Todo from "./Todo"
import React, {useState, useEffect} from "react"
import { addTodosDB, fetchFromDB, updateTodosDB, deleteTodoDB } from "../db/operation"

function TodoList() {

    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])

    const handleChange = (event) => {
        setInput(event.target.value)

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lägg till toto, både i UI och DB
        addTodo();
        setInput("")
    }

    const addTodo = () => {
        const newTodo = {
            desc: input,
            completed: false
        }
        addTodosDB(newTodo)
        setTodos([...todos, newTodo])

    }

    const editTodo = (id, newDesc) => {
  const newTodos = todos.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        desc: newDesc
      }
    }
    return item
  })
  updateTodosDB(id, {
    desc: newDesc,
  }).then(() => {
    setTodos(newTodos)
  }).catch((error) => {
    console.error(error)
  })
}


    const deleteTodo = (id) => {
        console.log("delete todo")
        const remainingTodos = todos.filter(item => {
            return id !== item.id;
        })
        deleteTodoDB(id)
        setTodos(remainingTodos)

    }
    
   
    useEffect(() => {
        console.log(todos)
        console.log("use effect körs")
        fetchFromDB().then((newTodo) => {
            setTodos(newTodo)
        });
    }, [])


    return(
      <div>
         <h1>My todos</h1>
         <form onSubmit={handleSubmit}>
         <label htmlFor="">Add a todo ...</label>
         <input type="text" onChange={handleChange} value={input}/>
         <button type="submit">Add</button>

         </form>
         <ul>
            {todos.map((item) => {
               return <Todo 
                key={item.id}
                id={item.id}
                desc={item.desc}
                completed={item.completed}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                />
            })}

         </ul>
      </div>
    )
  
  }


export default TodoList