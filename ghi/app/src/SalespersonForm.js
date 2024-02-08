import React, { useEffect, useState } from "react";

function SalespersonForm() {
    const [salesperson, setSalesperson] = useState([])

    const [formData, setFormData] = useState({
        employee_id: '',
        first_name: '',
        last_name: '',
    })

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/salespeople/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setSalesperson(data.setsalesperson)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = 'http://localhost:8090/api/salespeople/'
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
                first_name: '',
                last_name: '',
                employee_id: '',
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
          <h1>Add a New Salesperson</h1>
          <form onSubmit={handleSubmit} id="create-salesperson-form">

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
              <label htmlFor="first_name">First Name</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
              <label htmlFor="last_name">Last Name</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.employee_id} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
              <label htmlFor="employee_id">Employee ID</label>
            </div>

            <div className="mb-3">
              <select onChange={handleFormChange} value={formData.salesperson_id} required name="salesperson_id" id="salesperson_id" className="form-select">
                {salesperson.map(salesperson => {
                  return (
                    <option key={salesperson.id} value={salesperson.id}>{salesperson.name}</option>
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


export default SalespersonForm
