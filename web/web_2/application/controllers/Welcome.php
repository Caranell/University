<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Welcome extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->helper('url', 'form');
		$this->load->library('form_validation');
		$this->load->library('MY_Form_validation');
		$this->load->model('Matrix_model', 'helper');
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
			$matrix = $this->helper->matrixGenerate($size);
			
			$data['matrix'] = $matrix;
			$data['det'] =  $this->helper->determinat($matrix, count($matrix) - 1);
			$data['reverseMatrix'] = $this->helper->matrixReverse($matrix);
			$data['horReverseMatrix'] = $this->helper->matrixSwapHor($matrix);
			$data['verReverseMatrix'] = $this->helper->matrixSwapVer($matrix);
			$this->load->view('matrix_view', $data);
		}
	}
	public function matrix2()
	{ }
}
