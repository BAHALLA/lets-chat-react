import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

const socket = new WebSocket("ws://192.168.1.8:9090/ws");

function App() {
  const [message, setMessage] = useState({id: '', user: '', content: ''})
  const [messageContent, setMessageContent] = useState('')
  const [messageUser, setMessageUsert] = useState('')

  useEffect(() => {
    socket.onopen = () => {
      setMessage({id: '', user: '', content: 'Connected !'})
    };

    socket.onmessage = (e) => {
      setMessage({id: '', user: '', content: e.data.content})
    };

    socket.onclose = () => {
      setMessage({id: '', user: '', content: 'Closed !' })
      socket.close()
    }
  }, [])

  const handleClick = useCallback((e: { preventDefault: () => void; }) => {
    e.preventDefault()

    socket.send(JSON.stringify({
      id: Math.floor(Math.random() * 1000), 
      user: messageUser,
      content: messageContent
    }))
  }, [messageContent, messageUser])

  const handleChangeContent = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value)
  }, [])
  const handleChangeUser = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageUsert(e.target.value)
  }, [])

  return (
    <div className="App">
      <label>
        message: 
        <input id="input" type="text" value={messageContent} onChange={handleChangeContent} />
      </label>
      <br/>
      <label>
        user: 
        <input id="input" type="text" value={messageUser} onChange={handleChangeUser} />
      </label>
      <br/>
      <button onClick={handleClick}>Send</button>
   
      <pre>{message.content}</pre>
    </div>
  );
}

export default App;