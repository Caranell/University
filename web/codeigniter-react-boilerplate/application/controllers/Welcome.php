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

	public function modifyRecord()
	{
		$id = $this->input->get('id');
		load_js(["app"], "js_assets");
		$data['id'] = $id;
		$this->load->view('editing', $data);
	}

	public function submitRecord()
	{
		header('Content-Type: application/json');
		// $data = json_decode(file_get_contents('php://input'), true);
		// echo $data['item']['license_plate'];
		$data = json_decode(file_get_contents('php://input'), true);
		// echo $data['item'];
		$this->cars_model->editRecord($data['item']);
	}

	public function getPageRecords($page = 1)
	{
		header('Content-Type: application/json');
		$data = json_decode(file_get_contents('php://input'), true);
		$this->cars_model->getPageRecords($page, $data['filter'], $data['sort']);
	}

	public function getRecord($id)
	{
		header('Content-Type: application/json');
		$this->cars_model->getRecord($id);
	}

	public function deleteRecord($id)
	{
		$this->cars_model->deleteRecord($id);
	}

	public function table()
	{
		load_js(["app"], "js_assets");
		$this->load->view('welcome_message');
	}

	public function generateUniqueRecord()
	{
		header('Content-Type: application/json');
		$data = $this->cars_model->generateRecords(1)[0];
		echo json_encode($data);
	}

	public function testing()
	{
		$this->load->library('unit_test');
		$this->db->select('COUNT(license_plate)');
		$this->db->join();
		$this->db->distinct();
		$test = count($this->db->get('cars_table')->result());
	}
}
