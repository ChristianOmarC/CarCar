import React, { useEffect, useState } from "react";

function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/')
        if (response.ok) {
            const data = await response.json()
            setAutomobiles(data.autos)
        } else {
          alert('An error occurred while fetching the data');
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    async function handleDelete(e) {
        const id = e.target.dataset.id

        const fetchOption = { method:"DELETE" }
        const request = await fetch(`http://localhost:8100/api/automobiles/${id}`, fetchOption)
        if (request.ok){
            const data = await request.json()
        fetchData()
        } else {
          alert('An error occurred while deleting the automobile');
        }
    }
    return (
        <div className="my-5 container">
        <div className="row">
          <h1>Automobiles</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Vin</th>
                  <th>Color</th>
                  <th>Year</th>
                  <th>Model</th>
                  <th>Manufacturer</th>
                  <th>Sold</th>
                </tr>
              </thead>
              <tbody>
                {automobiles.map(automobile => {
                  return (
                  <tr key={automobile.id}>
                    <td>{ automobile.vin }</td>
                    <td>{ automobile.color }</td>
                    <td>{ automobile.year }</td>
                    <td>{ automobile.model.name }</td>
                    <td>{ automobile.model.manufacturer.name }</td>
                    <td><button className="btn btn-danger" onClick={ handleDelete } data-id={ automobile.vin }>Delete</button></td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        )
}
export default AutomobileList