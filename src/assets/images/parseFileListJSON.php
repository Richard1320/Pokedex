<?php
header('Content-Type: application/json');

$list = array(); //main array

$multidir = array(
  'regular'=>'./FurretTurret_REGULAR_HD_SPRITES',
  'shiny'=>'./FurretTurret_SHINY_HD_SPRITES',
);

foreach($multidir as $key => $dir) {
  $list[$key] = array();
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
          $list[$key][] = $list3;
        }
      }
    }
    // print_r($list);
  }
}

  echo json_encode($list);