import "./App.css";
import SpeechRecognition , {useSpeechRecognition} from "react-speech-recognition";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useState } from "react";
import { IoIosMic } from "react-icons/io";
import { IoIosMicOff } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import { FaCopyright } from "react-icons/fa";
import Data from "./Data"

function App() {
  //console.log(Data);
  // Data.map((key) =>  {
  // console.log(key)
  // })
  // Object.keys(Data).forEach(function(key){
  //   console.log(key)
  // })
  const [languages,setlanguage] = useState("en-IN")
  const [mic,setmic] = useState(false);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const startListen = () => {
      if(mic === false){
        toast.success("Microphone is on");
      }
       console.log(languages);
       SpeechRecognition.startListening({continuous:true , language: languages});
       setmic(true);
  }
 

  if(!browserSupportsSpeechRecognition){
    return null
  }
  function stoplisten(){
    if(mic === true){
      toast.error("Microphone is off");
    }
   // toast("Microphone is off")
    SpeechRecognition.stopListening();
    setmic(false);
  }
  function clickHAndler(){
    if(transcript == ""){
      toast.error("Text Field is empty");
      return;
    }
    toast.success("Text Copied");
  }
  function optionHandler(event){
   console.log(Data[event.target.value]);
       resetTranscript();
       stoplisten();
       setlanguage(Data[event.target.value]);
       
  }
  function clearHandler(){
     if(transcript == ""){
      toast.error("Text Field is Empty");
      return;
     }
    resetTranscript();
    toast.success("Cleared");
  }
 // box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  return (
   <div className="w-screen min-h-[100vh] flex flex-col  items-center bg-yellow-500">
   <div className="flex justify-center items-center bg-blue-900 w-full p-4 text-2xl text-white font-semibold">
      <p>Created by @Md Samsad Alam</p>
   </div>
        <div className="w-[80%] min-h-[60%] flex flex-col items-center mt-10">
               
                <div>
                    <h2 className=" font-semibold text-2xl sm:text-5xl   font-serif mb-5 mt-5 heading">Speech to Text Converter</h2>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 sm:flex-col md:flex-col">
                  <label className="text-2xl">Choose a Language</label>
                  <select  onChange ={optionHandler} className="bg-blue-900 text-yellow-50 rounded-md p-2 mb-2 font-serif border border-yellow-200" >
                       {
                        Object.keys(Data).map(key => 
                             
                             <option value={key}
                             
                              selected

                             
                             >{key}</option>
                         )
                       }
                       
                  </select>
                </div>
                <div className="w-[90%]  min-h-[250px]  bg-white rounded-lg  p-5 shadow-2xl flex ">
                {
                    mic ? ( <IoIosMic className="h-[20px] fade"></IoIosMic>) : (<IoIosMicOff className="h-[20px]"></IoIosMicOff>)
                }
               
                <p className="font-serif text-sm"> {transcript}</p>
                   
                </div>  
                <br></br>
                <div className="flex w-full justify-evenly flex-wrap btn font-serif font-light">
                    
                <CopyToClipboard text={transcript}>
                    <button className=" btn1 bg-blue-900 rounded-md p-2 text-lg text-yellow-50 text-center px-6" onClick={clickHAndler}>Copy</button>
                    
                  </CopyToClipboard>
                
                  
                  <button onClick={startListen} className=" btn1 bg-blue-900 rounded-md p-2 text-lg text-yellow-50 text-center px-6 ">Start Listening</button>
                  <button onClick={stoplisten} className="  btn1 bg-blue-900 rounded-md p-2 text-lg text-yellow-50 text-center px-6 ">Stop Listening</button>
                  <button onClick={clearHandler} className="  btn1 bg-blue-900 rounded-md p-2 text-lg text-yellow-50 text-center px-6 ">Clear Text</button>
                </div>
        </div>
    
   </div>
  );
}

export default App;
