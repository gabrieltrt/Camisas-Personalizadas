// dependencies
import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import UserContext from "../context/UserContext";

const Home = () => {
  const navigate = useNavigate();

  const { context: user } = useContext(UserContext);

  return (
    <div className="d-flex h-100">
      <Sidebar />
      <div className="d-flex flex-column" style={{ flex: 1 }}>
        <Header />
        <main className="p-3" style={{ flex: 1, overflowY: 'scroll' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;