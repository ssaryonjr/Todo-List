import React, {useContext} from 'react'
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import TodoItem from '../Components/TodoItem';
import Modal from '../Components/Modal';
import TodoContext from '../Context/TodoContext';

function MainPage() {
  const allTask = JSON.parse(localStorage.getItem("taskCollection"));
  
  //Global States
  const { showModal, userInput, searchResult } = useContext(TodoContext);

  //Populating data from Local Storage
  const todoCollection = allTask?.map((task) => {
    return (
      <TodoItem 
        title={task?.title}
        key={task?.id}
        id={task?.id}
      />
    )
  })

  const searchedCollection = searchResult?.map((task) => {
    return (
      <TodoItem 
        title={task.title}
        key={task.id}
        id={task.id}
      />
    )
  })

  return (
    <main className="page-container">
      <div className="main-wrapper">
        <NavBar />
        <SearchBar />
        <div className="todo-list-wrapper">
        {userInput ? searchedCollection : todoCollection}
        </div>
        
      </div>
      {showModal && <Modal />}
    </main>
  );
}

export default MainPage