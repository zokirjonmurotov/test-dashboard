import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "../auth/login";
import Carts from "../pages/carts";
import Products from "../pages/products";

/**
 * Higher-order component for route protection.
 * Redirects to the login page if the user is not authenticated.
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authToken = localStorage.getItem("auth_token");
  return authToken ? <>{children}</> : <Navigate to="/login" replace />;
};

// Route configuration object
const routesConfig = [
  { path: "/login", element: <LoginPage />, protected: false },
  { path: "/carts", element: <Carts />, protected: true },
  { path: "/products", element: <Products />, protected: true },
];

/**
 * Main application component with route definitions.
 */
const Routers: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routesConfig.map(({ path, element, protected: isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element
            }
          />
        ))}

        {/* Redirect undefined routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default Routers;
