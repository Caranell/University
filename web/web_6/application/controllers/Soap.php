<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Soap extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->model('Car_model', 'cars_model');
  }
  public function index()
  {
    ini_set("soap.wsdl_cache_enabled", 0);
    ini_set('soap.wsdl_cache_ttl', 0);
    $server = new SoapServer("carservice.wsdl");
    $server->setObject($this);
    $server->handle();
  }

  public function getCars($params)
  {
    // file_put_contents("log.txt", serialize($params));
    $sorting = (array) $params;
    $TEST = $this->cars_model->list($sorting['offset'], $sorting['orderBy'], $sorting['direction']);
    return array("status" => true, "carList" => $TEST);
  }

  public function modifyCar($params)
  {
    $values = (array) $params;
    $this->cars_model->editRecord($values);
  }

  public function deleteCar($params)
  {
    $this->cars_model->deleteRecord($params);
    return array("status" => true);
  }
}
