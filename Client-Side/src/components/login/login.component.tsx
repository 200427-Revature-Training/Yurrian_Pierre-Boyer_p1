import React, { Fragment, useState } from 'react';

export const Login: any = ({ setAuth } : { setAuth: any }) => {

    const [inputs, setInputs] = useState({
        ersUsername: '',
        ersPassword: ''
    });

    const { ersUsername, ersPassword } = inputs;

    const onChange = (e: { target: { name: any; value: any; }; }) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value});
    };
    
    const onSubmitForm = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            const body = { ersUsername, ersPassword };
            
            const response = await fetch('http://localhost:5000/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body) 
            });
            
            const parseRes = await response.json();

            localStorage.setItem('authorization', parseRes.token);

            setAuth(true);
            
        } catch (err) {
            console.log(err.message)
        }
    };
    return (
        <Fragment>
            <h1 className='text-center my-5'>Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type='text'
                    name='ersUsername'
                    placeholder='username'
                    className='form-control my-3'
                    value={ersUsername}
                    onChange={e => onChange(e)}
                />
                <input
                    type='password'
                    name='ersPassword'
                    placeholder='password'
                    className='form-control my-3'
                    value={ersPassword}
                    onChange={e => onChange(e)}
                />
                <button className='btn btn-success 
                btn-block'>Submit</button>
            </form> 
        </Fragment>
    );
};