<?php

namespace KrystalM\Quill\Blocks\Series;

add_action('plugins_loaded', __NAMESPACE__ . '\register_dynamic_block');

function register_dynamic_block() {
  if (!function_exists('register_block_type')) {
    return;
  }

  register_block_type('krystalm-quill/series', array(
    'render_callback' => __NAMESPACE__ . '\render_dynamic_block'
  ));
}

function render_dynamic_block($attributes) {
  // Parse attributes
  $series_imageObj = $attributes['image'];
  $series_image_url = $series_imageObj['sizes']['full']['url'];
  $series_image_alt_text = $series_imageObj['alt']; 

  $series_id = $attributes['id'];
  $series_title = $attributes['title'];
  $series_summary = $attributes['summary'];
  
  ob_start(); // Turn on output buffering

  /* BEGIN HTML OUTPUT */
?>
  <div class="series-display">

    <?php if ($series_id) : ?>
      <div id="<?php echo $series_id; ?>" class="series">
    <?php else: ?>
      <div id="" class="series">
    <?php endif; ?>

      <?php if ($series_image_url) : ?>
        <div class="image">
          <img src="<?php echo $series_image_url; ?>" alt="<?php echo $series_image_alt_text; ?>">
        </div>
      <?php endif; ?>          

      <div class="info">
        <h2><?php echo $series_title; ?></h2>
        
        <div class="series-summary">
          <?php echo $series_summary; ?>
        </div>
      </div>

    </div>
  
  </div>

<?php
  /* END HTML OUTPUT */

  $output = ob_get_contents(); // collect output
  ob_end_clean(); // Turn off ouput buffer

  return $output; // Print output
}
