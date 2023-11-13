import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "./GoogleLogin.css";

export default function GoogleLogin({ config: { authProvider } }) {
    const { siteConfig } = useDocusaurusContext();
    return <div className="login-container">
        <h1>{siteConfig.title}</h1>
        <button onClick={authProvider.login} type="button" className="login-google-btn" >
            Se connecter avec Google
        </button>
    </div>
}