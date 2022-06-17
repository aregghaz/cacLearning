import React from 'react';
import Edit from '../../../templates/edit/edit';

const crudKey = "news-item";

const fields = [
    {name: "image", type: 'file'},
    {name: "date", type: 'datepicker'},
];

const translatableFields = [
    {name: "title"},
    {name: "description", type: "richText"},
];
const requiredFields = [

];
const NewsItemEdit = ({ id }) => {

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

export default NewsItemEdit;
