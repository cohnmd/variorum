<?php
require_once 'google-api-php-client/src/Google_Client.php';
require_once 'google-api-php-client/src/contrib/Google_FusiontablesService.php';

const CLIENT_ID = '11727539956-d3o5988vu0kar1adkjkmsmolbc1ja50s.apps.googleusercontent.com';
const FT_SCOPE = 'https://www.googleapis.com/auth/fusiontables';
const SERVICE_ACCOUNT_NAME = '11727539956-d3o5988vu0kar1adkjkmsmolbc1ja50s@developer.gserviceaccount.com';
const KEY_FILE = '../../../../key.p12';

      
        $client = new Google_Client();
        $client->setApplicationName("API Project");
        $client->setClientId(CLIENT_ID);
        $key = file_get_contents(KEY_FILE);
	
        $client->setAssertionCredentials(new Google_AssertionCredentials(
                SERVICE_ACCOUNT_NAME,
                array('https://www.googleapis.com/auth/fusiontables'),
                $key)
        );
	
	if ($client->getAuth()->isAccessTokenExpired()) {
            $client->getAuth()->refreshTokenWithAssertion();
        }

	$service = new Google_FusiontablesService($client);
	$fragNum = $_GET["num"];
	$tag = $_GET["tag"];
	$testQ = "insert into 1zaUYJa9cPl90Buj5l8QsmJwyEBKRDWJtGuMwrHg ('Number', 'Tag') VALUES (".$fragNum.", ".$tag.")";

	$resp = $service->query->sql($testQ);
	echo $resp;	
	echo "\tdone";
?>