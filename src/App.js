import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blog from './components//Blog.js';
import SignUp from './components/SignUp.js';
import Signin from './components/Signin.js';
import ProtectedRoute from './components/ProtectedRoute.js'
import CreatePost from './components/CreatePost.js';

import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
      <Route path="/createpost" element={<ProtectedRoute><CreatePost/></ProtectedRoute>} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<Signin />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
