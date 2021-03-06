import React, { Component } from 'react' 
import './TodoItem.css'


class TodoItem extends Component{
    render(){
        return (
           <div id="todoItem"> 
              <div id="todo">
                <input type="checkbox" checked={this.props.todo.status === 'completed'} 
                onChange={this.toggle.bind(this)} />
                {this.props.todo.title}
              </div>
              <button onClick={this.delete.bind(this)}>删除</button>
            </div>
        )
    }
    toggle(e){
      this.props.onToggle(e,this.props.todo)
    }
    delete(e){
      this.props.onDelete(e,this.props.todo)
    }
}

export default TodoItem