import React, { useEffect, useState } from "react";

function SalesForm() {
    const [salespersons, setSalespersons] = useState([])
    const [vins, setVin] = useState([])
    const [customers, setCustomers] = useState([])

    const [formData, setFormData] = useState({
        automobile_vin: '',
        salesperson: '',
        customer: '',
        price: '',
    })

    const fetchVin = async () => {
      const url = 'http://localhost:8100/api/automobiles/'
      const response = await fetch(url)
      if (response.ok) {
          const data = await response.json()
          console.log(data)
          setVin(data.vin)
      }
  }

    const fetchCustomers = async () => {
      const url = 'http://localhost:8090/api/customers/'
      const response = await fetch(url)
      if (response.ok) {
          const data = await response.json()
          console.log(data)

          setCustomers(data.customers)
      }
  }


  const fetchSalespersons = async () => {
    const url = 'http://localhost:8090/api/salespeople/'
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json()
        console.log(data)

        setSalespersons(data.salespersons)
    }
}

    useEffect(() => {
      fetchVin()
    }, [])

    useEffect(() => {
      fetchCustomers()
    }, [])

    useEffect(() => {
        fetchSalespersons()
    }, [])


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

            <div className="mb-3">
                  <select onChange={handleFormChange} value={formData.vin} required name="vin" id="vin" className="form-select">
                    <option value="vin">Choose an automobile vin</option>
                    {vins.map(vin => {
                      return (
                        <option key={vin.id} value={vin.id}>{vin.vin}</option>
                      )
                    })}
                  </select>
                </div>

                <div className="mb-3">
                  <select onChange={handleFormChange} value={formData.customers} required name="customers" id="customers" className="form-select">
                    <option value="customers">Choose a customer</option>
                    {customers.map(customer => {
                      return (
                        <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                      )
                    })}
                  </select>
                </div>

                <div className="mb-3">
                  <select onChange={handleFormChange} value={formData.salesperson} required name="salesperson" id="salesperson" className="form-select">
                    <option value="salesperson">Choose a salesperson</option>
                    {salespersons.map(salesperson => {
                      return (
                        <option key={salesperson.employee_id} value={salesperson.employee_id}>{salesperson.first_name} {salesperson.last_name}</option>
                      )
                    })}
                  </select>
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
