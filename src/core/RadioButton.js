import React, { useState } from 'react';

const RadioButton = ({prices, handleFilters}) => {
  const [values, setValues] = useState(0);

  const handleChange = (e) => {
    handleFilters(e.target.value)
    setValues(e.target.value)
  }

  return prices.map((price, idx) => {
    return <div key={idx}>
      <input type="radio" className="m-2" value={`${price._id}`} name={price} onChange={handleChange}/>
      <label className="form-check-label">{price.name}</label>
    </div>
  })
};

export default RadioButton;