import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleList from './VehicleList';
import VehicleForm from './VehicleForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import SalespeopleList from './SalespeopleList';
import SalespersonForm from './SalespersonForm';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import SalesList from './SalesList';
import SalesForm from './SalesForm';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import ServiceHistory from './ServiceHistory';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" >
            <Route path="" element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="vehicles">
            <Route path="" element={<VehicleList />} />
            <Route path="new" element={<VehicleForm />} />
          </Route>
          <Route path="automobiles">
            <Route path="" element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="salespeople">
            <Route path="" element={<SalespeopleList />} />
            <Route path="new" element={<SalespersonForm />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesList />} />
            <Route path="new" element={<SalesForm />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomerList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="technicians">
            <Route path="" element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="" element={<AppointmentList />} />
            <Route path="new" element={<AppointmentForm />} />
          </Route>
          <Route path="history">
            <Route path="" element={<ServiceHistory />} />
          </Route>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
