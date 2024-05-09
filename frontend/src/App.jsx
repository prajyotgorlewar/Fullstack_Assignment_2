import React from 'react'
import {BrowserRouter,Routes,Route } from "react-router-dom"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Navbar from './components/Navbar'
import Logout from './pages/logout/Logout'
import Footer from './components/Footer'
import ViewUsers from './pages/user/ViewUsers'
import AddUser from './pages/user/AddUser'
import AdminUpdateUser from './pages/user/Admin-Update-User'
import AddPost from './pages/post/AddPost'
import Error from "./pages/error/Error"
import ViewPost from './pages/post/ViewPost'
import YourPosts from './pages/post/YourPosts'
import AdminUpdatePost from './pages/post/Admin-Update-Post'

function App() {

  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewPost/:id" element={<ViewPost />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin/viewUsers" element={<ViewUsers />} />
          <Route path="/admin/adduser" element={<AddUser />} />
          <Route path="/admin/viewUsers/editUser/:id" element={<AdminUpdateUser />} />
          <Route path="/admin/addPost" element={<AddPost />} />


          <Route path="/admin/yourPosts" element={<YourPosts />} />
          <Route path="/admin/yourPosts/editPost/:id" element={<AdminUpdatePost />} />



          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />

        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
