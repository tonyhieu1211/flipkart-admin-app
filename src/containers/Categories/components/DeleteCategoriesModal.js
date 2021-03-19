import React from 'react'
import MyModal from '../../../components/UI/Modal';

const DeleteCategoriesModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        buttons,
        checkedArray,
        expandedArray
    } = props;

    return (
        <MyModal
            modalTitle={modalTitle}
            show={show}
            handleClose={handleClose}
            buttons={buttons}
        >
            <h6>Checked</h6>
            {
                checkedArray.map((item, index) =>
                    <span key={index}>{item.name}</span>
                )
            }
            <h6>Expanded</h6>
            {
                expandedArray.map((item, index) =>
                    <span key={index}>{item.name}</span>
                )
            }
        </MyModal>
    )
}

export default DeleteCategoriesModal;