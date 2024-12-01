import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/EditMap.css';
import uploadIcon from '../../assets/images/upload.png';
import tablerMapStar from '../../assets/images/tabler_map-star.png'; // 헤더 아이콘 추가
import pinkLine from '../../assets/images/Pink_Line.png'; // 핑크 라인 이미지 추가
import ellipseImage from '../../assets/images/Ellipse.png'; // Ellipse 이미지 추가

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

// 구역별 한글 이름 매핑
const districtNames = {
  gangbuk: '강북구',
  seongbuk: '성북구',
  gangnam: '강남구',
  dobong: '도봉구',
  nowon: '노원구',
  jungnang: '중랑구',
  dongdaemun: '동대문구',
  kwangjin: '광진구',
  seongdong: '성동구',
  jung: '중구',
  jongno: '종로구',
  yongsan: '용산구',
  mapo: '마포구',
  seodaemun: '서대문구',
  eunpyeong: '은평구',
  songpa: '송파구',
  gangdong: '강동구',
  seocho: '서초구',
  dongjak: '동작구',
  kwanak: '관악구',
  geumcheon: '금천구',
  guro: '구로구',
  yangcheon: '양천구',
  yeongdeungpo: '영등포구',
  gangseo: '강서구',
};

const EditMap = () => {
  const location = useLocation();
  // district 정보를 navigation state 또는 localStorage에서 가져옵니다.
  const district = location.state?.district || localStorage.getItem('lastSelectedDistrict');
  const [clippedImageSrc, setClippedImageSrc] = useState(() => {
    return localStorage.getItem(`clippedImageSrc_${district}`) || null;
  });
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && district) {
      setClippedImageSrc(null);

      const reader = new FileReader();
      reader.onload = () => {
        const imageSrc = reader.result;
        applyImageToDistrict(district, imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyImageToDistrict = (district, imageSrc) => {
    const canvas = canvasRef.current;
    if (!canvas || !districtImages[district]) return;

    const ctx = canvas.getContext('2d');
    const districtImage = new Image();
    districtImage.src = districtImages[district];
    const uploaded = new Image();
    uploaded.src = imageSrc;

    districtImage.onload = () => {
      canvas.width = 450;
      canvas.height = 450;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(districtImage, 0, 0, canvas.width, canvas.height);

      uploaded.onload = () => {
        ctx.globalCompositeOperation = 'source-in';
        ctx.drawImage(uploaded, 0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';

        const dataUrl = canvas.toDataURL('image/png');
        setClippedImageSrc(dataUrl);
        localStorage.setItem(`clippedImageSrc_${district}`, dataUrl);
      };
    };
  };

  useEffect(() => {
    if (clippedImageSrc) {
      const img = new Image();
      img.src = clippedImageSrc;
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = 450;
        canvas.height = 450;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [clippedImageSrc]);

  if (!district) {
    return <div>구역 정보가 없습니다.</div>;
  }

  const districtName = districtNames[district];

  return (
    <div className="edit-map-page">
      <div className="edit-map-wrapper">
        {/* 왼쪽 섹션 */}
        <div className="edit-map-left">
          {/* 왼쪽 상단에 스타 이미지와 텍스트 추가 */}
          <div className="edit-map-left-header">
            <img src={tablerMapStar} alt="Map Star" className="edit-map-left-header-icon" />
            <h1 className="edit-map-left-header-text">{districtName}</h1>
          </div>
          <img
            src={districtImages[district]}
            alt={`${districtName} 이미지`}
            className="edit-map-image"
            style={{ marginTop: '20px' }}
          />
          {/* 핑크 라인 추가 */}
          <img src={pinkLine} alt="Pink Line" className="edit-map-pink-line" />
        </div>

        {/* 오른쪽 섹션 */}
        <div className="edit-map-right">
          {/* Ellipse 이미지 추가 */}
          <img src={ellipseImage} alt="Ellipse Background" className="edit-map-ellipse" />
          <div className="edit-map-right-content">
            {/* 텍스트 추가 */}
            <p className="edit-map-right-text">지도에 사진을 넣어 나만의 지도를 만들어보아요!</p>
            <div className="edit-map-right-buttons">
              {clippedImageSrc ? (
                <img
                  src={clippedImageSrc}
                  alt={`클립핑된 ${districtName} 이미지`}
                  className="edit-map-image"
                />
              ) : (
                <img
                  src={districtImages[district]}
                  alt={`${districtName} 이미지`}
                  className="edit-map-image"
                />
              )}
              <button
                className="edit-map-button"
                onClick={() => document.getElementById('upload').click()}
              >
                <img src={uploadIcon} alt="Upload Icon" className="edit-map-upload-icon" />
                <span className="edit-map-button-text">나만의 지도 편집</span>
              </button>
            </div>
            <input
              type="file"
              id="upload"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMap;





// // src/pages/editmap/EditMap.jsx

// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import '../../styles/EditMap.css';
// import uploadIcon from '../../assets/images/upload.png';
// import tablerMapStar from '../../assets/images/tabler_map-star.png'; // 헤더 아이콘 추가
// import pinkLine from '../../assets/images/Pink_Line.png'; // 핑크 라인 이미지 추가
// import ellipseImage from '../../assets/images/Ellipse.png'; // Ellipse 이미지 추가

// // 각 구역별 이미지 파일 가져오기
// import gangbukImage from '../../assets/topography/강북구.png';
// import seongbukImage from '../../assets/topography/성북구.png';
// import gangnamImage from '../../assets/topography/강남구.png';
// import dobongImage from '../../assets/topography/도봉구.png';
// import nowonImage from '../../assets/topography/노원구.png';
// import jungnangImage from '../../assets/topography/중랑구.png';
// import dongdaemunImage from '../../assets/topography/동대문구.png';
// import kwangjinImage from '../../assets/topography/광진구.png';
// import seongdongImage from '../../assets/topography/성동구.png';
// import jungImage from '../../assets/topography/중구.png';
// import jongnoImage from '../../assets/topography/종로구.png';
// import yongsanImage from '../../assets/topography/용산구.png';
// import mapoImage from '../../assets/topography/마포구.png';
// import seodaemunImage from '../../assets/topography/서대문구.png';
// import eunpyeongImage from '../../assets/topography/은평구.png';
// import songpaImage from '../../assets/topography/송파구.png';
// import gangdongImage from '../../assets/topography/강동구.png';
// import seochoImage from '../../assets/topography/서초구.png';
// import dongjakImage from '../../assets/topography/동작구.png';
// import kwanakImage from '../../assets/topography/관악구.png';
// import geumcheonImage from '../../assets/topography/금천구.png';
// import guroImage from '../../assets/topography/구로구.png';
// import yangcheonImage from '../../assets/topography/양천구.png';
// import yeongdeungpoImage from '../../assets/topography/영등포구.png';
// import gangseoImage from '../../assets/topography/강서구.png';

// // 구역별 이미지 매핑
// const districtImages = {
//   gangbuk: gangbukImage,
//   seongbuk: seongbukImage,
//   gangnam: gangnamImage,
//   dobong: dobongImage,
//   nowon: nowonImage,
//   jungnang: jungnangImage,
//   dongdaemun: dongdaemunImage,
//   kwangjin: kwangjinImage,
//   seongdong: seongdongImage,
//   jung: jungImage,
//   jongno: jongnoImage,
//   yongsan: yongsanImage,
//   mapo: mapoImage,
//   seodaemun: seodaemunImage,
//   eunpyeong: eunpyeongImage,
//   songpa: songpaImage,
//   gangdong: gangdongImage,
//   seocho: seochoImage,
//   dongjak: dongjakImage,
//   kwanak: kwanakImage,
//   geumcheon: geumcheonImage,
//   guro: guroImage,
//   yangcheon: yangcheonImage,
//   yeongdeungpo: yeongdeungpoImage,
//   gangseo: gangseoImage,
// };

// // 구역별 한글 이름 매핑
// const districtNames = {
//   gangbuk: '강북구',
//   seongbuk: '성북구',
//   gangnam: '강남구',
//   dobong: '도봉구',
//   nowon: '노원구',
//   jungnang: '중랑구',
//   dongdaemun: '동대문구',
//   kwangjin: '광진구',
//   seongdong: '성동구',
//   jung: '중구',
//   jongno: '종로구',
//   yongsan: '용산구',
//   mapo: '마포구',
//   seodaemun: '서대문구',
//   eunpyeong: '은평구',
//   songpa: '송파구',
//   gangdong: '강동구',
//   seocho: '서초구',
//   dongjak: '동작구',
//   kwanak: '관악구',
//   geumcheon: '금천구',
//   guro: '구로구',
//   yangcheon: '양천구',
//   yeongdeungpo: '영등포구',
//   gangseo: '강서구',
// };

// const EditMap = () => {
//   const location = useLocation();
//   // district 정보를 navigation state 또는 localStorage에서 가져옵니다.
//   const district = location.state?.district || localStorage.getItem('lastSelectedDistrict');
//   const [clippedImageSrc, setClippedImageSrc] = useState(() => {
//     return localStorage.getItem(`clippedImageSrc_${district}`) || null;
//   });
//   const canvasRef = useRef(null);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file && district) {
//       setClippedImageSrc(null);

//       const reader = new FileReader();
//       reader.onload = () => {
//         const imageSrc = reader.result;
//         applyImageToDistrict(district, imageSrc);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const applyImageToDistrict = (district, imageSrc) => {
//     const canvas = canvasRef.current;
//     if (!canvas || !districtImages[district]) return;

//     const ctx = canvas.getContext('2d');
//     const districtImage = new Image();
//     districtImage.src = districtImages[district];
//     const uploaded = new Image();
//     uploaded.src = imageSrc;

//     districtImage.onload = () => {
//       canvas.width = 450;
//       canvas.height = 450;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(districtImage, 0, 0, canvas.width, canvas.height);

//       uploaded.onload = () => {
//         ctx.globalCompositeOperation = 'source-in';
//         ctx.drawImage(uploaded, 0, 0, canvas.width, canvas.height);
//         ctx.globalCompositeOperation = 'source-over';

//         const dataUrl = canvas.toDataURL('image/png');
//         setClippedImageSrc(dataUrl);
//         localStorage.setItem(`clippedImageSrc_${district}`, dataUrl);
//       };
//     };
//   };

//   useEffect(() => {
//     if (clippedImageSrc) {
//       const img = new Image();
//       img.src = clippedImageSrc;
//       img.onload = () => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         canvas.width = 450;
//         canvas.height = 450;
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//       };
//     }
//   }, [clippedImageSrc]);

//   if (!district) {
//     return <div>구역 정보가 없습니다.</div>;
//   }

//   const districtName = districtNames[district];

//   return (
//     <div className="edit-map-page">
//       <div className="edit-map-wrapper">
//         {/* 왼쪽 섹션 */}
//         <div className="edit-map-left">
//           {/* 왼쪽 상단에 스타 이미지와 텍스트 추가 */}
//           <div className="edit-map-left-header">
//             <img src={tablerMapStar} alt="Map Star" className="edit-map-left-header-icon" />
//             <h1 className="edit-map-left-header-text">{districtName}</h1>
//           </div>
//           <img
//             src={districtImages[district]}
//             alt={`${districtName} 이미지`}
//             className="edit-map-image"
//             style={{ marginTop: '20px' }}
//           />
//           {/* 핑크 라인 추가 */}
//           <img src={pinkLine} alt="Pink Line" className="edit-map-pink-line" />
//         </div>

//         {/* 오른쪽 섹션 */}
//         <div className="edit-map-right">
//           {/* Ellipse 이미지 추가 */}
//           <img src={ellipseImage} alt="Ellipse Background" className="edit-map-ellipse" />
//           <div className="edit-map-right-content">
//             {/* 텍스트 추가 */}
//             <p className="edit-map-right-text">지도에 사진을 넣어 나만의 지도를 만들어보아요!</p>
//             <div className="edit-map-right-buttons">
//               {clippedImageSrc ? (
//                 <img
//                   src={clippedImageSrc}
//                   alt={`클립핑된 ${districtName} 이미지`}
//                   className="edit-map-image"
//                 />
//               ) : (
//                 <img
//                   src={districtImages[district]}
//                   alt={`${districtName} 이미지`}
//                   className="edit-map-image"
//                 />
//               )}
//               <button
//                 className="edit-map-button"
//                 onClick={() => document.getElementById('upload').click()}
//               >
//                 <img src={uploadIcon} alt="Upload Icon" className="edit-map-upload-icon" />
//                 <span className="edit-map-button-text">나만의 지도 편집</span>
//               </button>
//             </div>
//             <input
//               type="file"
//               id="upload"
//               style={{ display: 'none' }}
//               onChange={handleImageUpload}
//             />
//             {/* 캔버스 요소 */}
//             <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditMap;

