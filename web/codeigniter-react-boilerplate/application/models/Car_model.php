<?php

class Car_model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('date');
		$this->load->helper('data_helper');
	}
	function getCars()
	{
		$query = $this->db->get('cars_table', 30);
		
		$data = [];
		foreach ($query->result() as $row) {
			array_push($data, $row);
		}
		echo json_encode($data);
	}
	function editCar($data)
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
		if ($data['id']) {
			$this->db->where('id');
			$this->db->update('cars_table', $new_data);
		} else {
			$this->db->insert('cars_table', $new_data);
		}
	}
	function deleteCar($id)
	{
		$this->db->delete('cars_table', array('id' => $id));
	}
	function generateCars($number)
	{
		$body_arr = getBodiesArray();
		$brands_arr = getBrandsArray();
		$brands_arr_len = count($brands_arr);
		$countries_arr = getCountriesArray();
		$countries_arr_len = count($countries_arr);
		$names_arr =  getNamesArray();
		$names_arr_len = count($names_arr);
		for ($i = 0; $i < $number; $i++) {
			$data = array(
				'body' => $body_arr[rand(0, 3)],
				'brand' => $brands_arr[rand(0, $brands_arr_len-1)],
				'car4x4' => rand(0, 1),
				'country' => $countries_arr[rand(0, $countries_arr_len-1)],
				'horses' => rand(15, 400),
				'license_plate' => chr(rand(97, 122)) . rand(0, 9) . rand(0, 9) . rand(0, 9) . chr(rand(97, 122)) . chr(rand(97, 122)) . rand(1, 9) . rand(1, 9),
				'production_date' => date('Y-m-d', rand(909705600, 1550000000)),
				'time100' => rand(3, 70),
				'owner' => $names_arr[rand(0, $names_arr_len - 1)],
			);
			$this->db->insert('cars_table', $data);
		}
	}
}
