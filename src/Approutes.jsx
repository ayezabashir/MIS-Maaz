// AppRoutes.jsx
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Protectedroute";
import { Loader2Icon } from "lucide-react";
import ARroutes from "./features/AR/routes/ARroutes";
import FaxingRoutes from "./features/Faxing/routes/FaxingRoutes";
import MedicalBillingRoutes from "./features/MedicalBilling/routes/MedicalBillingRoutes";
import CredentialingRoutes from "./features/Credentialing/routes/CredentialingRoutes";
import PriorAuthorizationRoutes from "./features/PriorAuthorization/routes/PriorAuthorizationRoutes";
import WnyMuslimsRoutes from "./features/WhyMuslims/routes/WhyMuslimsRoutes";
import PatientCareCoordinationRoutes from "./features/PatientCareCoordination/routes/PatientCareCoordinationRoutes";

// Lazy load pages and layouts
const Login = lazy(() => import("./auth/Login"));
const DashboardLayout = lazy(() => import("./features/Layout/MainLayout"));
const DepartmentLayout = lazy(
  () => import("./features/Layout/DepartmentLayout"),
);
const MainScreen = lazy(() => import("./features/Dashboard/pages/MainScreen"));
const AdminRoutes = lazy(
  () => import("./features/Administartion/routes/AdminRoutes"),
);
const DashboardRoutes = lazy(
  () => import("./features/Dashboard/routes/Dashboardroutes"),
);
const ControlPannelRoutes = lazy(
  () => import("./features/ControlPannel/routes/ControlPannelRoutes"),
);
const CallCenterRoutes = lazy(
  () => import("./features/CallCenter/routes/CallCenterRoutes"),
);
const ProfileData = lazy(
  () => import("./features/NavigationMenu/components/ProfileData"),
);
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
        {/* 🔓 LOGIN */}
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

            <Route path="/ar/*" element={<ARroutes/>} />
              <Route path="/credentialing/*" element={<CredentialingRoutes/>} />
                <Route path="/medicalbilling/*" element={<MedicalBillingRoutes/>} />
                  <Route path="/faxing/*" element={<FaxingRoutes/>} />
                    <Route path="/PatientCareCoordination/*" element={<PatientCareCoordinationRoutes/>} />
                      <Route path="/PriorAuthorization/*" element={<PriorAuthorizationRoutes/>} />
                        <Route path="/WnyMuslims/*" element={<WnyMuslimsRoutes/>} />
          

 
     
       
        
          <Route
            path="/priorauthorization/*"
            element={<PriorAuthorizationRoutes />}
          />
    
          <Route
            path="/patientcarecoordination/*"
            element={<PatientCareCoordinationRoutes />}
          />

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
