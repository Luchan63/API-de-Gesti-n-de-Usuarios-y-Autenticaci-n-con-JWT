import { useState } from "react"
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";


export const LoginPage = () => {

    const { handlerLogin, initialLoginForm } = useAuth();

    const [loginForm, setLoginForm] = useState(initialLoginForm);

    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {

        const { name, value } = target;
        setLoginForm({
            ...loginForm,
            [name]: value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (!username || !password) {
            Swal.fire(
                'Error de validacion',
                'Username o password repetidos',
                'error'
            );
        };
        {/*implementamos el login*/ }
        handlerLogin({ username, password });

        setLoginForm(initialLoginForm);
    }

    return (
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login Page</h5>
                    </div>

                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
                            <input type="text"
                                className="form-control my-3 w-75"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={onInputChange}
                            />
                            <input type="password"
                                className="form-control my-3 w-75"
                                placeholder="password"
                                name="password"
                                value={password}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
