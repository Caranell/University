<?php

class Soap extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->database();
    $this->load->helper('url');
    $this->load->helper('util');
    $this->load->model('Car_model', 'cars_model');
    ini_set("soap.wsdl_cache_enabled", 0);
    ini_set('soap.wsdl_cache_ttl', 0);
  }
  public function index()
  {
    ini_set("soap.wsdl_cache_enabled", "0");
    $server = new SoapServer("http://localhost:3000/carservice.wsdl");
    $server->setObject($this);
    $server->handle();
  }
  // public function index()
  // {
  //   $server = new SoapServer("carsService.wsdl");
  //   $server->addFunction("getRecords");
  //   $server->addFunction("modifyRecord");
  //   $server->addFunction("deleteRecord");
  //   $server->handle();
  // }

  public function getCars($params)
  {
    $values = (array) $params;
    $this->cars_model->list($values['offset'], $values['sort'], $values['direction']);
  }

  public function modifyCar($params)
  {
    $values = (array) $params;
    $this->cars_model->editRecord($values);
  }

  public function deleteCar($params)
  {
    $values = (array) $params;
    $this->cars_model->deleteRecord($values['id']);
  }
}
