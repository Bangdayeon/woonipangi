export function download(url: string, title: string, extension: string) {
  if (typeof window === 'undefined') return; // 서버 컴포넌트 임포트 방지

  const filename = `${title}.${extension.toLowerCase()}`;
  const downloadUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;
  const link = document.createElement('a');

  link.href = downloadUrl;

  // 다운로드 속성 명시
  link.setAttribute('download', filename);

  document.body.appendChild(link);
  link.click();

  // 가비지 컬렉션 유도
  setTimeout(() => {
    document.body.removeChild(link);
  }, 100);
}
