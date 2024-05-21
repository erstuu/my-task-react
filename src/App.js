import './App.css';
import logo from "./logo.svg";
import FormInput from "./components/FormInput";
import TodoItem from "./components/TodoItem";
import React from "react";
import EditModal from "./components/EditModal";

class App extends React.Component {
    state = {
        todos: [
            {
                id: 1,
                title: "Sholat Subuh berjamaah"
            },
            {
                id: 2,
                title: "Baca Al-Quran"
            }
        ],
        isEdit: false,
        editData :{
            id:"",
            title:""
        }
    }

    setTitle = e =>{

        this.setState({
            editData :{
                ...this.state.editData,
                title:e.target.value
            }
        })
    }

    openModal =(id,data) =>{
        this.setState({
            isEdit:true,
            editData:{
                id,
                title:data
            }
        })
    }

    closeModal =() =>{
        this.setState({
            isEdit:false
        })
    }

    deleteTask = (id) => {
        // console.log("delete OK")
        this.setState({
            todos:this.state.todos.filter(item =>item.id !== id)
        })
    };

    addTask = (data) => {
        const id= this.state.todos.length
        const newData = {
            id:id+1,
            title:data
        }

        this.setState({
            todos:[...this.state.todos,newData]
        });
    }

    render() {
        const { todos } = this.state;

        return(
            <div className="App">
                <div className="logo">
                    <img src={logo} alt="logo" width={100} height={100}/>
                    <h3>Task List</h3>
                </div>
                <div className="list">
                    {todos.map(item =>
                        <TodoItem
                            key={item.id}
                            todo={item}
                            del={this.deleteTask}
                            open={this.openModal}
                        />
                    )}
                </div>

                <div className="input-form">
                    <FormInput />
                </div>
                <EditModal
                    edit={this.state.isEdit}
                    close={this.closeModal}
                    change={this.setTitle}
                    data  ={this.state.editData}
                />

            </div>
        );
    }
}

export default App;
