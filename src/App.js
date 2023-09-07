import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoutes from './Routes/ProtectedRoutes'
import Register from './components/Register';
import Profile from './components/Profile';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProtectedRoutesLogin from './Routes/ProtectedRoutesLogin';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='/React-Movie-App' element={<Home />} />
          <Route path='/profile' element={<Profile />} />

        </Route>

        <Route element={<ProtectedRoutesLogin />}>

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
