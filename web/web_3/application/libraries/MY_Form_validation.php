<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class MY_Form_validation extends CI_Form_validation
{
	protected $CI;

	public function __construct()
	{
		parent::__construct();
		// reference to the CodeIgniter super object
		$this->CI = &get_instance();
	}

	public function valid_size($size)
	{
		$int_value = ctype_digit($size) ? intval($size) : null;
		return $int_value !== null;
	}

	public function small_size($size)
	{
		return $this->valid_size($size) && intval($size) > 0 && intval($size) < 8;
	}
}
