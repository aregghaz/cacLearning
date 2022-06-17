import React from 'react';
import Edit from '../../../templates/edit/edit';

const crudKey = "about-us-content";

const fields = [
];

const translatableFields = [
    {name: "page_content", type: "richText"},
];
const requiredFields = [

];
const AboutUsEdit = ({ id }) => {

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

export default AboutUsEdit;
