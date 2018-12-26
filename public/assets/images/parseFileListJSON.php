<?php
header('Content-Type: application/json');
$dir          = "./FurretTurret_SHINY_HD_SPRITES"; //path

$list = array(); //main array

if(is_dir($dir)){
    if($dh = opendir($dir)){
        while(($file = readdir($dh)) != false){

            if($file == "." or $file == ".."){
                //...
            } else { //create object with two fields
                $list3 = array(
                'file' => htmlentities($file), 
                // 'size' => filesize($file)
              );
                array_push($list, $list3);
                // break;
            }
        }
    }
    // print_r($list);
    echo json_encode($list);
}