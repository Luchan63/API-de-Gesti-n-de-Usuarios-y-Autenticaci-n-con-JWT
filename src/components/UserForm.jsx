import { useEffect, useState } from "react"
import { useUsers } from "../hook/useUsers";

export const UserForm = ({ usersSelceted, handlerCloseForm }) => {

    const { initialUserForm, handlerAddUsers, userError } = useUsers();

    const [userForm, setUserForm] = useState(initialUserForm);

    const [checked, setChecked] = useState(userForm.admin);
   
    const { id, username, password, email, admin } = userForm; 

    useEffect(() => {
        setUserForm({
            ...usersSelceted,
            password: '',
        })
    }, [usersSelceted]);

    // evento para guardar el
    const onInputChage = ({ target }) => {
        // console.log(target.value)
        const { name, value } = target;

        setUserForm({
            ...userForm,
            [name]: value,
        });
    }

    const onCheckboxChange = () => {
        setChecked(!checked);

        setUserForm(
            {
                ...userForm,
                admin: checked,
            }
        )
    }

    const onSubmit = (event) => {
        event.preventDefault();
        // metodo handler para guardar el usuario.
        handlerAddUsers(userForm);     
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <input
                        className="form-control"
                        name="username"
                        placeholder="username"
                        value={username}
                        onChange={onInputChage} />
                    <p className="text-danger"> {userError?.username} </p>
                </div>
                <div className="mb-3">
                    {id > 0 || <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={onInputChage} />
                    }
                    <p className="text-danger"> {userError?.password} </p>
                </div>
                <div className="mb-3">
                    <input
                        className="form-control"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={onInputChage} />
                    <p className="text-danger"> {userError?.email} </p>´

                    <div className="my-3 form-check">
                        <input type="checkbox"
                            name="admin"
                            checked={admin}
                            className="form-check-input"
                            onChange={onCheckboxChange}
                        />
                        <label className="form-check-label">Admin</label>
                    </div>
                    <input
                        type="hidden"
                        name="id"
                        value={id} />
                </div>
                <button type="submit"
                    className="btn btn-primary">
                    {id > 0 ? 'Editar' : 'Crear'}</button>

                {!handlerCloseForm || <button
                    className='btn btn-danger'
                    type="button"
                    onClick={() => onCloseForm()}>
                    Cerrar
                </button>}
            </form>
        </>
    )
}