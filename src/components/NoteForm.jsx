import React, {useState} from 'react';
import PropTypes from 'prop-types';

NoteForm.propTypes = {
    onAdd: PropTypes.func.isRequired,
};

function NoteForm(props) {
    const {onAdd} = props;
    const [form,setForm] = useState({content:''});
    const handleAdd = evt => {
        evt.preventDefault();
        onAdd(form);

    };
    const handleChange = evt => {
        const { target } = evt;
        setForm({...form,[target.name] :  target.value });
    };
    return (
        <div className={"new-note"}>
            <form onSubmit={handleAdd} >
                <textarea name={"content"} value={form.content} onChange={handleChange}>
                </textarea>
                <button className={"add-button"}>
                    ↝
                </button>
            </form>
        </div>
    );
}

export default NoteForm;