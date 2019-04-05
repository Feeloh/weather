<?php
class Weathers extends MX_Controller
{
    public function __construct()
    {
        parent::__construct();
        //load required model
        $this->load->model("weather_model");         
    }
    public function save_weather_details($weather_detail_id,$city_name,$temparature,$humidity)
    {
      $saved_weather_details = $this->weather_model->save_weather_details($weather_detail_id,$city_name,$temparature,$humidity);
      if($saved_weather_details == true)
      {
          echo ("Weather Details Saved Successfully");
      }
      else
      {
          echo ("Sorry Weather Details Not Saved");
      }
    }
    public function get_weather_details($city_name)
    {     
        $all_weather = $this->weather_model->get_weather_details($city_name);
        if($all_weather->num_rows() > 0)
        {
            $weather = $all_weather->result();                
            $weather_encoded = json_encode($weather);
            echo $weather_encoded;         
        } 
        else 
        {
            $error = 'No weather details found';
            $message = json_encode($error);
            echo $message;
        }
    }
}
