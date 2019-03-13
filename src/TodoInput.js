import React from 'react' 
import './todoInput.css'

/*export function TodoInput(props){
    return <input type="text" value={props.value} />
}
*/

export class TodoInput extends React.Component{
    constructor(){
        super()
        this.state = {
            
        }
    }
    render(){
        return (
           <div>
            <input className="todoInput"
                type="text" value={this.props.content} 
                onKeyPress={this.submit.bind(this)}
                onChange={this.changeTitle.bind(this)} />
            {/* <button className="add-btn" onClick={this.Submit.bind(this)}>Add</button> */}
            </div>
        )
    }
    // Submit(e){
    //     this.props.onSubmit(e)
    // }
    submit(e){
        
        if(e.key === 'Enter'){
            if (e.target.value.trim() !== '') {
                this.props.onSubmit(e)
            }
        }
    }
    changeTitle(e){
        this.props.onChange(e)
    }
}
