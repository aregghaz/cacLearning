import React from 'react';
import List from '../../../templates/list/list';

const crudKey = "meta-description";

const titles = [
    { name: "page" },
    { name: "name" },
];

const MetaDescriptionList = () => {

    return (
        <List
            crudKey={crudKey}
            titles={titles}
        />
    );
};

export default MetaDescriptionList;
