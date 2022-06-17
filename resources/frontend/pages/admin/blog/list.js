import React from 'react';
import List from '../../../templates/list/list';

const crudKey = "blog";

const titles = [
    { name: "image" },
    { name: "title" },
    { name: "author" },
    { name: "position" },
];

const cellConfigs = [
    { name: "image", type: "image", crudKey: crudKey },
    { name: "likes", type: "hidden", crudKey: crudKey },
    { name: "description", type: "hidden", crudKey: crudKey },

];

const BlogList = () => {

    return (
        <List
            crudKey={crudKey}
            titles={titles}
            cellConfigs={cellConfigs}
        />
    );
}

export default BlogList;
