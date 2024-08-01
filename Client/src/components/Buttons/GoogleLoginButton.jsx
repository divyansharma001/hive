import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const GoogleLoginButton = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const credentialResponseDecode = jwtDecode(
          credentialResponse.credential
        );
        console.log(credentialResponseDecode);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default GoogleLoginButton;
