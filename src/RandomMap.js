// import React, { useState, useEffect } from "react";
// import "./RandomMap.css";

// const stations = [
//   "서울역", "용산역", "홍대입구역", "강남역", "잠실역", "이태원역", "명동역", "신촌역",
//   // 서울의 주요 역들 추가...
// ];

// const RandomMap = () => {
//   const [currentStation, setCurrentStation] = useState("");
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [finalStation, setFinalStation] = useState(null);
//   const [savedStations, setSavedStations] = useState([]); // 저장된 역 리스트

//   // 저장되지 않은 역 목록을 구함
//   const getAvailableStations = () => {
//     return stations.filter(station => !savedStations.includes(station));
//   };

//   // 애니메이션을 위한 함수
//   const startRoulette = () => {
//     const availableStations = getAvailableStations();
//     if (availableStations.length === 0) {
//       alert("모든 역이 저장되었습니다.");
//       return;
//     }

//     setIsSpinning(true);
//     let count = 0;
//     const interval = setInterval(() => {
//       setCurrentStation(availableStations[Math.floor(Math.random() * availableStations.length)]);
//       count++;
//       if (count > 20) { // 20번 돌린 후 멈춤
//         clearInterval(interval);
//         const randomStation = availableStations[Math.floor(Math.random() * availableStations.length)];
//         setFinalStation(randomStation);
//         setIsSpinning(false);
//       }
//     }, 100); // 0.1초마다 한 번씩 역 변경
//   };

//   // 역 저장 함수
//   const saveStation = () => {
//     if (finalStation && !savedStations.includes(finalStation)) {
//       setSavedStations([...savedStations, finalStation]);
//       setFinalStation(null); // 저장 후 최종 선택 초기화
//     }
//   };

//   return (
//     <div className="roulette-container">
//       <h1>오늘의 여행 역은?</h1>
//       <div className={`station-display ${isSpinning ? "spinning" : ""}`}>
//         {finalStation ? <span>{finalStation}</span> : <span>{currentStation}</span>}
//       </div>
//       <button onClick={startRoulette} disabled={isSpinning} className="spin-button">
//         {isSpinning ? "돌아가는 중..." : "랜덤 역 선택하기"}
//       </button>
//       {finalStation && (
//         <button onClick={saveStation} className="save-button">
//           역 저장하기
//         </button>
//       )}
//       <div className="saved-stations">
//         <h2>저장된 역 목록</h2>
//         <ul>
//           {savedStations.map((station, index) => (
//             <li key={index}>{station}</li>
//           ))}
//         </ul>
//       </div>
//       {finalStation && <div className="result">오늘은 {finalStation}으로 여행을 떠나요!</div>}
//     </div>
//   );
// };

// export default RandomMap;    oxs50utj7b

import React, { useState, useEffect } from 'react';

const RandomStationMap = () => {
  const subwayStations = [
    "서울역", "2호선강남역", "잠실역", "신촌역", "홍대입구역", "을지로입구역", "사당역", "서울대입구역"
  ];
  const [selectedStation, setSelectedStation] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false); // 지도가 로드되었는지 상태 저장

  // 스크립트를 동적으로 로드하는 함수
  const loadMapScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=oxs50utj7b`; // 네이버 클라이언트 ID를 넣으세요.
      script.async = true;
      script.onload = () => {
        setMapLoaded(true); // 스크립트 로드 완료 시 상태 업데이트
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // 랜덤 역 선택
  const getRandomStation = () => {
    const randomIndex = Math.floor(Math.random() * subwayStations.length);
    const station = subwayStations[randomIndex];
    setSelectedStation(station);
    if (mapLoaded) { // 지도가 로드되었을 때만 지도 표시
      showMap(station);
    } else {
      console.error("지도 API가 로드되지 않았습니다.");
    }
  };

  // 지도 표시
  const showMap = (station) => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.5665, 126.9780), // 기본 중심 좌표 (서울)
      zoom: 12
    };
    const map = new window.naver.maps.Map('map', mapOptions);

    // Geocoder로 지명 검색
    if (window.naver.maps && window.naver.maps.Geocoder) { // Geocoder 확인
      const geocoder = new window.naver.maps.Geocoder(); // Geocoder 객체 생성
      geocoder.geocode({ query: station }, function (status, response) {
        if (status === window.naver.maps.Service.Status.OK) {
          const location = response.v2.addresses[0];
          const latLng = new window.naver.maps.LatLng(location.y, location.x); // 좌표
          map.setCenter(latLng); // 선택된 역을 중심으로 지도 설정
          new window.naver.maps.Marker({
            position: latLng,
            map: map,
            title: station
          });
        } else {
          console.error("역 정보를 찾을 수 없습니다.");
        }
      });
    } else {
      console.error("Geocoder 객체를 찾을 수 없습니다.");
    }
  };

  // 처음에 스크립트를 로드하고 준비되면 지도 사용 가능
  useEffect(() => {
    loadMapScript()
      .then(() => {
        console.log("네이버 지도 API 스크립트 로드 완료");
      })
      .catch((error) => {
        console.error("네이버 지도 API 스크립트 로드 실패", error);
      });
  }, []);

  return (
    <div>
      <button onClick={getRandomStation}>랜덤 역 선택</button>
      {selectedStation && <h2>선택된 역: {selectedStation}</h2>}
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
}

export default RandomStationMap;

