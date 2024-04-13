<?php

define('DB_HOST', 'localhost');
define('DB_NAME', 'react_project_db');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

try {
    $pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Database connection succeeded";
} catch (PDOException $e) {
    echo "Database connection error: " . $e->getMessage();
}
