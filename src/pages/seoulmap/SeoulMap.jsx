import React from 'react';
import '../../styles/SeoulMap.css';

const SeoulMap = () => {
  return (
    <div className="main-page">
      <h1>서울 지도 화면구현</h1>
      <div className="map-container">
        <img src="/assets/topography/서울지형.png" alt="서울 지형" className="map-image" />

        {/* 성북구 핫스팟 */}
        <div className="district seongbuk">
          <div className="seongbuk-hover-image"></div>
        </div>

        {/* 다른 구를 추가하려면 여기에 비슷한 형식으로 추가 */}
      </div>
    </div>
  );
};

export default SeoulMap;


// import React from 'react';
// import '../../styles/SeoulMap.css';

// const SeoulMap = () => {
//   return (
//     <div className="main-page">
//       <h1>서울 지도 화면</h1>
//       <div className="map-container">
//         <img src="/assets/topography/서울지형.png" alt="서울 지형" className="map-image" />
//         <div className="district seongbuk">성북구</div>
//         {/* 다른 자치구도 이와 같은 방식으로 추가할 수 있습니다 */}
//       </div>
//     </div>
//   );
// };

// export default SeoulMap;
