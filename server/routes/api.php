<?php

include_once __DIR__ . '/../controllers/ApiController.php';

$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];

$apiController = new ApiController();

switch ($request_method) {
    case 'GET':
        // Parse the REQUEST_URI to get the numVisiteur value
        $uri_parts = explode('/', $request_uri);
        $numVisiteur = end($uri_parts);

        if ($request_uri === '/api/visiteurs' || $request_uri === '/api/visiteurs/') {
            $apiController->get_all_visitors();
        } elseif ($uri_parts[count($uri_parts) - 2] === 'visiteurs' && $uri_parts[count($uri_parts) - 1] === $numVisiteur) {
            $apiController->get_visitor($numVisiteur);
        } else {
            // Route not found
            http_response_code(404);
            echo json_encode(['URI error' => 'URI not found']);
        }
        break;
    case 'POST':
        if ($request_uri === '/api/visiteurs/save') {

            if (isset($_POST['numVisiteur'], $_POST['nom'], $_POST['nbJours'], $_POST['tarifJournalier'])) {

                $numVisiteur = $_POST['numVisiteur'];
                $nom = $_POST['nom'];
                $nbJours = intval($_POST['nbJours']);
                $tarifJournalier = doubleval($_POST['tarifJournalier']);

                $apiController->add_visitor($numVisiteur, $nom, $nbJours, $tarifJournalier);
            } else {
                echo json_encode(['error' => '$_POST not set']);
            }
        } else {
            // Route not found
            http_response_code(404);
            echo json_encode(['URI error' => 'URI not found']);
        }
        break;
    case 'PUT':
        // Verify if the URI begins with /api/visiteurs/update/
        if (strpos($request_uri, '/api/visiteurs/update/') === 0) {

            // Parse the REQUEST_URI to get the numVisiteur value
            $uri_parts = explode('/', $request_uri);
            $numVisiteur = end($uri_parts);

            // Read the body of the query
            $input = file_get_contents('php://input');

            // Analyze the JSON in array
            $_PUT = json_decode($input, true);

            if (isset($_PUT['numVisiteur'], $_PUT['nom'], $_PUT['nbJours'], $_PUT['tarifJournalier'])) {
                $numVisiteur = $_PUT['numVisiteur'];
                $nom = $_PUT['nom'];
                $nbJours = intval($_PUT['nbJours']);
                $tarifJournalier = doubleval($_PUT['tarifJournalier']);

                $apiController->update_visitor($numVisiteur, $nom, $nbJours, $tarifJournalier);
            } else {
                echo json_encode(['error' => '$_PUT not set']);
            }
        } elseif ($request_uri === '/api/visiteurs/update' || $request_uri === '/api/visiteurs/update/') {
            echo json_encode(['URI error' => 'Id missing']);
        } else {
            // Route not found
            http_response_code(404);
            echo json_encode(['URI error' => 'URI not found']);
        }
        break;
    case 'DELETE':
        // Verify if the URI begins with /api/visiteurs/delete/
        if (strpos($request_uri, '/api/visiteurs/delete/') === 0) {

            // Parse the REQUEST_URI to get the numVisiteur value
            $uri_parts = explode('/', $request_uri);
            $numVisiteur = end($uri_parts);

            $apiController->delete_visitor($numVisiteur);
        } elseif ($request_uri === '/api/visiteurs/delete' || $request_uri === '/api/visiteurs/delete/') {
            echo json_encode(['URI error' => 'Id missing']);
        } else {
            // Route not found
            http_response_code(404);
            echo json_encode(['URI error' => 'URI not found']);
        }
        break;
}
