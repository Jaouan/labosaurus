import "./Hint.css";

export default function Hint({ children }) {
  return <div className="hint-container"><span className="hint-icon">💡</span><span className="hint">{children}</span></div>;
}
