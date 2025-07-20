import { useState } from 'react';
import '../components/ItemCategory/ItemCategory.css';

const initialCategories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Furniture' },
  { id: 3, name: 'Stationery' },
];

const ItemCategory = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      setError('Category name is required');
      return;
    }
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.trim().toLowerCase())) {
      setError('Category already exists');
      return;
    }
    setCategories([
      ...categories,
      { id: Date.now(), name: newCategory.trim() }
    ]);
    setNewCategory('');
    setError('');
  };

  return (
    <div className="item-category-container">
      <h2>Item Categories</h2>
      <form onSubmit={handleAddCategory} className="category-form">
        <input
          type="text"
          className="form-control"
          placeholder="Add new category"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ms-2">Add</button>
      </form>
      {error && <div className="text-danger mt-2">{error}</div>}
      <ul className="list-group mt-4">
        {categories.map(cat => (
          <li key={cat.id} className="list-group-item">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemCategory;
