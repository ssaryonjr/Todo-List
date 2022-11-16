import { createContext, useState } from "react";

const TodoContext = createContext();

export function ChatProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [userInput, setUserInput] = useState(false)
  const [searchResult, setSearchResult] = useState([])

  return (
    <TodoContext.Provider
      value={{
        setShowModal,
        showModal,
        allTasks,
        setAllTasks,
        userInput,
        setUserInput,
        searchResult,
        setSearchResult
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContext;
