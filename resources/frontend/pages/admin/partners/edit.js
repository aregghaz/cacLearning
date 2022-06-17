import React from 'react';
import Edit from '../../../templates/edit/edit';

const crudKey = "partner";

const fields = [
    {name: "image", type: 'file'},
    {name: "link"}
];
const requiredFields = [

];
const PartnerEdit = ({ id }) => {

    return (
        <Edit
            id={id}
            crudKey={crudKey}
            fields={fields}
            requiredFields={requiredFields}
        />
    );
};

export default PartnerEdit;
