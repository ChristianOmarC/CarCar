import React, { useEffect, useState } from 'react';

function VehicleForm() {
    const [manufacturers, setManufacturer] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        picture_url: '',
        manufacturer_id: '',
    })
    
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setManufacturer(data.manufacturers);
        } else {
          alert('An error occurred fetching the data');
        }
      }

      useEffect(()=> {
        fetchData();
      }, []);

      const handleSubmit = async (event) => {
        event.preventDefault();
        
        const url = 'http://localhost:8100/api/models/'
        
        const fetchConfig = {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
        }
    }
    
        const response = await fetch(url, fetchConfig)
        
        if (response.ok) {
          setFormData({
            name: '',
            picture_url: '',
            manufacturer_id: '',
          });
        }
      }

      const handleFormChange = (e) => {
        const inputName = e.target.name
        const value = e.target.value
        
        setFormData({
            ...formData,
            [inputName]: value
    })
    }

      return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a New Vehicle Model</h1>
              <form onSubmit={handleSubmit} id="create-vehicle-model-form">
    
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                  <label htmlFor="name">Model</label>
                </div>
    
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.picture_url} placeholder="Picture" required type="text" name="picture_url" id="picture_url" className="form-control" />
                  <label htmlFor="picture_url">Picture</label>
                </div>
    
                <div className="mb-3">
                  <select onChange={handleFormChange} value={formData.manufacturer_id} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                    <option value="">Choose a Manufacturer</option>
                    {manufacturers.map(manufacturer => {
                      return (
                        <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                      )
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      )
}

export default VehicleForm