import React, { useEffect, useState } from "react";

function AppointmentList() {
    const [appointments, setAppointments] = useState([])

    const fetchData = async () => {
        try{
        const response = await fetch('http://localhost:8080/api/appointments/')
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            const filteredAppointments = data.appointments.filter(appointment => {
                return appointment.status !== 'canceled' && appointment.status !== "finished"
            })
            setAppointments(filteredAppointments)
        } else {
            alert('An error occured while fetching the data')
        }
    } catch (error) {
        console.error('Error fetching data', error)
    }
}

    useEffect(() => {
        fetchData()
    }, [])
    
    async function handleCancel(e) {
        const id = e.target.dataset.id

        try {
        const url = `http://localhost:8080/api/appointments/${id}/cancel/`
        const fecthConfig = {
            method: "PUT",
            body: JSON.stringify({'status': "canceled"}),
            headers: {
                "Content-type": "application/json"
            }
        }
        const response = await fetch(url, fecthConfig)
        if (response.ok) {
            fetchData()
        } else {
            alert('An error occured while canceling the appointment')
        }
    } catch (error) {
        console.error('Error canceling appointment', error)
    }
}

    async function handleFinish(e) {
        const id = e.target.dataset.id

        try {
        const url = `http://localhost:8080/api/appointments/${id}/finish/`
        const fecthConfig = {
            method: "PUT",
            body: JSON.stringify({'status': "finished"}),
            headers: {
                "Content-type": "application/json"
            }
        }
        const response = await fetch(url, fecthConfig)
        if (response.ok) {
            fetchData()
        } else {
            alert('An error occured while finishing the appointment')
        }
    } catch (error) {
        console.error('Error finishing appointment', error)
    }
}
    return (
        <div className="my-5 container">
        <div className="row">
          <h1>Service Appointments</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>VIN</th>
                  <th>Is VIP?</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Technician</th>
                  <th>Reason</th>
                  <th>Pending Status</th>
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
                    <td>{ appointment.is_VIP ? 'Yes' : 'No'}</td>
                    <td>{ appointment.customer } </td>
                    <td>{ date }</td>
                    <td>{ time }</td>
                    <td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                    <td>{ appointment.reason }</td>
                    <td>
                        <button className="btn btn-danger" onClick={ handleCancel } data-id= { appointment.id }>Cancel</button>
                        <button className="btn btn-success" onClick={ handleFinish } data-id= { appointment.id }>Finish</button>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
    )
    
}

export default AppointmentList