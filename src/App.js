import React, { Component } from 'react';
import 'normalize.css'
import {TodoInput} from './TodoInput'
import TodoItem from './TodoItem'
import './App.css';
import './reset.css'
import * as localStorage from './localStorage'


class App extends Component {
  constructor(){
    super()
    this.state = {
      newTodo: '',
      todoList: localStorage.load('todoList') || []
        // {id:1,title:'第一个待办事项',completed:false,deleted:false},
        // {id:2,title:'第二个待办事项',completed:false,deleted:false},
        // {id:3,title:'第三个待办事项',completed:false,deleted:false}
      
    }
  }

  addTodo(e){
    this.state.todoList.push({
      id: idMaker(),
      title: e.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })

  }
  changeTitle(e){
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    })

  }
  delete(e,todo){
    todo.deleted = true
    this.setState(this.state)
  }
  
  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)
    
  }

  render() {
    let todos = this.state.todoList.filter((item)=>!item.deleted).map((item,index) =>{
      return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)} 
                    onDelete={this.delete.bind(this)} />
        </li>
        ) 
    })
 
    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} 
              onChange={this.changeTitle.bind(this)} 
              onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
      </div>
    )
  }
  componentDidUpdate(){
    localStorage.save('todoList',this.state.todoList)
  }
}

export default App

let id = 0;

function idMaker(){
  id += 1;
  return id
}