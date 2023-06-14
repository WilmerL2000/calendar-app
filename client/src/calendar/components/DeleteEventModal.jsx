import Modal from 'react-modal';
import { useCalendarStore, useUIStore } from '../../hooks';
import { customStyles } from '../../constants';

Modal.setAppElement('#root');

export const DeleteEventModal = () => {
  const { startDeletingEvent } = useCalendarStore();

  const { isDeleteModalOpen, closeDeleteModal } = useUIStore();

  const handleDelete = async () => {
    await startDeletingEvent();
    closeDeleteModal();
  };

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onRequestClose={closeDeleteModal}
      style={customStyles}
      className="modal modal__detele"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <div className="modal-header">
        <h2 className="modal-title">Eliminar evento</h2>
      </div>
      <div className="modal-body">
        <p>¿Desea eliminar este evento?</p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-danger btn-block"
          onClick={handleDelete}
        >
          Eliminar
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={() => closeDeleteModal()}
        >
          Cerrer
        </button>
      </div>
    </Modal>
  );
};
