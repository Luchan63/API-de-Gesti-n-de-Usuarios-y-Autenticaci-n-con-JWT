import {  useEffect, useState } from "react"
import { UserForm } from "../components/UserForm";
import { useParams } from "react-router-dom";
import { useUsers } from "../hook/useUsers";

export const RegisterPages = () => {

    const { users = [], initialUserForm } = useUsers();

    // lo dejamos porque este es un estado local personal del Registerpages
    const [userSelceted, setUserSelected] = useState(initialUserForm);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const user = users.find(u => u.id == id) || initialUserForm;
            setUserSelected(user);
        }
    }, [id]);
    return (
        <div className="container my-4" >
            <h4>{userSelceted.id > 0 ? 'editar' : 'Registro de usuarios'}</h4>
            <div className="row">
                <div className="col">
                    <UserForm
                        usersSelceted={userSelceted} />
                </div>
            </div>
        </div>

    )
}
