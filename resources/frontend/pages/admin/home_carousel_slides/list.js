import React from 'react';
import List from '../../../templates/list/list';

const crudKey = "home-carousel-slide";

const titles = [
    {name: "desktop_image"},
    {name: "mobile_image"},
    {name: "title"},
    {name: "sub_title"},
];

const cellConfigs = [
    { name: "description", type: "hidden" },
    { name: "desktop_image", type: "image", crudKey: crudKey },
    { name: "mobile_image", type: "image", crudKey: crudKey },
]
const HomeCarouselSlideList = () => {

    return (
        <List
            crudKey={crudKey}
            titles={titles}
            cellConfigs={cellConfigs}
        />
    );
}

export default HomeCarouselSlideList;
