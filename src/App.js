
import './App.css';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001");

function App() {
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
    
           <div className='body-input'>
            <input className='body-textbox' type="text" placeholder="Type your message here..."></input>
            <button className='body-button'>Send</button>
           </div>
     
         </div>
    </body>
      </div>
  );
}

export default App;
