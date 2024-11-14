import React from "react";
import './numpad.css';
const numpad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
const Numpad = ({
    action, 
    setAction, 
    currCord, 
    sudokuGrid, 
    setSudokuGrid, 
    original, 
    undo, 
    setUndo,
    digitCount,
    setDigitCount,
    solution
}) => {
    
   const handleClick = (e) => {
    if(!e.target.getAttribute("data-key")){
        return;
      }
    
    let action_key = e.target.getAttribute("data-key");
    let {x_idx, y_idx} = currCord || {};
    if(x_idx<0 || y_idx<0 || isNaN(x_idx) || isNaN(y_idx)){return ;}
    x_idx = +x_idx
    y_idx = +y_idx
    if(original[x_idx][y_idx] !== "")return ;
    action_key = +action_key;
    setAction(action_key);

    let new_undo = undo;
    new_undo.push(JSON.parse(JSON.stringify(sudokuGrid)));
    setUndo(new_undo)


    setSudokuGrid(prev => {
        prev[x_idx][y_idx] = action_key;
        count_digits([...prev])
        return [...prev]
    } );
    return ;
  };

  const handleDeleteClick = (e) => {
    let {x_idx, y_idx} = currCord || {};
    if(x_idx<0 || y_idx<0 || isNaN(x_idx) || isNaN(y_idx)){return ;}
    x_idx = +x_idx
    y_idx = +y_idx
    
    if(original[x_idx][y_idx] !== "")return ;

    let new_undo = undo;
    new_undo.push(JSON.parse(JSON.stringify(sudokuGrid)));

    setSudokuGrid(prev => {
        prev[x_idx][y_idx] = "";
        count_digits([...prev])
        return [...prev]
    } );
    setUndo(new_undo)
  }

  const handleClearAllClick = (e) => {
    let new_undo = undo;
    new_undo.push(JSON.parse(JSON.stringify(sudokuGrid)));

    const resetGrid = JSON.parse(JSON.stringify(original))
    setSudokuGrid(resetGrid);
    count_digits(resetGrid);
    return ;
  }

  const handleUndoClick = (e) => {
    let prev_undo = undo;
    if(prev_undo.length === 0)return ;
    const last_element = prev_undo[prev_undo.length - 1];
    setSudokuGrid([...last_element]);
    prev_undo.pop();
    setUndo(prev_undo);

    count_digits(last_element);
    return ;
  }

  const handleHintClick = (e) => {
    console.log("button click")
    let left = [];
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(sudokuGrid[i][j] === ""){
                left.push({i, j});
            }
        }
    }
    if(left.length === 0)return ;
    let i = Math.floor(Math.random() * left.length);
    const item = solution[left[i]['i']][left[i]['j']];
    console.log("item", item)
    console.log(solution)
    let new_undo = undo;
    new_undo.push(JSON.parse(JSON.stringify(sudokuGrid)));
    setUndo(new_undo)

    setSudokuGrid(prev => {
        prev[left[i]['i']][left[i]['j']] = item;
        count_digits([...prev])
        return [...prev]
    } );
    return ;
  }

  const count_digits = (grid) => {
    let digit_count_temp = Array.from({ length: 9 }, () => 0);
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
          if(grid[i][j] !== ""){
            digit_count_temp[grid[i][j] - 1] += 1;
          }
        }
      }
    setDigitCount([...digit_count_temp])
    return false;
  }

  const disable_number = (num) => {
    if(num <= 0)return true;
    return false;
  }

  return (
    <div className="right">
        <button className="hint" onClick={handleHintClick}>Hint</button>
        <div className="square" onClick={handleClick}>
        {numpad.map((itm, rowIdx) => (
            <div key={rowIdx} className="row">
            {itm.map((i, colIdx) => (
                <button
                className={ `num ${disable_number(9-digitCount[i-1]) ? 'disable_number' : ''} `}
                data-key={`${i}`}
                data-val={i}
                key={`${rowIdx}:${colIdx}`}
                disabled={disable_number(9-digitCount[i-1])}
                >
                    {i}
                    <span 
                        className={ `badge ${disable_number(9-digitCount[i-1]) ? 'disable_badge' : ''} `}
                    >
                        {(9-digitCount[i-1] >=0) ? 9-digitCount[i-1] : 0}
                    </span>

                </button>
            ))}
            </div>
        ))}
        </div>
        <div className="options">
            <button className="option_button" onClick={handleDeleteClick}>
                Delete
            </button>
            <button className="option_button" onClick={handleUndoClick}>
                Undo
            </button>
            <button className="option_button" onClick={handleClearAllClick}>
                Clear All
            </button>
        </div>
    </div>
  );
};

export default Numpad;