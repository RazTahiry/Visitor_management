import { Table } from "flowbite-react";
import PropTypes from 'prop-types';

Tables.propTypes = {
    visiteurs: PropTypes.array.isRequired,
};

export function Tables({ visiteurs }) {
    return (
        <div className="overflow-x-auto w-full">
            <Table hoverable className="bg-transparent">
                <Table.Head>
                    <Table.HeadCell className="bg-secondary text-quaternary">Nom</Table.HeadCell>
                    <Table.HeadCell className="text-center bg-secondary text-quaternary">Nombre de jour</Table.HeadCell>
                    <Table.HeadCell className="text-center bg-secondary text-quaternary">Tarif journalier</Table.HeadCell>
                    <Table.HeadCell className="text-center bg-secondary text-quaternary">Tarif</Table.HeadCell>
                    <Table.HeadCell className="text-end bg-secondary text-quaternary">Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        visiteurs.length !== 0 ? visiteurs.map(visitor => (
                            <Table.Row className="bg-white p-2 dark:border-gray-700 dark:bg-gray-800" key={visitor.numVisiteur}>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white px-4 py-2">
                                    {visitor.nom}
                                </Table.Cell>
                                <Table.Cell className="text-center px-4 py-2">{visitor.nbJours}</Table.Cell>
                                <Table.Cell className="text-center px-4 py-2 whitespace-nowrap ">{visitor.tarifJournalier} Ar</Table.Cell>
                                <Table.Cell className="text-center px-4 py-2 whitespace-nowrap ">{visitor.nbJours * visitor.tarifJournalier} Ar</Table.Cell>
                                <Table.Cell className="text-end px-4 py-2">
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        <i className="uil uil-pen text-xl"></i>
                                    </a>
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 ms-3">
                                        <i className="uil uil-trash-alt text-xl"></i>
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        )) :
                            <Table.Row className="text-center">
                                Empty.
                            </Table.Row>
                    }
                </Table.Body>
            </Table>
        </div>
    );
}

