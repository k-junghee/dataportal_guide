<?
	include "left_menu_title_view.inc";

		///////////////////////////////////////////////////////////////////////////////////////
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

	$top_logo_title_view = "<div class=\"d-flex align-items-center\"><img class=\"me-2\" src=\"https://www.steelwhere.com/superboard/data/siteconfig/2022061309182216550795024805.jpg\" alt=\"\" width=\"40\" /><span class=\"font-sans-serif text-primary\">DataPortal</span></div>";

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

if(strstr($PHP_SELF,"steel_crm"))
{
	$fopen_url = "http://www.fdatabox.com/api_json/api_steel_read_function_json_crm.html?kpc_log=$kpc_log&menu_sw=steel_crm";

	$return_data = fopen_url_return($fopen_url);
	$data_json_return = explode("\n",$return_data);

	//echo "<center>";
	if($test) echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><center>";

	$k = 1;
	foreach($data_json_return as $key => $value)
	{
		if(!$value) continue;
		unset($imsi);
		$imsi = explode("=",$value);

		if($k > 7) $data_categories_json["categories_json_$k"] = $imsi[1];
		else		 $data_categories_json["categories_json_$k"] = str_replace("'","\"",$imsi[1]);

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

				if($test) echo "k1:$k1 ============/{$table_field}_{$field_name2}/--------/data_master_value:$data_master_value/<BR>";
				$k1++;
			}
			continue;
		}

		$data_categories_json["data_json_$k"]   = $imsi[2];

		$data_categories_json["title_name_$k"]  = $imsi[3];

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

		$data_categories_json["close_max_$k"]	= $imsi[7];
		$data_categories_json["close_min_$k"]	= $imsi[8];

		if($test) echo "$key => /$imsi[11]/$imsi[22]//$imsi[3]//$imsi[4]//$imsi[5]//$imsi[6]/<BR>";
		$k++;
	}
     $close_sum_4_5_6_7 = $data_categories_json[close_4]+$data_categories_json[close_5]+$data_categories_json[close_6]+$data_categories_json[close_7];
	$close_sum_4_5_6_7 = number_format($close_sum_4_5_6_7);

     $close_sum_8_10_12_14 = $data_categories_json[close_8]+$data_categories_json[close_10]+$data_categories_json[close_12]+$data_categories_json[close_14];
	$close_sum_8_10_12_14 = number_format($close_sum_8_10_12_14);

	if($test) exit;

	//          0        1            2             3             4         5              6
	//      테이블    카테고리      데이터       타이틀명       종가       등락          등락율%
	//echo "$tname=$categories_json=$data_json=$table_name_title=$close_last=$close_updown=$close_percent\n";


/*
$data_master[steel_raw_daily_data_data_1_title_name];
$data_master[steel_row_daily_data_1_close_curr];
$data_master[steel_row_daily_data_1_close2];
$data_master[steel_row_daily_data_1_per2];
$data_master[steel_row_daily_data_1_close3];
$data_master[steel_row_daily_data_1_per3];
$data_master[steel_row_daily_data_1_close4];
$data_master[steel_row_daily_data_1_per4];

echo "$data_categories_json[title_name_8]<BR>";
echo "$data_categories_json[title_name_9]<BR>";
echo "$data_categories_json[categories_json_8]<BR>";
echo "$data_categories_json[data_json_8]<BR>";
exit;
			$dataportal_data_top_sub2["열연강판"] = array(
				"steel_raw_daily_data=data_1",//"철광석(Fe 62%)", 1
				"steel_raw_daily_data=data_4",//쇳물구매원가 2
				"steel_raw_daily_china=data_2",//열연 3
				"steel_export_week=data_2",//"철근 오퍼", 4
				"db_sugub_week_korea_pummok=data_2",//"열연=중국산(SS400)", 5
				"db_sugub_month_china=data_4",//"철강재=수출량(만톤)", 6
				"db_sugub_month_korea=data_2",//"제법별=고로(만톤)", 7

				"db_sugub_month_steel_all=data_19",//"열연강판=생산(만톤)", 8
				"db_sugub_month_steel_all=data_20",//"열연강판=출하(만톤)", 9

				"db_sugub_month_steel_all=data_25",//"냉연강판=생산(만톤)", 10
				"db_sugub_month_steel_all=data_26",//"냉연강판=출하(만톤)", 11

				"db_sugub_month_steel_all=data_28",//"아연도강판=생산(만톤)",12
				"db_sugub_month_steel_all=data_29",//"아연도강판=출하(만톤)",13

				"db_sugub_month_steel_all=data_34",//"컬러강판=생산(만톤)",  14
				"db_sugub_month_steel_all=data_35",//"컬러강판=출하(만톤)",   15
			    );
*/
}
else if(strstr($PHP_SELF,"steel_lms"))
{
	$fopen_url = "http://www.fdatabox.com/api_json/api_steel_read_function_json_crm.html?kpc_log=$kpc_log&menu_sw=steel_lms";

	$return_data = fopen_url_return($fopen_url);
	$data_json_return = explode("\n",$return_data);

	//echo "<center>";
	if($test) echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><center>";

	$k = 1;
	foreach($data_json_return as $key => $value)
	{
		if(!$value) continue;
		unset($imsi);
		$imsi = explode("=",$value);

		if($k > 7) $data_categories_json["categories_json_$k"] = $imsi[1];
		else		 $data_categories_json["categories_json_$k"] = str_replace("'","\"",$imsi[1]);

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

		$data_categories_json["data_json_$k"]   = $imsi[2];

		$data_categories_json["title_name_$k"]  = $imsi[3];

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

		if($test) echo "$key => /$imsi[11]/$imsi[22]//$imsi[3]//$imsi[4]//$imsi[5]//$imsi[6]/<BR>";
		$k++;
	}
     $close_sum_12_13_14_15 = $data_categories_json[close_12]+$data_categories_json[close_13]+$data_categories_json[close_14]+$data_categories_json[close_15];
	$close_sum_12_13_14_15 = number_format($close_sum_12_13_14_15);

     $close_sum_8_10_12_14 = $data_categories_json[close_8]+$data_categories_json[close_10]+$data_categories_json[close_12]+$data_categories_json[close_14];
	$close_sum_8_10_12_14 = number_format($close_sum_8_10_12_14);
/*
			$dataportal_data_top_sub2["철근"] = array(
				"db_sugub_week_korea_pummok=data_3",//"철근=국산",1
				"steel_raw_daily_china=data_1",//"철근",2
				"steel_export_week=data_2",//"철근 오퍼",3
				"steel_scrap_week_data=data_1",//"아시아 수입 가격(CFR)=대형모선 HMS No.1(8:2)",4
				"steel_scrap_week_data=data_2",//"아시아 수입 가격(CFR)=대만 컨테이너 HMS No.1(8:2)",5
				"steel_scrap_week_data=data_3",//"아시아 수입 가격(CFR)=일본 H2(엔, FOB)",6
				"steel_scrap_week_data=data_4",//"아시아 수입 가격(CFR)=중국 HRS101",7
				"steel_scrap_week_data=data_12",//"국내 철스크랩 가격(만원)=평균값",8
				"db_sugub_week_korea_pummok=data_4",//"철근=중국산",9

				"db_sugub_month_china=data_4",//"철강재=수출량(만톤)",10
				"db_sugub_month_korea=data_3",//"제법별=전기로(만톤)",11

				"db_sugub_month_steel_all=data_16",//"철근=생산(만톤)",12
				"db_sugub_month_steel_all=data_17",//"철근=출하(만톤)",13
				"db_sugub_month_steel_all=data_18",//"철근=재고(만톤)",14
				"db_sugub_month_korea_all=data_12",//"철근=수입(만톤)",15

			);
*/

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$dataportal_data_top_sub2_json["철근"] = array(
/*
		"db_sugub_week_korea_pummok=data_3",//"철근=국산",1
		"steel_raw_daily_china=data_1",//"철근",2
		"steel_export_week=data_2",//"철근 오퍼",3
		"steel_scrap_week_data=data_1",//"아시아 수입 가격(CFR)=대형모선 HMS No.1(8:2)",4
		"steel_scrap_week_data=data_2",//"아시아 수입 가격(CFR)=대만 컨테이너 HMS No.1(8:2)",5
		"steel_scrap_week_data=data_3",//"아시아 수입 가격(CFR)=일본 H2(엔, FOB)",6
		"steel_scrap_week_data=data_4",//"아시아 수입 가격(CFR)=중국 HRS101",7
		"steel_scrap_week_data=data_12",//"국내 철스크랩 가격(만원)=평균값",8
		"db_sugub_week_korea_pummok=data_4",//"철근=중국산",9
*/
		"db_sugub_month_china=data_4",//"철강재=수출량(만톤)",1
		"db_sugub_month_korea=data_3",//"제법별=전기로(만톤)",2

		"db_sugub_month_steel_all=data_16",//"철근=생산(만톤)",3
		"db_sugub_month_steel_all=data_17",//"철근=출하(만톤)",4
		"db_sugub_month_steel_all=data_18",//"철근=재고(만톤)",5
		"db_sugub_month_korea_all=data_12",//"철근=수입(만톤)",6

	);
	include "../../../steel_where/table_code_name_info.inc";

	$key = 1;
	foreach($dataportal_data_top_sub2_json["철근"] as $key3 => $table_imsi)
	{
		unset($imsi3);
		$imsi3 = explode("=",$table_imsi);

		$fopen_url = "http://www.fdatabox.com/api_json/api_steel_table_text_view_One_json.html?kpc_log=$kpc_log&menu_sw=steel_lms&table_name=$imsi3[0]&field_name_init=$imsi3[1]";

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

			$data_history_json["datadate_{$key}_$k"]   = $imsi[0];
			$data_history_json["close_curr_{$key}_$k"]  = $imsi[1];

			$data_history_json["month1_close_{$key}_$k"] = number_format($imsi[2])."($imsi[3])";
			$data_history_json["month3_close_{$key}_$k"] = number_format($imsi[4])."($imsi[5])";
			$data_history_json["month6_close_{$key}_$k"] = number_format($imsi[6])."($imsi[7])";
			$data_history_json["month12_close_{$key}_$k"]= number_format($imsi[8])."($imsi[9])";


			if($test) echo "close_curr_{$key}_$k----$key3 => $table_imsi => /$imsi[0]/$imsi[1]//$imsi[2]//$imsi[3]//$imsi[4]//$imsi[5]/$imsi[6]/$imsi[7]/$imsi[8]/$imsi[9]/-----$table_name_imsi<BR>";

			if($key >= 3)
			{
				$datadate = $imsi[0];
				$close    = $imsi[1];

				$datadate_list[$datadate] = $key;
				$data_json_datadate[$datadate][$key] = $close;
			}
			$k++;
		}

		$key++;
	}

	$k = 1; unset($courseEnrollmentsInit_json);

	$courseEnrollmentsInit_json_top = "'날짜','$data_history_json[title_name_3]','$data_history_json[title_name_4]','$data_history_json[title_name_5]'";

	$courseEnrollmentsInit_json = "[$courseEnrollmentsInit_json_top],\n";

	asort($datadate_list);
	foreach($datadate_list as $datadate => $key)
	{
		unset($close_imsi);

		$k2 = 1;
		foreach($data_json_datadate[$datadate] as $key2 => $close)
		{
			$close_imsi .= "$close,";
			if($k2 >= 3) break;
			$k2++;
		}
		$close_imsi = substr($close_imsi,0,-1);
		unset($imsi3);
		$imsi3 = explode(",",$close_imsi);
		if(sizeof($imsi3) != 3) continue;

		$courseEnrollmentsInit_json .= "['$datadate',$close_imsi],\n";

	}
	if($test) {echo "courseEnrollmentsInit_json<BR>$courseEnrollmentsInit_json";exit;}

	if(!$courseEnrollmentsInit_json)
	{
		$courseEnrollmentsInit_json = "
		  ['course', 'Free Course', 'Paid Course', 'On sale Course'],
		  ['Sun', 4300, 8500, 5000],
		  ['Mon', 8300, 7300, 4500],
		  ['Tue', 8600, 6200, 3600],
		  ['Wed', 7200, 5300, 4500],
		  ['Thu', 8000, 5000, 2600],
		  ['Fri', 5000, 7000, 8800],
		  ['Sat', 8000, 9000, 6000]
		";
	}

}
else if(strstr($PHP_SELF,"steel_saas"))
{
	$fopen_url = "http://www.fdatabox.com/api_json/api_steel_read_function_json_crm.html?kpc_log=$kpc_log&menu_sw=steel_saas";

	$return_data = fopen_url_return($fopen_url);
	$data_json_return = explode("\n",$return_data);


	if($test2) echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><center>";

	$k = 1; $k5 = 0;
	foreach($data_json_return as $key => $value)
	{
		if(!$value) continue;

		if($test2) {echo " $key => $value <BR>"; continue;}

		unset($imsi);
		$imsi = explode("=",$value);

		if($k > 7) $data_categories_json["categories_json_$k"] = $imsi[1];
		else		 $data_categories_json["categories_json_$k"] = str_replace("'","\"",$imsi[1]);

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

		$data_categories_json["data_json_$k"]   = $imsi[2];

		$data_categories_json["title_name_$k"]  = $imsi[3];

		if($k == 5 or $k == 6 or $k == 7)
		{
			$k5++;
			$activeUsersChartReportInit_data[$k5] = "$imsi[2]";
			$activeUsersChartReportInit_categories[$k5] = "$imsi[1]";
			$activeUsersChartReportInit_title[$k5] = str_replace("-"," ","$imsi[3]");
		}

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

		//echo "$key => /$imsi[11]/$imsi[22]//$imsi[3]//$imsi[4]//$imsi[5]//$imsi[6]/<BR>";
		$k++;
	}

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
/*
			$dataportal_data_top_sub2["철근"] = array(
				"db_sugub_week_korea_pummok=data_3",//"철근=국산",1
				"steel_raw_daily_china=data_1",//"철근",2
				"steel_export_week=data_2",//"철근 오퍼",3
				"steel_scrap_week_data=data_1",//"아시아 수입 가격(CFR)=대형모선 HMS No.1(8:2)",4
				"steel_scrap_week_data=data_2",//"아시아 수입 가격(CFR)=대만 컨테이너 HMS No.1(8:2)",5
				"steel_scrap_week_data=data_3",//"아시아 수입 가격(CFR)=일본 H2(엔, FOB)",6
				"steel_scrap_week_data=data_4",//"아시아 수입 가격(CFR)=중국 HRS101",7
				"steel_scrap_week_data=data_12",//"국내 철스크랩 가격(만원)=평균값",8
				"db_sugub_week_korea_pummok=data_4",//"철근=중국산",9

				"db_sugub_month_china=data_4",//"철강재=수출량(만톤)",10
				"db_sugub_month_korea=data_3",//"제법별=전기로(만톤)",11

				"db_sugub_month_steel_all=data_16",//"철근=생산(만톤)",12
				"db_sugub_month_steel_all=data_17",//"철근=출하(만톤)",13
				"db_sugub_month_steel_all=data_18",//"철근=재고(만톤)",14
				"db_sugub_month_korea_all=data_12",//"철근=수입(만톤)",15

			);
*/

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	include "../../../steel_where/table_code_name_info.inc";

	$dataportal_data_top_sub2_json["철광석"] = array(
/*
				"steel_raw_daily_data=data_4",//"쇳물구매원가",
				"steel_raw_daily_china=data_1",//"철근",
				"steel_export_week=data_2",//"철근 오퍼",
				"steel_scrap_week_data=data_1",//"아시아 수입 가격(CFR)=대형모선 HMS No.1(8:2)",
				"steel_scrap_week_data=data_3",//"아시아 수입 가격(CFR)=일본 H2(엔, FOB)",

				"db_sugub_10_daily=data_1",//"선철",
				"db_sugub_10_daily=data_2",//"철강재",
				"db_sugub_10_daily=data_3",//"조강",
*/

				"db_sugub_month_china=data_1",//"조강생산량(만톤)",
				"db_sugub_month_china=data_2",//"철광석=수입량(만톤)",

				"db_sugub_month_global=data_1",//"전세계(백만톤)",

				"db_sugub_month_global=data_2",//"중국(백만톤)",4
				"db_sugub_month_global=data_3",//"인도(백만톤)",5
				"db_sugub_month_global=data_4",//"일본(백만톤)",6
				"db_sugub_month_global=data_5",//"미국(백만톤)",7
				"db_sugub_month_global=data_6",//"러시아(백만톤)",8
				"db_sugub_month_global=data_7",//"한국(백만톤)",9
				"db_sugub_month_global=data_8",//"독일(백만톤)",10
				"db_sugub_month_global=data_9",//"브라질(백만톤)",11
				"db_sugub_month_global=data_10",//"튀르키예(백만톤)",12
				"db_sugub_month_global=data_11",//"이란(백만톤)",13
			);


	$key = 1;
	foreach($dataportal_data_top_sub2_json["철광석"] as $key3 => $table_imsi)
	{
		unset($imsi3);
		$imsi3 = explode("=",$table_imsi);

		$fopen_url = "http://www.fdatabox.com/api_json/api_steel_table_text_view_One_json.html?kpc_log=$kpc_log&menu_sw=steel_saas&table_name=$imsi3[0]&field_name_init=$imsi3[1]";


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

	$k = 1; unset($linePaymentChartInit);

	unset($close_imsi);
	foreach($datadate_list as $datadate => $key)
	{
		$close_imsi .= "'$datadate',";

		//echo "=>$datadate => $key<BR>";
	}
	//exit;
	$close_imsi = substr($close_imsi,0,-1);
	$linePaymentChartInit_labels_title = "$close_imsi";

	$key_list = array(
		"1"=>"all",
		"2"=>"successful",
		//"3"=>"failed",
		);

	$k2 = 1;
	foreach($key_list as $key => $tname)
	{
		unset($close_imsi);

		$k = 1;
		foreach($datadate_list as $datadate => $value2)
		{
			$close = $data_json_datadate[$datadate][$key];

			if(!$close or $close == 0 and $close_old) $close = $close_old;
			else $close_max_min[] = $close;

			$close_imsi .= "$close,";
			if($close) $close_old = $close;
			$k++;
		}
		$close_imsi = substr($close_imsi,0,-1);

		$linePaymentChartInit .= "$tname: [$close_imsi],\n";


		//if($k2 >= 3) break;
		$k2++;

	}
	$linePaymentChartInit_max = max($close_max_min);
	$linePaymentChartInit_min = min($close_max_min);

	//$linePaymentChartInit = substr($linePaymentChartInit,0,-2);

	//echo "<center>linePaymentChartInit<BR>$linePaymentChartInit<BR>$linePaymentChartInit_labels_title";exit;

	if(!$linePaymentChartInit)
	{
		$linePaymentChartInit = "
		    all: [4, 1, 6, 2, 7, 12, 4, 6, 5, 4, 5, 10],
		    successful: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8],
		    failed: [1, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 2]
		";
		$linePaymentChartInit_labels_title = "
		  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
		";
	}

	$userByLocationInit_map_max = max($close_max_min_map);
	$userByLocationInit_map_min = min($close_max_min_map);
     $trendingKeywordsData_json = "
      { name: '중국($data_history_json[close_curr_3_1])', value: $data_history_json[close_curr_3_1], color: '#2A7BE4' },
      { name: '인도($data_history_json[close_curr_4_1])', value: $data_history_json[close_curr_4_1], color: '#1956A6' },
      { name: '일본($data_history_json[close_curr_5_1])', value: $data_history_json[close_curr_5_1], color: '#195099' },
      { name: '미국($data_history_json[close_curr_6_1])', value: $data_history_json[close_curr_6_1], color: '#2A7BE4' },
      { name: '러시아($data_history_json[close_curr_7_1])', value: $data_history_json[close_curr_7_1], color: '#2A7BE4' },
      { name: '한국($data_history_json[close_curr_8_1])', value: $data_history_json[close_curr_8_1], color: '#1956A6' },
      { name: '독일($data_history_json[close_curr_9_1])', value: $data_history_json[close_curr_9_1], color: '#195099' },
      { name: '브라질($data_history_json[close_curr_10_1])', value: $data_history_json[close_curr_10_1], color: '#9DBFEB' },
      { name: '튀르키예($data_history_json[close_curr_11_1])', value: $data_history_json[close_curr_11_1], color: '#2A7BE4' },
      { name: '이란($data_history_json[close_curr_12_1])', value: $data_history_json[close_curr_12_1], color: '#1956A6' },
	";

		$userByLocationInit_map_json = "
		  {
		    name: 'China',
		    value: $data_history_json[close_curr_3_1]
		  },
		  {
		    name: 'India',
		    value: $data_history_json[close_curr_4_1]
		  },
		  {
		    name: 'Japan',
		    value: $data_history_json[close_curr_5_1]
		  },
		  {
		    name: 'United States',
		    value: $data_history_json[close_curr_6_1]
		  },
		  {
		    name: 'Russia',
		    value: $data_history_json[close_curr_7_1]
		  },
		  {
		    name: 'South Korea',
		    value: $data_history_json[close_curr_8_1]
		  },
		  {
		    name: 'Germany',
		    value: $data_history_json[close_curr_9_1]
		  },
		  {
		    name: 'Brazil',
		    value: $data_history_json[close_curr_10_1]
		  },
		  {
		    name: 'Turkey',
		    value: $data_history_json[close_curr_11_1]
		  },
		  {
		    name: 'Iran',
		    value: $data_history_json[close_curr_12_1]
		  }
		";
	if(!$userByLocationInit_map_json)
	{
		$userByLocationInit_map_json = "
		  {
		    name: 'China',
		    value: 1359821
		  },
		  {
		    name: 'India',
		    value: 1205624
		  },
		  {
		    name: 'Japan',
		    value: 127352
		  },
		  {
		    name: 'United States',
		    value: 2526
		  },
		  {
		    name: 'Russia',
		    value: 21861
		  },
		  {
		    name: 'South Korea',
		    value: 51452
		  },
		  {
		    name: 'Germany',
		    value: 83017
		  },
		  {
		    name: 'Brazil',
		    value: 195210
		  },
		  {
		    name: 'Turkey',
		    value: 72137
		  },
		  {
		    name: 'Iran',
		    value: 240676
		  },
		";
	}
}
else if(strstr($PHP_SELF,"steel_support-desk"))
{
	$fopen_url = "http://www.fdatabox.com/api_json/api_steel_read_function_json_crm.html?kpc_log=$kpc_log&menu_sw=steel_support-desk";

	$return_data = fopen_url_return($fopen_url);
	$data_json_return = explode("\n",$return_data);

	//echo "<center>";
	//echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">";

	$k = 1;
	foreach($data_json_return as $key => $value)
	{
		if(!$value) continue;

		//echo " $key => $value <BR>"; continue;

		unset($imsi);
		$imsi = explode("=",$value);

		if($k > 7) $data_categories_json["categories_json_$k"] = $imsi[1];
		else		 $data_categories_json["categories_json_$k"] = str_replace("'","\"",$imsi[1]);

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

		$imsi[3] = str_replace("-","<BR>",$imsi[3]);

		$data_categories_json["data_json_$k"]   = $imsi[2];

		$data_categories_json["title_name_$k"]  = $imsi[3];

		if(strstr($imsi[3],"="))
		{
			unset($imsi2);
			$imsi2 = explode("=",$imsi[3]);

			$imsi[2] = str_replace("-","<BR>",$imsi[2]);
			$imsi[2] = str_replace("=","<BR>",$imsi[2]);

			$data_categories_json["title_name_2_$k"] = str_replace("=","<BR>",$imsi2[1]);
		}
		else
		{
			$imsi[3] = str_replace("-","<BR>",$imsi[3]);
			$imsi[3] = str_replace("=","<BR>",$imsi[3]);

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

		//echo "$key => $k, /$imsi[11]/$imsi[22]//$imsi[3]//$imsi[4]//$imsi[5]//$imsi[6]/-----------------<BR>";
		$k++;
	}

     $close_sum_11_12_13 = $data_categories_json[close_11]+$data_categories_json[close_12]+$data_categories_json[close_13];
	$close_sum_11_12_13_number_format = number_format($close_sum_11_12_13);

     $close_sum_8_9_10 = $data_categories_json[close_8]+$data_categories_json[close_9]+$data_categories_json[close_10];
	$close_sum_8_9_10_number_format = number_format($close_sum_8_9_10);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$echartsNumberOfTicketsInit_labels_title = "
		    var xAxisData = [ $data_categories_json[categories_json_8] ];
		";
	$echartsNumberOfTicketsInit = "
		    $echartsNumberOfTicketsInit_labels_title
		    var data1 = [$data_categories_json[data_json_8]];
		    var data2 = [$data_categories_json[data_json_9]];
		    var data3 = [$data_categories_json[data_json_10]];
		    var data4 = [$data_categories_json[data_json_11]];
		";

	//echo "echartsNumberOfTicketsInit: $echartsNumberOfTicketsInit<BR>"; exit;
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$echartsUnresolvedTicketsInit_labels_title = "
		    var xAxisData = [ $data_categories_json[categories_json_11] ];
		";
	$echartsUnresolvedTicketsInit = "
		    $echartsUnresolvedTicketsInit_labels_title
		    var data1 = [$data_categories_json[data_json_11]];
		    var data2 = [$data_categories_json[data_json_12]];
		    var data3 = [$data_categories_json[data_json_13]];
		    var data4 = [$data_categories_json[data_json_8]];
		";

	//echo "echartsUnresolvedTicketsInit: $echartsUnresolvedTicketsInit<BR>"; exit;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$data_categories_json[title_name_cut_11] = "대형모선<BR>HMS";
	$data_categories_json[title_name_cut_12] = "흑해빌릿<BR>(FOB)";
	$data_categories_json[title_name_cut_13] = "터키철근<BR>(FOB)";
	$data_categories_json[title_name_cut_8]  = "아시아<BR>(CFR)<BR>대형모선";

	$dataportal_data_top_sub2_json["철스크랩"] = array(
/*
				"db_sugub_week_korea_pummok=data_1",//"열연=포스코대응재",
				"steel_scrap_week_data=data_12",//"국내 철스크랩 가격(만원)=평균값",
				"steel_raw_daily_data=data_4",//쇳물구매원가
				"steel_raw_daily_china=data_1",//"철근",
				"steel_export_week=data_2",//"철근 오퍼",

				"db_sugub_week_korea_pummok=data_4",//"철근=중국산",
				"db_sugub_week_korea_pummok=data_8",//"H형강=중국산",
*/
				"steel_scrap_week_data=data_1",//"아시아 수입 가격(CFR)=대형모선 HMS No.1(8:2)",
				"steel_scrap_week_data=data_2",//"아시아 수입 가격(CFR)=대만 컨테이너 HMS No.1(8:2)",
				"steel_scrap_week_data=data_3",//"아시아 수입 가격(CFR)=일본 H2(엔, FOB)",

				"steel_scrap_week_data=data_5",//"튀르키예(CFR)=대형모선 HMS No.1(8:2)",
				"steel_scrap_week_data=data_7",//"튀르키예(CFR)=※흑해 빌릿 수출가격(FOB)",
				"steel_scrap_week_data=data_8",//"튀르키예(CFR)=※터키 철근 수출가격(FOB)",
			);
/*
	include "../../../steel_where/table_code_name_info.inc";

	$key = 1;
	foreach($dataportal_data_top_sub2_json["철스크랩"] as $key3 => $table_imsi)
	{
		unset($imsi3);
		$imsi3 = explode("=",$table_imsi);

		$fopen_url = "http://www.fdatabox.com/api_json/api_steel_table_text_view_One_json.html?kpc_log=$kpc_log&menu_sw=steel_support-desk&table_name=$imsi3[0]&field_name_init=$imsi3[1]";


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

			$data_history_json["datadate_{$key}_$k"]    = $imsi[0];
			$close_curr  = str_replace(",","",$imsi[1]);
			$data_history_json["close_curr_{$key}_$k"]  = $close_curr;

			if($key >= 3 and $k == 1)
			{
				$close_max_min_map["close_curr_{$key}_$k"] = $close_curr;

				if($imsi[5] > 0)	  $data_history_json["updown_mark_$key"] = "up";
				else if($imsi[5] < 0) $data_history_json["updown_mark_$key"] = "down";
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

				$datadate_list[$datadate] = $key;
				$data_json_datadate[$datadate][$key] = $close;
			}
			$k++;
		}
		$key++;
	}
	asort($datadate_list);

	$k = 1; unset($linePaymentChartInit);

	unset($close_imsi);
	foreach($datadate_list as $datadate => $key)
	{
		$close_imsi .= "'$datadate',";
	}
	$close_imsi = substr($close_imsi,0,-1);
	$linePaymentChartInit_labels_title = "$close_imsi";

	$key_list = array(
		"1"=>"all",
		"2"=>"successful",
		"3"=>"failed",
		);

	$k2 = 1;
	foreach($key_list as $key => $tname)
	{
		unset($close_imsi);

		$k = 1;
		foreach($datadate_list as $datadate => $value2)
		{
			$close = $data_json_datadate[$datadate][$key];

			if(!$close or $close == 0) $close = 0;
			else $close_max_min[] = $close;

			$close_imsi .= "$close,";
			$k++;
		}
		$close_imsi = substr($close_imsi,0,-1);

		$linePaymentChartInit .= "$tname: [$close_imsi],\n";

		//if($k2 >= 3) break;
		$k2++;

	}
	$linePaymentChartInit_max = max($close_max_min);
	$linePaymentChartInit_min = min($close_max_min);

	//$linePaymentChartInit = substr($linePaymentChartInit,0,-2);

	//echo "<center>linePaymentChartInit<BR>$linePaymentChartInit<BR>$linePaymentChartInit_labels_title";exit;

	if(!$linePaymentChartInit)
	{
		$linePaymentChartInit_labels_title = "
		    var xAxisData = ['Mar 01', 'Mar 02', 'Mar 03', 'Mar 04', 'Mar 05', 'Mar 06'];
		";
		$linePaymentChartInit = "

		    $linePaymentChartInit_labels_title

		    var data1 = [45, 35, 55, 55, 55, 45];
		    var data2 = [58, 42, 65, 65, 65, 30];
		    var data3 = [38, 25, 42, 42, 42, 45];
		    var data4 = [62, 45, 75, 75, 75, 55];
		";
	}

	$userByLocationInit_map_max = max($close_max_min_map);
	$userByLocationInit_map_min = min($close_max_min_map);
*/
}

else if(strstr($PHP_SELF,"steel_e-commerce"))
{
	if($search_return) $upjong_name_init = $search_return;


	$search_return_auto_array = array(
		"IT서비스","가구","가스유틸리티","가정용기기와용품","가정용품","건강관리기술","건강관리업체및서비스","건강관리장비와용품","건설","건축자재","건축제품",
		"게임엔터테인먼트","광고","교육서비스","기계","기타금융","다각화된소비자서비스","다각화된통신서비스","담배","도로와철도운송","디스플레이장비및부품",
		"디스플레이패널","레저용장비와제품","무선통신서비스","무역회사와판매업체","문구류","반도체와반도체장비","방송과엔터테인먼트","백화점과일반상점","복합기업","부동산",
		"비철금속","사무용전자제품","상업서비스와공급품","생명과학도구및서비스","생명보험","생물공학","석유와가스","섬유의류신발호화품","소프트웨어","손해보험",
		"식품","식품과기본식료품소매","양방향미디어와서비스","에너지장비및서비스","우주항공과국방","운송인프라","은행","음료","인터넷과카탈로그소매","자동차",
		"자동차부품","전기유틸리티","전기장비","전기제품","전문소매","전자장비와기기","전자제품","제약","조선","종이와목재",
		"증권","창업투자","철강","출판","카드","컴퓨터와주변기기","통신장비","판매업체","포장재","항공사",
		"항공화물운송과물류","해운사","핸드셋","호텔레스토랑레저","화장품","화학",
		);

	foreach($search_return_auto_array as $key => $search_title_imsi3)
	{
		$search_auto_list .= "
				  <a class=\"dropdown-item px-x1 py-1 fs-0\" href=\"../dashboard/steel_e-commerce.html?search_return={$search_title_imsi3}\">
                        <div class=\"d-flex align-items-center\"><span class=\"badge fw-medium text-decoration-none me-2 badge-subtle-success\">업종</span>
                          <div class=\"flex-1 fs--1 title\">$search_title_imsi3</div>
                        </div>
                      </a>
				  ";
	}

	if(!$upjong_name_init) $upjong_name_init = "철강";
	$desc_limit = 10;

	$fopen_url = "http://www.fdatabox.com/api_json/api_stock_sise_updown_json.html?kpc_log=$kpc_log&menu_sw=steel_e-commerce&upjong_name_init=$upjong_name_init&chart_sw=upjong_sise&desc_limit=$desc_limit";

	if($test) echo "===>>    $fopen_url <BR>";

	$return_data = fopen_url_return($fopen_url);

	$data_json_return = explode("\n",$return_data);


/*
    0     1      2         3             4         5         6           7             8                9             10             11            12             13        14
0=>코드=업종명=회사명=거래량당일(주)=전일대비%=전주대비%=전월대비%=외국인 지분율(%)=상장주식수(만주)=시가총액(억원)=매출액연간(억)=10월23일(月)=10월20일(金)=10월19일(木)=10월18일(水)=10월17일(火)=10월16일(月)=10월13일(金)=10월12일(木)=10월11일(水)=10월10일(火)=
1=>005490=http://www.fdatabox.com/quark/logo_image/005490.jpg=POSCO홀딩스=617143=-0.1=-10.7=-20.5=26.79=8457=542947=847502=493000=507000=518000=512000=507000=503000=500000=477000=453000=452500=
2=>004020=http://www.fdatabox.com/quark/logo_image/004020.jpg=현대제철=157180=-0.8=-5.6=-19.7=26.69=13345=45305=273406=35300=35550=35300=33650=33750=33250=33250=32400=32100=31850=
3=>002710=http://www.fdatabox.com/quark/logo_image/002710.jpg=TCC스틸=186992=-0.8=-12.7=10.0=6.85=2621=17904=6844=57200=59100=68900=69100=66900=65600=66600=62700=58900=58400=
4=>001430=http://www.fdatabox.com/quark/logo_image/001430.jpg=세아베스틸지주=18652=1.5=-5.7=-16.8=14.47=3586=10221=43863=22850=23100=23000=22700=22050=21450=21450=21400=20500=20800=
5=
*/
	if($test) echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><center><font size=2>";


	$k = 1; $data_json_up_num = 0;$data_json_down_num = 0;$data_json_bohap_num = 0;

	foreach($data_json_return as $key => $value_list)
	{
		unset($imsi1);

		$imsi1 = explode("=",$value_list);

		if($key == 0)
		{
			$title_category_list = $imsi1;
			if($test) echo "$key=>$value_list<BR>";

			for($k3 = $desc_limit+10; $k3 >= 11; $k3--)
			{
				$stock_data_json_categories_init .= "\"$imsi1[$k3]\",";
			}
			$stock_data_json_categories_init = substr($stock_data_json_categories_init,0,-1);

			continue;
		}

		if(!$value_list) continue;

		$code = $imsi1[0];

		$code_name_list[$code] = $imsi1[2];

		if($code == "KS11_WI")
		{
			$kospi_num = $key; unset($kospi_data_json);

			for($k3 = $desc_limit+10; $k3 >= 11; $k3--)
			{
				$kospi_data_max_min[] = $imsi1[$k3];
				$kospi_data_json .= "$imsi1[$k3],";
			}
			$kospi_data_json = substr($kospi_data_json,0,-1);
			$kospi_price  = number_format($imsi1[11]);
			$kospi_volume = number_format($imsi1[3]);

			$kospi_max = max($kospi_data_max_min);
			$kospi_min = min($kospi_data_max_min)-30;

			//echo "code:$code / kospi_price:$kospi_price / kospi_volume:$kospi_volume <BR>==>>kospi_data_json:$kospi_data_json/"; exit;
		}
		else
		{
			unset($stock_data_max_min);
			for($k3 = $desc_limit+10; $k3 >= 11; $k3--)
			{
				$stock_data_max_min[] = $imsi1[$k3];
				$stock_data_json[$code] .= "$imsi1[$k3],";
			}
			$stock_data_json[$code] = substr($stock_data_json[$code],0,-1);
			$stock_data_json_min[$code] = min($stock_data_max_min)-100;

			if($k >= 1 and $k < 10)
			{
				$stock_data_json_category .= "'$imsi1[2]',";
				$stock_data_json_list_1   .= "$imsi1[9],";
				$stock_data_json_list_2   .= "$imsi1[10],";
			}

			$volume_count++;
			$volume_sum += $imsi1[3];//거래량
		}

		if($test) echo "$key=>$value_list<BR>";

		$tmax = sizeof($imsi1);

		for($k2 = 1; $k2 < $tmax; $k2++)
		{
			if($k2 == 3 or $k2 == 9 or $k2 == 10 or $k2 == 11)
			{
				$data_json_list["key{$key}_{$k2}_numf"]  = number_format($imsi1[$k2]);
			}
			else if($k2 == 4)
			{
				if($imsi1[$k2] > 0)
				{
					$updown = "up";
					$updown2 = "success";
					$data_json_up_num++;
				}
				else if($imsi1[$k2] < 0)
				{
					$updown = "down";
					$updown2 = "danger";
					$data_json_down_num++;
				}
				else
				{
					$updown = "";
					$updown2 = "warning";
					$data_json_bohap_num++;
				}

				$data_json_list["key{$key}_{$k2}_updown"]  = $updown;
				$data_json_list["key{$key}_{$k2}_updown2"] = $updown2;

				if($code == "KS11_WI")
				{
					$kospi_price_updown_title = $updown;
					$kospi_price_updown_title2 = $updown2;
					$kospi_price_percent = abs($imsi1[4]);
					if($test) echo "<BR><BR>=============/$imsi1[4]/====/$imsi1[$k2]/======<BR><BR>";
				}
				//$imsi1[$k2] = abs($imsi1[$k2]);
			}
			$data_json_list["key{$key}_{$k2}"]  = $imsi1[$k2];

			$data_json_list_sorting[$k2][$code] = $imsi1[$k2];

			if($code != "KS11_WI" and $k2 > 10)
			{
				$nalja = $title_category_list[$k2];
				if($nalja)
				{
					$nalja_list[$nalja] = $k2;
					$data_json_volume_datadate[$nalja] += str_replace("vol:","",$imsi1[$k2+$desc_limit]);
					//echo "$k2:$nalja=>$imsi1[$k2]------------$data_json_volume_datadate[$nalja]===".$imsi1[$k2+$desc_limit]."<BR>";
				}
			}
		}

		$k++;
	}

	$data_json_tnum = ($data_json_up_num+$data_json_down_num+$data_json_bohap_num);

	//일자별 거래량 누적
	if($data_json_volume_datadate)
	{
		$k2 = 1;
		$tmax2 = sizeof($nalja_list);
		arsort($nalja_list);
		foreach($nalja_list as $nalja => $kimsi)
		{
			$volume = $data_json_volume_datadate[$nalja];

			$volume_category_json .= "'$nalja',";
			$volume = sprintf("%.0f",$volume);
			$volume_data_json     .= "$volume,";

			//echo "$k2 : $tmax2 =>$nalja=>$volume=>$volume_old<BR>";

			if($k2 == $tmax2) break;

			if($volume) $volume_old = $volume;

			$k2++;
		}

		//echo "<BR>-----------------$nalja=>$volume=>$volume_old<BR>";exit;

		$volume_category_json = substr($volume_category_json,0,-1);
		$volume_data_json = substr($volume_data_json,0,-1);
		$volume_min = min($data_json_volume_datadate)+10000;

		$volume_per = sprintf("%.01f",($volume - $volume_old) / $volume_old * 100);

		if($test) {echo "$volume_per = sprintf(\"%.01f\",($volume - $volume_old) / $volume_old * 100);<BR>"; exit;}


		$volume_close = number_format($volume/10000);
		if($test) echo "$volume_category_json<BR>$volume_data_json<BR>volume_min:$volume_min<BR>";

		if($volume_per > 0)
		{
			$updown = "up";
			$updown2 = "success";
		}
		else if($volume_per < 0)
		{
			$updown = "down";
			$updown2 = "danger";
		}
		else
		{
			$updown = "";
			$updown2 = "warning";
		}
		$data_json_list["volume_updown"]  = $updown;
		$data_json_list["volume_updown2"] = $updown2;
	}

	$stock_data_json_category = substr($stock_data_json_category,0,-1);
	$stock_data_json_list_1_title = "시가총액(억)";
	$stock_data_json_list_1   = substr($stock_data_json_list_1,0,-1);
	$stock_data_json_list_2_title = "매출액(연간)";
	$stock_data_json_list_2   = substr($stock_data_json_list_2,0,-1);

	$sorting_arsort = $data_json_list_sorting[4];

	arsort($sorting_arsort);

	$k = 1;
	foreach($sorting_arsort as $code => $val)
	{
		if($code == "KS11_WI") continue;

		$close = number_format($data_json_list_sorting[11][$code]);
		$soring_desc_company_name[$k]  = "$code_name_list[$code]({$close}원)";
		$soring_desc_company_value[$k] = sprintf("%.01f",$val);
		$soring_desc_company_value_plus[$k] = sprintf("%.01f",abs($val)*10);

		$soring_desc_company_asset[$k] = number_format($data_json_list_sorting[9][$code]);


		if($val > 0)
		{
			$updown = "up";
			$updown2 = "success";
		}
		else if($val < 0)
		{
			$updown = "down";
			$updown2 = "danger";
		}
		else
		{
			$updown = "";
			$updown2 = "warning";
		}
		$soring_desc_company_updown[$k] = $updown;
		$soring_desc_company_updown2[$k] = $updown2;

//    0     1      2         3             4         5         6           7             8                9             10             11            12             13        14
//0=>코드=업종명=회사명=거래량당일(주)=전일대비%=전주대비%=전월대비%=외국인 지분율(%)=상장주식수(만주)=시가총액(억원)=매출액연간(억)=10월23일(月)=10월20일(金)=10월19일(木)=10월18일(水)=10월17일(火)=10월16일(月)=10월13일(金)=10월12일(木)=10월11일(水)=10월10일(火)=

		$value1 = $data_json_list_sorting[1][$code];//
		$value2 = $data_json_list_sorting[2][$code];//회사명
		$value3 = number_format($data_json_list_sorting[3][$code]);//거래량당일(주)
		$value4 = $data_json_list_sorting[4][$code];//전일대비%
		$value4 = sprintf("%.01f",abs($value4));
		$value5 = $data_json_list_sorting[5][$code];//전주대비%
		$value6 = $data_json_list_sorting[6][$code];//전월대비%
		$value7 = $data_json_list_sorting[7][$code];//외국인 지분율(%)
		$value8 = number_format($data_json_list_sorting[8][$code]);//상장주식수(만주)
		$value10= number_format($data_json_list_sorting[10][$code]);//시가총액(억원)
		$value11= number_format($data_json_list_sorting[11][$code]);//매출액년간(억)

		if($value5 > 0)
		{
			$updown51 = "up";
			$updown52 = "success";
		}
		else if($value5 < 0)
		{
			$updown51 = "down";
			$updown52 = "danger";
		}
		else
		{
			$updown51= "";
			$updown52= "warning";
		}
		////////////////////////////////////////////
		if($value6 > 0)
		{
			$updown61 = "up";
			$updown62 = "success";
		}
		else if($value6 < 0)
		{
			$updown61 = "down";
			$updown62 = "danger";
		}
		else
		{
			$updown61= "";
			$updown62= "warning";
		}
		$value5 = abs($value5);
		$value6 = abs($value6);
/*
*/


			$stock_table_data_json .= "
                        <tr class=\"border-bottom border-200\">
                          <td>
                            <div class=\"d-flex align-items-center position-relative\"><img class=\"rounded-1 border border-200\" src=\"$value1\" width=\"60\" alt=\"\" />
                              <div class=\"flex-1 ms-3\">
                                <h6 class=\"mb-1 fw-semi-bold text-nowrap\"><a class=\"text-900 stretched-link\" href=\"#!\">$k,$value2</a></h6>
                                <p class=\"fw-semi-bold mb-0 text-500\">{$value3}주</p>
                              </div>
                            </div>
                          </td>
                          <td class=\"align-middle text-end fw-semi-bold\">{$value11}원</td>
                          <td class=\"align-middle text-end fw-semi-bold\">
						<div class=\"badge badge-subtle-{$updown2} rounded-pill fs--2\"><span class=\"fas fa-caret-{$updown} me-1\"></span>{$value4}%</div>
					 </td>
                          <td class=\"align-middle text-end fw-semi-bold\">
						<div class=\"badge badge-subtle-{$updown52} rounded-pill fs--2\"><span class=\"fas fa-caret-{$updown51} me-1\"></span>{$value5}%</div>
					 </td>
                          <td class=\"align-middle text-end fw-semi-bold\">
						<div class=\"badge badge-subtle-{$updown62} rounded-pill fs--2\"><span class=\"fas fa-caret-{$updown51} me-1\"></span>{$value6}%</div>
					 </td>
                          <td class=\"align-middle text-end fw-semi-bold\">{$value7}%</td>
                          <td class=\"align-middle text-end fw-semi-bold\">{$value8}만주</td>
                          <td class=\"align-middle text-end fw-semi-bold\">{$value10}억</td>
                          <td class=\"align-middle\">
                            <div class=\"row g-2 justify-content-end\">
                              <div class=\"col-auto mt-auto\">
                                <div class=\"total-order-ecommerce\" data-echarts='{\"tooltip\":{\"trigger\":\"axis\",\"formatter\":\"{b0} : {c0}\"},\"xAxis\":{\"data\":[$stock_data_json_categories_init]},\"yAxis\":[{\"min\":$stock_data_json_min[$code]}],\"series\":[{\"type\":\"line\",\"smooth\":true,\"data\":[ $stock_data_json[$code] ]}]}'></div>
						  </div>
                              </div>
                            </div>
                          </td>
                        </tr>
			";

		$k++;
	}
	//////////////////////////////////////////////////////////////////////////////////////////// $stock_data_json_min[$code]
/*
                      <div class=\"echart-default-total-order\" data-echarts='{\"tooltip\":{\"trigger\":\"axis\",\"formatter\":\"{b0} : {c0}\"},
				  \"xAxis\":{\"data\":[$data_categories_json[categories_json_3]]},\"yAxis\":[{\"min\":$data_categories_json[close_min_3]}],\"series\":[{\"type\":\"bar\",\"data\":[$data_categories_json[data_json_3]],\"smooth\":true,\"lineStyle\":{\"width\":3}}],\"grid\":{\"bottom\":\"2%\",\"top\":\"2%\",\"right\":\"10px\",\"left\":\"1px\"}}' data-echart-responsive=\"true\"></div>

                                <div class=\"total-order-ecommerce\" data-echarts='{\"yAxis\":[{\"min\":$stock_data_json_min[$code]}],\"tooltip\":{\"trigger\":\"axis\",\"formatter\":\"{b0} : {c0}\"},\"show\":false},\"series\":[{\"type\":\"bar\",\"data\":[ $stock_data_json[$code] ]}]}'></div>

0           1           2          3                                                                4
005490=202310231330=POSCO홀딩스=키움증권 에코프로 포스코홀딩스 등 미수 금지...주가영향은 미미=2023.10.23 13:30
005490=202310231207=POSCO홀딩스=포항 시민단체 24일 예고한 서울 포스코센터 앞 집회 연기=2023.10.23 12:07
005490=202310231110=POSCO홀딩스=포스코노조 쟁의행위 찬반투표 공고긴장감 고조=2023.10.23 11:10
004020=202310221724=현대제철=현대제철 현대스틸파이프 설립=2023.10.22 17:24
005490=202310221314=POSCO홀딩스=포스코이앤씨 커피박 활용한 친환경 조경 토양개량제 개발=2023.10.22 13:14
005490=202310220855=POSCO홀딩스=코스피 주간 외국인 순매도 1위 =POSCO홀딩스==2023.10.22 08:55
005490=202310220730=POSCO홀딩스=유찰 가능성 높아진 HMM 인수전포스코 등 대기업 참전?=2023.10.22 07:30
005490=202310211940=POSCO홀딩스=바람 잘 날 없는 포스코전기료-철광석 인상에 파업까지 삼중고=2023.10.21 19:40
005490=202310202056=POSCO홀딩스=포스코홀딩스 등 12社 감사인 신규 지정=2023.10.20 20:56
*/
	$fopen_url_news = "http://210.116.114.218/api_json/api_stock_news_upjong_json.html?kpc_log=$kpc_log&upjong_name_init=$upjong_name_init";
	$return_news = fopen_url_return($fopen_url_news);

	$news_json_return = explode("\n",$return_news);

	//echo "<center> <font size=2>";

	foreach($news_json_return as $key1 => $titles)
	{
		unset($news_imsi2);

		$news_imsi2 = explode("=",$titles);

		$news_data_json_view .= "
                        <tr class=\"btn-reveal-trigger\">
                          <th class=\"align-middle white-space-nowrap name\"><a href=\"#\">$news_imsi2[2]</a></th>
                          <td class=\"align-middle white-space-nowrap email\">$news_imsi2[4]</td>
                          <td class=\"align-middle white-space-nowrap product\">$news_imsi2[3]</td>
                          <td class=\"align-middle text-center fs-0 white-space-nowrap payment\"><span class=\"badge badge rounded-pill badge-subtle-success\">Success<span class=\"ms-1 fas fa-check\" data-fa-transform=\"shrink-2\"></span></span>
                          </td>
                          <td class=\"align-middle text-end amount\">$news_imsi2[0]</td>
                          <td class=\"align-middle white-space-nowrap text-end\">
                          </td>
                        </tr>
				    ";

	}
	//exit;
	////////////////////////////////////////////////////////////////////////////////////////////


	if($test) exit;
}

?>