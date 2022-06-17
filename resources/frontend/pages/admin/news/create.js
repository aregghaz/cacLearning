import React from 'react';
import Create from '../../../templates/create/create';

const crudKey = "news-item";

const fields = [
    {name: "image", type: 'file'},
    {name: "date", type: 'datepicker'},
];

const translatableFields = [
    {name: "title"},
    {name: "description",  type: "richText"},
];

const requiredFields = [
    "image",
];

const NewsItemCreate = () => {

    return (
        <Create
            crudKey={crudKey}
            fields={fields}
            translatableFields={translatableFields}
            requiredFields={requiredFields}
        />
    );
};

export default NewsItemCreate;
