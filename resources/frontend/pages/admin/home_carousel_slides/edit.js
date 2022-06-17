import React from 'react';
import Edit from '../../../templates/edit/edit';

const crudKey = "home-carousel-slide";

const fields = [
    {name: "desktop_image", type: 'file'},
    {name: "mobile_image", type: 'file'},
];

const translatableFields = [
    {name: "title"},
    {name: "sub_title", type: "textarea"},
    {name: "description", type: "richText"},
];
const requiredFields = [

];
const HomeCarouselSlideEdit = ({ id }) => {

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

export default HomeCarouselSlideEdit;
