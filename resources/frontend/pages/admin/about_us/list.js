import React from 'react';
import List from '../../../templates/list/list';

const crudKey = "about-us-content";

const titles = [];

const cellConfigs = [
    { name: "page_content", type: "hidden" }
]
const AboutUsList = () => {

    return (
        <List
            crudKey={crudKey}
            titles={titles}
            hideAdd
            hideDelete={true}
            cellConfigs={cellConfigs}
        />
    );
}

export default AboutUsList;
