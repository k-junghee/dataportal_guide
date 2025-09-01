<?
	if(!$kpc_log) $kpc_log = "steelwhere";

	///////////////////////////////////////////////////////////////////////////////
	function is_mobile(){
		if(preg_match('/(alcatel|amoi|android|avantgo|blackberry|benq|cell|cricket|docomo|elaine|htc|iemobile|iphone|ipad|ipaq|ipod|j2me|java|midp|mini|mmp|mobi|motorola|nec-|nokia|palm|panasonic|philips|phone|sagem|sharp|sie-|smartphone|sony|symbian|t-mobile|telus|up\.browser|up\.link|vodafone|wap|webos|wireless|xda|xoom|zte)/i', $_SERVER['HTTP_USER_AGENT'])){

			return true;
		} else {
			return false;
		}
	}

	$return_app_sw = is_mobile();

	if($return_app_sw)  $min_height = "300px;";
	else				$min_height = "450px;";
	///////////////////////////////////////////////////////////////////////////////

	$left_menu_new = array(
                  "11"=>"철강가격 판재류",
                  "12"=>"철강가격 봉형강",
                  "13"=>"철강가격 고로",
                  "14"=>"철강가격 전기로",

                  "21"=>"중국조강",
                  "22"=>"한국조강",
                  "23"=>"글로벌조강",
			   "24"=>"한국 철강재 생산",
			   "25"=>"한국 철강품목 생산",
			   "26"=>"한국 철강품목 출하",
			   "27"=>"한국 철강품목 재고",
			   "28"=>"한국 수출",
			   "29"=>"철강 수입",
			   "30"=>"한국 철강품목 수출",
			   "31"=>"한국 철강품목 수입",
		   );

	$WeekType_list = array(
		"0"=>"日",
		"1"=>"月",
		"2"=>"火",
		"3"=>"水",
		"4"=>"木",
		"5"=>"金",
		"6"=>"土",
	);
	$Ymd = sprintf("%s년 %s월 %s일",date("Y"),date("m"),date("d"));
	$week_sw = $WeekType_list[date("w")];

	$left_menu_view = "
          <div class='collapse navbar-collapse' id='navbarVerticalCollapse'>
            <div class='navbar-vertical-content scrollbar'>
              <ul class='navbar-nav flex-column mb-3' id='navbarVerticalNav'>
                <li class='nav-item'>
                  <!-- label-->
                  <div class='row navbar-vertical-label-wrapper mt-3 mb-2'>
                    <div class='col-auto navbar-vertical-label'>Steel Where(DataPortal)
                    </div>
                    <div class='col ps-0'>
                      <hr class='mb-0 navbar-vertical-divider' />
                    </div>
                  </div>
                  <!-- parent pages--><a class='nav-link dropdown-indicator' href='#email' role='button' data-bs-toggle='collapse' aria-expanded='false' aria-controls='email'>
                    <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-drum-steelpan'></span></span><span class='nav-link-text ps-1'>열연강판</span><span class='badge rounded-pill ms-2 badge-subtle-success'>New</span>
                    </div>
                  </a>
                  <ul class='nav collapse' id='email'>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>철광석쇳물원가</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>중국수출가격</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>한국유통가격</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>고로조강생산량</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>한국 철강 수출입 물동량</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>한국 철강 생산 및 출하</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                  <!-- parent pages--><a class='nav-link dropdown-indicator' href='#events' role='button' data-bs-toggle='collapse' aria-expanded='false' aria-controls='events'>
                    <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-link'></span></span><span class='nav-link-text ps-1'>철근</span>
                    </div>
                  </a>
                  <ul class='nav collapse' id='events'>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_lms.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>철스크랩 국내외 시세</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_lms.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>전기로 조강생산량</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_lms.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>한국 유통가격</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_lms.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>중국 수출가격</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_lms.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>한국 철근 생산 및 출하량</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_lms.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>한국 철근 수출입 물동량</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                  <!-- parent pages--><a class='nav-link dropdown-indicator' href='#e-commerce' role='button' data-bs-toggle='collapse' aria-expanded='false' aria-controls='e-commerce'>
                    <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-magnet'></span></span><span class='nav-link-text ps-1'>철광석</span>
                    </div>
                  </a>
                  <ul class='nav collapse' id='e-commerce'>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>중국 일일 조강생산량</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>중국 월간 조강생산량</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>글로벌 국가별 조강량</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>중국 열연 철근 내수</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>중국 철광석 수입량</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>중국 45개 항구 재고</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>철스크랩 글로벌 시세</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                  <!-- parent pages--><a class='nav-link dropdown-indicator' href='#e-learning' role='button' data-bs-toggle='collapse' aria-expanded='false' aria-controls='e-learning'>
                    <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-tools'></span></span><span class='nav-link-text ps-1'>철스크랩</span><span class='badge rounded-pill ms-2 badge-subtle-success'></span>
                    </div>
                  </a>
                  <ul class='nav collapse' id='e-learning'>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>미국 일본 수출 시세</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>한국 등급별 시세</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>튀르키예 고철 철근</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>한국 봉형강 생산 출하</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>한국 봉형강 수출입 물동량</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>한국 고로 전기로 조강</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>봉형강 유통가격</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                  <!-- parent pages--><a class=\"nav-link dropdown-indicator\" href=\"#user\" role=\"button\" data-bs-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"user\">
                    <div class=\"d-flex align-items-center\"><span class=\"nav-link-icon\"><span class=\"fas fa-user\"></span></span><span class=\"nav-link-text ps-1\">철강,원료 가격</span>
                    </div>
                  </a>
                  <ul class='nav collapse' id='user'>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_charts_menu1.html?menu_num=11'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>1.철강가격 판재류</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_charts_menu1.html?menu_num=12'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>2.철강가격 봉형강</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_charts_menu1.html?menu_num=13'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>3.원료가격 고로</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_charts_menu1.html?menu_num=14'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>4.원료가격 전기로</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                  <!-- parent pages--><a class=\"nav-link dropdown-indicator\" href=\"#pricing\" role=\"button\" data-bs-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"pricing\">
                    <div class=\"d-flex align-items-center\"><span class=\"nav-link-icon\"><span class=\"fas fa-tags\"></span></span><span class=\"nav-link-text ps-1\">철강 수급</span>
                    </div>
                  </a>
                  <ul class=\"nav collapse\" id=\"pricing\">
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=21\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">1.중국조강</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=22\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">2.한국조강</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=23\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">3.글로벌조강</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=24\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">4.한국 철강재 생산</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=25\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">5.한국 철강품목 생산</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=26\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">6.한국 철강품목 출하</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=27\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">7.한국 철강품목 재고</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=28\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">8.한국 수출</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=29\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">9.한국 수입</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=30\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">10.한국 철강품목 수출</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=31\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">11.한국 철강품목 수입</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                  <!-- parent pages--><a class='nav-link' href='../dashboard/steel_e-commerce.html' role='button'>
                    <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-dollar-sign'></span></span><span class='nav-link-text ps-1'>업종별 주가보기</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
	   ";
		///////////////////////////////////////////////////////////////////////////////////////
?>