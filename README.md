# KUcrowdy 🍱📍

고려대학교 학생들을 위한 **식당 / 라운지 혼잡도 실시간 공유 웹**

“밥약 시즌이면, 빈자리 있는 식당을 찾아 헤매던 경험, 다들 있잖아요?”

KUcrowdy는 점심시간마다 식당을 순례하고, 시험 기간엔 라운지 빈자리를 찾아 헤매야 했던  
고려대 학생들의 일상적인 불편함에서 출발했습니다.

직접 돌아다니지 않아도 한눈에!  
**실시간 사용자 투표로 혼잡도를 확인하는**  
스마트한 캠퍼스 도우미 웹을 만들었습니다.

## 📌 주요 기능

- 🗺️ Google Map 기반 마커 표시
- ✅ 혼잡도(여유/보통/혼잡) 투표 및 시각화
- 🎯 최빈값 기반 마커 색상 자동 변경 (초록/노랑/빨강)
- ⏳ 열람권을 사용한 30분 제한 접근 시스템
- 💬 최근 10개의 실시간 투표 기록 확인
- 🪙 포인트 & 열람권 보유 시스템 
- 🔐 Firebase 기반 실시간 DB 및 접근 권한 설정

## 🛠 기술 스택

| 항목 | 기술 |
|------|------|
| **Frontend** | HTML, Tailwind CSS, JavaScript |
| **지도 API** | Google Maps JavaScript API |
| **Backend/DB** | Firebase Firestore / Firebase Hosting |
| **Auth & Logic** | Firebase 시간 인증, localStorage, JS UI 제어 |

## 📂 프로젝트 구조
```
KUcrowdy/
├── index.html           # 메인 투표 페이지 (MY 팝업 포함)
├── crowdymap.html       # 혼잡도 시각화 지도 페이지

├── js_nextcon/
│   ├── mypage.js        # 포인트 적립 및 열람권 구매/사용 기능
│   ├── votepopup.js     # 투표 팝업 UI 제어
│   └── resultpopup.js   # 혼잡도 결과 및 최근 투표 기록 팝업

├── image_nextcon/
│   └── korea_univ.jpg   # 배경 이미지

└── README.md            # 프로젝트 설명 파일
```
