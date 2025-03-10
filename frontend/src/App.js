import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Home from './Home';

import Login from './Login/Login';
import SignUp from './Login/SignUp';

import UserPrivateRoute from './Routes/UserPrivateRoute'

import DashBoard from './Pages/DashBoard';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<SignUp />} />
        <Route element={<UserPrivateRoute />}>
          <Route path='/dashboard' element={<DashBoard />} />
        </Route>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
