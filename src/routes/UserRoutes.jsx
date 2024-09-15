import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { UsersPage } from "../pages/UsersPage";
import { RegisterPages } from "../pages/RegisterPages";
import { useAuth } from "../auth/hooks/useAuth";


export const UserRoutes = () => {

    const { login } = useAuth();

    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path="users"
                    element={
                        <UsersPage />} />

                
                    <Route
                        path="users/register"
                        element={<RegisterPages />} />
                    <Route
                        path="users/edit/:id"
                        element={<RegisterPages />} />
            

                <Route
                    path="/"
                    element={< Navigate to={"/users"} />} />

            </Routes>
        </>
    )
}
