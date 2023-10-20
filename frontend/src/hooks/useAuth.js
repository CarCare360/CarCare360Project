import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { username: "", email: "", role: "" };
  }
  const decodedToken = jwtDecode(token);
  const { username, email, role } = decodedToken;
  return { username, email, role };
};

export default useAuth;
