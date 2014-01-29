<?php
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
    echo json_encode($fragmentsList);
}

?>