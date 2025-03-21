// client/src/pages/Categories.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getCategories,
  createCategory,
  deleteCategory,
  reset,
} from '../redux/slices/categorySlice';
import Spinner from '../components/Spinner';

function Categories() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3498db');

  const dispatch = useDispatch();

  const { categories, isLoading, isError, message } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getCategories());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      toast.error('Please enter a category name');
      return;
    }

    dispatch(createCategory({ name, color }));
    setName('');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Categories</h1>
        <p>Manage your expense categories</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="color">Category Color</label>
            <input
              type="color"
              name="color"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Add Category
            </button>
          </div>
        </form>
      </section>

      <section className="content">
        {categories.length > 0 ? (
          <div className="categories">
            {categories.map((category) => (
              <div className="category" key={category._id}>
                <div
                  className="category-color"
                  style={{ backgroundColor: category.color }}
                ></div>
                <h2>{category.name}</h2>
                <button
                  onClick={() => dispatch(deleteCategory(category._id))}
                  className="close"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h3>You have not set any categories</h3>
        )}
      </section>
    </>
  );
}

export default Categories;
