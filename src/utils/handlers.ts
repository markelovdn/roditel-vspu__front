export default function handleFileDownload(fileUrl: string, fileName: string) {
  const anchorElement = document.createElement("a");
  anchorElement.href = fileUrl;
  anchorElement.download = fileName;
  anchorElement.target = "_blank";
  anchorElement.click();
}
