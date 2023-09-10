import React, { useContext, useState } from 'react';
import noteContext from '../Context/Notes/noteContext';

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    var [count, setCount] = useState(0);
    return (<>
        {/* <div className='col-md-3'>

            <div className="card my-3">

                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note); }}></i>
                    </div>
                    <p className="card-text">{note.description} </p>

                </div>
            </div>

        </div> */}

        <tbody>
            <tr>
                <th scope="row" className='text-center'>&#8226;</th>
                <td className='text-center'>{note.title}</td>
                <td className='text-center'>{note.description}</td>
                <td className='text-center'>{note.tag}</td>
                <td>
                    <button type="submit" class="btn btn-danger d-flex mx-auto" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}>Delete</button>
                    <button type="submit" class="btn btn-success d-flex mx-auto my-2" onClick={() => { updateNote(note); }}>Update</button>
                </td>
            </tr>
        </tbody>


    </>
    )
}
