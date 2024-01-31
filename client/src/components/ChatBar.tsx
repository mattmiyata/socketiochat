// updates active users list and room title

const ChatBar = ({
  activeUsers,
  roomName,
}: {
  activeUsers: string[];
  roomName: string;
}) => {
  return (
    <div className="chat__sidebar">
      <h2>Chatter</h2>
      <div>
        <h4 className="chat__header">{roomName}</h4>
      </div>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {activeUsers.map((users) => (
            <p key={users}> {users} </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
