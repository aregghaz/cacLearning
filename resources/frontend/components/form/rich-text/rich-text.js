import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

export default function RichText({
    handleEditorChange,
    menubar,
    initialValue,
    height,
    plugins,
    toolbar,
}) {
    return (
        <Editor
            initialValue={initialValue}
            init={{
                height: height,
                menubar: menubar,
                plugins: plugins,
                toolbar: toolbar,
            }}
            onEditorChange={handleEditorChange}
        />
    );
}

RichText.propTypes = {
    handleEditorChange: PropTypes.func.isRequired,
    menubar: PropTypes.bool,
    initialValue: PropTypes.string,
    height: PropTypes.number,
    plugins: PropTypes.array,
    toolbar: PropTypes.string,
};

RichText.defaultProps = {
    initialValue: '',
    height: 500,
    menubar: true,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount',
    ],
    toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help',
};
