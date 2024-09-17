import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./auth/page/LoginPage";
import { UserRoutes } from "./routes/UserRoutes";
import { useAuth } from "./auth/hooks/useAuth";
import { useSelector } from "react-redux";

export const AppRoutes = () => {
  const { isAuth, isLoginLoading } = useSelector(state => state.auth);

  if(isLoginLoading)
  {
    return (
      <div className="container my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  return (
    <Routes>
      {
      isAuth
        ? (
          <Route
            path="/*"
            element={<UserRoutes />} />
        )
        : <>
          <Route path="login"
            element={<LoginPage />} />

          <Route path="/*"
            element={<Navigate to="/login" />} />
        </>
      }

    </Routes>
  );
}
