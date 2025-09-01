<?
	include "left_menu_title_view.inc";
/*
                  <!-- parent pages--><a class='nav-link' href='../dashboard/steel_e-commerce.html' role='button'>
                    <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-euro-sign'></span></span><span class='nav-link-text ps-1'>글로벌 금융</span>
                    </div>
                  </a>
*/
	function fopen_url_return($fopen_url)
	{
		unset($ch); unset($return_data);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); // https 접속시
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_URL, "$fopen_url");
		$return_data = curl_exec($ch);
		curl_close($ch);

		return $return_data;
	}

	$fopen_url = "http://www.fdatabox.com/api_json/json_weather_text_return.html?kpc_log=samwoo&weather_symbol=108";

	$return_data = fopen_url_return($fopen_url);
	$weather_json_imsi = explode("=",$return_data);

	//echo "<center>";
	foreach($weather_json_imsi as $key => $value)
	{
		unset($imsi);

		$imsi = explode(",",$value);

		if(strstr($imsi[0],"temp_sido_name")) $temp_sido_name = $imsi[1];
		$weather_json[$imsi[0]] = $imsi[1];

		//echo "$key/$imsi[0]/=>$value<BR>";
	}
	//echo "<center>$return_data----------/$weather_json[temp_sido_name]/temp_sido_name===>$temp_sido_name/--------------------<BR>$fopen_url<BR>";exit;

/*
3=>utf-8">temp_sido_name:/서울특별시/
4=>temp_curr:10.3℃
5=>temp_high:12.0℃
6=>temp_low:10.3℃
7=>temp_humidity:72.0%
8=>temp_rain_daily:0㎜
9=>temp_updown:+1.3
10=>temp_wind10_speed:0.6m/s(고요)
11=>temp_sibun_um:음.9월04일:己酉
12=>temp_sibun:10월 18일 오전 3:04
13=>temp_sky,맑음
14=>temp_pty,없음
15=>temp_sky_png,sky_s1.png
//../assets/img/icons/weather-icon.png
14=>temp_time,04:58
*/
	if($weather_json[temp_pty] == "없음" and $weather_json[temp_sky]) $temp_sky = $weather_json[temp_sky];
	else $temp_sky = $weather_json[temp_pty];
	if(!$temp_sky) $temp_sky = "=맑음=";

	$temp_sky_png = $weather_json[temp_sky_png];

	$top_weather_view = "
                  <div class=\"col-sm-auto d-flex align-items-center\">
				 <div class=\"card-body pt-2\">
				   <div class=\"row g-0 h-100 align-items-center\">
					<div class=\"col\">
					  <div class=\"d-flex align-items-center\"><img class=\"me-3\" src=\"http://www.fdatabox.com/farmair_jeonju/image/$temp_sky_png\" alt=\"\" height=\"60\" />
					    <div>
						 <h6 class=\"mb-2\">$temp_sido_name</h6>
						 <div class=\"fs--2 fw-semi-bold\">
						   <div class=\"text-warning\">$temp_sky:$weather_json[temp_wind10_speed_name] $weather_json[temp_time]</div>습도: $weather_json[temp_humidity]
						 </div>
					    </div>
					  </div>
					</div>
					<div class=\"col-auto text-center ps-2\">
					  <div class=\"fs-4 fw-normal font-sans-serif text-primary mb-1 lh-1\">$weather_json[temp_curr]</div>
					  <div class=\"fs--1 text-800\">최고:$weather_json[temp_high]/최저:$weather_json[temp_low]</div>
					</div>
				   </div>
				 </div>
                  </div>";

	$top_logo_title_view = "<div class=\"d-flex align-items-center\"><img class=\"me-2\" src=\"https://www.steelwhere.com/superboard/data/siteconfig/2022061309182216550795024805.jpg\" alt=\"\" width=\"40\" /><span class=\"font-sans-serif text-primary\">스틸웨어</span></div>";

	unset($return_data); unset($weather_json_imsi);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$master_field_list = array(
		"title_name",
		"datadate_curr",
		"close_curr",
		"datadate1",

		"close1",
		"updown1",
		"per1",
		"close_sum1",
		"close_avg1",
		"datadate1",

		"close2",
		"updown2",
		"per2",
		"close_sum2",
		"close_avg2",

		"datadate3",
		"close3",
		"updown3",
		"per3",
		"close_sum3",
		"close_avg3",

		"datadate4",
		"close4",
		"updown4",
		"per4",
		"close_sum4",
		"close_avg4",
	);

	if(!$menu_num) $menu_num = 11;
	include "../../../steel_where/table_code_name_info.inc";

	$top_title_menu_num = $left_menu_new[$menu_num];

	$fopen_url = "http://210.116.114.218/api_json/api_steel_read_function_json_pummok.html?kpc_log=$kpc_log&menu_sw=menu_$menu_num";

	$return_data = fopen_url_return($fopen_url);
	$data_json_return = explode("\n",$return_data);


	if($test2) echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><center><font size=2>$fopen_url<BR>";

	$k = 1; $k5 = 0;
	foreach($data_json_return as $key => $value)
	{
		if(!$value) continue;

		if($test2) {echo " $key => $value <BR>"; }

		unset($imsi);
		$imsi = explode("=",$value);

		$data_categories_json["categories_json_$k"] = str_replace("'","\"",$imsi[1]);

		if(strstr($imsi[0],"master"))
		{
			$table_field = str_replace("master_","",$imsi[0]);

			//if($test2) echo "key: $key=>$value ========table_field:$table_field-------------------------------<BR>";
			$k1 = 1;
			foreach($master_field_list as $key2 => $field_name2)
			{
				$data_master_value = $imsi[$k1];

				if(strstr($field_name2,"close")) $data_master["{$table_field}_{$field_name2}"] = number_format($data_master_value);
				else						   $data_master["{$table_field}_{$field_name2}"] = $data_master_value;

				//if($test2) echo "k1:$k1 ============/{$table_field}_{$field_name2}/--------/data_master_value:$data_master_value/<BR>";
				$k1++;
			}
			continue;
		}

		//if($k == 5 or $k == 6 or $k == 7)
		{
			$k5++;
			$activeUsersChartReportInit_data[$k5] = "$imsi[2]";
			$activeUsersChartReportInit_categories[$k5] = "$imsi[1]";
			$activeUsersChartReportInit_title[$k5] = str_replace("-"," ","$imsi[3]");
		}

		$data_categories_json["data_json_$k"]   = $imsi[2];
		$data_categories_json["title_name_$k"]  = $imsi[3];


		//////////////////////////////////////
		//if($k < 5)
		{
			unset($imsi_split);
			$imsi_split = explode(",",$imsi[2]);
			foreach($imsi_split as $key_2 => $val_2)
			{
				if($val_2) $close_max_min_imsi[] = $val_2;
			}

			$linePaymentChartInit .= "'succed_{$k}': [$imsi[2]],\n";
			$linePaymentChartInit_selected .= "<option value=\"succed_{$k}\">$imsi[3]</option>\n";
		}
		//////////////////////////////////////

		if(strstr($imsi[3],"="))
		{
			unset($imsi2);
			$imsi2 = explode("=",$imsi[3]);
			$data_categories_json["title_name_2_$k"] = $imsi2[1];
		}
		else
		{
			$data_categories_json["title_name_2_$k"] = $imsi[3];
		}

		$data_categories_json["close_init_$k"]	= ($imsi[4]);
		$data_categories_json["close_$k"]		= number_format($imsi[4]);
		$data_categories_json["updown_$k"]		= $imsi[5];
		$data_categories_json["percent_$k"]	= $imsi[6];

		if($imsi[6] > 0)	  $data_categories_json["updown_mark_$k"] = "up";
		else if($imsi[6] < 0) $data_categories_json["updown_mark_$k"] = "down";

		$data_categories_json["close_max_$k"]	= $imsi[7];
		$data_categories_json["close_min_$k"]	= $imsi[8];

		if($test2) echo "$key => /$imsi[11]/$imsi[22]//$imsi[3]//$imsi[4]//$imsi[5]//$imsi[6]/<BR>";
		$klist_num[$k] = $k;
		$k++;
	}

	$linePaymentChartInit_labels_title = $data_categories_json["categories_json_1"];
	$linePaymentChartInit_max = max($close_max_min_imsi);
	$linePaymentChartInit_min = min($close_max_min_imsi)-10;
	//echo "=>$linePaymentChartInit_labels_title<BR>linePaymentChartInit_max:$linePaymentChartInit_max / linePaymentChartInit_min:$linePaymentChartInit_min"; exit;
//					    <option value=\"all\">$data_history_json[title_name_1]</option>
//					    <option value=\"successful\" selected=\"selected\">$data_history_json[title_name_2]</option>


	foreach($activeUsersChartReportInit_data as $key => $val)
	{
		unset($imsi);
		$imsi = explode(",",$val);
		foreach($imsi as $key2=>$val2)
		{
			if($val2) $activeUsersChartReportInit_max_min[] = $val2;
		}
	}
	$activeUsersChartReportInit_min = min($activeUsersChartReportInit_max_min);


	if($test2) exit;

	$close_sum_12_13_14_15 = $data_categories_json[close_12]+$data_categories_json[close_13]+$data_categories_json[close_14]+$data_categories_json[close_15];
	$close_sum_12_13_14_15 = number_format($close_sum_12_13_14_15);

     $close_sum_8_10_12_14 = $data_categories_json[close_8]+$data_categories_json[close_10]+$data_categories_json[close_12]+$data_categories_json[close_14];
	$close_sum_8_10_12_14 = number_format($close_sum_8_10_12_14);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



	$key = 1;
	foreach($dataportal_data_top_sub3["menu_{$menu_num}"] as $key3 => $table_imsi)
	{
		unset($imsi3);
		$imsi3 = explode("=",$table_imsi);

		$fopen_url = "http://www.fdatabox.com/api_json/api_steel_table_text_view_One_json.html?kpc_log=$kpc_log&menu_sw=menu_{$menu_num}&table_name=$imsi3[0]&field_name_init=$imsi3[1]";


		$return_data = fopen_url_return($fopen_url);

		unset($data_json_return);

		$data_json_return = explode("\n",$return_data);

		$k = 1;

		$table_name_imsi = $table_code_name_table["$imsi3[0]"]["$imsi3[1]"];

		$data_history_json["title_name_{$key}"] = $table_name_imsi;

		foreach($data_json_return as $key2 => $value)
		{

			unset($imsi);
			$imsi = explode("=",$value);

			$data_history_json["datadate_{$key}_$k"]    = str_replace(" ","",$imsi[0]);
			$close_curr  = str_replace(",","",$imsi[1]);
			$data_history_json["close_curr_{$key}_{$k}_number_format"]  = number_format($close_curr);
			$data_history_json["close_curr_{$key}_$k"]  = $close_curr;

			if($key >= 3 and $k == 1)
			{
				$close_max_min_map["close_curr_{$key}_$k"] = $close_curr;

				if($imsi[3] > 0)	  $data_history_json["updown_mark_$key"] = "up";
				else if($imsi[3] < 0) $data_history_json["updown_mark_$key"] = "down";
			}

			$data_history_json["month1_close_{$key}_$k"] = number_format($imsi[2])."($imsi[3])";
			$data_history_json["month3_close_{$key}_$k"] = number_format($imsi[4])."($imsi[5])";
			$data_history_json["month6_close_{$key}_$k"] = number_format($imsi[6])."($imsi[7])";
			$data_history_json["month12_close_{$key}_$k"]= number_format($imsi[8])."($imsi[9])";


			//echo "close_curr_{$key}_$k----$key3 => $table_imsi => /$imsi[0]/$imsi[1]//$imsi[2]//$imsi[3]//$imsi[4]//$imsi[5]/$imsi[6]/$imsi[7]/$imsi[8]/$imsi[9]/-----$table_name_imsi<BR>";

			if($key >= 1)
			{
				$datadate = $imsi[0];
				$close    = str_replace(",","",$imsi[1]);
				if(!$close) $close = 0;

				$datadate_list[$datadate] = $datadate;
				$data_json_datadate[$datadate][$key] = $close;
			}
			$k++;
		}
		$key++;
	}
	asort($datadate_list);

	$userByLocationInit_map_max = max($close_max_min_map);
	$userByLocationInit_map_min = min($close_max_min_map);

	//////////////////////////////////////////////////////////////////////
	unset($imsi2);
	$imsi2 = explode(",",$data_categories_json[categories_json_1]);

	$tmax2 = sizeof($imsi2);

	$tmax2_avg = sprintf("%d",$tmax2 / 4);

	unset($xAxis_json);
	foreach($imsi2 as $key2 => $val2)
	{
		if($key2 % $tmax2_avg == 0)
		{
			$xAxis_json .= "{ xAxis: $key2 },";
		}
	}
	$xAxis_json .= "{ xAxis: $key2 }";

	//$xAxis_json = substr($xAxis_json,0,-1);
	//echo "=================$xAxis_json/"; exit;
	//////////////////////////////////////////////////////////////////////

?>