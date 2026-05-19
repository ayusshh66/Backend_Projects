import React, { useEffect } from 'react'
import axios from 'axios'
import {useState} from 'react'

function Todo({user}) {
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  const getTodos = async() => {
    try {
      const res = await axios.get('http://localhost:8000/todos/');
      setTodos(res.data);
      console.log(res.data)
    } catch (error) {
      console.error(error.message);
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
                <div className='container bg-pink-300 h-90 rounded-2xl shadow-2xl flex flex-col  items-center gap-6 '>
                    <div className='font-semibold text-xl text-pink-600 mt-15'><span className='text-pink-50 border-b-2 '>{user}</span>  What is in you mind?</div>
                    <form onSubmit={onSubmitHandle}>
                      <div>
                        <input placeholder='Todo' className='h-10 w-sm bg-pink-100 rounded-lg p-4 text-neutral-600 outline-none border-1 border-pink-500'
                         onChange={(e) => setDescription(e.target.value)}
                         value={description}
                         required/>
                        <button className='bg-pink-600 px-4 py-2 rounded-lg felex justify-center items-center text-pink-50 shadow-2xl shadow-pink-500 cursor-pointer hover:scale-105 active:scale-95 -ml-13'>
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
                       <div>
                          {todos.map((todo) => {
                             return (
                               <div key={todo.id}>
                                  <span>{todo.description}</span>
                              </div>
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