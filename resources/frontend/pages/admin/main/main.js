
import React, { useState } from 'react';
import Drawer from '../../../components/drawer/drawer';
import PropTypes from 'prop-types';

import styles from './main.module.scss';

export default function Main({ children }) {
    const [isOpen, setOpen] = useState(false);

    const handleSidebarToggle = () => setOpen(!isOpen);

    return (
        <>
            <Drawer toggleable={false} isOpen={isOpen} handleToggle={handleSidebarToggle} />
            <div
                className={styles.root}>
                {children}
            </div>
        </>
    );
}

Main.propTypes = {
    children: PropTypes.node.isRequired,
};
