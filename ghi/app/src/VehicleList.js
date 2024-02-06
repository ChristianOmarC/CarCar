import React, { useEffect, useState } from "react";

function VehicleList() {
    const [vehicles, setVehicles] = useState([])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/models/')
        if (response.ok) {
            const data = await response.json()
            setVehicles(data.models)
        } else {
          alert('An error occurred fetching the data');
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    async function handleDelete(e) {
        e.preventDefault()
        const id = e.target.dataset.id


        const url = `http://localhost:8100/api/models/${id}/`
        const fetchOption = { method: "DELETE" }
        const response = await fetch(url, fetchOption)
        if (response.ok) {
        fetchData()
        } else {
          alert('An error occurred while deleting the manufacturer');
        }

    }
  if (vehicles === undefined) {
    return null
  }

return (
    <div className="my-5 container">
    <div className="row">
      <h1>Vehicle Models</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
              <th>Manufacturer</th>

            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => {
              return (
              <tr key={vehicle.id}>
                <td>{ vehicle.name }</td>
                <td><img src={ vehicle.picture_url } height={125}/></td>
                <td>{ vehicle.manufacturer.name }</td>
                <td><button className="btn btn-danger" onClick={ handleDelete } data-id={ vehicle.id }>Delete</button></td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
)
}

export default VehicleList
