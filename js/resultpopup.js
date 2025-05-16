// js_nextcon/resultpopup.js
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const db = getFirestore();
let currentPlaceId = null;

// 장소별 투표 결과 팝업 열기
export async function openResultPopup(placeId, placeName) {
  currentPlaceId = placeId;
  // 1) UI 열기 & 제목 설정
  document.getElementById("resultPopup").classList.remove("hidden");
  document.getElementById("resultTitle").textContent = placeName;

  // 2) Firestore에서 votesHistory 컬렉션 읽어오기
  const votesCol = collection(db, "places", placeId, "votesHistory");
  // (최신 100개만, 필요 없으면 limit 제거)
  
  // 1시간 전 시점 계산
  const oneHourAgoDate = new Date(Date.now() - 60 * 60 * 1000);
  // Firestore 쿼리 자체에 where 절 걸기 (timestamp >= 1시간 전)
  const votesQuery = query(
    votesCol,
    where("timestamp", ">=", oneHourAgoDate),
    orderBy("timestamp", "desc")
    // 필요하다면 limit(100) 붙여도 OK
  );
  const votesSnap = await getDocs(votesQuery);
  const votes = votesSnap.docs.map(doc => doc.data().result);
  // 3) 통계 계산
  const counts = { 여유: 0, 보통: 0, 혼잡: 0 };
  votes.forEach(v => {
    if (counts[v] !== undefined) counts[v]++;
  });
  const total = votes.length;
  const mode = votes.length
    ? Object.entries(counts).reduce((a, b) => a[1] >= b[1] ? a : b)[0]
    : "데이터 없음";

  // 4) UI 반영
  document.getElementById("congestionStatus").textContent = mode;
  document.getElementById("bar-easy").style.width   = total ? `${counts['여유']/total*100}%` : `0%`;
  document.getElementById("count-easy").textContent = `${counts['여유']}표`;
  document.getElementById("bar-medium").style.width = total ? `${counts['보통']/total*100}%` : `0%`;
  document.getElementById("count-medium").textContent = `${counts['보통']}표`;
  document.getElementById("bar-busy").style.width   = total ? `${counts['혼잡']/total*100}%` : `0%`;
  document.getElementById("count-busy").textContent = `${counts['혼잡']}표`;
}

// 최근 투표 10개 기록 팝업
export async function openRecentPopup() {
  if (!currentPlaceId) return;
  document.getElementById("recentPopup").classList.remove("hidden");

  // Firestore에서 최신 10개 가져오기
  const votesCol = collection(db, "places", currentPlaceId, "votesHistory");
  const recentSnap = await getDocs(query(votesCol, orderBy("timestamp", "desc"), limit(10)));

  const ul = document.getElementById("recentVoteList");
  ul.innerHTML = "";

  recentSnap.docs.forEach(doc => {
    const { result, timestamp } = doc.data();
    const date = timestamp?.toDate() || new Date();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const li = document.createElement("li");
    li.textContent = `${hh}:${mm} - ${result}`;
    ul.appendChild(li);
  });
}

export function closeResultPopup() {
  document.getElementById("resultPopup").classList.add("hidden");
}

export function closeRecentPopup() {
  document.getElementById("recentPopup").classList.add("hidden");
}

// 전역 노출
window.openResultPopup   = openResultPopup;
window.openRecentPopup   = openRecentPopup;
window.closeResultPopup  = closeResultPopup;
window.closeRecentPopup  = closeRecentPopup;