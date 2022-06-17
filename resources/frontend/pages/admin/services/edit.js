import React from 'react';
import Edit from '../../../templates/edit/edit';

const crudKey = "service";

const fields = [
    {name: "image", type: 'file'},
];

const translatableFields = [
    {name: "name"}
];
const requiredFields = [

];
const ServiceEdit = ({ id }) => {

    return (
        <Edit
            id={id}
            crudKey={crudKey}
            fields={fields}
            translatableFields={translatableFields}
            requiredFields={requiredFields}
        />
    );
};

export default ServiceEdit;
