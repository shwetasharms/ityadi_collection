import './App.css';
import Login from './admin/login/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import Register from './admin/register/Register';
import Header from './layouts/header/Header';
function App() {
  return (
    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
