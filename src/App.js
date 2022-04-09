import { Route, Routes } from "react-router-dom";
import './App.css';
import LayOut from './Components/layout/LayOut';
import Login from './Components/login/Login.jsx';
import Home from './Components/pages/Home/Home.jsx';
import Quiz from "./Components/pages/quiz/Quiz";
import Result from './Components/pages/result/Result';
import PrivateOutlet from "./Components/privateOutlet/PrivateOutlet";
import SignUp from './Components/signup/SignUp.jsx';
import AuthContextProvider from "./context/AuthContext";

function App() {

  return (
    <AuthContextProvider>
      <LayOut>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<PrivateOutlet />} >
            <Route path="quiz/:id" element={<Quiz />} />
            <Route path="result/:id" element={<Result />} />
          </Route>

        </Routes>
      </LayOut>
    </AuthContextProvider>
  );
}

export default App;
