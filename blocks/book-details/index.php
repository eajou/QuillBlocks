<?php

namespace KrystalM\Quill\Blocks\BookDetails;

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
  $book_details_imageObj = $attributes['image'];
  $book_details_image_url = $book_details_imageObj['sizes']['full']['url'];
  $book_details_image_alt_text = $book_details_imageObj['alt'];
  $book_details_image_width = $book_details_imageObj['sizes']['full']['width'] / 2;

  $book_details_title = $attributes['title'];
  $book_details_summary = $attributes['summary'];

  ob_start(); // Turn on output buffering

  /* BEGIN HTML OUTPUT */
?>
  <div class="section">
    <div class="series-details">

      <h3>
        <?php echo $book_details_title; ?>
      </h3>

      <?php if ($book_details_image_url) : ?>
        <img class="series-image" src="<?php echo $book_details_image_url; ?>" alt="<?php echo $book_details_image_alt_text; ?>" width="<?php echo $book_details_image_width; ?>" />
      <?php endif; ?>

      <div class="series-summary">
        <?php echo $book_details_summary; ?>
      </div>
    </div>
  </div>

<?php
  /* END HTML OUTPUT */

  $output = ob_get_contents(); // collect output
  ob_end_clean(); // Turn off ouput buffer

  return $output; // Print output
}
