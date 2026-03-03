import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../../Protectedroute";
import { ControlMain } from "../Pages/ControlMain";
import UserUpdate from "../Pages/UserUpdate";
import SecuritySystem from "../Pages/SecuritySystem";
import { UserCreate } from "../Pages/UserCreate";
import PersonCreation from "../Pages/PersonCreation";
import RegistrationOverview from "../Pages/Registration";
import EmployeeCreation from "../Pages/EmployeeCreation";
import UserUpdateId from "../Pages/UserUpdateId";
import Company from "../Pages/Company";
import Client from "../Pages/Client";
import Department from "../Pages/Department";
import OfficeLocation from "../Pages/officeLocation.jsx";
import Module from "../Pages/Module.jsx";
import Help from "../Pages/Help";
const ControlPannelRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute>
            <ControlMain />
          </ProtectedRoute>
        }
      />
      <Route
        path="userupdate"
        element={
          <ProtectedRoute>
            <UserUpdate></UserUpdate>
          </ProtectedRoute>
        }
      />
      <Route
        path="usercreate"
        element={
          <ProtectedRoute>
            <UserCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="userupdate/:id"
        element={
          <ProtectedRoute>
            <UserUpdateId />
          </ProtectedRoute>
        }
      />
      <Route
        path="securitysystem"
        element={
          <ProtectedRoute>
            <SecuritySystem />
          </ProtectedRoute>
        }
      />
      <Route
        path="personcreation"
        element={
          <ProtectedRoute>
            <PersonCreation />
          </ProtectedRoute>
        }
      />
      <Route
        path="registration"
        element={
          <ProtectedRoute>
            <RegistrationOverview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <EmployeeCreation />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="company"
        element={
          <ProtectedRoute>
            <Company />
          </ProtectedRoute>
        }
      />
      <Route
        path="client"
        element={
          <ProtectedRoute>
            <Client />
          </ProtectedRoute>
        }
      />
      <Route
        path="department"
        element={
          <ProtectedRoute>
            <Department />
          </ProtectedRoute>
        }
      />
      <Route
        path="officelocation"
        element={
          <ProtectedRoute>
            <OfficeLocation />
          </ProtectedRoute>
        }
      />
      <Route
        path="module"
        element={
          <ProtectedRoute>
            <Module />
          </ProtectedRoute>
        }
      />
      <Route
        path="help"
        element={
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
export default ControlPannelRoutes;
