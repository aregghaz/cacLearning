import React from 'react';
import List from '../../../templates/list/list';

const crudKey = "service";

const titles = [
    { name: "image" },
    { name: "name" },
];

const cellConfigs = [
    { name: "image", type: "image", crudKey: crudKey },
    { name: "description", type: "hidden", crudKey: crudKey },
]

const ServiceList = () => {

    return (
        <List
            crudKey={crudKey}
            titles={titles}
            cellConfigs={cellConfigs}
        />
    );
}

export default ServiceList;
