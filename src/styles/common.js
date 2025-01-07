export const styles = {
  container: {
    width: "100%",
    height: "100vh",
    minWidth: "300px",
    minHeight: "400px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  dragBar: {
    WebkitAppRegion: "drag",
    padding: "8px 16px",
    background: "rgba(255, 255, 255, 0.8)",
    borderBottom: "1px solid #e5e7eb",
  },
  content: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
  },
};
