import React from "react";

const ConfirmationModal = ({modalId, label, confirmAction}) => {
    return <div className="modal fade" id={`${modalId}`} tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title fs-5" id="ModalLabel">{label}</h3>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => confirmAction()}>Confirmar</button>
                </div>
            </div>
        </div>
    </div>
}

export default ConfirmationModal;
