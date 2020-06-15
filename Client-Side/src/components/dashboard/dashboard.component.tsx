import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ReimbursementsComponent } from '../reiembursement/reimbursements.component';

export const Dashboard: any = ({ setAuth } : { setAuth: any }) => {

    const [name, setName] = useState('');

    async function getName() {
        try {
            const response = await fetch('http://localhost:5000/dashboard/', {
            method: 'GET',
            headers: { token: localStorage.token } 
        });
        
        
        const parseRes = await response.json();

        setName(parseRes.ers_username);
        } catch (err) {
            console.error(err.message)
        }
    }

    const logout = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        localStorage.removeItem('authorization');
        setAuth(false);
    };

    useEffect(() => {
        getName()
    }, []);


    return (
        <Fragment>
            <BrowserRouter>
                <div className='dashboard'>
                    <h1>Dashboard {name}</h1>
                        <ReimbursementsComponent />
                    <button className='btn btn-primary' onClick={e => 
                        logout(e)}>Logout</button>
                </div>
            </BrowserRouter>
        </Fragment>
    );
};
