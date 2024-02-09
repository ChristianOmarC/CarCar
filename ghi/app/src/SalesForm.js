import React, { useEffect, useState } from "react";

function SalesForm() {
    const [sales, setSales] = useState([])

    const [formData, setFormData] = useState({
        automobile_vin: '',
        salesperson: '',
        customer: '',
        price: '',
    })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8090/api/sales/'
    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'},
    }

    const response = await fetch(url, fetchConfig)

    if (response.ok) {
      setFormData({
        automobile_vin: '',
        salesperson: '',
        customer: '',
        price: '',
      })
    }
  }

  const handleFormChange = (e) => {
    const inputName = e.target.name
    const value = e.target.value
    setFormData({...formData,[inputName]: value})
}



  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a new sale</h1>
          <form onSubmit={handleSubmit} id="create-sales-form">

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.vin} placeholder="Autombile VIN" required type="text" name="automobile_vin" id="automobile_vin" className="form-control" />
              <label htmlFor="automobile_vin">Autombile VIN</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.salesperson} placeholder="Salesperson" required type="text" name="salesperson" id="salesperson" className="form-control" />
              <label htmlFor="salesperson">Salesperson</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.customer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
              <label htmlFor="customer">Customer</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.price} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
              <label htmlFor="price">Price</label>
            </div>

            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}


export default SalesForm
