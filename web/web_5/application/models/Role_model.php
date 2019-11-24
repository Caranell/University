<?php

class Role_model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('date');
		ini_set('max_execution_time', 0);
	}

	function getRecord($id)
	{
		$query = $this->db->get_where('Roles', array('id' => $id));
		$data['item'] = $query->result();
		echo json_encode($data);
	}

	function getRecords()
	{
		$roles = $this->db->get('Roles')->result_array();
		echo json_encode($roles);
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

	function deleteRelations($role)
	{ 
		
	}
	function deleteRecord($id)
	{
		$this->db->delete('Roles', array('id' => $id));
	}
}
