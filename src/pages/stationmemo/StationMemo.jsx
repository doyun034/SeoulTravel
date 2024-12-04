import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/StationiMemo.css';
import foodImage from '../../assets/images/food.png';
import caffeImage from '../../assets/images/caffe.png';
import memoImage from '../../assets/images/memo.png';

const StationMemo = () => {
  const [stationMemos, setStationMemos] = useState([]);
  const [newMemo, setNewMemo] = useState({
    date: '',
    food: '',
    caffe: '',
    memo: '',
  });
  const [selectedStation, setSelectedStation] = useState(null); // 선택된 역의 인덱스
  const userId = localStorage.getItem('userId'); // 로컬 스토리지에서 userId 가져오기
  const navigate = useNavigate();

  // 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    if (!userId) {
      alert("로그인 후 이용 가능합니다.");
      navigate('/seoultravel/login');
      return;
    }

    const storedMemos = localStorage.getItem(`${userId}_stationMemos`); // userId 기반으로 데이터 불러오기
    if (storedMemos) {
      setStationMemos(JSON.parse(storedMemos));
    }

    // 로컬스토리지에서 저장된 역 이름 가져오기
    const storedStations = localStorage.getItem(`${userId}_storedStations`);
    if (storedStations) {
      const stations = JSON.parse(storedStations); // JSON으로 파싱
      setStationMemos((prevMemos) => {
        // 기존에 저장된 역들이 있는 경우 그 뒤에 추가
        const updatedMemos = [...prevMemos];
        stations.forEach((station) => {
          const isDuplicate = updatedMemos.some((memo) => memo.title === station);
          if (!isDuplicate) {
            updatedMemos.push({ title: station, date: '', food: '', caffe: '', memo: '' });
          }
        });
        return updatedMemos;
      });
    }
  }, [userId]); // userId 변경 시마다 useEffect가 다시 실행되도록

  // 데이터가 변경될 때 로컬 스토리지에 저장하기
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`${userId}_stationMemos`, JSON.stringify(stationMemos)); // userId 기반으로 데이터 저장
    }
  }, [stationMemos, userId]);

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

  const handleDelete = () => {
    if (selectedStation === null) {
      alert('삭제할 역을 선택해주세요.');
      return;
    }

    const updatedMemos = [...stationMemos];
    const deletedStationTitle = updatedMemos[selectedStation].title; // 삭제된 역의 제목

    // 선택된 역을 제거
    updatedMemos.splice(selectedStation, 1);

    // 삭제된 역을 storedStations에서 제거
    const storedStations = localStorage.getItem(`${userId}_storedStations`);
    if (storedStations) {
      const stations = JSON.parse(storedStations);
      const updatedStations = stations.filter(station => station !== deletedStationTitle); // 삭제된 역 제외

      // updatedStations 배열을 로컬 스토리지에 저장
      localStorage.setItem(`${userId}_storedStations`, JSON.stringify(updatedStations));
    }

    // 상태 업데이트
    setStationMemos(updatedMemos);
    localStorage.setItem(`${userId}_stationMemos`, JSON.stringify(updatedMemos)); // stationMemos를 로컬 스토리지에 저장

    alert('역이 삭제되었습니다.');
    setSelectedStation(null); // 선택된 역 초기화
    setNewMemo({
      date: '',
      food: '',
      caffe: '',
      memo: '',
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
          {selectedStation !== null && (
            <div className="selected-station-title">
              {/* 선택된 역의 이름을 표시 */}
              <span>{stationMemos[selectedStation].title}</span>
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
            <div className="button-box">
              <div className="save-button-box">
                <button className="save-button" onClick={handleSave}>
                  저장하기
                </button>
              </div>

              <div className="delete-button-box">
                <button className="delete-button" onClick={handleDelete}>
                  삭제하기
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StationMemo;




// import React, { useState, useEffect } from 'react';
// import '../../styles/StationiMemo.css';
// import foodImage from '../../assets/images/food.png';
// import caffeImage from '../../assets/images/caffe.png';
// import memoImage from '../../assets/images/memo.png';

// const StationMemo = () => {
//   const [stationMemos, setStationMemos] = useState([]);
//   const [newMemo, setNewMemo] = useState({
//     date: '',
//     food: '',
//     caffe: '',
//     memo: '',
//   });
//   const [selectedStation, setSelectedStation] = useState(null); // 선택된 역의 인덱스

//   // 로컬 스토리지에서 데이터 불러오기
//   useEffect(() => {
//     const storedMemos = localStorage.getItem('stationMemos');
//     if (storedMemos) {
//       setStationMemos(JSON.parse(storedMemos));
//     }

//     // 로컬스토리지에서 저장된 역 이름 가져오기
//     const storedStations = localStorage.getItem('storedStations');
//     if (storedStations) {
//       const stations = JSON.parse(storedStations); // JSON으로 파싱
//       setStationMemos((prevMemos) => {
//         // 기존에 저장된 역들이 있는 경우 그 뒤에 추가
//         const updatedMemos = [...prevMemos];
//         stations.forEach((station) => {
//           const isDuplicate = updatedMemos.some((memo) => memo.title === station);
//           if (!isDuplicate) {
//             updatedMemos.push({ title: station, line: 'default', date: '', food: '', caffe: '', memo: '' });
//           }
//         });
//         return updatedMemos;
//       });
//     }
//   }, []);

//   // 데이터가 변경될 때 로컬 스토리지에 저장하기
//   useEffect(() => {
//     localStorage.setItem('stationMemos', JSON.stringify(stationMemos));
//   }, [stationMemos]);

//   // 입력 필드 변경 핸들러
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewMemo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // 저장하기 버튼 클릭 핸들러
//   const handleSave = () => {
//     if (selectedStation === null) {
//       alert('수정할 역을 선택해주세요.');
//       return;
//     }

//     const { date, food, caffe, memo } = newMemo;
//     if (date && food && caffe && memo) {
//       const updatedMemos = [...stationMemos];
//       updatedMemos[selectedStation] = {
//         ...updatedMemos[selectedStation],
//         date,
//         food,
//         caffe,
//         memo,
//       };

//       setStationMemos(updatedMemos);
//       alert('메모가 성공적으로 저장되었습니다.');
//     } else {
//       alert('모든 필드를 입력해주세요.');
//     }
//   };

//   // 역 선택 핸들러
//   const handleSelect = (index) => {
//     setSelectedStation(index);
//     // 선택된 역의 데이터를 newMemo에 채워 넣어 편집할 수 있도록 함
//     const selected = stationMemos[index];
//     setNewMemo({
//       date: selected.date || '', // 날짜 필드 추가
//       food: selected.food,
//       caffe: selected.caffe,
//       memo: selected.memo,
//     });
//   };

//   return (
//     <div className="station-memo-wrapper">
//       <div className="station-memo-container">
//         {/* 저장된 역 목록 및 리스트 */}
//         <div className="saved-stations-container">
//           {/* 저장된 역 목록 박스 */}
//           <div className="saved-stations-box">
//             저장된 역 목록
//           </div>

//           {/* 저장된 역 목록 리스트 */}
//           <div className="saved-stations-list">
//             {stationMemos.map((memo, index) => (
//               <div
//                 className={`station-title-item ${selectedStation === index ? 'active' : ''}`}
//                 key={index}
//                 onClick={() => handleSelect(index)}
//               >
//                 <span className={`line-color-box-${memo.line}`}>
//                   {memo.title}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 메모 작성 섹션 */}
//         <div className="memo-section">
//           {selectedStation !== null && (
//             <div className="selected-station-title">
//               {/* 선택된 역의 이름을 표시 */}
//               <span className={`line-color-box-${stationMemos[selectedStation].line}`}>
//                 {stationMemos[selectedStation].title}
//               </span>
//             </div>
//           )}

//           <div className="memo-form-box">
//             {/* 날짜 입력 박스 추가 */}
//             <div className="input-box">
//               <img src={memoImage} alt="Date Icon" />
//               <input
//                 type="text"
//                 name="date"
//                 placeholder="날짜를 기입해주세요."
//                 value={newMemo.date}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* 음식 입력 박스 */}
//             <div className="input-box">
//               <img src={foodImage} alt="Food Icon" />
//               <input
//                 type="text"
//                 name="food"
//                 placeholder="음식을 입력하세요."
//                 value={newMemo.food}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* 카페 입력 박스 */}
//             <div className="input-box">
//               <img src={caffeImage} alt="Caffe Icon" />
//               <input
//                 type="text"
//                 name="caffe"
//                 placeholder="카페를 입력하세요."
//                 value={newMemo.caffe}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* 메모 입력 박스 */}
//             <div className="memo-input-box">
//               <img src={memoImage} alt="Memo Icon" />
//               <textarea
//                 name="memo"
//                 placeholder="메모를 입력하세요."
//                 value={newMemo.memo}
//                 onChange={handleChange}
//               ></textarea>
//             </div>

//             {/* 저장하기 버튼 */}
//             <div className="save-button-box">
//               <button className="save-button" onClick={handleSave}>
//                 저장하기
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StationMemo;

