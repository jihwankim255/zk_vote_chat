import React, { useState, useEffect, useMemo } from "react";
import io from "socket.io-client";
import "./App.css";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
// import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@demox-labs/aleo-wallet-adapter-reactui/styles.css";

// const socket = io.connect("http://localhost:3000"); // Change to your server address if necessary
const socket = io("http://localhost:3000");

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    socket.on("chat message", (msg: string) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="flex-column rounded border-2 p-4 bg-light shadow">
        <h1 className="text-center">Hello ZK Chat Vote!</h1>

        <WalletProvider
          wallets={wallets}
          decryptPermission={DecryptPermission.UponRequest}
          network={WalletAdapterNetwork.Testnet}
          autoConnect={true}
        >
          <WalletModalProvider>
            <WalletMultiButton />
            <WalletToolBox />
          </WalletModalProvider>
        </WalletProvider>

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

const WalletToolBox = () => {
  const [programId, setProgramId] = useState<string>("");
  const [hyperlink, setHyperlink] = useState<string | null>(null);

  // const handleGenerateHyperlink = () => {
  //   if (programId && programId.endsWith(".aleo")) {
  //     const explorerLink = `https://explorer.hamp.app/program?id=${programId}`;
  //     toast.success("Hyperlink has been generated.");
  //     setHyperlink(explorerLink);
  //   } else {
  //     // Display an error toast message
  //     toast.error(
  //       "Invalid program ID. Please enter a valid program ID ending with '.aleo'."
  //     );
  //     setHyperlink(null);
  //   }
  // };

  return (
    <div className="mt-2 flex-column rounded border-2 p-4 bg-light shadow">
      {hyperlink && (
        <div className="mt-2">
          <p>Generated Hyperlink:</p>
          <a href={hyperlink} target="_blank" rel="noopener noreferrer">
            🔗
          </a>
          &nbsp; Link
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default App;
