<?php
header('Content-Type: text/plain; charset=utf-8');
$specialChars="ABCDEFGHJIKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΨΧΩ
άὰᾶἀἁἄἅἂἃἆἇᾴᾲᾷᾀᾁᾄᾅᾂᾃᾆᾇΆᾺἈἉἌἍἊἋἎἏἏᾈᾉᾌἍᾊᾋᾎᾏᾹ
έὲἐἑἔἕἒἓΈῈἘἙἜἝἚἛ
ῥῬ
ίὶῖἰἱἴἵἲἳἶἷῐΐῒῗΊῚἸἹἼἽἺἻἾἿ
όὸὀὁὄὅὂὃΌῸὈὉὌὍὊὋ
ήὴῆἠἡἤἥἢἣἦἧῄῂῇᾐᾑᾔᾕᾒᾓᾖᾗ
ΉῊἨἩἬἭἪἫἮἯᾘᾙᾜᾝᾚᾛᾞᾟ
ώὼῶὠὡὤὥὢὣὦὧῴῲῷᾠᾡᾤᾥᾢᾣᾦᾧ
ΏῺὨὩὬὭὪὫὮὯᾨᾩᾬᾭᾪᾫᾮᾯ
";
$markDownChars="abcdefghjiklmnopqrstuvwxyzaßγδεζηθικλμνξοπρστυφχψωααααααααααααααααααααααααααααααααααααααααααεεεεεεεεεεεεεεεερριιιιιιιιιιιιιιιιιιιιιιιιιοοοοοοοοοοοοοοοοηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηηωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωωω";
$fragmentsPath = "../fragments/encodedFragments/kratesfr1.xml";

if (empty($_GET)==1) {
    echo "No search term entered. Please go back and try again.";	
}

else {
$searchTerm = $_GET["q"];
$fragments = scandir($fragmentsPath);

if($fragments==false) {
echo "No fragments for search; something has been misconfigured";
}

else {
    foreach ($fragmentsPath as $frag) {
    $result = searchFrag($frag);
    echo "\n".$frag.": ".$result;
    }
}
}


function searchFrag($frag) {

$doc = new DOMDocument();
$doc->load($fragmentsPath."/".$frag);
$xpath = new DOMXpath($doc);
$xpath->registerNamespace('tei', 'http://www.tei-c.org/ns/1.0');
$elements = $xpath->query("//tei:text//text()[contains(
translate(., '$specialChars', '$markDownChars')
,
translate('$searchTerm', '$specialChars','$markDownChars')

)]");

if (is_null($elements)) { return "No result"; }
else { foreach ($elements as $element) {

return $element->nodeValue; 
} }
}

?>