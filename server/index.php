<?php

include_once 'config/config.php';
include_once 'controllers/ApiController.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $apiController = new ApiController();

    if ($_SERVER['REQUEST_URI'] === '/api/visiteurs') {
        $apiController->get_all_visitors();
    }

    // Parse the REQUEST_URI to get the numVisiteur value
    $uri_parts = explode('/', $_SERVER['REQUEST_URI']);
    $numVisiteur = end($uri_parts);

    if ($uri_parts[count($uri_parts) - 2] === 'visiteurs') {
        $apiController->get_visitor($numVisiteur);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $apiController = new ApiController();

    if (isset($_POST['numVisiteur'], $_POST['nom'], $_POST['nbJours'], $_POST['tarifJournalier'])) {

        $numVisiteur = $_POST['numVisiteur'];
        $nom = $_POST['nom'];
        $nbJours = intval($_POST['nbJours']);
        $tarifJournalier = doubleval($_POST['tarifJournalier']);

        if ($_SERVER['REQUEST_URI'] === '/api/save') {
            $apiController->add_visitor($numVisiteur, $nom, $nbJours, $tarifJournalier);
        } else {
            // Gérez le cas où l'URI n'est pas correcte
            echo json_encode(['error' => 'URI not correct for create operation']);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    // Verify if the URI begins with /api/visiteurs/update/
    if (strpos($_SERVER['REQUEST_URI'], '/api/visiteurs/update/') === 0) {

        // Parse the REQUEST_URI to get the numVisiteur value
        $uri_parts = explode('/', $_SERVER['REQUEST_URI']);
        $numVisiteur = end($uri_parts);

        // Read the body of the query
        $input = file_get_contents('php://input');

        // Analyze the JSON in array
        $_PUT = json_decode($input, true);

        $apiController = new ApiController();

        if (isset($_PUT['numVisiteur'], $_PUT['nom'], $_PUT['nbJours'], $_PUT['tarifJournalier'])) {
            $numVisiteur = $_PUT['numVisiteur'];
            $nom = $_PUT['nom'];
            $nbJours = intval($_PUT['nbJours']);
            $tarifJournalier = doubleval($_PUT['tarifJournalier']);

            $apiController->update_visitor($numVisiteur, $nom, $nbJours, $tarifJournalier);
        }
    } else {
        echo json_encode(['error' => 'URI not correct for update operation']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    // Verify if the URI begins with /api/visiteurs/delete/
    if (strpos($_SERVER['REQUEST_URI'], '/api/visiteurs/delete/') === 0) {

        // Parse the REQUEST_URI to get the numVisiteur value
        $uri_parts = explode('/', $_SERVER['REQUEST_URI']);
        $numVisiteur = end($uri_parts);

        $apiController = new ApiController();

        $apiController->delete_visitor($numVisiteur);
    } else {
        echo json_encode(['error' => 'URI not correct for delete operation']);
    }
}
