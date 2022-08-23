import "./App.css";

import Header from "./Header";
import NoEthereum from "./NoEthereum";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";

function App() {
  if (!window.ethereum) {
    return <NoEthereum />;
  }

  return (
    <div className="App">
      <Header />
      <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem" }}>
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
}

export default App;
