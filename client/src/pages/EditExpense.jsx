// client/src/pages/EditExpense.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getExpenses, updateExpense, reset } from '../redux/slices/expenseSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Spinner from '../components/Spinner';

function EditExpense() {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: new Date(),
  });

  const { title, amount, category, description, date } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { expenses, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.expenses
  );

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/');
    }

    if (expenses.length > 0) {
      const expenseToEdit = expenses.find((expense) => expense._id === id);
      
      if (expenseToEdit) {
        setFormData({
          title: expenseToEdit.title,
          amount: expenseToEdit.amount.toString(),
          category: expenseToEdit.category,
          description: expenseToEdit.description || '',
          date: new Date(expenseToEdit.date),
        });
      } else {
        navigate('/');
        toast.error('Expense not found');
      }
    }
  }, [id, expenses, isError, isSuccess, navigate, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    dispatch(updateExpense({ id, expenseData }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Edit Expense</h1>
        <p>Update your expense details</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={onChange}
              placeholder="Expense title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={onChange}
              placeholder="Expense amount"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={onChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setFormData({ ...formData, date })}
              dateFormat="MMMM d, yyyy"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={onChange}
              placeholder="Add any additional details"
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Update Expense
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditExpense;
