import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import FirstModel from "./pages/FirstModel";
import SecondaryModel from "./pages/SecondaryModel";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/rsmkl/doctor-schedule" />} />
          <Route path="/rsmkl/doctor-schedule" element={<SecondaryModel />} />
          <Route path="/rsmkl/another-model" element={<FirstModel />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
