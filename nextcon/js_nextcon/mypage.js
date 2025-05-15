//firebase 연동하면 바꿀값,열람권 리셋문제 확인
let point = localStorage.getItem("point");
point = point !== null ? parseInt(point) : 3;

let ticket = localStorage.getItem("ticket");
ticket = ticket !== null ? parseInt(ticket) : 2;

function updateDisplay() {
  document.getElementById("pointDisplay").textContent = point;
  document.getElementById("ticketDisplay").textContent = ticket;
}

function purchaseTicket(){
    if(point>=1){
        point --;
        ticket++;
        updateDisplay();
    }else{
        alert("❌ 포인트가 부족합니다!");
    }
}

function useTicket() {
  if (ticket >= 1) {
    ticket--;
    updateDisplay();
    alert("✅ 열람권을 사용했습니다!");
    // 실제 기능 추가 연결 예정 (Firebase, 시간제한 등)
    window.location.href = "crowdymap.html";
  } else {
    alert("❌ 보유한 열람권이 없습니다!");
  }
}

document.addEventListener("DOMContentLoaded", updateDisplay);