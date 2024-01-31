import { useState } from "react";

import ChatPage from "./ChatPage";

const Home = ({ socket }: { socket: any }) => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [showChat, setShowChat] = useState(false);

  // sets userName in local storage and emits newUser event to server, naviagates to chat page
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    socket.connect();

    socket.emit("newUser", { userName, roomName });
    setShowChat(true);
  };

  return (
    <>
      {!showChat ? (
        <form className="home__container" onSubmit={handleSubmit}>
          <h2 className="home__header">Sign in to Chatter </h2>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            minLength={6}
            name="userName"
            id="username"
            className="username__input"
            value={userName}
            // userName state is set to input value
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label htmlFor="roomname">Room Name</label>
          <input
            type="text"
            name="roomName"
            id="roomname"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
          <button className="home__cta">SIGN IN</button>
        </form>
      ) : (
        <ChatPage socket={socket} userName={userName} roomName={roomName} />
      )}
    </>
  );
};

export default Home;
