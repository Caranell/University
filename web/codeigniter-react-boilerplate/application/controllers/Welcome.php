<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Welcome extends CI_Controller
{


	public function __construct()
	{
		parent::__construct();
		$this->load->library('session');
		$this->load->database();
		$this->load->helper('url');
		$this->load->helper('util');
		$this->load->model('Car_model', 'cars_model');
	}


	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function test()
	{
		header('Content-Type: application/json');
		$this->cars_model->generateCars(10);
		$this->cars_model->getCars();
	}
	public function table()
	{
		// loading the script/css only in this page
		// for more information about this function, check the util_helper;
		load_js(["app"], "js_assets");

		$this->load->view('welcome_message');
	}

	public function item()
	{
		// loading the script/css only in this page
		// for more information about this function, check the util_helper	
		load_js(["app"], "js_assets");

		$this->load->view('contributing');
	}
	public function testing()
	{
		$this->load->library('unit_test');
		$this->db->select('COUNT(license_plate)');
		$this->db->join();
		$this->db->distinct();
		$test =  count($this->db->get('cars_table')->result());
		
	}
}
