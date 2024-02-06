import { useState, useEffect} from 'react';

function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);


  const fetchData = async () => {
    const response = await fetch('http://localhost:8100/api/manufacturers/');
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
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
    const url = `http://localhost:8100/api/manufacturers/${id}/`
    const fetchConfig = {method: 'DELETE'};
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      fetchData();
    } else {
      alert('An error occurred while deleting the manufacturer');
    }
  };


  return (
    <div className="my-5 container">
    <div className="row">
      <h1>Manufacturer</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {manufacturers.map(manufacturer => {
                return (
                  <tr key={manufacturer.id}>
                    <td>{manufacturer.name}</td>
                    <td><button onClick={handleDelete} data-id={manufacturer.id} className='btn btn-danger'>Delete</button></td>
                  </tr>
                );
             })}
        </tbody>
      </table>
      </div>
      </div>
    );
}
export default ManufacturerList;