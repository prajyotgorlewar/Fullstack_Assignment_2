import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/pages/Home';
import SideBarNav from './shared/components/SideBarNav';
import Register from './admin/users/pages/Register';


function App() {

  return (
    <div className='flex'>
        <Router>
        <SideBarNav/>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/register" element={<Register />}/>
          </Routes>
        </Router>
    </div>

  )
}

export default App;