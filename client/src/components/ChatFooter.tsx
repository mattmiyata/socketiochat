import { useState } from "react";

const ChatFooter = ({
  socket,
  userName,
  roomName,
}: {
  socket: any;
  userName: string;
  roomName: string;
}) => {
  const [message, setMessage] = useState("");

  // erases typing message when blurred
  const handleBlur = () => {
    socket.emit("typingStatus", {
      room: roomName,
    });
  };

  // emits typing message onfocus and onKeyDown
  const handleTyping = () => {
    socket.emit("typingStatus", {
      name: userName,
      room: roomName,
    });
  };

  // Prevents default page refresh
  const handleSendMessage = (e: React.SyntheticEvent) => {
    e.preventDefault();

    //checks to see if message is empty
    if (message !== "") {
      // emits message event to server
      socket.emit("message", {
        text: message,
        name: userName,
        room: roomName,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      // errases typing message
      socket.emit("typingStatus", {
        room: roomName,
      });
    }

    setMessage("");
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          // sets message in setState
          onChange={(e) => setMessage(e.target.value)}
          onFocus={handleTyping}
          onBlur={handleBlur}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
