import React, { useEffect } from 'react'
import axios from 'axios'
import {useState} from 'react'
import {MdModeEditOutline, MdOutlineDone} from 'react-icons/md'
import {FaTrash} from 'react-icons/fa6'
import {IoClose} from 'react-icons/io5'

function Todo({user}) {
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const getTodos = async() => {
    try {
      const res = await axios.get('http://localhost:8000/todos/');
      setTodos(res.data);
      console.log(res.data)
    } catch (error) {
      console.error(error.message);
    }
  }

  const updateTodo = async(id) => {
    try {
      await axios.patch(`http://localhost:8000/todos/${id}`, {
        description : editText,
      })
      
      setEditText('');
      setEditTodo(null);
      getTodos();
    } catch (error) {
      console.error(error.message);
    }
  }

  const deleteTodo = async(id) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`)
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  const onSubmitHandle = async(e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/todos/',{
        description, completed : false,
      });

      setDescription('');
      getTodos()
    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <>
    <div className='body w-full h-full bg-gradient-to-b from-white via-pink-200 to-pink-100 selection:bg-pink-200'>
            <div className='flex justify-center items-center h-screen w-xl mx-auto'>
                <div className='container bg-pink-300 h-180 rounded-2xl shadow-2xl flex flex-col  items-center gap-6 p-4 overflow-y-auto '>
                    <div className='font-semibold text-xl text-pink-600 '><span className='text-pink-50 border-b-2 '>{user}</span>  What is in you mind?</div>
                    <form onSubmit={onSubmitHandle}>
                      <div>
                        <input placeholder='Todo' className='h-10 w-sm bg-pink-100 rounded-lg p-4 text-neutral-600 outline-none border-1 border-pink-500 focus:ring-2 focus:ring-pink-500 duration-200'
                         onChange={(e) => setDescription(e.target.value)}
                         value={description}
                         required/>
                        <button className='bg-pink-600 px-4 py-2 rounded-lg felex justify-center items-center text-pink-50 shadow-2xl shadow-pink-500 cursor-pointer hover:scale-105 active:scale-95 -ml-13 duration-200'>
                          Set
                        </button>
                      </div>
                    </form>
                    <div className='text-black'>
                      {todos.length === 0? (
                        <div>
                          No Todo created!
                        </div>
                      ) : (
                       <>
                       <div className='flex flex-col gap-6 -ml-2'>
                          {todos.map((todo) => {
                             return (
                               <>
                               <div key={todo.id} className='flex flex-col gap-8'>
                                {editTodo === todo.id?(
                                  <>
                                  <div className='flex '>
                                    <div>
                                    <input type='text' className='h-10 w-80 bg-pink-100 rounded-lg p-4 text-neutral-600 outline-none border-1 border-pink-500 focus:ring-2 focus:ring-pink-500 duration-200' 
                                      value={editText} onChange={(e) => setEditText(e.target.value)} />
                                  </div>
                                  <div className='flex ml-3 gap-4'>
                                    <button className='cursor-pointer hover:scale-125 active:scale-95 duration-200' onClick={() => updateTodo(todo.id)}><MdOutlineDone/></button>
                                    <button className='cursor-pointer hover:scale-125 active:scale-95 transition-all duration-200' onClick={() => setEditTodo(null)}><IoClose/></button>
                                  </div>
                                  </div>
                                  </>
                                ):(
                                  <>
                                  <div>
                                    <div  className='flex gap-4'>
                                  <button className={`h-6 w-6 flex justify-center items-center rounded-full cursor-pointer border-2 border-white hover:scale-125 active:scale-95 duration-200
                                     ${todo.completed?"bg-green-500 border-green-500":"border-gray-300 hover:border-blue-500 bg-pink-50"}`}>
                                      {todo.completed && <MdOutlineDone size={16}/>}
                                     </button>
                                  <span className='flex-1'>{todo.description}</span>
                                  <div className='flex gap-4'>
                                    <MdModeEditOutline className='duration-200 cursor-pointer hover:scale-125 active:scale-95' onClick={() => {
                                             setEditTodo(todo.id)
                                      return setEditText(todo.description)
                                    }}/>
                                    <FaTrash onClick={() => deleteTodo(todo.id)} className='cursor-pointer hover:scale-125 active:scale-95 duration-200'/>
                                  </div>
                                </div>
                                  </div>
                                  </>
                                )}
                                
                               </div>
                               </>
                             )
                          })}
                       </div>
                       </>
                      )}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo