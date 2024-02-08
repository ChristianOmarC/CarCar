import React, { useEffect, useState } from "react";

function SalespeopleList() {
  const [salespeople, setSalespeople] = useState([]);

const fetchData = async () => {
    const response = await fetch('http://localhost:8090/api/salespeople/');
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople);
    } else {
      console.error('An error occurred fetching the data');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(e) {
    e.preventdefault()
    const id = e.target.dataset.id
    const fetchOption = { method:"DELETE" }
    const request = await fetch(`http://localhost:8090/api/salespeople/${id}`, fetchOption)
    if (request.ok){
        const data = await request.json()
    fetchData()
    } else {
      alert('An error occurred while deleting the salesperson');
    }

    return (
      <div className="my-5 container">
        <div className="row">
        <h1>Salespeople</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {salespeople.map(salespeople => {
              return (
                <tr key={salespeople.id}>
                  <td>{salespeople.first_name}</td>
                  <td>{salespeople.last_name}</td>
                  <td><button onClick={handleDelete} data-id={salespeople.id} className='btn btn-danger'>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}
export default SalespeopleList;



















