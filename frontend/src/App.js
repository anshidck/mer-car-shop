import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddCar from './pages/AddCar';
import AdminDashboard from './pages/AdminDashboard';
import Details from './pages/Details';
import SearchPage from './pages/SearchPage';
import EditCar from './pages/EditCar';

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Dashboard/>}/>
        <Route path='/add' element={<AddCar/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/details/:id' element={<Details/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/edit/:id' element={<EditCar/>}/>
      </Routes>
     </Router>

    </>
  );
}

export default App;
