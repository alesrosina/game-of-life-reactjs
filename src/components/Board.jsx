import React from 'react';
import Square from './Square';
import './Board.css';

export default class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(2500).fill(0),
    };
  }
  
  initState() {
  	this.setState({
      squares: Array(2500).fill(0),
    });
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = (squares[i] === 1) ? 0 : 1;
    this.setState({
      squares: squares
    }); 
  }
  
  stepBoard() {
  	const squares = this.state.squares.slice();
    const perLine = Math.sqrt(squares.length);
  	for(var i = 0; i < squares.length; i++) {
    	var aliveNeighbours = this.state.squares[i-1] + this.state.squares[i+1] + this.state.squares[i-perLine] + this.state.squares[i-perLine-1] + this.state.squares[i-perLine+1] + this.state.squares[i+perLine] + this.state.squares[i+perLine-1] + this.state.squares[i+perLine+1];     
      if(this.state.squares[i] === 1) { 
        if(aliveNeighbours < 2 || aliveNeighbours > 3) {
      	  squares[i] = 0;
        }
      }
      else {
      	if(aliveNeighbours === 3) {
        	squares[i] = 1;
        }
      }
    }
    this.setState({
      squares: squares
    }); 
  }
  
  stepAnimate() {
  	var that = this;
    setInterval(function() {
    	that.stepBoard();
    }, 500);
  }
  
  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.initState()}>Clear</button>
          <button onClick={() => this.stepBoard()}>Step</button>
          <button onClick={() => this.stepAnimate()}>Animate</button>
        </div>
        {this.state.squares.map((item, index) => (
          <Square key={index} cssClass={(item === 1) ? 'on' : 'off'} onClick={() => this.handleClick(index)} />
      	))}
      </div>
    );
  }
}