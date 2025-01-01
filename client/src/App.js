import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import { UserProvider } from "./provider/UserProvider.js";
import { DetailProvider } from "./provider/DetailProvider.js";
import { ThemeProvider } from "./provider/ThemeProvider.js";


import Header from "./components/Header.js";
import CartWrapper from "./components/CartWrapper.js";
import CartDetail from "./components/CartDetail.js";


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <DetailProvider>
            <Routes>
              <Route path="/" element={<Header />}>
                <Route index element={<CartWrapper />} />
                <Route path="detail" element={<CartDetail />} />
              </Route>
            </Routes>
          </DetailProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter >
  );
}

export default App;
