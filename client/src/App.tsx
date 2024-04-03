import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";




import "react-toastify/dist/ReactToastify.css";
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";
import Wallet from "./components/Wallet";
const socket = io("http://localhost:5050");

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    socket.on("chat message", (msg: string) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Disconnect the socket when the component unmounts
    return () => {
      //  socket.disconnect();
      socket.off("chat message");
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };



  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="flex-column rounded border-2 p-4 bg-light shadow">
        <h1 className="text-center text-slate-300">Hello ZK Chat Vote!</h1>
        <Wallet />
        

        {/* Chat interface */}
        <ul id="messages">
          {chat.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <form id="form" onSubmit={handleSubmit}>
          <input
            id="input"
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};



export default App;
