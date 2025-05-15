function openResultPopup(placeName) {
  document.getElementById("resultPopup").classList.remove("hidden");
  document.getElementById("resultTitle").textContent = placeName;

  // 🔽 TODO: Firebase에서 해당 장소의 투표 결과 가져오기
  const votes = ['혼잡', '보통', '보통', '여유', '혼잡', '보통', '혼잡', '여유'];

  // 표 수 세기
  const counts = { 여유: 0, 보통: 0, 혼잡: 0 };
  votes.forEach(v => counts[v]++);

  // 최빈값 표시
  const mode = getMode(votes);
  document.getElementById("congestionStatus").textContent = mode;

  // 총 투표 수
  const total = votes.length;

  // 퍼센트 계산 및 그래프 너비 적용
  document.getElementById("bar-easy").style.width = `${(counts['여유'] / total) * 100}%`;
  document.getElementById("bar-medium").style.width = `${(counts['보통'] / total) * 100}%`;
  document.getElementById("bar-busy").style.width = `${(counts['혼잡'] / total) * 100}%`;

  // 숫자 표시
  document.getElementById("count-easy").textContent = `${counts['여유']}표`;
  document.getElementById("count-medium").textContent = `${counts['보통']}표`;
  document.getElementById("count-busy").textContent = `${counts['혼잡']}표`;
}

function getMode(arr) {
  const count = {};
  arr.forEach(val => count[val] = (count[val] || 0) + 1);
  return Object.entries(count).reduce((a, b) => a[1] >= b[1] ? a : b)[0];
}

function openRecentPopup() {
  document.getElementById("recentPopup").classList.remove("hidden");

  // 🔽 TODO: 나중에 Firebase에서 placeName 기준으로 가져오도록 수정
  const recent = [
    { time: "17:03", status: "혼잡" },
    { time: "16:57", status: "보통" },
    { time: "16:44", status: "혼잡" },
    { time: "16:23", status: "여유" },
    { time: "16:05", status: "보통" },
    { time: "15:49", status: "보통" },
    { time: "15:30", status: "혼잡" },
    { time: "15:20", status: "여유" },
    { time: "15:10", status: "보통" },
    { time: "15:00", status: "혼잡" }
  ];

  const ul = document.getElementById("recentVoteList");
  ul.innerHTML = "";
  recent.forEach(v => {
    const li = document.createElement("li");
    li.textContent = `${v.time} - ${v.status}`;
    ul.appendChild(li);
  });
}

function closeResultPopup() {
  document.getElementById("resultPopup").classList.add("hidden");
}

function closeRecentPopup() {
  document.getElementById("recentPopup").classList.add("hidden");
}
