<?php
error_reporting(0); 
header('Content-Type: text/plain; charset=utf-8');

class result {
	public $loc = "";
	public $hit = "";
}

$specialChars="ABCDEFGHJIKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΨΧΩάὰᾶἀἁἄἅἂἃἆἇᾴᾲᾷᾀᾁᾄᾅᾂᾃᾆᾇΆᾺἈἉἌἍἊἋἎἏἏᾈᾉᾌἍᾊᾋᾎᾏᾹέὲἐἑἔἕἒἓΈῈἘἙἜἝἚἛῥῬίὶῖἰἱἴἵἲἳἶἷῐΐῒῗΊῚἸἹἼἽἺἻἾἿόὸὀὁὄὅὂὃΌῸὈὉὌὍὊὋήὴῆἠἡἤἥἢἣἦἧῄῂῇᾐᾑᾔᾕᾒᾓᾖᾗΉῊἨἩἬἭἪἫἮἯᾘᾙᾜᾝᾚᾛᾞᾟώὼῶὠὡὤὥὢὣὦὧῴῲῷᾠᾡᾤᾥᾢᾣᾦᾧΏῺὨὩὬὭὪὫὮὯᾨᾩᾬᾭᾪᾫᾮᾯύὺῦὐὑὔὕὒὓὖὗΰῢῧΎῪὙὝὛὟ";
$markDownChars="abcdefghjiklmnopqrstuvwxyzaßγδεζηθικλμνξοπρστυφχψωααααααααααααααααααααααααααααααααααααααααααεεεεεεεεεεεεεεεερριιιιιιιιιιιιιιιιιιιιιιιιιοοοοοοοοοοοοοοοοηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωυυυυυυυυυυυυυυυυυυυυ";


$fragmentsPath = "../fragments/encodedFragments/";
$resultsList = array();

if (empty($_GET)==1) {
    echo "No search term entered. Please go back and try again.";	
}

else {
$searchTerm = $_GET["q"];
$fragments = scandir($fragmentsPath);

if($fragments==false) {
echo "No fragments to search; something on the server end has been misconfigured.";
}

else {
    foreach ($fragments as $frag) {
    if (stristr($frag, '.xml')!=false) {
    searchFrag($frag);  
}
}
    $JSONResult = json_encode($resultsList);
    echo $JSONResult;
    }
}


function searchFrag($frag) {
global $fragmentsPath, $specialChars, $markDownChars, $searchTerm, $resultsList;

$doc = new DOMDocument();
$doc->load($fragmentsPath."/".$frag);
$xpath = new DOMXpath($doc);
$xpath->registerNamespace('tei', 'http://www.tei-c.org/ns/1.0');

if ($_GET["con"]!="true") {
$scope = "//tei:lg"; }
else {
$scope = "//tei:text"; }

$elements = $xpath->query($scope."//text()[contains(
translate(., '$specialChars', '$markDownChars')
,
translate('$searchTerm', '$specialChars','$markDownChars')

)]");

if (is_null($elements)) { return 0; }

else { foreach ($elements as $element) {
	$newResult = new result();
	$newResult->loc = stristr($frag, '.xml', true);
	$newResult->hit = trim($element->nodeValue);
	array_push($resultsList, $newResult);
} }
}

?>