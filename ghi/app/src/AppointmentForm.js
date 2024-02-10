import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([])
    
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        reason: '',
        vin: '',
        customer: '',
        technician: '',
    })

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/'

        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setTechnicians(data.technicians)
        } else {
          alert('An error occurred while fetching the data');
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = 'http://localhost:8080/api/appointments/'


        const date_time = formData.date + ' ' + formData.time
        
        formData["date_time"] = date_time
        
        delete formData.date
        delete formData.time
        
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
                date: '',
                time: '',
                reason: '',
                vin: '',
                customer: '',
                technician: '',
            })
            navigate("/appointments")
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
              <h1>Create an Appointment</h1>
              <form onSubmit={handleSubmit} id="create-appointment-form">
    
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                  <label htmlFor="vin">Automobile VIN</label>
                </div>
    
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.customer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                  <label htmlFor="customer">Customer</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.date} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
                  <label htmlFor="date">Date</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.time} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
                  <label htmlFor="time">Time</label>
                </div>
    
                <div className="mb-3">
                  <select onChange={handleFormChange} value={formData.technician} required name="technician" id="technician" className="form-select">
                    <option value="">Choose a Technician</option>
                    {technicians.map(technician => {
                      return (
                        <option key={technician.employee_id} value={technician.employee_id}>{technician.first_name} { technician.last_name }</option>
                      )
                    })}
                  </select>
                </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                    <label htmlFor="reason">Reason</label>
                    </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      )

}

export default AppointmentForm