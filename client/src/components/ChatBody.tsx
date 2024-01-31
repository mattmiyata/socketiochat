import { useNavigate } from "react-router-dom";

// props sent from ChatPage
// Typescript Errors will be fixed at a later date
const ChatBody = ({
  socket,
  messages,
  lastMessageRef,
  userName,
  roomName,
  typingStatusMessage,
}: {
  socket: any;
  messages: any;
  lastMessageRef: any;
  roomName: string;
  userName: string;
  typingStatusMessage: string;
}) => {
  const navigate = useNavigate();

  // When leave button pressed redirect to homepage, logout emitted for disconnect
  const handleLeaveChat = () => {
    navigate("/");
    window.location.reload();
    socket.emit("logout", {
      userName,
      roomName,
    });
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Let's Chat!</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>
      {/*  */}
      {/* Shows messages sent from you */}
      {/* React returns error for outermost div not having "key" but will leave until a different solution is found */}

      {/* generates chat messages based on prop sent from messageResponse in ChatPage
     conidtionally renders message as sender or recipient */}
      <div className="message__container">
        {messages.map((message: string[]) =>
          message.name === userName ? (
            <div key={message.id} className="message__chats">
              <p className="sender__name">{message.name}</p>
              <div className="message__sender">
                <p> {message.text} </p>
              </div>
            </div>
          ) : (
            // {/* Shows messages recieved by you */}
            <div key={message.id} className="message__chats">
              <p> {message.name} </p>
              <div className="message__recipient">
                <p> {message.text} </p>
              </div>
            </div>
          )
        )}

        {/* triggered when a user is typing */}
        {/* sends typingStatusMessage based on prop passed from typingResponse in ChatPage */}
        {/* lastMessageRef used for scrolling messages */}

        <div className="message__status">
          <p>{typingStatusMessage}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;