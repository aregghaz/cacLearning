import React from 'react';
import Create from '../../../templates/create/create';

const crudKey = "blog";

const fields = [
    {name: "image", type: 'file'},

];

const translatableFields = [
    {name: "title"},
    {name: "description",  type: "richText"},
    {name: "author"},
    {name: "position"},
];

const requiredFields = [
    "image",
];

const BlogCreate = () => {

    return (
        <Create
            crudKey={crudKey}
            fields={fields}
            translatableFields={translatableFields}
            requiredFields={requiredFields}
        />
    );
};

export default BlogCreate;
