import { FooterMB } from "../components/FooterMB";
import Loginform from "../components/Loginform";

const Login = () => {
  return (
    <>
      <div className="pt-16">
        <div className="bg-white">
          <Loginform />
        </div>
        <FooterMB />
      </div>
    </>
  );
};

export default Login;
