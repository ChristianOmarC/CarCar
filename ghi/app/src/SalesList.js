import { useState, useEffect } from "react";

function SalesList() {
  const [sales, setSales] = useState([]);

  const fetchData = async () => {
    const response = await fetch('http://localhost:8090/api/sales/');
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales);
    } else {
      console.error('An error occurred fetching the data');
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault()
    const id = event.target.dataset.id
    const url = `http://localhost:8090/api/sales/${id}/`
    const fetchConfig = {method: 'DELETE'};
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      fetchData();
    } else {
      alert('An error occurred while deleting the sale');
    }
};

return (
  <div className="my-5 container">
    <div className="row">
    <h1>Sales</h1>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Salesperson Employee ID</th>
          <th>Salesperson Name</th>
          <th>Customer</th>
          <th>VIN</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {sales.map(sales => {
          return (
            <tr key={sales.vin}>
              <td>{sales.employee_id}</td>
              <td>{sales.salesperson_name}</td>
              <td>{sales.customer}</td>
              <td>{sales.price}</td>
              <td><button onClick={handleDelete} data-id={sales.id} className='btn btn-danger'>Delete</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  </div>
);
}
export default SalesList;
