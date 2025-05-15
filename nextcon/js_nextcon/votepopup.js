function openvote(placename){
  const popup = document.getElementById("votePopup");
  const title = document.getElementById("popupTitle");
  title.textContent = `[${placename}] 혼잡도를 선택해주세요`;
  popup.classList.remove("hidden");
}
function closevote(){
  document.getElementById("votePopup").classList.add("hidden");
}
function vote(status){
  const confirmed = confirm(`'${status}'로 투표하시겠습니까?`);
  if(confirmed){
    alert(`✅ '${status}'로 투표가 완료되었습니다!`);
    closevote();

    //firebase 저장 로직 필요
  }
}