<?php

include_once __DIR__ . '/../config/config.php';

class Visitor
{
    private $numVisiteur;
    private $nom;
    private $nbJours;
    private $tarifJournalier;

    public function __construct($numVisiteur = null, $nom = null, $nbJours = null, $tarifJournalier = null)
    {
        $this->numVisiteur = $numVisiteur;
        $this->nom = $nom;
        $this->nbJours = $nbJours;
        $this->tarifJournalier = $tarifJournalier;
    }

    /**
     * Visitor information validator
     *
     * @return array
     */
    public function validate()
    {
        $errors = [];

        $errors[] = empty($this->numVisiteur) ? "Numéro de visiteur requis" : '';

        $errors[] = empty($this->nom) ? "Le nom du visiteur est requis" : '';

        $errors[] = empty($this->nbJours) ? "Le nombre de jours est requis" : (!is_int($this->nbJours) ? "Nombre de jours invalide" : '');

        $errors[] = empty($this->tarifJournalier) ? "Le tarif journalier est requis" : (!is_double($this->tarifJournalier) ? "Tarif journalier non valide" : '');

        return array_filter($errors);
    }

    /**
     * Get all visitors
     *
     * @return array|bool array of visitors or false
     */
    public function get_all_visitors()
    {
        global $pdo;

        try {
            $stmt = $pdo->query('SELECT * FROM visiteur');
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    /**
     * Get a specific visitor
     *
     * @param string $numVisiteur
     * @return array|bool array of visitor or false
     */
    public function get_visitor($numVisiteur)
    {
        try {
            global $pdo;

            $stmt = $pdo->prepare("SELECT * FROM visiteur WHERE numVisiteur=:numVisiteur");
            $stmt->bindParam(':numVisiteur', $numVisiteur);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (\Throwable $th) {
            return false;
        }
    }

    /**
     * Save a visitor to database
     *
     * @return bool
     */
    public function save_visitor()
    {
        try {
            global $pdo;

            $stmt = $pdo->prepare("INSERT INTO visiteur (numVisiteur, nom, nbJours, tarifJournalier) VALUES (:numVisiteur, :nom, :nbJours, :tarifJournalier)");

            return $stmt->execute([
                'numVisiteur' => $this->numVisiteur,
                'nom' => $this->nom,
                'nbJours' => $this->nbJours,
                'tarifJournalier' => $this->tarifJournalier
            ]);
        } catch (\Throwable $th) {
            return false;
        }
    }

    /**
     * Update a specific visitor
     *
     * @param string $numVisiteur
     * @return bool
     */
    public function update_visitor($numVisiteur)
    {
        try {
            global $pdo;

            $stmt = $pdo->prepare("UPDATE visiteur SET nom=:nom, nbJours=:nbJours, tarifJournalier=:tarifJournalier WHERE numVisiteur=:numVisiteur");

            return $stmt->execute([
                'numVisiteur' => $numVisiteur,
                'nom' => $this->nom,
                'nbJours' => $this->nbJours,
                'tarifJournalier' => $this->tarifJournalier
            ]);
        } catch (\Throwable $th) {
            return false;
        }
    }

    /**
     * Delete a specific visitor
     *
     * @param string $numVisiteur
     * @return bool
     */
    public function delete_visitor($numVisiteur)
    {
        try {
            global $pdo;

            $stmt = $pdo->prepare("DELETE FROM visiteur WHERE numVisiteur=:numVisiteur");

            return $stmt->execute(['numVisiteur' => $numVisiteur]);
        } catch (\Throwable $th) {
            return false;
        }
    }

    /**
     * Check if a visitor exists by numVisiteur
     *
     * @param string $numVisiteur
     * @return bool
     */
    public function visitor_exists($numVisiteur)
    {
        try {
            global $pdo;

            $stmt = $pdo->prepare("SELECT COUNT(*) FROM visiteur WHERE numVisiteur = :numVisiteur");
            $stmt->execute(['numVisiteur' => $numVisiteur]);

            $count = $stmt->fetchColumn();
            return $count > 0;
        } catch (\Throwable $th) {
            return false;
        }
    }
}
