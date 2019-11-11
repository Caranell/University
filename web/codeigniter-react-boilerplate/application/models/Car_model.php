<?php

class Car_model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('date');
		$this->load->helper('data_helper');
		$this->load->library('pagination');
		ini_set('max_execution_time', 0);
	}

	function getRecord($id)
	{
		$query = $this->db->get_where('cars_table', array('id' => $id));
		$data['item'] = $query->result();
		echo json_encode($data);
	}

	function getPageRecords($page, $filter, $sort)
	{
		$countAll = $this->db->count_all('cars_table');
		$per_page = 20;
		if ($page != 0) {
			$offset = ($page - 1) * $per_page;
		}
		$this->db->limit($per_page, $page);

		if ($sort) {
			$this->db->order_by($sort['column'], $sort['direction']);
		}
		if ($filter) {
			//TODO
		}


		$cars = $this->db->get('cars_table')->result_array();

		// pagination
		$config['base_url'] = base_url() . 'welcome/getPageRecords';
		$config['use_page_numbers'] = TRUE;
		$config['total_rows'] = $countAll;
		$config['per_page'] = $per_page;
		$this->pagination->initialize($config);
		$data['pagination'] = $this->pagination->create_links();

		$data['cars'] = $cars;
		$data['page'] = $page;

		echo json_encode($data);
	}

	function editRecord($data)
	{
		$new_data = array(
			'body' => $data['body'],
			'brand' => $data['brand'],
			'car4x4' => $data['car4x4'],
			'country' => $data['country'],
			'horses' => $data['horses'],
			'license_plate' => $data['license_plate'],
			'production_date' => $data['production_date'],
			'time100' => $data['time100'],
			'owner' => $data['owner']
		);
		if ($this->checkUnique($data['license_plate'])) {
			if (isset($data['id'])) {
				$this->db->where('id', $data['id']);
				$this->db->update('cars_table', $new_data);
			} else {
				$this->db->insert('cars_table', $new_data);
			}
			$error = false;
		} else {
			$error = true;
		}
		echo json_encode($error);
	}

	function deleteRecord($id)
	{
		$this->db->delete('cars_table', array('id' => $id));
	}

	function checkUnique($license_plate)
	{
		$test_plate = $this->db->get_where('cars_table', array('license_plate' => $license_plate))->result_array();
		return !(count($test_plate));
	}

	function generateRecords($number)
	{
		$body_arr = getBodiesArray();
		$brands_arr = getBrandsArray();
		$brands_arr_len = count($brands_arr);
		$countries_arr = getCountriesArray();
		$countries_arr_len = count($countries_arr);
		$names_arr =  getNamesArray();
		$names_arr_len = count($names_arr);
		$generatedCars = [];
		for ($i = 0; $i < $number; $i++) {
			$data = array(
				'body' => $body_arr[rand(0, 3)],
				'brand' => $brands_arr[rand(0, $brands_arr_len - 1)],
				'car4x4' => rand(0, 1),
				'country' => $countries_arr[rand(0, $countries_arr_len - 1)],
				'horses' => rand(15, 400),
				'license_plate' => $this->getRandLetter() . rand(0, 9) . rand(0, 9) . rand(0, 9) . $this->getRandLetter() . $this->getRandLetter() . rand(1, 9) . rand(0, 9) . rand(0, 9),
				'production_date' => date('Y-m-d', rand(909705600, 1550000000)),
				'time100' => rand(3, 70),
				'owner' => $names_arr[rand(0, $names_arr_len - 1)],
			);
			if ($this->checkUnique($data['license_plate'])) {
				array_push($generatedCars, $data);
			} else {
				$number++;
				//$this->db->insert('cars_table', $data);
			}
		}
		return $generatedCars;
	}

	function getRandLetter()
	{
		$allowedLetters = array(
			'E', 'T', 'O', 'P', 'A', 'H', 'K', 'C', 'B', 'X', 'M', 'Y'
		);
		return $allowedLetters[rand(0, count($allowedLetters) - 1)];
	}
}
