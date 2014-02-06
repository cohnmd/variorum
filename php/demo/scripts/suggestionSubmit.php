<?php
error_reporting(0); 
require "Mail.php";
header('Content-Type: text/plain; charset=utf-8');
$sug = $_GET["sug"];
$or = $_GET["or"];
$subj = $_GET["code"];
$sender    = "projectvariorummailer@gmail.com";
$recipient = "projectvariorum+suggestions@gmail.com";
$server   = "ssl://smtp.gmail.com";
$username = "projectvariorummailer@gmail.com";
$password = file_get_contents('../../../../ekey');
$port     = "465";

if ($or!=null && $subj!=null) {
 $submission = "Re:".$or."\n\n".$sug;
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
   }
  else { echo "submission failure"; }
?>