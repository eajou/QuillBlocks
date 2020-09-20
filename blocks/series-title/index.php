<?php

namespace KrystalM\Quill\Blocks\SeriesTitle;

add_action('plugins_loaded', __NAMESPACE__ . '\register_dynamic_block');

function register_dynamic_block() {
  if (!function_exists('register_block_type')) {
    return;
  }

  register_block_type('krystalm-quill/series-title', array(
    'render_callback' => __NAMESPACE__ . '\render_dynamic_block'
  ));
}

function render_dynamic_block($attributes) {
  // Parse attributes
  $series_title = $attributes['title'];
  $series_summary = $attributes['summary'];
  
  ob_start(); // Turn on output buffering

  /* BEGIN HTML OUTPUT */
?>
  <div class="section">
    <div class="series-display">
      <div class="bkg">
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
