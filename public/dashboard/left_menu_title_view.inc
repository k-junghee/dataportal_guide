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
                    <div class='col-auto navbar-vertical-label'>DataPortal(데이터포털)
                    </div>
                    <div class='col ps-0'>
                      <hr class='mb-0 navbar-vertical-divider' />
                    </div>
                  </div>
                  <!-- parent pages--><a class='nav-link dropdown-indicator' href='#email' role='button' data-bs-toggle='collapse' aria-expanded='false' aria-controls='email'>
                    <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-drum-steelpan'></span></span><span class='nav-link-text ps-1'>소득소비자산</span><span class='badge rounded-pill ms-2 badge-subtle-success'>New</span>
                    </div>
                  </a>
                  <ul class='nav collapse' id='email'>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>1,1인당 국민총소득</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>2,가계부채비율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>3,가구순자산</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>4,가구중위소득</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>5,상대적빈곤율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>6,소득만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_crm.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>7,소비생활만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                  <!-- parent pages--><a class='nav-link dropdown-indicator' href='#events' role='button' data-bs-toggle='collapse' aria-expanded='false' aria-controls='events'>
                    <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-link'></span></span><span class='nav-link-text ps-1'>고용보험</span>
                    </div>
                  </a>
                  <ul class='nav collapse' id='events'>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_lms.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>1,고율률</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_lms.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>2,근로소득</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_lms.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>3,실업률</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_lms.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>4,월평균임금</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_lms.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>5,일자리만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_lms.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>6,저임금근로자비율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                  <!-- parent pages--><a class='nav-link dropdown-indicator' href='#e-commerce' role='button' data-bs-toggle='collapse' aria-expanded='false' aria-controls='e-commerce'>
                    <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-magnet'></span></span><span class='nav-link-text ps-1'>주거</span>
                    </div>
                  </a>
                  <ul class='nav collapse' id='e-commerce'>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>1,1인당 주거면적</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>2,자가점유가구비율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>3,주거환경만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>4,주택임대료비율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>5,최저주거기준</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_saas.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>6,통근시간</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                  <!-- parent pages--><a class='nav-link dropdown-indicator' href='#e-learning' role='button' data-bs-toggle='collapse' aria-expanded='false' aria-controls='e-learning'>
                    <div class='d-flex align-items-center'><span class='nav-link-icon'><span class='fas fa-tools'></span></span><span class='nav-link-text ps-1'>건강</span><span class='badge rounded-pill ms-2 badge-subtle-success'></span>
                    </div>
                  </a>
                  <ul class='nav collapse' id='e-learning'>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>1,건강수명</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>2,기대수명</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>3,비만율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>4,스트레스인지율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>5,신체활동실천율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>6,자살률</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_support-desk.html'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>7,질병현황</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                  <!-- parent pages--><a class=\"nav-link dropdown-indicator\" href=\"#user\" role=\"button\" data-bs-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"user\">
                    <div class=\"d-flex align-items-center\"><span class=\"nav-link-icon\"><span class=\"fas fa-user\"></span></span><span class=\"nav-link-text ps-1\">교육</span>
                    </div>
                  </a>
                  <ul class='nav collapse' id='user'>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_charts_menu1.html?menu_num=11'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>1.고등교육이수율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_charts_menu1.html?menu_num=12'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>2.교육비 부담도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_charts_menu1.html?menu_num=13'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>3.대학졸업자 취업률</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_charts_menu1.html?menu_num=14'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>4.유아교육위원율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_charts_menu1.html?menu_num=14'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>5.학교교육효과</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class='nav-item'><a class='nav-link' href='../dashboard/steel_charts_menu1.html?menu_num=14'>
                        <div class='d-flex align-items-center'><span class='nav-link-text ps-1'>6.학교생활만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                  <!-- parent pages--><a class=\"nav-link dropdown-indicator\" href=\"#pricing\" role=\"button\" data-bs-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"pricing\">
                    <div class=\"d-flex align-items-center\"><span class=\"nav-link-icon\"><span class=\"fas fa-tags\"></span></span><span class=\"nav-link-text ps-1\">여가</span>
                    </div>
                  </a>
                  <ul class=\"nav collapse\" id=\"pricing\">
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=21\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">1.1인당 여행일수</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=22\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">2.문화여가 지출률</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=23\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">3.문화예술 및 관람횟수</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=24\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">4.여가생활 만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=25\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">5.여가시간</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=26\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">6.여가시간 충분도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                   <!-- parent pages--><a class=\"nav-link dropdown-indicator\" href=\"#pricing2\" role=\"button\" data-bs-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"pricing2\">
                    <div class=\"d-flex align-items-center\"><span class=\"nav-link-icon\"><span class=\"fas fa-tags\"></span></span><span class=\"nav-link-text ps-1\">가족공동체</span>
                    </div>
                  </a>
                  <ul class=\"nav collapse\" id=\"pricing2\">
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=21\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">1.가족관계만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=22\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">2.독거노인비율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=23\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">3.사회단체참여율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=24\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">4.사회적 고립도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=25\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">5.지역사회 소속감</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                   <!-- parent pages--><a class=\"nav-link dropdown-indicator\" href=\"#pricing3\" role=\"button\" data-bs-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"pricing3\">
                    <div class=\"d-flex align-items-center\"><span class=\"nav-link-icon\"><span class=\"fas fa-tags\"></span></span><span class=\"nav-link-text ps-1\">시민참여</span>
                    </div>
                  </a>
                  <ul class=\"nav collapse\" id=\"pricing3\">
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=21\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">1.기관신뢰도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=22\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">2.대인신뢰도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=23\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">3.부패인식지수</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=24\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">4.선거투표율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=25\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">5.시민의식</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=26\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">6.자원봉사 참여율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=26\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">7.정치적 역랑감</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                   <!-- parent pages--><a class=\"nav-link dropdown-indicator\" href=\"#pricing4\" role=\"button\" data-bs-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"pricing4\">
                    <div class=\"d-flex align-items-center\"><span class=\"nav-link-icon\"><span class=\"fas fa-tags\"></span></span><span class=\"nav-link-text ps-1\">여가</span>
                    </div>
                  </a>
                  <ul class=\"nav collapse\" id=\"pricing4\">
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=21\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">1.가해에 의한 사망률</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=22\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">2.도로교통사고 사망률</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=23\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">3.범죄 피해율</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=24\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">4.산재 사망률</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=25\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">5.아동안전사고 사망률</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=26\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">6.아동학대 피해 경험률</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=26\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">7.안전에 대한 전반적 인식</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=26\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">8.야간보행 안전도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=26\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">9.화재사망자수</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                   <!-- parent pages--><a class=\"nav-link dropdown-indicator\" href=\"#pricing5\" role=\"button\" data-bs-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"pricing5\">
                    <div class=\"d-flex align-items-center\"><span class=\"nav-link-icon\"><span class=\"fas fa-tags\"></span></span><span class=\"nav-link-text ps-1\">환경</span>
                    </div>
                  </a>
                  <ul class=\"nav collapse\" id=\"pricing5\">
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=21\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">1.1인당 도시공원면적</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=22\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">2.기후변화 불안도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=23\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">3.녹지환경 만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=24\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">4.대기질 만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=25\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">5.대기질 만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=26\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">6.미세먼지 농도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=26\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">7.소음 만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=26\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">8.수질 만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=26\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">9.토양환경 만족도</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                  </ul>
                   <!-- parent pages--><a class=\"nav-link dropdown-indicator\" href=\"#pricing6\" role=\"button\" data-bs-toggle=\"collapse\" aria-expanded=\"false\" aria-controls=\"pricing6\">
                    <div class=\"d-flex align-items-center\"><span class=\"nav-link-icon\"><span class=\"fas fa-tags\"></span></span><span class=\"nav-link-text ps-1\">주관적웰빙</span>
                    </div>
                  </a>
                  <ul class=\"nav collapse\" id=\"pricing6\">
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=21\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">1.긍정정서</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=22\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">2.부정정서</span>
                        </div>
                      </a>
                      <!-- more inner pages-->
                    </li>
                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"../dashboard/steel_charts_menu2.html?menu_num=23\">
                        <div class=\"d-flex align-items-center\"><span class=\"nav-link-text ps-1\">3.삶의 만족도</span>
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