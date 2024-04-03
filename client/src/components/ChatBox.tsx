import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5050");
const ChatBox:React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<string[]>([]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
          socket.emit("chat message", message);
          setMessage("");
        }
      };
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
    return ( 
    <>
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
    </> 
    );
}
 
export default ChatBox;