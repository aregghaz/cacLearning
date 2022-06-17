import React from 'react';
import Create from '../../../templates/create/create';

const crudKey = "service";

const fields = [
    {name: "image", type: 'file'},
];

const translatableFields = [
    {name: "name"}
];

const requiredFields = [
    "image",
];

const ServiceCreate = () => {

    return (
        <Create
            crudKey={crudKey}
            fields={fields}
            translatableFields={translatableFields}
            requiredFields={requiredFields}
        />
    );
};

export default ServiceCreate;




