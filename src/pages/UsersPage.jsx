import { useEffect } from 'react';
import { UserModalForm } from '../components/UserModalForm';
import { UsersList } from '../components/UsersList'
import { useUsers } from '../hook/useUsers';
import { useAuth } from '../auth/hooks/useAuth';

export const UsersPage = () => {

  const {
    users,
    visibleForm,
    isLoading,
    handlerOpenForm,
    getUsers,
  } = useUsers();

  const { login } = useAuth();

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return (

      <div className="container my-4">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  return (
    <>
      {/* forma de ventana emergente */}
      {!visibleForm ||
        <UserModalForm />
      }

      <div className="container my-4">
        <h2>UsersApp</h2>

        <div className="row">
          <div className="col">

            {(visibleForm || !login.isAdmin) || <button
              className='btn btn-primary'
              onClick={() => handlerOpenForm()}>Nuevo usuario
            </button>}

            {users.length === 0
              ? <div className='alert alert-warning'>No hay usuario en el sistema</div>
              :
              <UsersList />}
          </div>
        </div>
      </div>
    </>
  )
}