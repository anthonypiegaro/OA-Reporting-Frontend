import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReportPage from './views/ReportPage';
import "./App.css";
import DataPage from './views/DataPage';
import LoginPage from './views/LoginPage';
import LandingPage from "./views/LandingPage";
import ProtectedRoutes from './utils/ProtectRoutes';
import ErrorBoundary from "./utils/ErrorBoundry";

function App() {
  const [isStaff, setIsStaff] = useState(
    JSON.parse(localStorage.getItem('isStaff')) || false
  );

  useEffect(() => {
    const minute = 60 * 1000
    setInterval(() => {
      if (localStorage.refresh) {
        fetch("api/token/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            refresh: localStorage.refresh
          })
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.token = data.access
          });
      }
    }, 15*minute);
  }, []);

  return (
      <div className="app">
        <Router>
        <ErrorBoundary>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/report" element={<ReportPage isStaff={isStaff} />} />
              {isStaff && <Route path="/data" element={<DataPage isStaff={isStaff} />} />}
            </Route>
            <Route path="/login" element={<LoginPage setIsStaff={setIsStaff}/>} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </ErrorBoundary>
        </Router>
      </div>
  );
}

export default App;