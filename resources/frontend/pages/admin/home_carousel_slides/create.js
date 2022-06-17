import React from 'react';
import Create from '../../../templates/create/create';

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
    "desktop_image", "mobile_image"
];

const HomeCarouselSlideCreate = () => {

    return (
        <Create
            crudKey={crudKey}
            fields={fields}
            translatableFields={translatableFields}
            requiredFields={requiredFields}
        />
    );
};

export default HomeCarouselSlideCreate;
