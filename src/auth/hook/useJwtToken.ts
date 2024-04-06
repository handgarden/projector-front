export default function useJwtToken() {
  return localStorage.getItem("accessToken");
}
