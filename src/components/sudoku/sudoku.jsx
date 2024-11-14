import React from "react";
import './sudoku.css';

const Sudoku = ({sudokuGrid, setSudokuGrid, action,
  currCord, setCurrCord, errors
}) => {
  
  const handleClick = (e) => {
    if(!e.target.getAttribute("data-key")){
      return;
    }
    const [x_idx, y_idx] = e.target.getAttribute("data-key").split(":");
    setCurrCord({x_idx: +x_idx, y_idx: +y_idx})
    setSudokuGrid([...sudokuGrid])
    return ;
  };
  const belongToHighlightedGrid = (curr_x, curr_y, selected_x, selected_y) => {
    if(selected_x<0 || selected_y<0 || curr_x<0 || curr_y<0)return false;
    selected_x = +selected_x;
    selected_y = +selected_y;
    curr_x = +curr_x;
    curr_y = +curr_y;
    if(curr_x===selected_x || curr_y===selected_y)return true;
    if(curr_x>=3*Math.floor(selected_x/3) && curr_x<3*(1+Math.floor(selected_x/3)) && curr_y>=3*Math.floor(selected_y/3) && curr_y<3*(1+Math.floor(selected_y/3))){
      return true;
    }
    else return false;
  }
  const belongToCurrentGrid = (curr_x, curr_y, selected_x, selected_y) => {
    if(selected_x<0 || selected_y<0 || curr_x<0 || curr_y<0 || isNaN(selected_x) || isNaN(selected_y))return false;
    selected_x = +selected_x;
    selected_y = +selected_y;
    curr_x = +curr_x;
    curr_y = +curr_y;
    if(curr_x===selected_x  && curr_y===selected_y)return true;
    if(!sudokuGrid[selected_x][selected_y])return false;
    if(sudokuGrid[curr_x][curr_y] === sudokuGrid[selected_x][selected_y])return true
    return false;
  }

  const checkValidity = (curr_x, curr_y) => {
    
    if(curr_x<0 || curr_y<0 || isNaN(curr_x) || isNaN(curr_y))return false;
    curr_x = +curr_x;
    curr_y = +curr_y;
    
    for(let i=0;i<errors.length;i++){
      if(errors[i]['x'] === curr_x && errors[i]['y'] === curr_y){
        return true;
      }
    }
    return false;
  }

  return (
    <div className="left" onClick={handleClick}>
        <div className="square_left">
        {sudokuGrid.map((itm, rowIdx) => (
        <div key={rowIdx} className="row_left">
          {itm.map((i, colIdx) => (
            <button
              className={`num_left 
                ${belongToHighlightedGrid(rowIdx, colIdx, currCord.x_idx, currCord.y_idx) ? 'highlight' : ''} 
                ${belongToCurrentGrid(rowIdx, colIdx, currCord.x_idx, currCord.y_idx) ? 'curr' : ''}
                ${checkValidity(rowIdx, colIdx) ? 'validity': ''}
                `}
              // style={{width: '50px', height: '50px'}}
              data-key={`${rowIdx}:${colIdx}`}
              data-val={sudokuGrid[rowIdx][colIdx]}
              key={`${rowIdx}:${colIdx}`}
            >
              {i}
            </button>
          ))}
        </div>
      ))}
        </div>
    </div>
  );
};

export default Sudoku;