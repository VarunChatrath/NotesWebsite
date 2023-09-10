import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import noteContext from '../Context/Notes/noteContext'
export default function Notes(props) {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: '', edescription: '', etag: 'default' });
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }
    const handleClick = (e) => {

        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert("Updated Successfully", "success")

    };
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <section className="" style={{ backgroundColor: '#eee' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100" style={{ width: '140%', marginLeft: "-220px" }}>
                        <div class="col col-lg-9 col-xl-7">
                            <div class="card rounded-3"

                            >
                                <div class="card-body p-4" >
                                    <h2 className='text-center my-2'>Welcome, {userName}</h2>
                                    <AddNote showAlert={props.showAlert} />


                                    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Launch demo modal
                                    </button>


                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form className="my-3">
                                                        <div className="form-group">
                                                            <label htmlFor="etitle">Title</label>
                                                            <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp"
                                                                onChange={onChange} />
                                                            <small id="emailHelp" className="form-text text-muted"></small>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="edescription">Description</label>
                                                            <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="etag">Tag</label>
                                                            <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange} />
                                                        </div>

                                                        <br />

                                                    </form>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row my-3">
                                        {notes.length === 0 ? <h2>Your Notes</h2> : ""}
                                        <div className="container mx-2">
                                            {notes.length === 0 && "No notes to display"}
                                        </div>



                                        {notes.length === 0 ? "" : <>
                                            <h2 className='text-center my-2'>Your Notes</h2>
                                            <div className="col col-lg-9 col-xl-7" style={{ width: "100%" }}>
                                                <div className="card rounded-3">
                                                    <div className="card-body p-4" style={{ paddingBottom: '1rem' }}>

                                                        <table class="table mb-4">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col" className='text-center'>Order</th>
                                                                    <th scope="col" className='text-center'>Title</th>
                                                                    <th scope="col" className='text-center'>Description</th>
                                                                    <th scope="col" className='text-center'>Tag</th>
                                                                    <th scope="col" className='text-center'>Actions</th>
                                                                </tr>
                                                            </thead>

                                                            {

                                                                notes.map((note) =>
                                                                    <NoteItem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} />
                                                                )

                                                            }

                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
