<!DOCTYPE html>
<?php 
  function base_url(){
    return 'http://localhost/sss/';

    // return 'http://www.habilestudio.com/sss/';
  }
?>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet" type="text/css" href="assets/css/style.css">

    <script src="<?php echo base_url(); ?>local_cdn/svg.min.js"></script>
    <script src="<?php echo base_url(); ?>local_cdn/svg.shapes.min.js"></script>

    <script src="<?php echo base_url(); ?>local_cdn/babel.min.js"></script>


    <script type="text/babel"
            src="<?php echo base_url(); ?>assets/js/helper.js"></script>
    <script type="text/babel"
            src="<?php echo base_url(); ?>assets/js/data.js"></script>
    <script type="text/babel"
            src="<?php echo base_url(); ?>assets/js/interface.js"></script>
    <script type="text/babel"
            src="<?php echo base_url(); ?>assets/js/drawing.js"></script>
    
