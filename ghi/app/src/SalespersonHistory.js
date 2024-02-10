import { useState, useEffect } from "react";

function SalespersonHistory() {
  const [salesperson_history, setSalespersonHistory] = useState([]);


  const fetchData = async () => {
    const response = await fetch('http://localhost:8090/api/salespeople/');
    if (response.ok) {
      const data = await response.json();
      setSalespersonHistory(data.salesperson_history);
    } else {
      console.error('An error occurred fetching the data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (event) => {
    const id = event.target.dataset.id

    const fetchOption = { method: 'DELETE' }
    const request = await fetch(`http://localhost:8090/api/customers/${id}/`, fetchOption)
    if (request.ok) {
        const data = await request.json()
    fetchData()
    }
}





<div className="mb-3">
<select onChange={handleFormChange} value={formData.model_id} required name="model_id" id="model_id" className="form-select">
  <option value="">Choose a Model</option>
  {models.map(model => {
    return (
      <option key={model.id} value={model.id}>{model.name}</option>
