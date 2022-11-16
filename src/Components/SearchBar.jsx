import React, {useContext, useState} from 'react'
import TodoContext from '../Context/TodoContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";


function SearchBar() {
  //Global State
  const { setShowModal, setUserInput, setSearchResult } = useContext(TodoContext);
  const [searchInput, setSearchInput] = useState('')
  const allTask = JSON.parse(localStorage.getItem("taskCollection"));

  const searchResult = (input) => {
    if (input !== '') {
      setUserInput(true)
    } else {
      setUserInput(false)
    }
    
    setSearchInput(input)
    console.log(input)
    const matchedResult = allTask.filter((t) => t.title.toLowerCase().includes(input.toLowerCase()))
    console.log(matchedResult)
    setSearchResult(matchedResult)
  }
  return (
    <div className="search-container">
      <span className="search-icon">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <input
        type="text"
        className="search-input"
        placeholder="Search a task.."
        value={searchInput}
        onChange={(e)=> searchResult(e.target.value)}
      />
      <button
        className='new-task-btn'
        onClick={()=> setShowModal(prev => !prev)}
      >
        New Task
      </button>
    </div>
  );
}

export default SearchBar