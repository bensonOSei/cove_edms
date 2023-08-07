import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { ProtectedRoute } from './utils/ProtectedRoute'
import { Employees } from './pages/Employees'
import { AddEmployees } from './pages/AddEmployees'
import { EmployeeDetails } from './pages/EmployeeDetails'

function App() {

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} exact >
            <Route index element={<Employees />} />
            <Route path='add' element={<AddEmployees />} />
            <Route path=':id' element={<EmployeeDetails />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
