<?php

namespace KrystalM\Quill\Blocks\Series;

add_action('plugins_loaded', __NAMESPACE__ . '\register_dynamic_block');

function register_dynamic_block() {
  if (!function_exists('register_block_type')) {
    return;
  }

  register_block_type('krystalm-quill/book-details', array(
    'render_callback' => __NAMESPACE__ . '\render_dynamic_block'
  ));
}

function render_dynamic_block($attributes) {
  // Parse attributes
  $series_imageObj = $attributes['image'];
  $series_image_url = $series_imageObj['sizes']['full']['url'];
  $series_image_alt_text = $series_imageObj['alt'];

  $series_title = $attributes['title'];
  $series_summary = $attributes['summary'];
  $series_link = $attributes['link'];

  ob_start(); // Turn on output buffering

  /* BEGIN HTML OUTPUT */
?>
  <div class="section">
    <div class="series-details">

      <h3>
        <?php echo $series_title; ?>
      </h3>

      <?php if ($series_image_url) : ?>
        <img 
          class="series-image" 
          src="<?php echo $series_image_url; ?>" 
          alt="<?php echo $series_image_alt_text; ?>"  />
      <?php endif; ?>

      <div class="series-summary">
        <?php echo $series_summary; ?>
      </div>

      <?php if ($series_link) : ?>
        <button>
          <?php echo $series_link; ?>
        </button>
      <?php endif; ?>
    </div>
  </div>

<?php
  /* END HTML OUTPUT */

  $output = ob_get_contents(); // collect output
  ob_end_clean(); // Turn off ouput buffer

  return $output; // Print output
}