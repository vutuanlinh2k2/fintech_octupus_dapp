import "./App.css";

import Header from "./Header";
import NoEthereum from "./NoEthereum";

function App() {
  if (!window.ethereum) {
    return <NoEthereum />;
  }

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
