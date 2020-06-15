import React, { useState, useEffect } from 'react';
import * as reimbursementsRemote from '../../remotes/reimbursements.remote';
import { Reimbursement } from '../../models/Reimbursement';
import './reimbursements.component.css';
import { Modal, Button, Form } from 'react-bootstrap';


export const ReimbursementsComponent: React.FC = () => {
    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
    const [inputSubmitted, setInputSubmitted] = useState('');
    const [inputAmount, setInputAmount] = useState<number>(0);
    const [inputDescription, setInputDescription] = useState('');
    const [inputAuthor, setInputAuthor] = useState<number>(0);
    const [inputStatusId, setInputStatusId] = useState<number>(0);
    const [inputTypeId, setInputTypeId] = useState<number>(0);

    const [modalVisible, setModalVisible] = useState(false);

    // We need to get data for our application
    // So we should send a request to our API to acquire it
    // 1. A get request is sent
    // 2. Update state with new data
    // 3. Component rerenders

    // send get request
    // will this work? -- This will send the request repeatedly, each state update causing
    // a new request to be sent - DO NOT DO
    // peopleRemote.getAllPeople().then(people => {
    //     setUsers(people);
    // });

    /*
        ! The Problem
        Everytime the state updates component must reevaluated.  Because the request was
        directly in the component's code, this caused the request to be sent again, which
        triggered more and more state updates and more requests being sent. 
    
        The React component lifecycle - Lifecycle methods are methods which are called on
        certain lifecycle stages for some process and are generally offered as mechanisms
        to hook in custom functionality to an internal process.
    */

    /* 
        ! The Solution - useEffect
        useEffect is a lifecycle 'hook' and is part of a group of functions called 
        React hooks (alongside useState). useEffect us used to describe some effect
        that should take place as a side effect of the component rerendering. useEffect
        can take in 1-2 arguments with the first argument being the intended effect. The
        second argument takes an array of values and will reevaluate the effect if those
        values change - this is intended to be a mechanism for the effect to intelligently
        know when to reevaluate.  Note: For effects that should only happen once, we can
        simply pass an [] to the second argument.
    */

    useEffect(() => {
        loadReimbursements();
    }, [])

    const addReimbursement = async () => {
        const payload = {
            reimbAmount: inputAmount,
            reimbSubmitted: inputSubmitted,
            reimbDescription: inputDescription,
            reimbAuthor: inputAuthor,
            reimbStatusId: inputStatusId,
            reimbTypeId: inputTypeId

        };

        await reimbursementsRemote.createReimbursement(payload);
        setInputAmount(0);
        setInputSubmitted('');
        setInputDescription('');
        setInputAuthor(0);
        setInputStatusId(0);
        setInputTypeId(0);
        setModalVisible(false)
        loadReimbursements();
    }

    const loadReimbursements = () => {
        reimbursementsRemote.getAllReimbursements().then(reimbursements => {
            setReimbursements(reimbursements);
        });        
    }


    return (
        <div>
            <header>
                <h2 id="reimbursements-header" className="dark">Reimbursements Section 
                    <button 
                        className="btn btn-success"
                        onClick={() => setModalVisible(true)}
                        >Add Reimbursement</button>
                </h2>
            </header>

            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Submitted</th>
                        <th scope="col">Description</th>
                        <th scope="col">Author</th>
                        <th scope="col">Status</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {reimbursements.map(u => {
                        return (<tr key={u.reimbId}>
                            <th scope="row">{u.reimbId}</th>
                            <td>{u.reimbAmount}</td>
                            <td>{typeof u.reimbSubmitted == 'string' ? 
                                    u.reimbSubmitted : 
                                    u.reimbSubmitted.toDateString()}</td>
                            <td>{u.reimbDescription}</td>
                            <td>{u.reimbAuthor}</td>
                            <td>{u.reimbStatusId}</td>
                            <td>{u.reimbTypeId}</td>
                            <td> <button 
                                    className="btn btn-warning"
                                    onClick={() => setModalVisible(true)}
                                    >Edit</button>
                                
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>

 
            {/* react-bootstrap components */}
             <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                <Modal.Header>
                    <Modal.Title>New Reimbursement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control type="text" value={inputAmount} onChange={(e) => setInputAmount(Number(e.target.value)) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Submitted:</Form.Label>
                            <Form.Control type="date" value={inputSubmitted} onChange={(e) => setInputSubmitted(e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="text" value={inputDescription} onChange={(e) => setInputDescription(e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Author:</Form.Label>
                            <Form.Control type="text" value={inputAuthor} onChange={(e) => setInputAuthor(Number(e.target.value)) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status:</Form.Label>
                            <Form.Control type="text" value={inputStatusId} onChange={(e) => setInputStatusId(Number(e.target.value)) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type:</Form.Label>
                            <Form.Control type="text" value={inputTypeId} onChange={(e) => setInputTypeId(Number(e.target.value)) } />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalVisible(false)}>Close</Button>
                    <Button onClick={() => addReimbursement()}>Submit</Button>
                </Modal.Footer>
            </Modal> 

            {/* Plain Bootstrap Components */}
            {/* <div className="modal fade" id="add-user-modal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">First Name:</label>
                                    <input 
                                        type="text" className="form-control" id="new-first-name" 
                                        value={inputFirstName} onChange={(e) => setInputFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="new-last-name" className="col-form-label">Last Name:</label>
                                    <input 
                                        type="text" className="form-control" id="new-last-name"
                                        value={inputLastName} onChange={(e) => setInputLastName(e.target.value)} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="birthdate" className="col-form-label">Birth Date:</label>
                                    <input 
                                        type="date" className="form-control" id="new-birthdate" 
                                        value={inputBirthdate} onChange={(e) => setInputBirthdate(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => addUser()}>Submit</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}