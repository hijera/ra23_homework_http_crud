import React from 'react';
import PropTypes from 'prop-types';
import NoteModel from "../models/NoteModel";

NoteList.propTypes = {
    list : PropTypes.arrayOf(PropTypes.instanceOf(NoteModel)),
    onRemove: PropTypes.func.isRequired
};

function NoteList(props) {
    const { list,onRemove } = props;

    const handleRemoveClick = (evt,id) => {
        evt.preventDefault();
        onRemove(id);
    };

    return (
        <div className={"note-container"}>
            {list.map(item=>
                <div key={item.id} className={"note-item"} >
                    <div className={"note-element"} >

                        <div className={"note-content"}>
                            { item.content }
                        </div>
                        <button onClick={(evt)=>handleRemoveClick(evt,item.id)}>x</button>
                    </div>
                </div>)}
        </div>
    );
}

NoteList.defaultProps = {
    list: []
};
export default NoteList;