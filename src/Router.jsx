import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  Dashboard,
  Team,
  Login,
  Register,
  StudentAdmissionForm,
  TeacherRegistration,
  TeacherDetail,
  StudentProfile,
  TeacherProfile,
  AllTeachersOfClass,
  AttendancePage,
  StudentAttendanceHistory,
  TeacherAttendancePage,
  TeacherAttendanceHistory,
  AllTeacherAttendanceHistory,
  AllStudentAttendanceHistory,
} from "./scenes";
import StudentDashboard from "./scenes/Student-Side/StudentDashboard";
import TeacherDashboard from "./scenes/Teacher-Side/TeacherDashboard";
import Logout from "./scenes/Logout/index";
import FeesPage from "./scenes/StudentFees";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
        <Route path="/regitration" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/AllTeachersOfClass" element={<AllTeachersOfClass />} />

        {/* Admin ke liye Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/StudentDetailAdmin" element={<Team />} />
            <Route path="/StudentAddmission" element={<StudentAdmissionForm />} />
            <Route path="/TeacherDetailAdmin" element={<TeacherDetail />} />
            <Route path="/TeacherReg" element={<TeacherRegistration />} />
            <Route path="/TeacherAttendancePage" element={<TeacherAttendancePage />} />
            <Route path="/AllTeacherAttendanceHistory" element={<AllTeacherAttendanceHistory />} />
            <Route path="/AllStudentAttendanceHistory" element={<AllStudentAttendanceHistory/>}/>
            <Route path="/StudentFees" element={<FeesPage/>}/>
          </Route>

          {/* Teacher ke liye Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Teacher']} />}>
            <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
            <Route path="/TeacherProfile" element={<TeacherProfile />} />
            <Route path="/StudentAttendance" element={<AttendancePage />} />
            <Route path="/TeacherAttendanceHistory" element={<TeacherAttendanceHistory />} />
          </Route>

          {/* Student ke liye Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Student']} />}>
            <Route path="/StudentDashboard" element={<StudentDashboard />} />
            <Route path="/StudentProfile" element={<StudentProfile />} />
            <Route path="/StudentAttendanceHistory" element={<StudentAttendanceHistory />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
