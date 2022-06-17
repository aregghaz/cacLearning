import React from 'react';
import Edit from '../../../templates/edit/edit';

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

];
const BlogEdit = ({ id }) => {

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

export default BlogEdit;
