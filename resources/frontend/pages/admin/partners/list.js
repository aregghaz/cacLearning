import React from 'react';
import List from '../../../templates/list/list';

const crudKey = "partner";

const titles = [
    { name: "image" },
    { name: "link" }
];

const cellConfigs = [
    { name: "image", type: "image", crudKey: crudKey },
    { name: "link", type: "link", crudKey: crudKey },
]

const PartnerList = () => {

    return (
        <List
            crudKey={crudKey}
            titles={titles}
            cellConfigs={cellConfigs}
        />
    );
}

export default PartnerList;
