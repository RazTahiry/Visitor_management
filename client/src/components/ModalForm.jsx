import { Modal, Tooltip } from "flowbite-react";
import { useState } from "react";
import PropTypes from "prop-types";

export function ModalForm({
  classes,
  buttonValue,
  method,
  onSubmit,
  onUpdate,
  numVisiteur,
  visitorInfo,
  lastNumVisitor,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [visitor, setVisitor] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (method === "POST") {
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());

      onSubmit(formValues);

      setOpenModal(false);
    } else {
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());

      onUpdate(formValues);

      setOpenModal(false);
    }
  };

  const handleButtonClick = () => {
    if (method === "POST") {
      setOpenModal(true);
    } else {
      setVisitor(visitorInfo);
      setOpenModal(true);
    }
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  function getNextNumVisitor(NumVisitor) {
    if (!NumVisitor) {
      return "C001";
    }

    if (NumVisitor !== "") {
      // Using regex for separate the character and the number
      let matches = NumVisitor.match(/(\D+)(\d+)/);
      if (!matches || matches.length < 2) {
        return "";
      }
      // Parse the alphabetic and the numeric side
      let prefix = matches[1]; // Alphabetic side
      let number = parseInt(matches[2]); // Numeric side converted in integer
      number++;

      // Format the next number visitor
      let NextNumVisitor =
        prefix + number.toString().padStart(matches[2].length, "0");

      return NextNumVisitor;
    } else {
      return "C001";
    }
  }

  return (
    <>
      {method === "PUT" ? (
        <button onClick={handleButtonClick} className={classes} type="button">
          <Tooltip
            content="Modifier"
            animation="duration-500"
            className="bg-secondary"
            placement="left"
            arrow={false}
          >
            {buttonValue}
          </Tooltip>
        </button>
      ) : (
        <button onClick={handleButtonClick} className={classes} type="button">
          {buttonValue}
        </button>
      )}

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form className="p-3 md:p-4" method={method} onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="numVisiteur"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Numéro visiteur
                </label>
                <input
                  type="text"
                  name="numVisiteur"
                  id="numVisiteur"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
                  value={
                    method === "POST"
                      ? getNextNumVisitor(lastNumVisitor)
                      : numVisiteur
                  }
                  required
                  readOnly
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="nom"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
                  defaultValue={visitor.nom}
                  placeholder="Nom du visiteur"
                  autoFocus
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="nbJours"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre de jours
                </label>
                <input
                  type="number"
                  name="nbJours"
                  id="nbJours"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
                  defaultValue={visitor.nbJours}
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="tarifJournalier"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tarif journalier
                </label>
                <input
                  type="number"
                  name="tarifJournalier"
                  id="tarifJournalier"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
                  defaultValue={visitor.tarifJournalier}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="transition text-white inline-flex items-center bg-secondary hover:bg-primary focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {method === "POST" ? (
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <i className="uil uil-edit me-2 -ms-1 text-lg"></i>
              )}
              {method === "POST" ? "Ajouter" : "Modifier"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

ModalForm.propTypes = {
  classes: PropTypes.string.isRequired,
  buttonValue: PropTypes.node.isRequired,
  method: PropTypes.string.isRequired,
  numVisiteur: PropTypes.string,
  onSubmit: PropTypes.func,
  onUpdate: PropTypes.func,
  visitorInfo: PropTypes.object,
  lastNumVisitor: PropTypes.string,
};
