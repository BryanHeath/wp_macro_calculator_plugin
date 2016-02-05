<?php
/*
 * Plugin Name: wp_macro_calculator_plugin
 * Version: 1.0
 * Plugin URI: http://www.hughlashbrooke.com/
 * Description: This is your starter template for your next WordPress plugin.
 * Author: Hugh Lashbrooke
 * Author URI: http://www.hughlashbrooke.com/
 * Requires at least: 4.0
 * Tested up to: 4.0
 *
 * Text Domain: wp-macro-calculator-plugin
 * Domain Path: /lang/
 *
 * @package WordPress
 * @author Hugh Lashbrooke
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Load plugin class files
require_once( 'includes/class-wp-macro-calculator-plugin.php' );
require_once( 'includes/class-wp-macro-calculator-plugin-settings.php' );

// Load plugin libraries
require_once( 'includes/lib/class-wp-macro-calculator-plugin-admin-api.php' );
require_once( 'includes/lib/class-wp-macro-calculator-plugin-post-type.php' );
require_once( 'includes/lib/class-wp-macro-calculator-plugin-taxonomy.php' );

/**
 * Returns the main instance of wp_macro_calculator_plugin to prevent the need to use globals.
 *
 * @since  1.0.0
 * @return object wp_macro_calculator_plugin
 */
function wp_macro_calculator_plugin () {
	$instance = wp_macro_calculator_plugin::instance( __FILE__, '1.0.0' );

	if ( is_null( $instance->settings ) ) {
		$instance->settings = wp_macro_calculator_plugin_Settings::instance( $instance );
	}

	return $instance;
}

wp_macro_calculator_plugin();