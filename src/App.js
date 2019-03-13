import React, { Component } from 'react';
import 'normalize.css'
import {TodoInput} from './TodoInput'
import TodoItem from './TodoItem'
import './App.css';
import './reset.css'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut,Copy,TodoModel} from './leanCloud'
// import * as localStorage from './localStorage'
//import AV from './leanCloud'


class App extends Component {
  constructor(){
    super()
    // this.todo = AV.Object.createWithoutData('Todo');
    // this.ObjectId = this.todo.id
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
      // Object.keys(this.todo._hashedJSON) ||
      // todoList: localStorage.load('todoList') || []
        // {id:1,title:'第一个待办事项',completed:false,deleted:false},
        // {id:2,title:'第二个待办事项',completed:false,deleted:false},
        // {id:3,title:'第三个待办事项',completed:false,deleted:false}  
    }
    // var Todo = AV.Object.extend('todo');
    // var todo = new Todo();
    let user = getCurrentUser()
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }


  addTodo(e){
    let newTodo={
      title: e.target.value,
      status: null,
      deleted: false
    }
    TodoModel.create(newTodo, (id) => {
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    }, (error) => {
      console.log(error)
    })

  }
  changeTitle(e){
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    })

  }
  delete(e,todo){
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }
  
  toggle(e,todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status = oldStatus
      this.setState(this.state)
    })
    
  }
  onSignUpOrSignIn(user){
    let stateCopy = Copy(this.state)
    stateCopy.user = user
    this.setState(stateCopy)
  }
  signOut(){
    signOut()
    let stateCopy = Copy(this.state)
    stateCopy.user = {}
    this.setState(stateCopy)
  }

  componentWillMount(){
    // this.todo = AV.Object.createWithoutData('Todo');
    // this.ObjectId = this.todo.id
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
         <h1 className="title">{this.state.user.username||'我'}的待办
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
        </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} 
              onChange={this.changeTitle.bind(this)} 
              onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? 
          null : 
          <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)} 
            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
      </div>
    )
  }
  componentDidUpdate(){
    // localStorage.save('todoList',this.state.todoList)
        // 第一个参数是 className，第二个参数是 objectId
    // this.todo = AV.Object.createWithoutData('Todo',this.ObjectId);
  //   this.todo.set(this.state.todoList)
  //   this.todo.save().then(function(todo){
  //     console.log(todo.toJSON())
  //   });   
  }
}

export default App
