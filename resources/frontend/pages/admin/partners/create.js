import React from 'react';
import Create from '../../../templates/create/create';

const crudKey = "partner";

const fields = [
    {name: "image", type: 'file'},
    {name: "link"}
];

const requiredFields = [
    "image",
];

const PartnerCreate = () => {

    return (
        <Create
            crudKey={crudKey}
            fields={fields}
            requiredFields={requiredFields}
        />
    );
};

export default PartnerCreate;
