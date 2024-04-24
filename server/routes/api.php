<?php

include_once __DIR__ . '/../controllers/ApiController.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];

// Parse the REQUEST_URI to get the numVisiteur value
$uri_parts = explode('/', $request_uri);
// $numVisiteur = end($uri_parts);
$numVisiteur = $uri_parts[count($uri_parts) - 2];

$apiController = new ApiController();

switch ($request_method) {
    case 'GET':
        $numVForAVisitor = end($uri_parts);
        if ($request_uri === '/api/visitors' || $request_uri === '/api/visitors/') {
            $apiController->get_all_visitors();
        } elseif ($uri_parts[count($uri_parts) - 2] === 'visitors' && $uri_parts[3] === $numVForAVisitor) {
            $apiController->get_visitor($numVForAVisitor);
        } else {
            http_response_code(404);
            echo json_encode(['URI error' => 'URI not found']);
        }
        break;
    case 'POST':
        if ($request_uri === '/api/visitors/create') {
            if (isset($_POST['numVisiteur'], $_POST['nom'], $_POST['nbJours'], $_POST['tarifJournalier'])) {

                $numVisiteur = $_POST['numVisiteur'];
                $nom = $_POST['nom'];
                $nbJours = intval($_POST['nbJours']);
                $tarifJournalier = doubleval($_POST['tarifJournalier']);

                $apiController->add_visitor($numVisiteur, $nom, $nbJours, $tarifJournalier);
            } else {
                http_response_code(400);
                echo json_encode(['error' => '$_POST not set']);
            }
        } else {
            http_response_code(404);
            echo json_encode(['URI error' => 'URI not found']);
        }
        break;
    case 'PUT':
        // Verify if the URI is like /api/visitors/{numVisiteur}/update
        if (strpos($request_uri, '/api/visitors/') === 0 && end($uri_parts) === 'update' && $uri_parts[3] === $numVisiteur) {
            // Read the body of the query
            $input = file_get_contents('php://input');

            // Analyze the JSON in array
            $_PUT = json_decode($input, true);

            if (isset($_PUT['numVisiteur'], $_PUT['nom'], $_PUT['nbJours'], $_PUT['tarifJournalier'])) {
                $numVisiteur = $_PUT['numVisiteur'];
                $nom = $_PUT['nom'];
                $nbJours = intval($_PUT['nbJours']);
                $tarifJournalier = doubleval($_PUT['tarifJournalier']);

                if ($numVisiteur === $uri_parts[3]) {
                    $apiController->update_visitor($numVisiteur, $nom, $nbJours, $tarifJournalier);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'URI Id and $_PUT[\'numVisiteur\'] are different']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => '$_PUT not set']);
            }
        } elseif ($request_uri === '/api/visitors/update' || $request_uri === '/api/visitors/update/') {
            echo json_encode(['URI error' => 'Id missing']);
        } else {
            http_response_code(404);
            echo json_encode(['URI error' => 'URI not found']);
        }
        break;
    case 'DELETE':
        // Verify if the URI is like /api/visitors/{numVisiteur}/delete
        if (strpos($request_uri, '/api/visitors/') === 0 && end($uri_parts) === 'delete' && $uri_parts[3] === $numVisiteur) {
            $apiController->delete_visitor($numVisiteur);
        } elseif ($request_uri === '/api/visitors/delete' || $request_uri === '/api/visitors/delete/') {
            http_response_code(404);
            echo json_encode(['URI error' => 'Id missing']);
        } else {
            http_response_code(404);
            echo json_encode(['URI error' => 'URI not found']);
        }
        break;
}
