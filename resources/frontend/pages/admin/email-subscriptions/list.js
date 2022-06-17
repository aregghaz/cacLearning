import React from 'react';
import List from '../../../templates/list/list';

const crudKey = "email-subscription";

const titles = [
    {name: "email"},
];

const EmailSubscriptionList = () => {

    return (
        <List
            crudKey={crudKey}
            titles={titles}
            hideAdd
            hideEdit
        />
    );
}

export default EmailSubscriptionList;
