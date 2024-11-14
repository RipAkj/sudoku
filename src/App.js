import { useState } from 'react';
import './App.css';
import Numpad from './components/numpad/numpad';
import { useEffect } from 'react';
import Sudoku from './components/sudoku/sudoku';
import generator_sudoku from './components/generator/generator';

const generator = generator_sudoku();
const App = () => {
    const sudokuGridConst = generator.mat;
    const solution = generator.solution;
    const original = JSON.parse(JSON.stringify(sudokuGridConst));
    const [sudokuGrid, setSudokuGrid] = useState(sudokuGridConst);
    const [action, setAction] = useState('');
    const [currCord, setCurrCord] = useState({});
    const [undo, setUndo] = useState([]);
    const [digitCount, setDigitCount] = useState(
        Array.from({ length: 9 }, () => 0)
    );
    const [message, setMessage] = useState('');

    useEffect(() => {
        for (let i = 0; i < 9; i++) {
            if (digitCount[i] !== 9) {
                return;
            }
        }
        setMessage(
            'Congratulations. You have solved the Sudoku successfully. 🎉 🥂 🍾'
        );
    }, [sudokuGrid]);
    let counter = Array.from({ length: 9 }, () => []);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudokuGrid[i][j]) {
                counter[sudokuGrid[i][j] - 1].push({ x: i, y: j });
            }
        }
    }

    let errors = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < counter[i].length - 1; j++) {
            for (let k = j + 1; k < counter[i].length; k++) {
                if (counter[i][j]['x'] === counter[i][k]['x']) {
                    errors.push(counter[i][j]);
                    errors.push(counter[i][k]);
                }
                if (counter[i][j]['y'] === counter[i][k]['y']) {
                    errors.push(counter[i][j]);
                    errors.push(counter[i][k]);
                }
                if (
                    counter[i][j]['x'] >=
                        3 * Math.floor(counter[i][k]['x'] / 3) &&
                    counter[i][j]['x'] <
                        3 * (1 + Math.floor(counter[i][k]['x'] / 3)) &&
                    counter[i][j]['y'] >=
                        3 * Math.floor(counter[i][k]['y'] / 3) &&
                    counter[i][j]['y'] <
                        3 * (1 + Math.floor(counter[i][k]['y'] / 3))
                ) {
                    errors.push(counter[i][j]);
                    errors.push(counter[i][k]);
                }
            }
        }
    }

    useEffect(() => {
        let digit_count_temp = digitCount;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (sudokuGridConst[i][j] !== '') {
                    digit_count_temp[sudokuGridConst[i][j] - 1] += 1;
                }
            }
        }
        setDigitCount([...digit_count_temp]);
    }, [sudokuGridConst]);

    const handleNewGame = (e) => {
        window.location.reload();
    };

    return (
        <div className="App">
            <div className="App1">
                <Sudoku
                    sudokuGrid={sudokuGrid}
                    setSudokuGrid={setSudokuGrid}
                    action={action}
                    currCord={currCord}
                    setCurrCord={setCurrCord}
                    errors={errors}
                />
                <Numpad
                    action={action}
                    currCord={currCord}
                    sudokuGrid={sudokuGrid}
                    setSudokuGrid={setSudokuGrid}
                    setAction={setAction}
                    original={original}
                    undo={undo}
                    setUndo={setUndo}
                    digitCount={digitCount}
                    setDigitCount={setDigitCount}
                    solution={solution}
                />
                {message && (
                    <div className="message">
                        {message}
                        <div className="wrapper">
                            <div className="newGame">New Game -&gt;</div>
                            <div
                                className="newGamePng"
                                onClick={handleNewGame}
                            ></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
