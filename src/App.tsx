import { useEffect, useRef, useState } from 'react'
import './App.css'
import ChatBotIcon from './components/ChatBotIcon'
import ChatForm from './components/ChatForm'
import ChatMessage from './components/ChatMessage';
import Loader from './components/Loader';

function App() {
  const [chatHistory, setChatHistory] = useState<String[]>([]);
  const chatBotref = useRef<HTMLDivElement>(null);

  type Message = {
    role: string;
    text: string;
  };

  const generateBotresponse = async(history:Message) => {
    const updateHistory = (text:Message) => {
      setChatHistory((prev):any => [...prev.filter((msg):any=>msg?.text !== "Thinking..."), {role:"model",text}]);
    }
    // console.log(history, chatHistory);
    history = history.map(({role,text}:Message) => ({role, parts: [{text}]}));

    const requestOptionsPayload = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({contents: history})
    }

    try {
      const response = await fetch(import.meta.env.VITE_GOOGLE_API_URL, requestOptionsPayload);
      const data = await response.json();
      if(!response.ok) throw new Error(data.error.message || "Something went wrong!!!")
        // console.log(data);

      // Clean and update chat history with bot's response
      const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponse);
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(
    ()=>{
      chatBotref?.current?.scrollTo({top: chatBotref.current?.scrollHeight, behavior: "smooth"})
    },[chatHistory]
  )
  return (
    <>
    {/* <Loader /> */}
      <div className="container">
        <div className="chatbot-popup">
          {/* chatBot header */}
          <div className="chat-header">
            <div className="header-info">
              <ChatBotIcon />
              <h2 className="logo-text">Chat bot</h2>
            </div>
            <button className="material-symbols-rounded">keyboard_arrow_down</button>
          </div>
          {/* chatbot body */}
          <div ref={chatBotref} className="chat-body">
            <div className="message bot-message">
              <ChatBotIcon />
              <p className="message-text">
                Hey there, <br /> How can I help you today?
              </p>
            </div>
            {/* Rebder the chat dynamically */}
            {
              chatHistory.map((chat,index) => (
                <ChatMessage key={index} chat={chat} />
              ))
            }
          </div>
          {/* chatBot footer */}
          <div className="chat-footer">
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotresponse={generateBotresponse} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
