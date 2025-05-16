// js/mypage.js
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  increment,
  serverTimestamp,
  Timestamp
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const db = getFirestore();
const userRef = doc(db, "users", "default");

let point = 0;
let ticket = 0;

// 🔄 Firestore 실시간 구독: 문서가 바뀔 때마다 point, ticket 값 업데이트
onSnapshot(userRef, snap => {
  if (snap.exists()) {
    const data = snap.data();
    point = data.point;
    ticket = data.ticket;
    updateDisplay();
  }
});

function updateDisplay() {
  document.getElementById("pointDisplay").textContent  = point;
  document.getElementById("ticketDisplay").textContent = ticket;
}

async function purchaseTicket(){
  // 1. 포인트가 1 이상일 때만 실행
  if (point >= 1) {
    // 2. Firestore에 point–1, ticket+1 반영
    await updateDoc(userRef, {
      point:  increment(-1),  // 포인트 –1
      ticket: increment( 1)   // 티켓 +1
    });
  } else {
    alert("❌ 포인트가 부족합니다!");
  }
}

async function useTicket() {
  if (ticket >= 1) {
    // 1. 티켓–1
    // 2. accessExpires 필드에 현재 서버시간 + 30분을 기록
    const expiresAt = Timestamp.fromDate(new Date(Date.now() + 30 * 60 * 1000));
    await updateDoc(userRef, {
      ticket: increment(-1),
      accessExpires: expiresAt
    });
    alert("✅ 열람권을 사용했습니다! 30분 동안 Map에 접근할 수 있어요.");
    window.location.href = "/KUcrowdy/crowdymap.html";
  } else {
    alert("❌ 보유한 열람권이 없습니다!");
  }
}

// 전역에 노출 (index.html 버튼 onclick에서 호출 가능하도록)
window.purchaseTicket = purchaseTicket;
window.useTicket      = useTicket;