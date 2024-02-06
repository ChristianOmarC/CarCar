import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import VehicleList from './VehicleList';
import VehicleForm from './VehicleForm'

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
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
