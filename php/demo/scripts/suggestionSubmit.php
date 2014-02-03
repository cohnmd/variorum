<?php
error_reporting(0); 
require "Mail.php";
header('Content-Type: text/plain; charset=utf-8');
$submission = "TEST";//$_GET["sug"];
$subj = "TEST";//$_GET["code"];
$sender    = "projectvariorum@gmail.com";
$recipient = "projectvariorum@gmail.com";
   $server   = "ssl://smtp.gmail.com";
   $username = "projectvariorum@gmail.com";
   $password = "estebar1";
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

/*if (!is_null($submission) && !is_null($code)) {
$address = "projectvariorum@gmail.com";
$test = mail($address, $code, $submission);
if ($test==false) { echo 0; }
else { echo 1; }
}*/
?>