import React, { useEffect, useState } from "react";

function TechnicianForm() {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: '',

    })

    const handleFormChange = (e) => {
        const inputName = e.target.name;
        const value = e.target.value;
        setFormData({...formData,[inputName]:value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = 'http://localhost:8080/api/technicians/'

        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {'Content-Type': 'application/json'},
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

    return (
        <div className="offset-3 col-6">
            <h1 className="card-title">Add a Technician</h1>
              <form onSubmit={handleSubmit} id="create-manufacturer-form">
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.first_name} required type="text" className="form-control" name="first_name" id="first_name" placeholder="First Name"/>
                  <label htmlFor="first_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.last_name} required type="text" className="form-control" name="last_name" id="last_name" placeholder="Last Name"/>
                  <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.employee_id} required type="text" className="form-control" name="employee_id" id="employee_id" placeholder="Employee ID"/>
                  <label htmlFor="employee_id">Employee ID</label>
                </div>
                <button className="btn btn-lg btn-primary">Create</button>
                </form>
            </div>
    );
}

export default TechnicianForm