<?php
/**
 *  Bootstrap file to launch the plugin.
 *
 *  @wordpress-plugin
 *  Plugin Name: QuillBlocks
 *  Plugin URI:  https://github.com/eajou
 *  Description: Plugin to create QuillBlocks, an author plugin.
 *  Version:     0.1
 *  Author:      Krystal Metzler
 *  Author URI:  https://lylaoweds.com
 *  License:     GPL2+
 *  License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

namespace KrystalM\Quill;

//  Exit if accessed directly.
defined('ABSPATH') || exit;

// Gets this plugin's absolute directory path.
function _get_plugin_directory() {
  return __DIR__;
}

// Gets this plugin's URL.
function _get_plugin_url() {
  static $plugin_url;

  if (empty($plugin_url)) {
    $plugin_url = plugins_url(null, __FILE__);
  }

  return $plugin_url;
}

// Enqueue JS and CSS
include __DIR__ . '/lib/enqueue-scripts.php';

// Load dynamic blocks
include __DIR__ . '/blocks/book-details/index.php';
