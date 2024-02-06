import React, { useEffect, useState } from 'react';

function ManufacturerForm() {

  const [formData, setFormData] = useState({
    name: '',
  })

  const handleFormChange = (event) => {
    const inputName = event.target.name;
    const value = event.target.value;
    setFormData({...formData,[inputName]:value});
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:8100/api/manufacturers/';
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'},
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFormData({
        name: ''
      });
    }
  }

  return (
      <div className="offset-3 col-6">
          <h1 className="card-title">New Manufacturer</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.name} required type="text" className="form-control" name="name" id="name" placeholder="name"/>
                <label htmlFor="name">Name</label>
              </div>
              <button className="btn btn-lg btn-primary">Create</button>
              </form>
          </div>
  );
}

export default ManufacturerForm;