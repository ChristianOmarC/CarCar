import React, { useEffect, useState } from "react";

function ServiceHistory() {
    const [appointments, setAppointments] = useState([])
    const [allAppointments, setAllAppointments] = useState([])
    const [filterVin, setFilterVin] = useState("")

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/')
        if (response.ok) {
            const data = await response.json()
            setAllAppointments(data.appointments)
            setAppointments(data.appointments)
        } else {
            alert('An error occured while fetching the data')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    function handleFilterVin(e) {
      setFilterVin(e.target.value)
    }

    function handleClick() {
      const filteredAppointments = allAppointments.filter((appointment) => appointment.vin.includes(filterVin))
      setAppointments(filteredAppointments)
    }


    return (
        <div className="my-5 container">
          <h1>Service Appointments</h1>
          <div className="row">
            <div className="col-md-10">
              <input
                onChange={handleFilterVin}
                placeholder="search by VIN" 
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <button onClick={handleClick}>Search</button>
            </div>
          </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>VIN</th>
                  <th>is VIP?</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Technician</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => {
                    const dateTime = new Date(appointment.date_time)
                    const date = dateTime.toLocaleDateString("en-US")
                    const time = dateTime.toLocaleTimeString("en-US")
                  return (
                  <tr key={appointment.id}>
                    <td>{ appointment.vin }</td>
                    <td>{ appointment.is_VIP ? 'Yes' : 'No' }</td>
                    <td>{ appointment.customer } </td>
                    <td>{ date }</td>
                    <td>{ time }</td>
                    <td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                    <td>{ appointment.reason }</td>
                    <td>{ appointment.status }</td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
    )
    
}

export default ServiceHistory