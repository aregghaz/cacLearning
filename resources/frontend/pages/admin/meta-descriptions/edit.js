import React from 'react';
import Edit from '../../../templates/edit/edit';

const crudKey = "meta-description";

const fields = [
    {name: "page"},
    {name: "name"},
];

const requiredFields = [
    "page",
    "name"
];

const MetaDescriptionEdit = ({ id }) => {

    return (
        <Edit
            id={id}
            crudKey={crudKey}
            fields={fields}
            requiredFields={requiredFields}
        />
    );
};

export default MetaDescriptionEdit;
