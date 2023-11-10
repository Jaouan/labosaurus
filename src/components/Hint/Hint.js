import "./Hint.css";

export default function Hint({ children }) {
  return <div className="hint">💡 <span>{children}</span></div>;
}
  