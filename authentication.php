<?php
    session_start();
    $secretpassword = 'fffa64ae40fbfa64f556290c56b356eea67e3cd852f7f303944ecfd041c02be2'; // ẗext: classAllhy352

    if ($_SESSION['authenticated'] == true) {
       exit;
    } else {
        
        $error = null;
        if (!empty($_POST)) {
            $password = empty($_POST['password']) ? null : $_POST['password'];
            
            if ($password == $secretpassword) {
                $_SESSION['authenticated'] = true;
                http_response_code(200);
                exit;
            } else {
               http_response_code(403);
               exit('Incorrect password');
           }
       }
       http_response_code(401);
       echo $error;
       exit('Unauthorized access');
    }
?> 