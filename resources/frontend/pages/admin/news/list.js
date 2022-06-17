import React from 'react';
import List from '../../../templates/list/list';

const crudKey = "news-item";

const titles = [
    { name: "image" },
    { name: "date" },
    { name: "title" },
];

const cellConfigs = [
    { name: "image", type: "image", crudKey: crudKey },
    { name: "description", type: "hidden", crudKey: crudKey },
];

const NewsItemList = () => {

    return (
        <List
            crudKey={crudKey}
            titles={titles}
            cellConfigs={cellConfigs}
        />
    );
}

export default NewsItemList;
