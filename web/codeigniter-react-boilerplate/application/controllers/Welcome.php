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

	public function test()
	{
		header('Content-Type: application/json');
		$this->cars_model->generateCars(147000);
		$this->cars_model->getCars();
	}

	public function getPageRecords($page = 1)
	{
		header('Content-Type: application/json');
		$this->cars_model->getPageRecords($page);
	}
	public function getRecord($id){
		header('Content-Type: application/json');
		$this->cars_model->getRecord($id);
	}
	public function table()
	{
		load_js(["app"], "js_assets");
		$this->load->view('welcome_message');
	}

	public function item()
	{
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
