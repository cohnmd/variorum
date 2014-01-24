<?php
header('Content-Type: text/plain; charset=utf-8');
$specialChars="ABCDEFGHJIKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΨΧΩ";
$markDownChars="abcdefghjiklmnopqrstuvwxyzaßγδεζηθικλμνξοπρστυφχψω";
echo $test;

$searchTerm="Context";
echo "\n";
if (isset($searchTerm==1) {
	$searchTerm = $_GET["q"];
}

echo "Searcing for ".$searchTerm."....";

$doc = new DOMDocument();
$doc->load('../fragments/encodedFragments/kratesfr1.xml');
$xpath = new DOMXpath($doc);
$xpath->registerNamespace('tei', 'http://www.tei-c.org/ns/1.0');
$elements = $xpath->query("//tei:text//text()[contains(
translate(., '$specialChars', '$markDownChars')
,
translate('$searchTerm', '$specialChars','$markDownChars')

)]");

if (is_null($elements)) { echo "NULL"; }
else { foreach ($elements as $element) {

echo "\n".$element->nodeValue; 
} }

?>