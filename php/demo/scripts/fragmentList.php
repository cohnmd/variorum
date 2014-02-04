<?php
error_reporting(0); 
$fragmentsPath = "../fragments/transformedFragments/";
$fragmentsList = array();
$dirContents = scandir($fragmentsPath);

if($dirContents==false) {
echo "No fragments to search; something on the server end has been misconfigured.";
}


else {
    foreach ($dirContents as $element) {
	$test = stristr($element, '.html', true);
	
    if ($test!=false) {
    array_push($fragmentsList, $test);  
	}
}

    natsort($fragmentsList);
    $fragmentsList = array_values($fragmentsList);
    echo json_encode($fragmentsList);
}

?>