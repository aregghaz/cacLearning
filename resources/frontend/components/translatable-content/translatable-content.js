import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from '../../plugins/react-tabs';

export default function TranslatableContent({ children }) {
    const activeItem = 'hy'; // Todo: i18n.language;

    return (
        <>
            <Tabs
                tabsProps={null}
                activeTab={{
                    id: activeItem,
                }}
            >
                {children}
            </Tabs>
        </>
    );
}

TranslatableContent.propTypes = {
    children: PropTypes.node.isRequired,
};
