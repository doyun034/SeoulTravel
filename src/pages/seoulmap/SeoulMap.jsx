import React, { useState, useRef, useEffect } from 'react';
import '../../styles/SeoulMap.css';
import seoulMapImage from '../../assets/topography/서울지형.png';

// 각 구역별 이미지 파일 가져오기
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
import uploadIcon from '../../assets/images/upload.png';

// 구역별 이미지 매핑
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
    Object.keys(districtImages).forEach(district => {
      initialSrcs[district] = localStorage.getItem(`clippedImageSrc_${district}`) || null;
    });
    return initialSrcs;
  });
  const canvasRefs = useRef({});

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && selectedDistrict) {
      setClippedImageSrcs((prevSrcs) => ({
        ...prevSrcs,
        [selectedDistrict]: null,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        const imageSrc = reader.result;
        applyImageToDistrict(selectedDistrict, imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyImageToDistrict = (district, imageSrc) => {
    const canvas = canvasRefs.current[district];
    if (!canvas || !districtImages[district]) return;

    const ctx = canvas.getContext('2d');
    const districtImage = new Image();
    districtImage.src = districtImages[district];
    const uploaded = new Image();
    uploaded.src = imageSrc;

    districtImage.onload = () => {
      canvas.width = districtImage.width;
      canvas.height = districtImage.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(districtImage, 0, 0);

      uploaded.onload = () => {
        ctx.globalCompositeOperation = 'source-in';
        ctx.drawImage(uploaded, 0, 0, districtImage.width, districtImage.height);
        ctx.globalCompositeOperation = 'source-over';

        const dataUrl = canvas.toDataURL('image/png');
        setClippedImageSrcs((prevSrcs) => ({
          ...prevSrcs,
          [district]: dataUrl,
        }));
        localStorage.setItem(`clippedImageSrc_${district}`, dataUrl);
      };
    };
  };

  useEffect(() => {
    if (selectedDistrict && clippedImageSrcs[selectedDistrict]) {
      const img = new Image();
      img.src = clippedImageSrcs[selectedDistrict];
      img.onload = () => {
        const canvas = canvasRefs.current[selectedDistrict];
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [selectedDistrict, clippedImageSrcs]);

  return (
    <div className="main-page">
      <h1>서울 지도 화면</h1>
      <div className="map-container">
        <img src={seoulMapImage} alt="서울 지형" className="map-image" />

        {Object.keys(districtImages).map(district => (
          <div key={district} className={`district ${district}`} onClick={() => handleDistrictClick(district)}>
            <div className={`${district}-hover-image`}>
              {clippedImageSrcs[district] ? (
                <img src={clippedImageSrcs[district]} alt={`클립핑된 ${district} 이미지`} style={{ width: '100%', height: '100%' }} />
              ) : (
                <canvas ref={(el) => (canvasRefs.current[district] = el)} style={{ display: 'none' }}></canvas>
              )}
            </div>
          </div>
        ))}

        {selectedDistrict && (
          <div className="selected-district-view">
            <img src={clippedImageSrcs[selectedDistrict] || districtImages[selectedDistrict]} alt={`${selectedDistrict} 이미지`} className="selected-district-image" />
            <button className="edit-button" onClick={() => document.getElementById('upload').click()}>
              <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
              <span>나만의 지도 편집</span>
            </button>
            <input
              type="file"
              id="upload"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </div>
        )}
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

//         {/* 성북구 핫스팟 */}
//         <div className="district seongbuk">
//           <div className="seongbuk-hover-image"></div>
//         </div>

//         {/* 다른 구를 추가하려면 여기에 비슷한 형식으로 추가 */}
//       </div>
//     </div>
//   );
// };

// export default SeoulMap;
