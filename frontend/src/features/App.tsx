import { Route, Routes } from "react-router-dom";
import { Account } from "./Account/Account";
import { Calender } from "./Calender/Calender";
import { Home } from "./Home/Home";
import { Request } from "./Request/Request";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="calender" element={<Calender />} />
        <Route path="request" element={<Request />} />
        <Route path="account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
