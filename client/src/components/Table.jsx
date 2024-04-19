import { Table } from "flowbite-react";
import PropTypes from "prop-types";
import { ModalDelete } from "./ModalDelete";
import { ModalForm } from "./ModalForm";
import { useEffect, useState } from "react";
import { MinMaxTotal } from "./MinMaxTotal";

export function Tables({
  visiteurs,
  onDelete,
  onUpdate,
  minTarif,
  maxTarif,
  totalTarif,
}) {
  const [sum, setSum] = useState(0);
  const [min, setMin] = useState(Number.MAX_VALUE);
  const [max, setMax] = useState(0);

  useEffect(() => {
    let total = 0;
    let newMin = Number.MAX_VALUE;
    let newMax = 0;

    visiteurs.forEach((visitor) => {
      const tarif = visitor.nbJours * visitor.tarifJournalier;
      total += tarif;
      newMin = Math.min(newMin, tarif);
      newMax = Math.max(newMax, tarif);
    });

    if (newMin !== Number.MAX_VALUE && newMax !== 0 && total !== 0) {
      setSum(total);
      setMin(newMin);
      setMax(newMax);

      totalTarif(total);
      minTarif(newMin);
      maxTarif(newMax);
    }
  }, [visiteurs]);

  return (
    <div className="overflow-x-auto w-full">
      <Table hoverable className="bg-transparent">
        <Table.Head>
          <Table.HeadCell className="bg-secondary text-quaternary">
            Nom
          </Table.HeadCell>
          <Table.HeadCell className="text-center bg-secondary text-quaternary">
            Nombre de jour
          </Table.HeadCell>
          <Table.HeadCell className="text-center bg-secondary text-quaternary">
            Tarif journalier
          </Table.HeadCell>
          <Table.HeadCell className="text-center bg-secondary text-quaternary">
            Tarif
          </Table.HeadCell>
          <Table.HeadCell className="text-end bg-secondary text-quaternary">
            Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {visiteurs.length !== 0 ? (
            visiteurs.map((visitor) => (
              <Table.Row
                className="bg-white p-2 dark:border-gray-700 dark:bg-gray-800"
                key={visitor.numVisiteur}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white px-4 py-2">
                  {visitor.nom}
                </Table.Cell>
                <Table.Cell className="text-center px-4 py-2">
                  {visitor.nbJours}
                </Table.Cell>
                <Table.Cell className="text-center px-4 py-2 whitespace-nowrap ">
                  {Number(visitor.tarifJournalier).toLocaleString()} Ar
                </Table.Cell>
                <Table.Cell className="text-center px-4 py-2 whitespace-nowrap ">
                  {(visitor.nbJours * visitor.tarifJournalier).toLocaleString()}{" "}
                  Ar
                </Table.Cell>
                <Table.Cell className="text-end px-4 py-2">
                  <ModalForm
                    classes="font-medium text-cyan-600 hover:underline dark:text-cyan-500 me-2"
                    buttonValue={<i className="uil uil-pen text-xl"></i>}
                    method="PUT"
                    numVisiteur={visitor.numVisiteur}
                    visitorInfo={visitor}
                    onUpdate={onUpdate}
                  />

                  <ModalDelete
                    numVisiteur={visitor.numVisiteur}
                    onDelete={onDelete}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row className="text-center bg-white p-2">
              <Table.Cell colSpan="5">Empty.</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      {visiteurs.length !== 0 && (
        <MinMaxTotal
          min={min.toLocaleString()}
          max={max.toLocaleString()}
          total={sum.toLocaleString()}
        />
      )}
    </div>
  );
}

Tables.propTypes = {
  visiteurs: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  minTarif: PropTypes.func.isRequired,
  maxTarif: PropTypes.func.isRequired,
  totalTarif: PropTypes.func.isRequired,
};
