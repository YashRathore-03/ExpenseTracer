// client/src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import Categories from './pages/Categories';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/add-expense' element={<AddExpense />} />
              <Route path='/edit-expense/:id' element={<EditExpense />} />
              <Route path='/categories' element={<Categories />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
