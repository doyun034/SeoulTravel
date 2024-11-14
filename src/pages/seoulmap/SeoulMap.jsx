// src/pages/seoulmap/SeoulMap.jsx

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/SeoulMap.css';
import seoulMapImage from '../../assets/topography/서울지형.png';

// Import district images
import gangbukImage from '../../assets/topography/강북구.png';
import seongbukImage from '../../assets/topography/성북구.png';
import gangnamImage from '../../assets/topography/강남구.png';
import dobongImage from '../../assets/topography/도봉구.png';
import nowonImage from '../../assets/topography/노원구.png';
import jungnangImage from '../../assets/topography/중랑구.png';
import dongdaemunImage from '../../assets/topography/동대문구.png';
import kwangjinImage from '../../assets/topography/광진구.png';
import seongdongImage from '../../assets/topography/성동구.png';
import jungImage from '../../assets/topography/중구.png';
import jongnoImage from '../../assets/topography/종로구.png';
import yongsanImage from '../../assets/topography/용산구.png';
import mapoImage from '../../assets/topography/마포구.png';
import seodaemunImage from '../../assets/topography/서대문구.png';
import eunpyeongImage from '../../assets/topography/은평구.png';
import songpaImage from '../../assets/topography/송파구.png';
import gangdongImage from '../../assets/topography/강동구.png';
import seochoImage from '../../assets/topography/서초구.png';
import dongjakImage from '../../assets/topography/동작구.png';
import kwanakImage from '../../assets/topography/관악구.png';
import geumcheonImage from '../../assets/topography/금천구.png';
import guroImage from '../../assets/topography/구로구.png';
import yangcheonImage from '../../assets/topography/양천구.png';
import yeongdeungpoImage from '../../assets/topography/영등포구.png';
import gangseoImage from '../../assets/topography/강서구.png';

// Mapping of district names to their images
const districtImages = {
  gangbuk: gangbukImage,
  seongbuk: seongbukImage,
  gangnam: gangnamImage,
  dobong: dobongImage,
  nowon: nowonImage,
  jungnang: jungnangImage,
  dongdaemun: dongdaemunImage,
  kwangjin: kwangjinImage,
  seongdong: seongdongImage,
  jung: jungImage,
  jongno: jongnoImage,
  yongsan: yongsanImage,
  mapo: mapoImage,
  seodaemun: seodaemunImage,
  eunpyeong: eunpyeongImage,
  songpa: songpaImage,
  gangdong: gangdongImage,
  seocho: seochoImage,
  dongjak: dongjakImage,
  kwanak: kwanakImage,
  geumcheon: geumcheonImage,
  guro: guroImage,
  yangcheon: yangcheonImage,
  yeongdeungpo: yeongdeungpoImage,
  gangseo: gangseoImage,
};

const SeoulMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [clippedImageSrcs, setClippedImageSrcs] = useState(() => {
    const initialSrcs = {};
    Object.keys(districtImages).forEach((district) => {
      initialSrcs[district] = localStorage.getItem(`clippedImageSrc_${district}`) || null;
    });
    return initialSrcs;
  });
  const canvasRefs = useRef({});
  const navigate = useNavigate();

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    // Save the selected district to localStorage
    localStorage.setItem('lastSelectedDistrict', district);
    navigate('/seoultravel/edit/map', { state: { district } });
  };

  useEffect(() => {
    Object.keys(districtImages).forEach((district) => {
      if (clippedImageSrcs[district]) {
        const img = new Image();
        img.src = clippedImageSrcs[district];
        img.onload = () => {
          const canvas = canvasRefs.current[district];
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        img.onerror = () => {
          console.error(`이미지 로드 실패: ${clippedImageSrcs[district]}`);
        };
      }
    });
  }, [clippedImageSrcs]);

  return (
      <div className="main-page">
        <h1>서울 지도 화면</h1>
        <div className="map-container">
          <img src={seoulMapImage} alt="서울 지형" className="map-image" />

          {Object.keys(districtImages).map((district) => (
              <div
                  key={district}
                  className={`district ${district}`}
                  onClick={() => handleDistrictClick(district)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleDistrictClick(district);
                  }}
                  aria-label={`Select ${district}`}
              >
                <div
                    className={`${district}-hover-image hover-image ${
                        clippedImageSrcs[district] ? 'uploaded' : ''
                    }`}
                >
                  {clippedImageSrcs[district] ? (
                      <img
                          src={clippedImageSrcs[district]}
                          alt={`클립핑된 ${district} 이미지`}
                          style={{ width: '100%', height: '100%' }}
                      />
                  ) : (
                      <canvas ref={(el) => (canvasRefs.current[district] = el)} style={{ display: 'none' }}></canvas>
                  )}
                </div>
                {/* Optional: Add edit button here if needed */}
                {/* Example:
            <button
              className={`edit-button ${clippedImageSrcs[district] ? 'visible' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering district click
                handleDistrictClick(district);
              }}
              aria-label={`Edit ${district} 사진`}
            >
              사진 편집
            </button>
            */}
              </div>
          ))}
        </div>
      </div>
  );
};

export default SeoulMap;
