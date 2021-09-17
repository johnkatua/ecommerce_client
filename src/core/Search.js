import React, { useEffect, useState } from 'react';
import { getCategories, list } from './ApiCore';
import Card from './Card';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
  });

  const {categories, category, search, results, searched} = data;

  const loadCategories = () => {
    getCategories()
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          setData({...data, categories: data})
        }
      })
  };

  useEffect(() => {
    loadCategories()
  }, []);

  const searchData = () => {
    if (search) {
      list({search: search || undefined, category: category })
        .then(response => {
          if (response.error) {
            console.log(response.error)
          } else {
            setData({...data, results: response, searched: true})
          }
        })
    }
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (e) => {
    setData({...data, [name]: e.target.value, searched: false})
  };

  const errorMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} Products`
    }
    if (searched && results.length < 1) {
      return `Found No Product`
    }
  }

  const searchedResults = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">
          {errorMessage(searched, results)}
        </h2>

        <div className='row'>
          {results.map((product, idx) => {
            return (
              <Card key={idx} product={product} />
            )
          })}
        </div>
      </div>
    )
  }

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn" onChange={handleChange('category')}>
                <option value="All">All categories</option>
                {categories.map((c, idx) => (
                  <option value={c._id} key={idx}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <input type="search" className="form-control" onChange={handleChange('search')} placeholder='Search by name' />
          </div>
          <div className="btn input-group-append" style={{border: 'none'}}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    )
  }
  return (
    <div className='row'>
      <div className="container mb-3">
        {searchForm()}
      </div>
      <div className="container-fluid mb-3">
        {searchedResults(results)}
      </div>
    </div>
  )
};

export default Search;