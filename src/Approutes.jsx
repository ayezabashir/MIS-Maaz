// AppRoutes.jsx
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Protectedroute";
import { Loader2Icon } from "lucide-react";

// Lazy load pages and layouts
const Login = lazy(() => import("./auth/Login"));
const DashboardLayout = lazy(() => import("./features/Layout/MainLayout"));
const DepartmentLayout = lazy(() => import("./features/Layout/DepartmentLayout"));
const MainScreen = lazy(() => import("./features/Dashboard/pages/MainScreen"));
const AdminRoutes = lazy(() => import("./features/Administartion/routes/AdminRoutes"));
const DashboardRoutes = lazy(() => import("./features/Dashboard/routes/Dashboardroutes"));
const ControlPannelRoutes = lazy(() => import("./features/ControlPannel/routes/ControlPannelRoutes"));
const CallCenterRoutes = lazy(() => import("./features/CallCenter/routes/CallCenterRoutes"));
const ProfileData = lazy(() => import("./features/NavigationMenu/components/ProfileData"));
const Commingsoon = lazy(() => import("./Commingsoon"));
const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center gap-3">
      <Loader2Icon className="animate-spin text-primary" size={48} />
      <p className="text-lg font-medium text-slate-600">Loading...</p>
    </div>
  </div>
);
const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/mainScreen" element={<MainScreen />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileData />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <DepartmentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/administration/*" element={<AdminRoutes />} />
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          <Route path="/controlpannel/*" element={<ControlPannelRoutes />} />
          <Route path="/callcenter/*" element={<CallCenterRoutes />} />
          
        </Route>

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Commingsoon />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
