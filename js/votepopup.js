// js_nextcon/votepopup.js
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const db = getFirestore();
// 현재 투표 중인 placeId를 저장
let currentPlaceId = null;

const userRef = doc(db, "users", "default");

// 1) 호출 signature를 (id, name)으로 바꿔줬어
export function openvote(placeId, placeName) {
  currentPlaceId = placeId;
  document.getElementById("votePopup").classList.remove("hidden");
  document.getElementById("popupTitle").textContent = placeName;
}

// 2) 실제로 Firestore에 저장
export async function vote(status) {
  if (!currentPlaceId) return alert("❌ 잘못된 투표입니다.");

  try {
    await addDoc(
      collection(db, "places", currentPlaceId, "votesHistory"), 
      {
        result: status,
        timestamp: serverTimestamp()
      }
    );
    // 2) 투표할 때마다 포인트 +1
    await updateDoc(userRef, {
      point: increment(1)
    });

    alert("✅ 투표를 완료했습니다! 포인트 +1");
  } catch (e) {
    console.error(e);
    alert("❌ 투표 중 오류가 발생했어요.");
  } finally {
    // 팝업 닫고 placeId 초기화
    document.getElementById("votePopup").classList.add("hidden");
    currentPlaceId = null;
  }
}

// 기존 닫기 함수
export function closevote() {
  document.getElementById("votePopup").classList.add("hidden");
  currentPlaceId = null;
}

// index.html의 onclick 연결을 위해 전역 노출
window.openvote  = openvote;
window.vote      = vote;
window.closevote = closevote;