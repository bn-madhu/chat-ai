import React from 'react'
import ChatBotIcon from './ChatBotIcon'

const ChatMessage = ({chat}:any) => {
  return (
    <div className={`message ${chat.role === "model"?'bot':'user'}-message`}>
      {chat.role === "model" && <ChatBotIcon />}
      <p className="message-text">{chat.text}</p>
    </div>
  )
}

export default ChatMessage