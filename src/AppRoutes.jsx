import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./auth/page/LoginPage";
import { UserRoutes } from "./routes/UserRoutes";
import { useAuth } from "./auth/hooks/useAuth";
import { useSelector } from "react-redux";

export const AppRoutes = () => {
  const { isAuth } = useSelector(state => state.auth);

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
