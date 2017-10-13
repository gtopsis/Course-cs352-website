<?php

    session_start();
    if ($_SESSION['authenticated'] == true) {
        $file = $_GET['filePath'];
        
        if (file_exists($file)) {
            
            $pieces = explode("/", $file);
            
            header('Content-Description: File Transfer');
            if($pieces[2] == "pdf"){
                header('Content-Type: application/pdf'); // NOTE file type
                header('Content-Disposition: attachment; filename="'.basename($file).'"');
                header('Expires: 0');
                header('Cache-Control: must-revalidate');
                header('Pragma: public');
                header('Content-Length: ' . filesize($file));
            }else if ($pieces[2] == "pptx"){
                header('Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation'); // NOTE file type
                header('Content-Disposition: attachment; filename="'.basename($file).'"');
                header('Expires: 0');
                header('Cache-Control: must-revalidate');
                header('Pragma: public');
                header('Content-Length: ' . filesize($file));
            }else if ($pieces[2] == "zip"){
                header("Content-Transfer-Encoding: Binary");
                header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
                header("Cache-Control: public");
                header("Content-Description: File Transfer");
                header("Content-type: application/zip");
                header('Content-Disposition: attachment; filename="'.basename($file).'"');
                header("Content-Transfer-Encoding: binary");
                header('Content-Length: ' . filesize($file));
            }


            readfile($file);
            exit;
        }else{
            http_response_code(404);
            exit('File does not exist');
        }
    }else{
        http_response_code(401);        
        exit;
    }
?>