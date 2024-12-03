import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  ProjectSearch  from './../src/pages/home';
import  IndexMe  from './../src/pages/indexme';
import  Search  from './../src/pages/searchresult';
import { ArweaveWalletKit } from "arweave-wallet-kit";

function App() {
  return (
    <Router>
      <ArweaveWalletKit>
      <Routes>
        <Route path="/" element={<ProjectSearch />} />
        <Route path="/index" element={<IndexMe />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      </ArweaveWalletKit>
    </Router>
  );
}

export default App;