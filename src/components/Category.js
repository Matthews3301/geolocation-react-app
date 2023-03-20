import '../App.css';

function Category({ categoryCallback }) {
  function handleSelect(event) {
    categoryCallback(event.target.value);
  }

  return (
    <select
      name="category"
      id="category"
      defaultValue=""
      onChange={handleSelect}
    >
      <option value="" disabled>
        Select a category
      </option>
      <option value="water">Water</option>
      <option value="snow">Snow</option>
      <option value="field">Field</option>
      <option value="racing">Racing</option>
    </select>
  );
}

export default Category;
