import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Error from "./pages/errors/Error.jsx"
import NotFound from './pages/errors/NotFound';
import Profile from './pages/profile/Profile';
import IsPrivate from './components/auth/IsPrivate';
import Navbar from './components/Navbar';
import AvatarCreate from './pages/avatar/AvatarCreate';
import EditProfile from './pages/profile/EditProfile';
import AvatarDetails from './pages/avatar/AvatarDetails';
import AvatarEdit from './pages/avatar/AvatarEdit';



function App() {
  return (
    <div className="App">
      
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/profile' element={<IsPrivate> <Profile /> </IsPrivate>}/>
        <Route path='/avatar/create' element={<IsPrivate> <AvatarCreate /> </IsPrivate>} />
        <Route path='/profile/edit' element={<IsPrivate> <EditProfile /> </IsPrivate>}/>
        <Route path="/avatar/:avatarId" element={<IsPrivate> <AvatarDetails /> </IsPrivate> }/>
        <Route path="/avatar/:avatarId/edit" element={<IsPrivate> <AvatarEdit /> </IsPrivate> }/>

        {/* ERROR HANDLERS */}

        <Route path='/error' element={<Error />}/>
        <Route path='*' element={<NotFound />}/>

      </Routes>
    </div>
  );
}

export default App;
