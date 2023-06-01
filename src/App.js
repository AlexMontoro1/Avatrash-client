import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signin from './components/auth/Signin';
import Login from './components/auth/Login';
import Error from "./pages/errors/Error.jsx"
import NotFound from './pages/errors/NotFound';
import Profile from './pages/profile/Profile';
import IsPrivate from './components/auth/IsPrivate';
import Navbar from './components/Navbar';



function App() {
  return (
    <div className="App">
      
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/auth/signin' element={<Signin />}/>
        <Route path='/auth/login' element={<Login />}/>
        <Route path='/profile' element={<IsPrivate> <Profile /> </IsPrivate>}/>

        {/* ERROR HANDLERS */}

        <Route path='/error' element={<Error />}/>
        <Route path='*' element={<NotFound />}/>

      </Routes>
    </div>
  );
}

export default App;
