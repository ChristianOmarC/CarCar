import { useState, useEffect } from "react";

function CustomerList() {
  const [customers, setCustomers] = useState([]);


  const fetchData = async () => {
    const response = await fetch('http://localhost:8090/api/customers/');
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
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

    const fetchOption = { method: 'DELETE' }
    const response = await fetch(`http://localhost:8090/api/customers/${id}/`, fetchOption)
    if (response.ok) {
    fetchData()
    } else {
      alert('An error occurred deleting the data')
}
  }

return (
  <div className="my-5 container">
    <div className="row">
    <h1>Customers</h1>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => {
          return (
            <tr key={customer.id}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.address}</td>
              <td>{customer.phone_number}</td>
              <td><button onClick={handleDelete} data-id={customer.id} className='btn btn-danger'>Delete</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  </div>
);
}
export default CustomerList;
