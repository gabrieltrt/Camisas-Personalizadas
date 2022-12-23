// dependencies
import { Route, Routes, useLocation } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Login from './pages/Login';
import Messages from "pages/Messages";
import Coupons from "pages/Coupons";

// subpages
import MemberBudgets from "./pages/MemberBudgets";
import Templates from "./pages/Templates";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="pedidos" element={<MemberBudgets />} />
          <Route path="modelos" element={<Templates />} />
          <Route path="mensagens" element={<Messages />} />
          <Route path="cupons" element={<Coupons />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;