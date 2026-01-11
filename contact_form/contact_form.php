<?php
// Paramétrage du formulaire de contact
$from = 'Contact form <formulaire@mon-portfolio.com>';
$sendTo = 'csfwebdesign@gmail.com';
$subject = 'New message from contact form';
$fields = array('name' => 'Name', 'email' => 'Email', 'message' => 'Message');
$okMessage = "Votre message a bien été envoyé. Merci de m'avoir contacté.";
$errorMessage = "Il y a eu une erreur lors de l'envoi du message. Veuillez réessayer plus tard.";

// Validation du formulaire
try {
    $emailText = nl2br("Vous avez un nouveau message provenant du formulaire de CONTACT de votre portefolio\n");

    foreach ($_POST as $key => $value) {

        if (isset($fields[$key])) {
            $emailText .= nl2br("$fields[$key]: $value\n");
        }
    }

    // Récupère l'email du visiteur pour le champ "Répondre à"
    $replyToEmail = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    $headers = array(
        'Content-Type: text/html; charset="UTF-8";',
        'From: ' . $from,
        'Reply-To: ' . $replyToEmail,
        'Return-Path: ' . $from,
    );

    mail($sendTo, $subject, $emailText, implode("\n", $headers));

    $responseArray = array('type' => 'success', 'message' => $okMessage);
} catch (\Exception $e) {
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
} else {
    echo $responseArray['message'];
}