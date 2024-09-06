import logo from './logo.svg';
import './App.css';
import React,{useState} from "react";
import Board from "./Board";
export const BOARD_SIZE = 10;
function App() {
    const [currentWord,setCurrentWord]=useState("");
    const [words,setWords]=useState([{found:false,word:"aviya"},{found:false,word:"yosef"},{found:false,word:"love"},{found:false,word:"jili"},{found:false,word:"see"},{found:false,word:"koteg"},{found:false,word:"dora"},{found:false,word:"lish"},{found:false,word:"ozeri"},{found:false,word:"car"}]);

    const [level,setLevel]=useState(1)
    function addToList(){
        const checkDup = words.filter((word)=> {return word===currentWord})
        checkDup.length>0 ? alert("Word Used!") : setWords([...words,{found:false,word:currentWord}])
        setCurrentWord("");

    }
   function updateWordList(word){
        let tempWords = [...words]
       for (let i = 0; i < words.length; i++) {
           if (word===tempWords[i].word){
               tempWords[i].found=true
           }
       }
       setWords(tempWords)
   }
  return (
    <div className="App">
     <div>
      <h1>The Word Search</h1>
         {
             level===0? <div>

                 <div>
                     <h2>Please enter list of word for your game: </h2>
                     <div>{BOARD_SIZE-words.length} - More word left</div>
                     <input value={currentWord} type={"text"} onChange={(event)=>setCurrentWord(event.target.value)}/>
                     <button disabled={words.length===BOARD_SIZE} onClick={addToList}>Add Word</button>
                 </div>
                 {words.length>0&&<h2>Word List:</h2>}
                 <div>
                     {
                         words.map((word,index)=>{
                             return(
                                 <div>{index+1} ) {word}</div>
                             )
                         })
                     }
                 </div>
                 <div>
                     <button disabled={words.length!==BOARD_SIZE} onClick={()=>setLevel(1)}>Next</button>
                 </div>
             </div>:
                 <Board wordList={words} setWordList={updateWordList}/>
         }
         </div>
    </div>
  );
}

export default App;
