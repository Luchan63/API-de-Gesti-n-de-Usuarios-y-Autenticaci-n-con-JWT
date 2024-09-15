import { UsersRow } from "./UsersRow"
import { useUsers } from "../hook/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersList = () => {

    const { users } = useUsers();
    const { login } = useAuth();

    return (
        <>
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>email</th>
                        {!login.isAdmin || <>
                            <th>update</th>
                            <th> update router </th>
                            <th> remove </th>
                        </>}
                    </tr>
                </thead>
                <tbody>
                    {users.map(({ id, username, email, password, admin }) => (
                        <UsersRow
                            key={id}
                            id={id}
                            username={username}
                            password={password}
                            email={email}
                            admin={admin}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

