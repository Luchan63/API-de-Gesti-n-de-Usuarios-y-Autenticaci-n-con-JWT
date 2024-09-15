import Swal from "sweetalert2";
import { LoginUser } from "../service/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "../../store/slices/auth/authSlice";


export const initialLoginForm = {
    username: '',
    password: '',
}

export const useAuth = () => {

    // const [loginAuth, dispatch] = useReducer(loginReducer, initialLogin);

    const dispatch = useDispatch();

    const { user, isAdmin, isAuth } = useSelector(state => state.auth);

    const navigate = useNavigate();

    const handlerLogin = async ({ username, password }) => {

        try {
            const response = await LoginUser({ username, password });
            const token = response.data.token;
            const claim = JSON.parse(window.atob(token.split(".")[1]));
            console.log(claim);
            const user = { username: claim.username }; //claims.sub es esta otra opcion o response.data.username


            dispatch(onLogin({ user, isAdmin: claim.isAdmin }));
        
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claim.isAdmin,
                user: user,
            }));

            sessionStorage.setItem('token', `Bearer ${token}`);

            navigate('/users');

        } catch (error) {
            if (error.response?.status == 401) {
                Swal.fire('Error Login', 'Username o password invalidos', 'error');
            } else if (error.response?.status == 403) {
                Swal.fire('Error Login', 'No tiene acceso al recurso o permiso', 'error');
            } else
                throw error;
        }
    }

    const handlerLogout = () => {
        dispatch(onLogout());
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
    };


    return {
        login: {
            user,
            isAdmin,
            isAuth
        },
        initialLoginForm,
        handlerLogin,
        handlerLogout,
    }
}





