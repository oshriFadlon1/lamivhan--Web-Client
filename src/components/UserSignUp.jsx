import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
 
function UserSignUp() {
  return (
    <button
      onClick={useGoogleLogin({
        onSuccess: (response) => {
          console.log(response);
          const { access_token } = response;
          axios
            .post("/", { access_token })
            .catch((error) => console.log(error));
        },
      })}
    >
      Log in
    </button>
  );
}
 
export default UserSignUp;