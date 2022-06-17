import React from 'react';
import Create from '../../../templates/create/create';

const crudKey = "meta-description";

const fields = [
    {name: "page"},
    {name: "name"},
];

const requiredFields = [
    "page", "name"
];

const MetaDescriptionCreate = () => {

    return (
        <Create
            crudKey={crudKey}
            fields={fields}
            requiredFields={requiredFields}
        />
    );
};

export default MetaDescriptionCreate;




