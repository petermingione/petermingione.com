<?php

ini_set('display_errors', 1);

error_reporting(E_ALL);

if (isset($_POST['answers'])) {

    $answers = json_decode($_POST['answers']);


    // Setup database connection to the remote host
    $con = mysqli_connect('suapanel.db.6867230.hostedresource.com','suapanel','a%2GGmZVQTXZ4','suapanel');
    
    if (mysqli_connect_errno()) {
        die('Could not connect: ' . mysqli_connect_error());
    }

    $sql="insert into sua_survey_answers (country, gender, age_group, sua_level, answer_date) values (?, ?, ?, ?, CURDATE());";

    $stmt = $con->prepare($sql);

    $stmt->bind_param('ssdd', $answers->country, $answers->gender, $answers->ageGroup, $answers->suaLevel);

    $stmt->execute();
    
    $stmt->close();

    mysqli_close($con);
}

?>