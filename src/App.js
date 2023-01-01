import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./pages/account/Account";
import Friends from "./pages/friends/Friends";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewFriends from "./pages/newFriends/NewFriends";
import OUserProfile from "./pages/oUserProfile/OUserProfile";
import Register from "./pages/register/Register";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer position='bottom-center' limit={1} />
      <Router>
        <Routes>
          <Route path="/" element={ <Home />}/>
          <Route path="/account" element={ <Account />}/>
          <Route path="/login" element={ <Login />}/>
          <Route path="/register" element={ <Register />}/>
          <Route path="/friends" element={ <Friends />}/>
          <Route path="/user/:id" element={ <OUserProfile />}/>
          <Route path="/add" element={ <NewFriends />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
