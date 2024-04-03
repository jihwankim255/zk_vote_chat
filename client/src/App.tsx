import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";
import Wallet from "./components/Wallet";
import ChatBox from "./components/ChatBox";

const App: React.FC = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="flex-column rounded border-2 p-4 bg-light shadow">
        <h1 className="text-center text-slate-300">Hello ZK Chat Vote!</h1>
        <Wallet />
        <ChatBox />
      </div>
    </div>
  );
};



export default App;
