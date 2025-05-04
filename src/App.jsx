import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import AppRoutes from "./routes/AppRoutes";
import Calendar from "./components/calendar"; // Make sure the file name is exactly "Calendar.jsx"
import { ContinuousCalendar } from "./components/calendar2";
import { SnackProvider } from './pages/snack'; // Make sure path matches the actual file

const meetings = {
  "2024-04-05": ["Drink Coffee", "Learn React", "Sleep"],
  "2024-04-06": ["Drink Coffee", "Learn Angular", "Sleep"],
};

function App() {
  return (
    <SnackProvider>
      <AuthProvider>
        <Routes>
          {/* Your custom routes in AppRoutes */}
          <Route path="/*" element={<AppRoutes />} />
          {/* Calendar route with meetings prop */}
          
          <Route path="/calendar2" element={<ContinuousCalendar meetings={meetings} />} />
          <Route path="/calendar" element={<Calendar meetings={meetings} />} />
        </Routes>
      </AuthProvider>
      </SnackProvider>
    
  );
}

export default App;
