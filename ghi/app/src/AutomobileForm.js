import React, { useEffect, useState } from "react";

function AutomobileForm() {
    const [models, setModels] = useState([])

    const [formData, setFormData] = useState({
        color: '',
        year: '',
        vin: '',
        model: '',
    })

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setModels(data.models)
        } else {
          alert('An error occurred while fetching the data');
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = 'http://localhost:8100/api/automobiles/'

        const fetchConfig ={
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(url, fetchConfig)

        if (response.ok) {
            setFormData({
                color: '',
                year: '',
                vin: '',
                model: '',
            })
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
              <h1>Add a New Automobile</h1>
              <form onSubmit={handleSubmit} id="create-automobile-form">

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                  <label htmlFor="color">Color</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.year} placeholder="Year" required type="text" name="year" id="year" className="form-control" />
                  <label htmlFor="year">Year</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                  <label htmlFor="vin">Vin</label>
                </div>

                <div className="mb-3">
                  <select onChange={handleFormChange} value={formData.model_id} required name="model_id" id="model_id" className="form-select">
                    <option value="">Choose a Model</option>
                    {models.map(model => {
                      return (
                        <option key={model.id} value={model.id}>{model.name}</option>
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

export default AutomobileForm
