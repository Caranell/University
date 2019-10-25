<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Welcome extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('url', 'form');
		$this->load->helper('download');
		$this->load->helper('print_matrix_helper');
		$this->load->library('encryption');
		$this->load->library('form_validation');
		$this->load->library('MY_Form_validation');
		$this->load->library('encryption');
		$this->load->model('Matrix_model', 'matrix_helper');
		$this->load->model('File_model', 'file_helper');
	}
	public function index()
	{
		$this->load->view('dialog_view');
	}
	public function dialog()
	{
		$this->load->view('dialog_view');
	}
	public function matrix()
	{
		$this->form_validation->set_rules(
			'size',
			'размер матрицы',
			'required|valid_size|small_size',
			array(
				'required' => 'Необходимо задать %s',
				'valid_size' => 'Некорректная запись в поле "%s"',
				'small_size' => '%s должен находиться в границах 1-7'
			)
		);

		if ($this->form_validation->run() == FALSE) {
			$this->load->view('dialog_view');
		} else {
			$size = $this->input->post('size');
			$matrix = $this->matrix_helper->matrixGenerate($size);

			$data['matrix'] = $matrix;
			$data['det'] =  $this->matrix_helper->determinat($matrix, count($matrix) - 1);
			$data['reverseMatrix'] = $this->matrix_helper->matrixReverse($matrix);
			$data['horReverseMatrix'] = $this->matrix_helper->matrixSwapHor($matrix);
			$data['verReverseMatrix'] = $this->matrix_helper->matrixSwapVer($matrix);
			$this->load->view('matrix_view', $data);
		}
	}
	public function downloadFile()
	{
		force_download('matrix.txt', $this->input->post('answerMatrix'));
	}
	public function matrix2()
	{
		$this->load->view('upload_view');
	}
	public function uploadFile()
	{
		$config['upload_path'] 			  	= './uploads/';
		$config['allowed_types']        = 'txt';
		$config['max_size']             = 500;

		$this->load->library('upload', $config);
		$this->upload->initialize($config);

		if (!$this->upload->do_upload('userfile')) {
			$error = array('error' => $this->upload->display_errors());
			$this->load->view('upload_view', $error);
		} else {
			$file = $this->upload->data('full_path');
			$this->file_helper->encrypt($file);
			$matrix = $this->file_helper->decrypt($file);
			$data['matrix'] = $matrix;
			$data['matrixRows'] = $this->matrix_helper->matrixAlternRow($matrix);
			$data['matrixColumns'] = $this->matrix_helper->matrixTranspon(
				$this->matrix_helper->matrixAlternRow(
					$this->matrix_helper->matrixTranspon($matrix)
				)
			);
			$this->load->view('matrix2_view', $data);
		}
	}
}
