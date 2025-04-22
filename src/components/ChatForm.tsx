import { useRef } from "react";
import Loader from "./Loader";

const ChatForm = ({chatHistory, setChatHistory, generateBotresponse}:any) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handelFormSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const userMessage = inputRef.current?.value.trim();
    if(!userMessage) return;

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    // Update chat history with the user's message
    setChatHistory((history:any)=> [...history,{role:"user",text:userMessage}]);
    
    setTimeout(()=>{
      // Add "thinking..." placeholder fpr the bot's response
      setChatHistory((history:any)=> [...history,{role:"model",text: "Thinking..."}]);

      // /call the function to generate the bot's response
      generateBotresponse([...chatHistory,{role:"user",text:userMessage}])
    },600)
  }
  return (
    <form action="#" className="chat-form" onSubmit={handelFormSubmit}>
      <input type="text" ref={inputRef} placeholder='Message.....' className='message-input' required />
      <button className='material-symbols-rounded'>arrow_upward</button>
    </form>
  )
}

export default ChatForm