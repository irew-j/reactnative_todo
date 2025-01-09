// 유틸리티
// 날짜 객체를 입력받아서 문장(yyyy-mm-dd hh:mm:ss) 반환
function dateToStr(d) {
  const pad = n => {
    return n < 10 ? '0' + n : n;
  };
  return (
    d.getFullYear() +
    '-' +
    pad(d.getMonth() + 1) +
    '-' +
    pad(d.getDate()) +
    ':' +
    pad(d.getHours()) +
    ':' +
    pad(d.getMinutes()) +
    ':' +
    pad(d.getSeconds())
  );
}

export default dateToStr;
