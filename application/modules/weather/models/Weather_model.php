<?php

class Weather_model extends CI_Model
{
    public function save_weather_details($weather_detail_id,$city_name,$temparature,$humidity)
    {
        $data = array(
            'city_name' => $city_name,
            'temparature' => $temparature,
            'humidity' => $humidity,
        );
        $this->db->where('weather_detail_id', $weather_detail_id);
        if($this->db->update("weather_detail", $data)) 
        {
            return true;
        } 
        else 
        {
            return false;
        }
    }
    public function get_weather_details($city_name)
    {
        $data = array(
            'city_name' => $city_name,
        );
        $this->db->select('*');
        $this->db->where($data);
        $weather_details = $this->db->get("weather_detail");
        return $weather_details;
    }
}