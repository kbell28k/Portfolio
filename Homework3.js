<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Captain Planet: The Game</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <!-- Bootstrap File -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">



  <!-- JQuery -->
  <script src="https://code.jquery.com/jquery.js"></script>

</head>



function generatePassword (length) {
	var password = '', character; 
	while (length > password.length) {
		if (password.indexOf(character = String.fromCharCode(Math.floor(Math.random() * 94) + 33), Math.floor(password.length / 94) * 94) < 0) {
			password += character;
		}
	}
	return password;
}