import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { login } from "../../firebase/firebase";
import "./Login.css";

export default function Login() {
    const { siteConfig } = useDocusaurusContext();
    return <div className="login-container">
        <h1>{siteConfig.title}</h1>
        <button onClick={login} type="button" className="login-google-btn" >
            Se connecter avec Google
        </button>
    </div>
}