import "./App.css";

import Header from "./Header";
import NoEthereum from "./NoEthereum";

import CardsContainer from "./Card/CardsContainer";
import PersonalSection from "./PersonalSection/PersonalSection";
import ActiveRequestsTable from "./Table/ActiveRequestsTable";
import CompletedRequestsTable from "./Table/CompletedRequestsTable";

function App() {
  if (!window.ethereum) {
    return <NoEthereum />;
  }

  return (
    <div className="App">
      <Header />
      <CardsContainer />
      <PersonalSection />
      <ActiveRequestsTable />
      <CompletedRequestsTable />
    </div>
  );
}

export default App;
