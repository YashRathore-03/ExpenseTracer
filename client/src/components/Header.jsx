import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/slices/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Expense Tracker</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to='/'>Dashboard</Link>
            </li>
            <li>
              <Link to='/add-expense'>Add Expense</Link>
            </li>
            <li>
              <Link to='/categories'>Categories</Link>
            </li>
            <li>
              <button className='btn' onClick={onLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
