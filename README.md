<h3>window에서 실행 방법</h3>

1. `cd src\database`로 이동  
2. 터미널에서 아래 명령어를 실행하여 JSON 로그인 서버를 실행:
   ```bash
   npx json-server --watch data.json --port 3001 --host 0.0.0.0
3. 새 터미널에서 `npm start` 실행 <br/><br/>


<hr/>
<h3>프로젝트 개발 환경</h3>

`"react": "18.3.1"`
<br/><br/>


<hr/>
<h3>파일 디렉토리</h3>

```
src/
|── assets/
|── components/
|    |── Footer.jsx
|    |── Header.jsx
|── database/
|    |── data.json
|── pages/
|    |── editmap/
|    |    |── EditMap.jsx
|    |── loginpage/
|    |    |── Login.jsx
|    |    |── SignUp.jsx
|    |── mainpage/
|    |    |── MainHome.jsx
|    |── randomstationpage/
|    |    |── RamdinStation.jsx
|    |    |── StationData.jsx
|    |── seoulmap/
|    |    |── SeoulMap.jsx
|    |── stationmemo/
|    |    |── StationMemo.jsx
|── styles/
|── App.css
|── App.js
|── index.js
|── package.json
|── README.md
```

- **assets**: 이미지 모음
- **components**: 헤더 푸터 영역 표시
- **database**: 회원가입 유저 정보 관리 데이터베이스
- **pages**: 
   - *editmap*: 자치구 별 이미지를 삽입하여 지도에 저장하는 페이지
   - *loginpage*: 로그인, 회원가입
   - *mainpage*: 메인 홈 화면 페이지
   - *randomstationpage*: 서울의 모든 지하철 역을 랜덤으로 돌리는 페이지
   - *seoulmap*: 서울의 25개 자치구 영역을 나누어 지도를 편집할 수 있는 페이지
   - *stationmemo*: 랜덤 역이 걸렸을 때 역을 저장하여 간단한 메모를 남길 수 있는 페이지