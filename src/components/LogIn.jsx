import { useGoogleLogin } from "@react-oauth/google";
import api from "../api/axiosBackendConfig";

const Login = () => {
  const sendAuthCode = async (code) => {
    const param = { code: code };
    const res = await api.post("/sign-up", {}, { params: { code: code } });
    return res;
  };

  const login = useGoogleLogin({
    scope: "email profile openid https://www.googleapis.com/auth/calendar ",
    flow: "auth-code",
    redirect_uri: "http://localhost:3000",
    onError: (err) => {
      console.error(err);
    },
    onSuccess: async (res) => {
      // Send axios post request to backend with response data
      const { code } = res;
      console.log(code);

      const response = await sendAuthCode(code); // Await the response from sendAuthCode
      console.log(response.data); // Log the response data
    },
  });

  return (
    <div className="loginButton">
      <button onClick={login}>Google Login</button>
    </div>
  );
};

export default Login;
