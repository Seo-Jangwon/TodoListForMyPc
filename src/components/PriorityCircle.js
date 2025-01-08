const PriorityCircle = ({ priority }) => (
  <div
    className={`priority-${priority}-background`}
    style={{
      width: "1rem",
      height: "1rem",
      borderRadius: "50%",
    }}></div>
);

export default PriorityCircle;
