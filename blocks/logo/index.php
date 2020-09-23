<?php

namespace KrystalM\Quill\Blocks\Logo;

add_action('plugins_loaded', __NAMESPACE__ . '\register_dynamic_block');

function register_dynamic_block() {
  if (!function_exists('register_block_type')) {
    return;
  }

  register_block_type('krystalm-quill/logo', array(
    'render_callback' => __NAMESPACE__ . '\render_dynamic_block'
  ));
}

function render_dynamic_block($attributes) {
  // Parse attributes
  $series_imageObj = $attributes['image'];
  $series_image_url = $series_imageObj['sizes']['full']['url'];
  $series_image_alt_text = $series_imageObj['alt']; 
  
  ob_start(); // Turn on output buffering

  /* BEGIN HTML OUTPUT */
?>
  <div class="container">
    <div class="subhead">
      <div class="logo">
        <img src="<?php echo $series_image_url; ?>" alt="<?php echo $series_image_alt_text; ?>">
      </div>
    </div>
  </div>    

<?php
  /* END HTML OUTPUT */

  $output = ob_get_contents(); // collect output
  ob_end_clean(); // Turn off ouput buffer

  return $output; // Print output
}
