import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/404";

import io from "socket.io-client";
import "./App.css";
// import { useState } from "react";

// in vite.config.ts proxy is set to /socket.io target localhost:4000
const socket = io("/", { autoConnect: false });

// catch all listener
// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* passes socket as a prop */}
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
