import React, { useContext, useState, useEffect } from "react";
import TodoContext from "../Context/TodoContext";

function Modal() {
  const { setShowModal, allTasks, setAllTasks } = useContext(TodoContext);
  const [task, setTask] = useState("");
  const [errMsg, setErrMsg] = useState(false)

   useEffect(() => {
     if (localStorage.getItem("taskCollection")) {
       const collection = JSON.parse(localStorage.getItem("taskCollection"));
       setAllTasks(collection);
     }
   }, []);

  const addTask = (e) => {
    e.preventDefault()
    
    //Validates input is not empty & is not too long.
    if (task.length < 1 || task.length > 25) {
      return setErrMsg(true)
    } else {
      setErrMsg(false)
      const newTask = { id: new Date().getTime().toString(), title: task };

      setAllTasks([...allTasks, newTask]);
      localStorage.setItem(
        "taskCollection",
        JSON.stringify([...allTasks, newTask])
      );


      setTask("")
      setShowModal(false)
    }
   };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-btn"
          onClick={() => setShowModal((prev) => !prev)}
        >
          X
        </button>

        <form onSubmit={addTask} className="modal-form">
          <label htmlFor="title" className="form-label-title">
            New Task:
          </label>
          <input
            type="text"
            name="task"
            placeholder="Enter a task"
            className="new-task-title"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="new-task-btn-submit">Save</button>
          {errMsg &&<p className="input-error">
            Task must be between 1 and 25 characters.
          </p>}
        </form>
      </div>
    </div>
  );
}

export default Modal;
