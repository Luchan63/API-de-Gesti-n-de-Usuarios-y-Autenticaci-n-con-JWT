import { UserForm } from "./UserForm"
import { useUsers } from "../hook/useUsers";

export const UserModalForm = () => {

  const { usersSelected, handlerCloseForm } = useUsers();

  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog" role='document'>
          <div className="modal-content">
            <div className="modal-header">
              {usersSelected.id > 0 ? 'Editar' : 'Crear'} Modal Usuario
            </div>
            <div className="modal-body">
              <UserForm
                usersSelceted={usersSelected}
                handlerCloseForm={handlerCloseForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
