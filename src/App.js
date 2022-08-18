import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import AddHotel from "./pages/AddHotel";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/add-hotel">AddHotel</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add-hotel" element={<AddHotel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
