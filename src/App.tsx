import { useState } from 'react'
import './App.css'
import ChatBotIcon from './components/ChatBotIcon'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <div className="chatbot-popup">
          {/* chatBot header */}
          <div className="chat-header">
            <div className="header-info">
              <ChatBotIcon />
              <h2 className="logo-text">Chat bot</h2>
            </div>
            <button className="material-symbols-rounded">keyboard_arrow_up</button>
          </div>
          {/* chatbot body */}
          <div className="chat-body">
            <div className="message bot-message">
              <ChatBotIcon />
              <p className="message-text">
                Hey there, How can I help you today?
              </p>
            </div>
            <div className="message user-message">
              <p className="message-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quis numquam fugiat ea laborum ratione maiores omnis architecto delectus, enim, exercitationem eligendi ullam. Quis ipsam aperiam nihil nobis. Eaque, totam?</p>
            </div>
          </div>
          {/* chatBot footer */}
          <div className="chat-footer">
            <form action="#" className="chat-form">
              <input type="text" placeholder='Message.....' className='message-input' required />
              <button className='material-symbols-rounded'>arrow_upward</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
