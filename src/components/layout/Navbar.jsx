import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

export const Navbar = () => {
    
    const { login, handlerLogout } = useAuth();
    
    const onLogout = () => {
        handlerLogout();
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Users-App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users">
                                    Usuarios
                                </NavLink>
                            </li>
                           {!login.isAdmin || <li className="nav-item">
                                <NavLink className="nav-link" to="/users/register">
                                    Registrar usuario
                                </NavLink>
                            </li>}
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
                        <span className="nav-item nav-link text-primary mx-3">
                            {login.user?.username}
                        </span>
                        <button
                            className="btn btn-outline-success"
                            onClick={onLogout}>
                            logout
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}
