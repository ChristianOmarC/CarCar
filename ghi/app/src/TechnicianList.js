import React, { useEffect, useState } from "react";

function TechnicianList() {
    const [technicians, setTechnicians] = useState([])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/')
        if (response.ok) {
            const data = await response.json()
            setTechnicians(data.technicians)
        } else {
            alert('An error occured fetching the data')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    async function handleDelete(e) {
        e.preventDefault()
        const id = e.target.dataset.id

        const url = `http://localhost:8080/api/technicians/${id}/`
        const fetchOption = { method: "DELETE" }
        const response = await fetch(url, fetchOption)
        if (response.ok) {
            fetchData()
        } else {
            alert('An error occured while deleting the technician')
        }
    }
if (technicians === undefined) {
    return null
}

return (
    <div className="my-5 container">
    <div className="row">
      <h1>Technicians</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map(technician => {
              return (
              <tr key={technician.employee_id}>
                <td>{ technician.employee_id }</td>
                <td>{ technician.first_name } </td>
                <td>{ technician.last_name }</td>
                <td><button className="btn btn-danger" onClick={ handleDelete } data-id={ technician.id }>Delete</button></td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
)
}

export default TechnicianList