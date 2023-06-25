import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [username, setUsername] = useState('');
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);

  const send = (e) => {
    e.preventDefault();
    const messageData = {
      username: username,
      message: msg
    };
    socket.emit('msg', messageData);
    setMsg('');
  };

  useEffect(() => {
    socket.on('msg', (messageData) => {
      setChat((prevChat) => [...prevChat, messageData]);
    });

    return () => {
      socket.off('msg');
    };
  }, []);

  return (
    <div className="App">
      <h1>Chat program using Socket.io</h1>
      <form onSubmit={send} className="chat">
        <input
          type="text"
          required
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Message here..."
          name="msg"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div className="chatMsg">
        {chat.map((messageData, index) => (
          <p key={index}>
            <span>{messageData.username}: </span>
            <span>{messageData.message}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
