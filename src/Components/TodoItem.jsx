import React, {useState, useContext} from 'react'
import TodoContext from '../Context/TodoContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";


function TodoItem(props) {
  const [completed, setCompleted] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState(props.title)
  const {setAllTasks, allTasks} = useContext(TodoContext)

  const taskCollection = JSON.parse(localStorage.getItem("taskCollection"));

  const deleteTask = (taskId) => {
    console.log(taskCollection)
    const deleted = taskCollection.filter((t) => t.id !== taskId);
    setAllTasks(deleted);
    localStorage.setItem("taskCollection", JSON.stringify(deleted));
  }

  const updateTask = () => {
    console.log(taskCollection)

    //Find index and update it in Local storage.
    const index = taskCollection.findIndex(obj => {
      return obj.id === props.id
    })

    const updatedTask = taskCollection[index].title = updatedTitle

    console.log(index)
    setAllTasks([...allTasks, updatedTask])
    localStorage.setItem(
      "taskCollection",
      JSON.stringify([...allTasks, updateTask])
    );

    setEditMode(false)
  }

  return (
    <div
      className="todo-item-container"
      style={completed ? {
              opacity: "0.45",
              borderLeft: "1px solid #00000020",
            } : {}}
            >
      <input
        type="checkbox"
        name="checkbox"
        className="todo-checkbox"
        onClick={() => setCompleted((prev) => !prev)}
        style={completed ? { marginLeft: "7px" } : {}}
      />
      <div className="todo-desc-wrapper">
        {editMode
          ? <input
            type="text"
            className='edit-task-input'
            value={updatedTitle}
            onChange={(e)=> setUpdatedTitle(e.target.value)}
            />
          : <h5 className="todo-title">{props.title}</h5>}
      </div>

 
      {editMode
        ? <button
            className='task-edit-btn'
            onClick={updateTask}
            >
            Save
          </button>
        : <>
            <FontAwesomeIcon
            icon={faPencil}
            className="modify-icon"
            onClick={()=> setEditMode(true)}
          />
            <FontAwesomeIcon
            icon={faTrash}
            id={props.id}
            className="modify-icon"
            onClick={()=> deleteTask(props.id)}
          />
        </>}
      

      
    </div>
  );
}

export default TodoItem