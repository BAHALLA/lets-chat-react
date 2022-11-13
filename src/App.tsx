import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

const socket = new WebSocket("ws://192.168.1.8:9090/ws");

function App() {
  const [message, setMessage] = useState({id:'', user: '', content: ''})
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    socket.onopen = () => {
      setMessage({id: "1", user: "Taoufiq", content: "connected"})
    };

    socket.onmessage = (e) => {
      setMessage({id: "1", user: "Taoufiq", content: e.data})
    };

    return () => {
      socket.close()
    }
  }, [])

  const handleClick = useCallback((e: { preventDefault: () => void; }) => {
    e.preventDefault()

    socket.send(JSON.stringify({
      id: "1",
      user: "Taoufiq",
      content: inputValue
    }))
  }, [inputValue])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  return (
    <div className="App">
      <input id="input" type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleClick}>Send</button>
      <pre>{message.content}</pre>
    </div>
  );
}

export default App;