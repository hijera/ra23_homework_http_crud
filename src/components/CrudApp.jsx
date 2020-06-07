import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import NoteModel from "../models/NoteModel";

class CrudApp extends Component {
    constructor(props) {
        super(props);
        this.state= {
            notes:[],
            updating:false
        }
    };

    componentDidMount() {
        this.getData();
    };

    serverAddItem = item =>
    {
        fetch(process.env.REACT_APP_UPDATE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
        }).then(
                data=>{
                    this.getData();
                }
            )
    };

    serverRemoveItem = id => {
        fetch(process.env.REACT_APP_UPDATE_URL+'/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(
            data=>{
                this.getData();
            }
        )
    };

    updateSubmit(evt) {
        evt.preventDefault();
        this.setState({updating:true});
        this.getData();
    };

    getData = () => {
        fetch( process.env.REACT_APP_UPDATE_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({notes:[...data.map(item=>new NoteModel(item.id,item.content))]});
                window.setTimeout(()=>{this.endUpdate();},500);
            });
    };

    endUpdate = () => {
        this.setState({updating:false});
    };
    handleAdd = item =>
    {
        this.serverAddItem({...item,id:0});
    };


    handleRemove = id => {
        this.serverRemoveItem(id);
    };

    render() {
        return (
            <div className={"crud-app"}>
                <h2>Notes</h2>
                <form className="updateForm" onSubmit={(evt)=>this.updateSubmit(evt)}>
                    <button className={"button-update "+((this.state.updating)? 'active':'')}><i className="fas fa-sync" /></button>
                </form>
                <NoteList onRemove={this.handleRemove} list={this.state.notes} />
                <NoteForm onAdd={this.handleAdd}/>
            </div>
        );
    }
}

CrudApp.propTypes = {};

export default CrudApp;