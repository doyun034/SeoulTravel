import React, { useState } from 'react';
import '../../styles/RandomStation.css';
import stations from './StationData';

import seoulmap from '../../assets/topography/서울지형.png';
import dice from '../../assets/images/dice.png';

const RandomStation = () => {
  const [selectedStation, setSelectedStation] = useState('');
  const [savedStations, setSavedStations] = useState([]);

  const handleRandomStation = () => {

    // 저장되지 않은 역들만 필터링
    const availableStations = Object.values(stations)
      .flat()
      .filter((station) => !savedStations.includes(station));

    if (availableStations.length === 0) {
      alert('모든 역이 저장되었습니다.');
      return;
    }

    // 랜덤으로 새로운 역 선택
    const randomStation =
      availableStations[Math.floor(Math.random() * availableStations.length)];
    setSelectedStation(randomStation);
  };

  // 저장 후 선택된 역 초기화
  const handleSaveStation = () => {
    if (selectedStation && !savedStations.includes(selectedStation)) {
      setSavedStations([...savedStations, selectedStation]);
      setSelectedStation('');
    }
  };

  return (
    <div className="main-page">
      <main className="content">
        <div className="map-container">
          <img
            src={seoulmap}
            alt="Seoul Map"
            className="seoul-map"
          />
        </div>
        <div className="random-station-container">
          <h2 className="title">랜덤으로 떠나는 서울여행</h2>
          <div className="dice-button-container">
            <img
              src={dice}
              alt="주사위 아이콘"
              className="dice-icon"
            />
            <button onClick={handleRandomStation} className="random-btn">
              주사위를 굴려보세요!
            </button>
          </div>
          {selectedStation && (
            <div className="station-info">
              <div className="station-name">{selectedStation}</div>
              <p>
                이번 역은 <strong>{selectedStation}</strong> 입니다.
              </p>
              <button onClick={handleSaveStation} className="save-btn">
                역 저장하기
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RandomStation;

// import React from 'react';
// import '../../styles/RandomStation.css';

// const RandomStation = () => {
//   return (
//     <div className="main-page">
//       <h1>랜덤 역 구현 화면</h1>
//     </div>
//   );
// };

// export default RandomStation;
