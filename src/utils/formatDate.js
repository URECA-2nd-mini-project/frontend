export const formatDate = (dateString) => {
  // Date 객체로 변환
  const date = new Date(dateString);

  // 년, 월, 일을 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
  const day = String(date.getDate()).padStart(2, '0');

  // yyyy-mm-dd 형식으로 반환
  return `${year}.${month}.${day}`;
};
