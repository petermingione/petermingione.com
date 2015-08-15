<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$answersSQL1 = "select answer_date, sua_level from sua_survey_answers order by answer_date;";
$meansSQL1 = "select answer_date, avg(sua_level) as mean from sua_survey_answers group by answer_date;";

$answersSQL2 = "select country, sua_level from sua_survey_answers where country is not null order by country;";
$meansSQL2 = "select country, avg(sua_level) as mean from sua_survey_answers where country is not null group by country;";

$answersSQL3 = "select gender, sua_level from sua_survey_answers where gender is not null order by gender;";
$meansSQL3 = "select gender, avg(sua_level) as mean from sua_survey_answers where gender is not null group by gender;";

$answersSQL4 = "select age_group, sua_level from sua_survey_answers where age_group is not null order by age_group;";
$meansSQL4 = "select age_group, avg(sua_level) as mean from sua_survey_answers where age_group is not null group by age_group;";

$output = array();

// Get data for graphs.
getData($answersSQL1, $meansSQL1);
getData($answersSQL2, $meansSQL2);
getData($answersSQL3, $meansSQL3);
getData($answersSQL4, $meansSQL4);

// Return json to client
// echo json_encode($output);

// Return jsonp to client
echo $_GET['callback'] . '(' . json_encode($output) . ')';

function getData($answersSQL, $meansSQL) {
	global $output;
	
	// Setup database connection to the remote host:
	$con = mysqli_connect('suapanel.db.6867230.hostedresource.com','suapanel','a%2GGmZVQTXZ4','suapanel');

	if (mysqli_connect_errno()) {
		die('Could not connect: ' . mysqli_connect_error());
	}

	// Get answers.
	$result = mysqli_query($con, $answersSQL);
	$answers = array();
	while($row = $result->fetch_array(MYSQL_ASSOC)) {
		$answers[] = $row;
	}
	$answers = array("answers" => $answers);

	// Get means.
	$result = mysqli_query($con, $meansSQL);
	$means = array();
	while($row = $result->fetch_array(MYSQL_ASSOC)) {
		$means[] = $row;
	}
	$means = array("means" => $means);

	// Close database connections.
	$result->close();
	mysqli_close($con);

	// Combine and add data to array.
	$combined = array_merge($answers, $means);
	array_push($output, $combined);
}

?>