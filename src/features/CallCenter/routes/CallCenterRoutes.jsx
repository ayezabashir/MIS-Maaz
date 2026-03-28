import ProtectedRoute from '@/Protectedroute'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CallCenterMain from '../Pages/CallCenterMain'
import GACalls from '../Pages/GACalls'
import Calls from '../Pages/Calls'
import EChecking from '../Pages/EChecking'
import ITsupport from '../Pages/ITsupport'

const CallCenterRoutes = () => {
  return (
<>
    <Routes>
        <Route path='' element={
            <ProtectedRoute>
                <CallCenterMain />
            </ProtectedRoute>
        }/>
        <Route path='gacalls' element={
            <ProtectedRoute>
                <GACalls />
            </ProtectedRoute>
        }/>
        <Route path='calls' element={
            <ProtectedRoute>
                <Calls />
            </ProtectedRoute>
        }/>
             <Route path='e-checking' element={
            <ProtectedRoute>
                <EChecking />
            </ProtectedRoute>
        }/>
        <Route path='itsupport'
        element={
            <ProtectedRoute>
                <ITsupport />
            </ProtectedRoute>
        } />
    </Routes>
</> 
  )
}

export default CallCenterRoutes