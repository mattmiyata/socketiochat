import ChatFooter from "./ChatFooter";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import { useEffect, useState, useRef } from "react";

const ChatPage = ({
  socket,
  userName,
  roomName,
}: {
  socket: any;
  userName: string;
  roomName: string;
}) => {
  // messages state is used to display messages on screen to user
  const [messages, setMessages] = useState<string[]>([]);
  // typingStatus state is used to trigger active typing message

  //  used to scroll to new message
  const lastMessageRef = useRef<any>(null);

  const [typingStatusMessage, setTypingStatusMessage] = useState<string>("");

  const [activeUsers, setActiveUsers] = useState<string[]>([]);

  // useEffects

  //listens for messageResponse event from server and sets messages state which is passed to ChatBody as prop
  useEffect(() => {
    socket.on("messageResponse", (data: string) =>
      setMessages([...messages, data])
    );
  }, [socket, messages]);

  useEffect(() => {
    // scroll to the bottom every message change
    lastMessageRef.current?.scrollIntoView();
  }, [messages]);

  // sets typing status message state
  useEffect(() => {
    socket.on("typingResponse", (data: string) => setTypingStatusMessage(data));
  }, [socket]);

  // updates active users list upon new login
  useEffect(() => {
    socket.on("newUserResponse", (data: any) =>
      setActiveUsers([...activeUsers, data])
    );

    // updates active users list on logout/disconnect
    socket.on("disconnectResponse", (data: string) =>
      setActiveUsers(activeUsers.filter((item) => item !== data))
    );

    // updates active users list on typing activity

    socket.on("updateUserList", (data: string) =>
      activeUsers.indexOf(data) === -1
        ? setActiveUsers([...activeUsers, data])
        : [activeUsers]
    );
  }, [socket, activeUsers]);

  // Main ChatPage after login
  return (
    <div className="chat">
      <ChatBar activeUsers={activeUsers} roomName={roomName} />
      <div className="chat__main">
        <ChatBody
          // passes props to chat body
          socket={socket}
          messages={messages}
          lastMessageRef={lastMessageRef}
          userName={userName}
          roomName={roomName}
          typingStatusMessage={typingStatusMessage}
        />
        <ChatFooter socket={socket} userName={userName} roomName={roomName} />
      </div>
    </div>
  );
};

export default ChatPage;
