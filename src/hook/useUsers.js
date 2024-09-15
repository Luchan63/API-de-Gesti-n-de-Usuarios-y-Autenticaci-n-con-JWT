import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remuve, save, update } from "../service/userService";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, updateUsers, deleteUsers, loadingUsers, onUsersSelectedForm, onOpenForm, onCloseForm, initialUserForm, onLoadingError,} from "../store/slices/users/usersSlice";

export const useUsers = () => {

    const dispatch = useDispatch();
    const { users, usersSelected, visibleForm, userError, isLoading } = useSelector(state => state.users);

    const navigate = useNavigate();

    const getUsers = async () => {
        try {
            const result = await findAll()
            console.log(result);
            dispatch(loadingUsers(result.data))
        } catch (error) {
            if (error.response.status == 401) {
                handlerLogout();
            }
        }

    }

    const handlerAddUsers = async (user) => {

        let result;
        try {
            if (user.id === 0) {
                result = await save(user);
                dispatch(addUsers({ ...user }));
            } else {
                result = await update(user);
                dispatch(updateUsers({ ...user }));

            }

            Swal.fire(
                (user.id === 0) ? "Usuario creado?" : "Usuario Actualizado?",
                (user.id === 0) ? "El usuario ha sido creado con exito?" : "El usuario a sido actualizado con exito",
                "success"
            );

            handlerCloseForm();

            navigate('/users');

        } catch (error) {
            if (error.response && error.response.status == 400) {
                dispatch(onLoadingError(error.response.data));

            } else if (error.response && error.response.status == 500 && error.response.data?.message?.includes('constraint')) {
                if (error.response.data?.message?.includes('UK_username')) {
                    dispatch(onLoadingError({ username: 'El username ya existe' }));
                }
                if (error.response.data?.message?.includes('UK_email')) {
                    dispatch(onLoadingError({ email: 'El email ya existe' }));
                }
            } else if (error.response.status == 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    };

    const handlerDeleteUser = (id) => {


        Swal.fire({
            title: "Estas seguro que desea eliminar?",
            text: "Cuidado, el usuario sera eliminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await remuve(id);
                    dispatch(deleteUsers(id));
                    Swal.fire({
                        title: "Usuario eliminado!",
                        text: "El usuario se ha eliminado con exito.",
                        icon: "success"
                    });
                } catch (error) {
                    if (error.response.status == 401) {
                        handlerLogout();
                    }
                }
            }
        });
    };

    const handlerUsersSelectedForm = (user) => {
        dispatch(onUsersSelectedForm({ ...user }));
    };

    const handlerOpenForm = () => {
        dispatch(onOpenForm());
    };

    const handlerCloseForm = () => {
        dispatch(onCloseForm())
        dispatch(onLoadingError({}));

    };

    return {
        users,
        usersSelected,
        initialUserForm,
        visibleForm,
        userError,
        isLoading,

        handlerAddUsers,
        handlerDeleteUser,
        handlerUsersSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
    };
}