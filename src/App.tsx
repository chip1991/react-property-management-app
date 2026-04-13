import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import AI from './pages/AI';
import Mine from './pages/Mine';
import House from './pages/House';
import Family from './pages/Family';
import PropertyFee from './pages/PropertyFee';
import Bills from './pages/Bills';
import Invoices from './pages/Invoices';
import Repair from './pages/Repair';
import RepairRecords from './pages/RepairRecords';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import AIOperator from './components/AIOperator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="ai" element={<AI />} />
          <Route path="mine" element={<Mine />} />
        </Route>
        <Route path="/house" element={<House />} />
        <Route path="/family" element={<Family />} />
        <Route path="/property-fee" element={<PropertyFee />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/repair" element={<Repair />} />
        <Route path="/repair-records" element={<RepairRecords />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <AIOperator />
    </Router>
  );
}

export default App;
