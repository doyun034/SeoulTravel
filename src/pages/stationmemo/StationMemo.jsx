import React, { useState, useEffect } from 'react';
import '../../styles/StationiMemo.css';
import MemoData from './MemoData';
// import uploadImage from '../../assets/images/upload.png';
import foodImage from '../../assets/images/food.png';
import caffeImage from '../../assets/images/caffe.png';
import memoImage from '../../assets/images/memo.png';

const StationMemo = () => {
  const [stationMemos, setStationMemos] = useState([]);
  const [newMemo, setNewMemo] = useState({
    date: '', // 날짜 필드 추가
    food: '',
    caffe: '',
    memo: '',
  });
  const [selectedStation, setSelectedStation] = useState(null); // 선택된 역의 인덱스

  // 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const storedMemos = localStorage.getItem('stationMemos');
    if (storedMemos) {
      setStationMemos(JSON.parse(storedMemos));
    } else {
      setStationMemos(MemoData); // 초기 더미 데이터 설정
    }
  }, []);

  // 데이터가 변경될 때 로컬 스토리지에 저장하기
  useEffect(() => {
    localStorage.setItem('stationMemos', JSON.stringify(stationMemos));
  }, [stationMemos]);

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMemo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 저장하기 버튼 클릭 핸들러
  const handleSave = () => {
    if (selectedStation === null) {
      alert('수정할 역을 선택해주세요.');
      return;
    }

    const { date, food, caffe, memo } = newMemo;
    if (date && food && caffe && memo) {
      const updatedMemos = [...stationMemos];
      updatedMemos[selectedStation] = {
        ...updatedMemos[selectedStation],
        date,
        food,
        caffe,
        memo,
      };
      setStationMemos(updatedMemos);
      alert('메모가 성공적으로 저장되었습니다.');
    } else {
      alert('모든 필드를 입력해주세요.');
    }
  };

  // 역 선택 핸들러
  const handleSelect = (index) => {
    setSelectedStation(index);
    // 선택된 역의 데이터를 newMemo에 채워 넣어 편집할 수 있도록 함
    const selected = stationMemos[index];
    setNewMemo({
      date: selected.date || '', // 날짜 필드 추가
      food: selected.food,
      caffe: selected.caffe,
      memo: selected.memo,
    });
  };

  return (
      <div className="station-memo-wrapper">
        <div className="station-memo-container">
          {/* 저장된 역 목록 및 리스트 */}
          <div className="saved-stations-container">
            {/* 저장된 역 목록 박스 */}
            <div className="saved-stations-box">
              저장된 역 목록
            </div>

            {/* 저장된 역 목록 리스트 */}
            <div className="saved-stations-list">
              {stationMemos.map((memo, index) => (
                  <div
                      className={`station-title-item ${selectedStation === index ? 'active' : ''}`}
                      key={index}
                      onClick={() => handleSelect(index)}
                  >
                <span className={`line-color-box-${memo.line}`}>
                  {memo.title}
                </span>
                  </div>
              ))}
            </div>
          </div>
          {/* 메모 작성 섹션 */}
          <div className="memo-section">
            {/* 선택된 역의 제목 표시 */}
            {selectedStation !== null && (
                <div className="selected-station-title">
              <span className={`line-color-box-${stationMemos[selectedStation].line}`}>
                {stationMemos[selectedStation].title}
              </span>
                </div>
            )}

            <div className="memo-form-box">
              {/* 날짜 입력 박스 추가 */}
              <div className="input-box">
                <img src={memoImage} alt="Date Icon" />
                <input
                    type="text"
                    name="date"
                    placeholder="날짜를 기입해주세요."
                    value={newMemo.date}
                    onChange={handleChange}
                />
              </div>

              {/* 음식 입력 박스 */}
              <div className="input-box">
                <img src={foodImage} alt="Food Icon" />
                <input
                    type="text"
                    name="food"
                    placeholder="음식을 입력하세요."
                    value={newMemo.food}
                    onChange={handleChange}
                />
              </div>

              {/* 카페 입력 박스 */}
              <div className="input-box">
                <img src={caffeImage} alt="Caffe Icon" />
                <input
                    type="text"
                    name="caffe"
                    placeholder="카페를 입력하세요."
                    value={newMemo.caffe}
                    onChange={handleChange}
                />
              </div>

              {/* 메모 입력 박스 */}
              <div className="memo-input-box">
                <img src={memoImage} alt="Memo Icon" />
                <textarea
                    name="memo"
                    placeholder="메모를 입력하세요."
                    value={newMemo.memo}
                    onChange={handleChange}
                ></textarea>
              </div>

              {/* 저장하기 버튼 */}
              <div className="save-button-box">
                <button className="save-button" onClick={handleSave}>
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default StationMemo;
