import React, { useState, useEffect } from 'react';
import '../../styles/RandomStation.css';
import stations from './stations_data';

const RandomStation = () => {
  const [selectedStation, setSelectedStation] = useState('');
  const [savedStations, setSavedStations] = useState([]);
  const [availableStations, setAvailableStations] = useState([]);
  const [selectedIcons, setSelectedIcons] = useState([]); // 선택된 노선 아이콘들 경로 배열
  const [isAnimating] = useState(false); // 애니메이션 비활성화 상태


  useEffect(() => {
    setAvailableStations(Object.values(stations).flat());
  }, []);

  const handleRandomStation = () => {
    const diceElement = document.querySelector('.dice-icon');
  
    diceElement.classList.add('animate');
  
    // 애니메이션 시간 (1초) 후에 랜덤 역 선택
    setTimeout(() => {
      diceElement.classList.remove('animate');
  
      const filteredStations = availableStations.filter(
        (station) => !savedStations.includes(station.name)
      );
  
      if (filteredStations.length === 0) {
        alert('모든 역이 저장되었습니다.');
        return;
      }
  
      const randomStation =
        filteredStations[Math.floor(Math.random() * filteredStations.length)];
      setSelectedStation(randomStation.name);
  
      // 선택된 역에 해당하는 모든 노선 아이콘 설정
      const stationLines = [];
      Object.keys(stations).forEach((lineKey) => {
        stations[lineKey].forEach((station) => {
          if (station.name === randomStation.name) {
            stationLines.push(station.icon);
          }
        });
      });
      setSelectedIcons(stationLines);
    }, 
    1000);
  };

  const handleSaveStation = () => {
    if (selectedStation && !savedStations.includes(selectedStation)) {
      setSavedStations((prevSavedStations) => [
        ...prevSavedStations,
        selectedStation,
      ]);

      setAvailableStations((prevAvailableStations) =>
        prevAvailableStations.filter((station) => station.name !== selectedStation)
      );
      setSelectedStation('');
      setSelectedIcons([]);

    } else if (savedStations.includes(selectedStation)) {
      alert('이미 저장된 역입니다.');
    }
  };

  return (
    <div className="main-page">
      <main className="content">
        <div className="map-container">
          <img
            src="/assets/topography/서울지형.png"
            alt="Seoul Map"
            className="seoul-map"
          />
        </div>
        <div className="random-station-container">
          <h2 className="title">랜덤으로 떠나는 서울여행</h2>
          <h5 className="description">주사위를 굴려보세요!</h5>
          <div className="dice-button-container">
          <img
              src="/images/dice.png"
              alt="랜덤으로 역을 선택하는 주사위 아이콘"
              className={`dice-icon ${isAnimating ? 'animate' : ''}`}
              role="button"
              aria-label="랜덤 역 선택"
              onClick={handleRandomStation}
            />
          </div>
          {selectedStation && (
            <>
              <div className="station-description">
                <div className="station-name">{selectedStation}</div>
              </div>
              <div className="station-information">
                <p>
                  이번 역은 <strong>{selectedStation}</strong> 입니다.
                </p>
              </div>
              <div className="station-icons">
                {selectedIcons.map((icon, index) => (
                  <img
                    key={index}
                    src={`/station_icon/${icon}`}
                    alt={`${selectedStation} 아이콘`}
                    className="line-icon"
                  />
                ))}
              </div>
              <div className="save-btn-container">
                <button onClick={handleSaveStation} className="save-btn">
                  역 저장하기
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default RandomStation;