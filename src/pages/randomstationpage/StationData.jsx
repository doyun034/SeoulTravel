/* stations_data.js*/

const stations = {
  line1: [
    '서울역', '종각', '종로3가', '종로5가', '동대문',
    '신설동', '제기동', '청량리', '회기', '외대앞',
    '온수', '오류동', '개봉', '구일', '금천구청', '독산',
    '가산디지털단지', '구로', '신도림', '영등포', '신길',
    '대방', '노량진', '용산', '시청', '동묘앞',
    '신이문', '석계', '광운대', '월계', '녹천',
    '창동', '방학', '도봉', '도봉산'
  ],

  line2: [
    '시청', '을지로입구', '을지로3가', '을지로4가', '동대문역사문화공원',
    '신당', '상왕십리', '왕십리', '한양대', '뚝섬',
    '까치산', '신정네거리', '양천구청', '도림천', '신도림',
    '문래', '영등포구청', '당산', '합정', '홍대입구',
    '신촌', '이대', '아현', '충정로', '성수',
    '용답', '신답', '용두', '건대입구', '구의',
    '강변', '잠실나루', '잠실', '잠실새내', '종합운동장',
    '삼성', '선릉', '역삼', '강남', '교대',
    '서초', '방배', '사당', '낙성대', '서울대입구',
    '봉천', '신림', '신대방', '구로 디지털단지', '대림'
  ],

  line3: [
    '연신내', '불광', '녹번', '홍제', '무악재',
    '독립문', '경복궁', '안국', '종로3가', '을지로3가',
    '충무로', '동대입구', '약수', '금호', '옥수',
    '압구정', '신사', '잠원', '고속터미널', '교대',
    '남부터미널', '양재', '매봉', '도곡', '대치',
    '학여울', '대청', '일원', '가락시장', '수서', '경찰병원',
    '오금'
  ],

  line4: [
    '당고개', '상계', '노원', '창동', '쌍문',
    '수유', '미아', '미아사거리', '길음', '성신여대입구',
    '남태령', '사당', '총신대입구(이수)', '동작', '이촌',
    '신용산', '삼각지', '숙대입구', '서울역', '회현',
    '명동', '충무로', '동대문역사공원', '동대문', '혜화',
    '한성대입구'
  ],

  line5: [
    '방화', '개화산', '김포공항', '송정', '마곡',
    '발산', '우장산', '화곡', '까치산', '신정',
    '목동', '오목교', '양평', '영등포시장', '신길',
    '여의도', '여의나루', '마포', '공덕', '애오개',
    '서대문', '광화문', '청구', '신금호', '행당',
    '왕십리', '마장', '답십리', '장한평', '군자',
    '아차산', '광나루', '천호', '강동', '둔촌동',
    '올림픽공원', '방이', '개롱', '거여', '마천',
    '길동', '굽은다리', '명일', '고덕', '상일동',
    '강일', '동대문역사공원', '종로3가', '을지로3가',
    '오금'
  ],

  line6: [
    '봉화산', '화랑대', '태릉입구', '석계', '돌곶이',
    '상월곡', '월곡', '고려대', '안암', '보문',
    '연신내', '독바위', '불광', '역촌', '구산',
    '응암', '새절', '증산', '디지털 미디어시티', '월드컵 경기장',
    '마포구청', '망원', '합정', '상수', '광흥창',
    '대흥', '공덕', '효창공원앞', '삼각지', '녹사평',
    '이태원', '한강진', '버티고개', '약수', '청구',
    '신당', '동묘앞', '창신', '신내'
  ],

  line7: [
    '장암', '도봉산', '수락산', '마들', '노원',
    '중계', '하계', '공릉', '태릉입구', '먹골',
    '온수', '천왕', '가산디지털단지', '남구로', '대림',
    '신풍', '보라매', '신대방삼거리', '장승배기', '숭실대입구',
    '남성', '총신대입구(이수)', '내방', '고속터미널', '반포',
    '논현', '학동', '강남구청', '청담', '자양',
    '건대입구', '어린이대공원', '군자', '중곡', '용마산',
    '사가정', '면목', '상봉', '중화', '태릉입구',
    '공릉', '하계', '중계', '노원', '마들',
    '수락산', '도봉산'
  ],

  line8: [
    '암사', '천호', '강동구청', '몽촌토성', '잠실',
    '석촌', '송파', '가락시장', '문정', '장지', '암사역사공원'
  ],

  line9: [
    '개화', '김포공항', '공항시장', '신방화', '마곡나루',
    '양천향교', '가양', '증미', '등촌', '염창',
    '신목동', '선유도', '당산', '국회의사당', '여의도',
    '샛강', '노량진', '노들', '흑석', '동작',
    '구반포', '신반포', '고속터미널', '사평', '신논현',
    '언주', '선정릉', '삼성중앙', '봉은사', '종합운동장',
    '삼전', '석촌고분', '석촌', '송파나루', '한성백제',
    '올림픽공원', '둔춘오륜', '중앙보훈병원'
  ],

  airport: [
    '김포공항', '마곡나루', '디지털미디어시티', '홍대입구', '공덕', '서울역'
  ],

  gyeong_ui: [
    '수색', '디지털미디어시티', '가좌', '신촌', '서울역',
    '홍대입구', '서강대', '공덕', '효창공원앞', '용산',
    '이촌', '서빙고', '한남', '옥수', '응봉', '왕십리',
    '청량리', '회기', '중랑', '상봉', '망우'
  ],

  gyeong_chun: [
    '청량리', '회기', '중랑', '광운대', '상봉', '망우', '신내'
  ],

  soo_in_bundang: [
    '청량리', '왕십리', '서울숲', '압구정로데오', '강남구청',
    '선정릉', '선릉', '도곡', '구룡', '개포동', '대모산입구',
    '수서', '복정'
  ],

  shin_bundang: [
    '청계산입구', '양재시민의숲', '양재', '강남', '신논현', '논현', '신사'
  ],

  west_sea: [
    '김포공항'
  ],

  woo_ah: [
    '신설동', '보문', '성신여대입구', '정릉', '북한산보국문', '솔샘',
    '삼양사거리', '삼양', '화계', '가오리', '4.19민주묘지', '솔밭공원',
    '북한산우이'
  ],

  gold: [
    '김포공항'
  ],

  shin_lim: [
    '샛강', '대방', '서울지방병무청', '보라매', '보라매공원', '보라매병원',
    '당곡', '신림', '서원', '서울대밴처타운', '관악산'
  ],

  gtx_a: [
    '수서'
  ]
};

export default stations;