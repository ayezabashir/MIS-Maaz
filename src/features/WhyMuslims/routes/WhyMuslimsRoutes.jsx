import ProtectedRoute from "@/Protectedroute";
import React from "react";
import { Route, Routes } from "react-router-dom";
import WhyMuslimsMainPage from "../pages/WhyMuslimsMainPage";
import SettingPage from "@/features/Dashboard/pages/SettingPage";

function WnyMuslimsRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <ProtectedRoute>
            <WhyMuslimsMainPage />
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

export default WnyMuslimsRoutes;
