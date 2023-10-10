import logo from "./logo.svg";
import "./App.css";

import AuthProvider from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Presurvey from "./pages/Presurvey";
import Textbox from "./components/Textbox";
import TextAnswerPage from "./TextAnswerPage";
import PaintApp from "./components/PaintApp";
import MusicPlayer from "./components/MusicPlayer";
import MultiAnswerPage from "./pages/MultiAnswerPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./pages/auth/Landing";
import ForgotPassword from "./pages/auth/forgot";
import ForgotPasswordVerify from "./pages/auth/forgot/verify";
import ResetPassword from "./pages/auth/forgot/reset";
import Resources from "./pages/Resources"
import ParticipantHome from "./pages/ParticipantHome";
import AdminHome from "./pages/AdminHome";
import RedirectToHome from "./pages/RedirectToHome";

import UserAgreement from "./pages/UserAgreement";
import ShareWithResearcher from "./pages/ShareWithResearcher";


function App() {
  return (

    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<RedirectToHome />} />
            <Route path="/presurvey" element={<Presurvey />} />
            <Route path="/textbox" element={<Textbox />} />
            {/* <Route path="/textanswer" element={<TextAnswerPage />} />
            <Route path="/paint" element={<PaintApp />} />
            <Route path="/player" element={<MusicPlayer />} /> */}


            <Route path="/admin" element={<AdminHome />} />
            {/* <Route path="/admin/signup" element={<AdminSignup />} /> */}

            <Route path="/home" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/test/agreement" element={<UserAgreement />} />
            <Route path="/test" element={
              <ProtectedRoute><MultiAnswerPage /></ProtectedRoute>
            } />
            <Route path="/test/share" element={
              <ProtectedRoute><ShareWithResearcher /></ProtectedRoute>
            } />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/verify" element={<ForgotPasswordVerify />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/pthome" element={<ParticipantHome />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
