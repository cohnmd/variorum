<?php
error_reporting(0); 
require "Mail.php";
header('Content-Type: text/plain; charset=utf-8');
$submission = $_GET["sug"];
$subj = $_GET["code"];
$sender    = "projectvariorum+sender@gmail.com";
$recipient = "projectvariorum+recipient@gmail.com";
   $server   = "ssl://smtp.gmail.com";
   $username = "projectvariorum@gmail.com";
   $password = file_get_contents('../../../../ekey');
   $port     = "465";
$test = false;
 $headers = array(
      "From"    => $sender,
      "To"      => $recipient,
      "Subject" => $subj
   );
   
    $smtp = Mail::factory("smtp",
      array(
        "host"     => $server,
        "username" => $username,
        "password" => $password,
        "auth"     => true,
        "port"     => 465
      )
   );
   $mail = $smtp->send($recipient, $headers, $submission);

   if (PEAR::isError($mail)) {
      echo 0;
   }
   else {
	echo 1;
	}
?>