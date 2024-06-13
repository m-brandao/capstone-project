import "../../styles/Selectors.scss";

export default function Selectors({ value, selected, onClick }) {
  return (
    <button
      className={`selector ${selected ? "active" : ""}`}
      onClick={onClick}
    >
      <span>{value}</span>
    </button>
  );
}
