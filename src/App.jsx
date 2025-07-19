import { useEffect, useState, useRef } from 'react'
import Navbar from "./components/Navbar"
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { RiEditLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const inputRef = useRef(true);

  const toggleFinished = ()=>{
    setshowFinished(!showFinished);
  };

  const handleButtonClick = () => {
    if (inputRef) {
      inputRef.current.focus();
    }
  };

  const handlekeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    handleButtonClick();
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLs();
  }
  const handleChange = (e) => {
    setTodo(e.target.value)

  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLs();
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container justify-center flex md:mx-auto my-5 rounded-xl p-5 bg-orange-100 min-h-[80vh] md:w-1/2">
        <div className="box flex flex-col items-center h-[95%] w-[95%]">
          <div className="addTodo min-w-[95%] flex flex-col items-center my-5">
            <h2 className='text-lg font-bold'>Add Todo</h2>
            <div className="inbt text-lg my-5 flex justify-center font-bold">
              <input ref={inputRef} onKeyDown={handlekeyDown} onChange={handleChange} value={todo} type="text " className="w-[21vw]" />
              <button onClick={handleAdd} disabled={todo.length<=4} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm text-white font-bold disabled:bg-violet-500 rounded-md mx-6">Save</button>
            </div>
          </div>
          <div className="toggle"><input type="checkbox" onChange={toggleFinished} checked={showFinished} />Show Finished</div>
          <h2 className='text-xl font-bold'>Your ToDos</h2>
          <div className="todos w-[90%] flex items-center flex-col">
            {todos.length === 0 && <div className='m-5'>No todos to Display</div>}
            {todos.map(item => {
              return (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex w-3/4 justify-between my-3">
                  <div className='flex gap-5'>
                    <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                  <div className="buttons flex h-full">
                    <button onClick={(e) => handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm text-white font-bold rounded-md mx-1"><RiEditLine /></button>
                    <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm text-white font-bold rounded-md mx-1"><MdDeleteForever /></button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
