import './App.css';
import {useEffect, useState} from 'react';
import io from 'socket.io-client'
import ScrollToBottom from "react-scroll-to-bottom"

const socket = io.connect("http://localhost:3001");

var started = false

function App() {

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      // setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

 
  useEffect(() => {
    if(!started) {
      console.log("use effect call")
      socket.on("receive_message", (data) => {
        console.log("receive message ", data)
        setMessageList((list) => [...list, data]);
      });
    }
    started = true
  }, []);
  
  

  return (
    <div className="App">
    <header>
      <div className='header-bar'>
        <p className='header-menu'>Menu</p>
        <p className='header-title'>New chat</p>
        <button className='header-newchat' type="button">
          <p className='header-button'>+</p>
        </button>
      </div>
    </header>
    <body className='body'>
        <div className='body-menubar-right'></div>

         <div className='body-messagebox'>

          
         <ScrollToBottom className="body-chat">
          {messageList.map((messageContent) => {
            return (
              
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                  </div>
                
              </div>
            );
          })}
         </ScrollToBottom>
         
    
           <div className='body-input'>
            <input className='body-textbox' type="text" placeholder="Type your message here..."
            value={currentMessage}
            onChange={(event => {
              setCurrentMessage(event.target.value);
            })}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
            ></input>
            <button className='body-button' onClick={sendMessage}>Send</button>
           </div>
     
         </div>
    </body>
      </div>
  );
}

export default App;
