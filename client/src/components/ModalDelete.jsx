import { Button, Modal, Tooltip } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import PropTypes from "prop-types";

export function ModalDelete({ numVisiteur, onDelete }) {
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = () => {
    onDelete(numVisiteur);
    setOpenModal(false);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        type="button"
      >
        <Tooltip
          content="Supprimer"
          animation="duration-500"
          className="bg-secondary"
          placement="left"
          arrow={false}
        >
          <i className="uil uil-trash-alt text-xl"></i>
        </Tooltip>
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Êtes-vous sûr de vouloir supprimer ce visiteur?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleSubmit}>
                {"Oui, je suis sûr"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Non, annuler
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

ModalDelete.propTypes = {
  numVisiteur: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
