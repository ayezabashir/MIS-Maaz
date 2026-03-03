import ProtectedRoute from '@/Protectedroute';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PatientCareCoordinationMainPage from '../pages/PatientCareCoordinationMainPage';
import SettingPage from '@/features/Dashboard/pages/SettingPage';

function PatientCareCoordinationRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <ProtectedRoute>
            <PatientCareCoordinationMainPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="settings"
        element={
          <ProtectedRoute>
            <SettingPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default PatientCareCoordinationRoutes