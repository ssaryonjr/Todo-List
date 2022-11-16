import { Routes, Route } from "react-router-dom";
import { ChatProvider } from "./Context/TodoContext";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage";

function App() {
  return (
    <div className="App">
      <ChatProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<MainPage />} />
        </Routes>
      </ChatProvider>  
    </div>
  );
}

export default App;
