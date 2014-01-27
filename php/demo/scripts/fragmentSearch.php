<?php
header('Content-Type: text/plain; charset=utf-8');
$specialChars="ABCDEFGHJIKLMNOPQRSTUVWXYZÎ‘Î’Î“Î”Î•Î–Î—Î˜Î™ÎšÎ›ÎœÎÎžÎŸÎ Î¡Î£Î¤Î¥Î¦Î¨Î§Î©
Î¬á½°á¾¶á¼€á¼á¼„á¼…á¼‚á¼ƒá¼†á¼‡á¾´á¾²á¾·á¾€á¾á¾„á¾…á¾‚á¾ƒá¾†á¾‡Î†á¾ºá¼ˆá¼‰á¼Œá¼á¼Šá¼‹á¼Žá¼á¼á¾ˆá¾‰á¾Œá¼á¾Šá¾‹á¾Žá¾á¾¹
Î­á½²á¼á¼‘á¼”á¼•á¼’á¼“Îˆá¿ˆá¼˜á¼™á¼œá¼á¼šá¼›
á¿¥á¿¬
Î¯á½¶á¿–á¼°á¼±á¼´á¼µá¼²á¼³á¼¶á¼·á¿Îá¿’á¿—ÎŠá¿šá¼¸á¼¹á¼¼á¼½á¼ºá¼»á¼¾á¼¿
ÏŒá½¸á½€á½á½„á½…á½‚á½ƒÎŒá¿¸á½ˆá½‰á½Œá½á½Šá½‹
Î®á½´á¿†á¼ á¼¡á¼¤á¼¥á¼¢á¼£á¼¦á¼§á¿„á¿‚á¿‡á¾á¾‘á¾”á¾•á¾’á¾“á¾–á¾—
Î‰á¿Šá¼¨á¼©á¼¬á¼­á¼ªá¼«á¼®á¼¯á¾˜á¾™á¾œá¾á¾šá¾›á¾žá¾Ÿ
ÏŽá½¼á¿¶á½ á½¡á½¤á½¥á½¢á½£á½¦á½§á¿´á¿²á¿·á¾ á¾¡á¾¤á¾¥á¾¢á¾£á¾¦á¾§
Îá¿ºá½¨á½©á½¬á½­á½ªá½«á½®á½¯á¾¨á¾©á¾¬á¾­á¾ªá¾«á¾®á¾¯
";
$markDownChars="abcdefghjiklmnopqrstuvwxyzaÃŸÎ³Î´ÎµÎ¶Î·Î¸Î¹ÎºÎ»Î¼Î½Î¾Î¿Ï€ÏÏƒÏ„Ï…Ï†Ï‡ÏˆÏ‰Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±Î±ÎµÎµÎµÎµÎµÎµÎµÎµÎµÎµÎµÎµÎµÎµÎµÎµÏÏÎ¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¹Î¿Î¿Î¿Î¿Î¿Î¿Î¿Î¿Î¿Î¿Î¿Î¿Î¿Î¿Î¿Î¿Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Î·Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰Ï‰";
$fragmentsPath = "../fragments/encodedFragments/";

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
    $result = searchFrag($frag);
    echo "\n".$frag.": ".$result;
    }
 }
    }
}


function searchFrag($frag) {
global $fragmentsPath, $specialChars, $markDownChars, $searchTerm;

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