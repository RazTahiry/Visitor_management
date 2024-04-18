<?php

include_once __DIR__ . '/../models/Visitor.php';

class ApiController
{
    /**
     * Get all visitors
     *
     * @return void
     */
    public function get_all_visitors()
    {
        $visitorModel = new Visitor();
        $visitors = $visitorModel->get_all_visitors();

        if ($visitors !== false) {
            http_response_code(200);
            header('Content-type: application/json');
            echo json_encode($visitors);
        } else {
            echo json_encode(['error' => 'No visitor found']);
        }
    }

    /**
     * Get a specific visitor
     *
     * @param string $numVisiteur
     * @return void
     */
    public function get_visitor($numVisiteur)
    {
        $visitorModel = new Visitor();
        $visitor = $visitorModel->get_visitor($numVisiteur);

        if ($visitor !== false) {
            http_response_code(200);
            header('Content-type: application/json');
            echo json_encode($visitor);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'No visitor found']);
        }
    }

    /**
     * Create a new visitor
     *
     * @param string $numVisiteur
     * @param string $nom
     * @param int $nbJours
     * @param double $tarifJournalier
     * @return void
     */
    public function add_visitor($numVisiteur, $nom, $nbJours, $tarifJournalier)
    {
        $visitorModel = new Visitor($numVisiteur, $nom, $nbJours, $tarifJournalier);
        if (!$visitorModel->visitor_exists($numVisiteur)) {
            $validationResult = $visitorModel->validate();
            if (empty($validationResult)) {
                if ($visitor = $visitorModel->save_visitor()) {
                    http_response_code(201);
                    header('Content-type: application/json');
                    echo json_encode(['Success' => 'Visitor added successfully']);
                } else {
                    http_response_code(400);
                    echo json_encode(['error' => 'Unable to add this visitor']);
                }
            } else {
                header('Content-type: application/json');
                echo json_encode(['error' => $validationResult]);
            }
        } else {
            http_response_code(409);
            header('Content-type: application/json');
            echo json_encode(['error' => 'NumVisiteur already exists']);
        }
    }

    /**
     * Update a visitor
     *
     * @param string $numVisiteur
     * @param string $nom
     * @param int $nbJours
     * @param double $tarifJournalier
     * @return void
     */
    public function update_visitor($numVisiteur, $nom, $nbJours, $tarifJournalier)
    {
        $visitorModel = new Visitor($numVisiteur, $nom, $nbJours, $tarifJournalier);

        if ($visitorModel->visitor_exists($numVisiteur)) {
            $validationResult = $visitorModel->validate();
            if (empty($validationResult)) {
                if ($visitor = $visitorModel->update_visitor($numVisiteur)) {
                    http_response_code(201);
                    header('Content-type: application/json');
                    echo json_encode(['Success' => 'Visitor updated successfully']);
                } else {
                    http_response_code(400);
                    echo json_encode(['error' => 'Unable to update this visitor']);
                }
            } else {
                header('Content-type: application/json');
                echo json_encode(['error' => $validationResult]);
            }
        } else {
            http_response_code(404);
            header('Content-type: application/json');
            echo json_encode(['error' => 'Visitor doesn\'t exist']);
        }
    }

    /**
     * Delete a specific visitor
     *
     * @param string $numVisiteur
     * @return void
     */
    public function delete_visitor($numVisiteur)
    {
        $visitorModel = new Visitor();
        if ($visitorModel->visitor_exists($numVisiteur)) {
            $visitor = $visitorModel->delete_visitor($numVisiteur);

            if ($visitor !== false) {
                header('Content-type: application/json');
                echo json_encode(['Success' => 'Visitor deleted successfully']);
            } else {
                echo json_encode(['error' => 'Unable to delete this visitor']);
            }
        } else {
            http_response_code(404);
            header('Content-type: application/json');
            echo json_encode(['error' => 'Visitor doesn\'t exist']);
        }
    }
}
