import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { id:"",role:"", email:"",username:"" };
  }
  const decodedToken = jwtDecode(token);

  const { id,role, email,username} = decodedToken;
  return { id,role, email,username };
};

export default useAuth;
