import { useState } from 'react';
import './App.css';




import io from 'socket.io-client'
import Chat from './Chat';
const socket = io.connect("https://chat-4emu.onrender.com")
function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)
  const joinRoom = ()=>{
    if(username !=="" && room !==""){
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }
  return (
    <div className="App">
      {!showChat? (
      <div className='joinChatContainer'>
        <h3>Join A Chat</h3>
        <input type="text" placeholder='John...' 
          onChange={(event)=>{setUsername(event.target.value)}} name="" id="" />
        <input type="text" placeholder='Room ID...' 
          onChange={(event)=>{setRoom(event.target.value)}} name="" id="" />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
      )
      : (
      <Chat socket={socket} username={username} room={room} ></Chat>
      )}
    </div>
  );
}

export default App;
