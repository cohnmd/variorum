<?php
error_reporting(0); 
header('Content-Type: text/plain; charset=utf-8');
$submission = $_GET["sug"];
$code = $_GET["code"];
$test = false;
if (!is_null($submission) && !is_null($code)) {
$address = "projectvariorum@gmail.com";
$test = mail($address, $code, $submission);
if ($test==false) { echo 0; }
else { echo 1; }
}
?>