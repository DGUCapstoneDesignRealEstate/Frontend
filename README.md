![header](https://capsule-render.vercel.app/api?type=venom&color=0:E4D6BE,100:F2BD52&height=300&section=header&text=Budda&fontSize=80&desc=부동산을%20다%20예측하다&descAlignY=75&fontColor=C69B0F)
<br>

# 🎨Tech
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) <br>
![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) <br>
![Kakoa Maps SDK](https://img.shields.io/badge/Kakao_Maps_SDK-F9E000?style=for-the-badge&logo=kakao&logoColor=white)

<br>

# 📌 프로젝트 소개

### 💸프로젝트명
AI를 활용한 부동산 이상 거래 후보군 선별

<br>

### 👥 팀구성
| 이름 | 역할 | 학번 | 전공 |
| --- | --- | --- | --- |
| 임성혁 | 팀장, AI | 2019112063 | 컴퓨터공학전공 |
| 김도현 | FE | 2021111981 | 컴퓨터공학전공 |
| 백승진 | BE | 2019112047 | 컴퓨터공학전공 |
| 이인수 | AI | 2019111987 | 컴퓨터공학전공 |

<br>

### 결과 화면
| 랜딩 페이지 | 메인 페이지 | 상세 페이지 |
| --- | --- | --- |
| <img width="1920" height="1030" alt="image" src="https://github.com/user-attachments/assets/b3efd89a-2b47-41ba-8073-53e3ad1f2b8c" /> | <img width="1920" height="1030" alt="image (1)" src="https://github.com/user-attachments/assets/db4b2f65-cc48-439d-9ab7-ea32ecbd4b42" /> |<img width="1920" height="1030" alt="image (2)" src="https://github.com/user-attachments/assets/d87dc39b-c30c-478f-a41c-747df77fdec0" /> |

<br>

---

<br>

## 😮 [트러블 슈팅] URL 직렬화 및 상태 유지

### 적용 이유
- 프로젝트 당시, 초기 상태의 많은 데이터의 범위를 좁히기 위해 필터를 적용하는 것이 서비스의 사용 방법
- 서비스 기획 상, 구/법정동으로 범위를 좁혀 해당 필터 상태에서 이상거래 후보군을 판별하는 것이 목적
- 하지만 상세 페이지로 이동 후, 복귀 시 매번 상태가 초기화되어 불편함이 존재

### 적용 전
https://github.com/user-attachments/assets/5360c214-b98d-4627-b798-9cec107049d9

- 구, 동 선택 후 새로고침 시 서울 전체, 동 전체로 초기화되는 화면
- 선택 후 시작 페이지로 이동 후 다시 돌아왔을 때에도 초기화되는 모습

### 적용 후
https://github.com/user-attachments/assets/a593b8bd-4a04-4d3f-a0bb-43e4ea097ad5

- 경로에 query parameter 추가된 것을 확인
- 구, 동 선택 후 새로고침 및 페이지 이동 후 복귀 시 필터 상태가 유지되는 모습
- 정렬 순서, 의심 여부, 날짜 선택도 마찬가지로 반영하였으나 간략하게 촬영
- 네트워크 탭에서 요청 경로가 초기화되지 않는 것도 확인하였으나 백엔드 서버가 없는 상태이기 때문에 상단 부분만 촬영


