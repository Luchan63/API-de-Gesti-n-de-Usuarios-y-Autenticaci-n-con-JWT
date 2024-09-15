import { NavLink } from "react-router-dom";
import { useUsers } from "../hook/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersRow = ({ id, username, password, email, admin }) => {

    const { handlerDeleteUser, handlerUsersSelectedForm } = useUsers();

    const { login } = useAuth();

    const onDeleteUser = (id) => {
        handlerDeleteUser(id);
    }



    const onSelectedUser = (id, username, password, email, admin) => {
        handlerUsersSelectedForm({
            id,
            username,
            password,
            email,
            admin,
        });
    }

    return (

        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>

            {!login.isAdmin ||
                <>
                    <td>
                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => onSelectedUser(id, username, password, email, admin)}>
                            update</button>
                    </td>

                    <td>
                        <NavLink
                            className="btn btn-secondary btn-sm"
                            to={'/users/edit/' + id}>
                            update route
                        </NavLink>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => onDeleteUser(id)}>
                            remove</button>
                    </td>
                </>
            }
        </tr>
    )
}
