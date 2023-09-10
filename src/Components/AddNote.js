import React, { useContext, useState } from 'react';
import noteContext from '../Context/Notes/noteContext';

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: 'default' });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' })
    props.showAlert("Added Successfully", "success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className='text-center'>Add a Note</h2>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp"
            onChange={onChange} />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange} />
        </div>

        <br />
        <button
          disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary d-flex mx-auto px-3" onClick={handleClick} style={{ width: '13%' }}
        >
          Add Note
        </button>

      </form>
    </div>







    // <div>
    //   <h4 className="text-center my-3 pb-3">To Do App</h4>
    //   <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
    //     <div className="col-12">
    //       <div className="form-outline">
    //         <input type="text" id="form1" className="form-control" />
    //         <label className="form-label" htmlFor="form1">Enter a task here</label>
    //       </div>
    //     </div>
    //     <div className="col-12">
    //       <button type="submit" className="btn btn-primary">Save</button>
    //     </div>
    //     <div className="col-12">
    //       <button type="submit" className="btn btn-warning">Get tasks</button>
    //     </div>
    //   </form>
    // </div>



  );
}












