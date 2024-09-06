import { useState,useEffect } from "react";
import './Board.css';
import {BOARD_SIZE} from "./App";
function Board(props) {
    const wordList = props.wordList;
    const [board, setBoard] = useState(setMyBoard);
    const [firstWord,setFirstWord] =useState()
    const[chosenWord,setChosenWord] = useState("")
    function setMyBoard() {
        const newBoard = [];
        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                row.push({found:false,letter:""});
            }
            newBoard.push(row);
        }

        return randomWords(newBoard);
    }

    function randomWords(newBoard) {
        let tempWordList = [...wordList];

        while (tempWordList.length > 0) {
            for (let i = 0; i < BOARD_SIZE; i++) {
                const word = tempWordList.pop();
                let index = Math.floor(Math.random() * 6);
                for (let j = 0; j < word.word.length ; j++) {
                    newBoard[i][index].letter = word.word.charAt(j);
                    index++
                }
                for (let j = 0; j < BOARD_SIZE; j++) {
                   if (newBoard[i][j].letter===""){
                       newBoard[i][j].letter=getRandomLetter();
                   }
                }
            }
        }

        return newBoard;
    }
    function getRandomLetter() {
        const alphabet = "qwertyuiopasdfghjklzxcvbnm";
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }
function mouseHandleUp(row,col){
    setFirstWord({row:row,col:col})
}
    function mouseHandleDown(row,col){
        let tempWord=""
        if (firstWord.row===row){
            for (let i = firstWord.col; i <= col; i++) {
                tempWord+=board[row][i].letter
            }
            setChosenWord(tempWord)
        }else {

        }
    }
    function updateBoard(){
        const tempBoard  = [...board]
        for (let i =firstWord.col ; i < firstWord.col+chosenWord.length; i++) {
            tempBoard[firstWord.row][i].found = true
        }
        setBoard(tempBoard)
    }
    function checkMach(){
       const check = wordList.filter(word=> {return word.word===chosenWord})
       if(check.length>0){
           // alert("great job you found " + chosenWord)
           props.setWordList(chosenWord)
           updateBoard()
       }else{
        // alert("loser")
       }
    }
    useEffect(()=>{
        console.log(chosenWord)
        checkMach()
    },[chosenWord])
    return (
        <div>
           <div className={"first"}>
               {
                   <div>
                       {board.map((row, rowIndex) => (
                           <div className={"board"} key={rowIndex}>
                               {row.map((letter, colIndex) => (
                                   <div style={{color: letter.found? "red":"black"}}
                                       onMouseDown={()=>mouseHandleUp(rowIndex,colIndex)}
                                        onMouseUp={()=>mouseHandleDown(rowIndex,colIndex)}
                                        className={"square"} key={colIndex}>{letter.letter} </div>
                               ))}
                           </div>
                       ))}
                   </div>
               }
           </div>
            <div className={"second"}>
                {
                    wordList.map((word,index)=>{
                        return(
                            <h3 style={{color: word.found? "red":"black"}}> {word.word} , </h3>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Board;
