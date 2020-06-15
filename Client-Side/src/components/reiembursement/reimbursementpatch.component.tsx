import React, { useState, useEffect } from 'react';
// import * as reimbursementsRemote from '../../remotes/reimbursements.remote';
// import { Reimbursement } from '../../models/Reimbursement';
// import { Modal, Button, Form } from 'react-bootstrap';

// export const PatchReimbursementsComponent: React.FC = () => {
//     const [patchReimbursements, setPatchReimbursements] = useState<Reimbursement>();
//     const [inputAmount, setInputAmount] = useState<number>(0);
//     const [inputDescription, setInputDescription] = useState('');
//     const [inputTypeId, setInputTypeId] = useState<number>(0);
   
    

//     const [modalVisible, setModalVisible] =  useState(false);

//     useEffect(() => {
//         loadReimbursements();
//     }, [])

//     const patchReimbursement = async () => {
//         const payload = {
//             reimbAmount: inputAmount,
//             reimbDescription: inputDescription,
//             reimbTypeId: inputTypeId

//         };

//         await reimbursementsRemote.patchReimbursement(payload);
//         setInputAmount(0);
//         setInputDescription('');
//         setInputTypeId(0);
//         setModalVisible(false)
//         loadReimbursements();
//     }

//     const loadReimbursements = () => {
//         reimbursementsRemote.getOneReimbursement().then(reimbursements => {
//             patchReimbursements(reimbursements);
//         });        
//     }























// }
