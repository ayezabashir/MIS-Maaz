import ProtectedRoute from "@/Protectedroute";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ARMainPage from "../pages/ARMainPage";
import SettingPage from "@/features/Dashboard/pages/SettingPage";

function ARroutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <ProtectedRoute>
            <ARMainPage />
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

export default ARroutes;
