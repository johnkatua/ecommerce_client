import React, { useState } from 'react';

const Checkbox = ({categories, handleFilters}) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = category => () => {
    // return 1st index or -1
    const currentCategoryId = checked.indexOf(category);
    const newCheckedCategoryId = [...checked];
    // push the currently checked category if it was not checked before
    // else take it off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(category);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  }
  return categories.map((category, idx) => {
    return <li className='list-unstyled' key={idx}>
      <input onChange={handleToggle(category._id)} value={checked.indexOf(category._id === -1)} type="checkbox" className="form-check-input" />
      <label className="form-check-label">{category.name}</label>
    </li>
  }) 
};

export default Checkbox;