import "./App.css";

import Header from "./Header";
import NoEthereum from "./NoEthereum";

import CardsContainer from "./Card/CardsContainer";
import PersonalSection from "./PersonalSection/PersonalSection";

function App() {
  if (!window.ethereum) {
    return <NoEthereum />;
  }

  return (
    <div className="App">
      <Header />
      <CardsContainer />
      <PersonalSection />
    </div>
  );
}

export default App;
