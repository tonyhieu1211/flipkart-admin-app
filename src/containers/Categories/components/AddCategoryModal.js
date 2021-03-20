import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Input from '../../../components/UI/input';
import MyModal from '../../../components/UI/Modal';
const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        onSubmit,
        modalTitle,
        setCategoryName,
        setParentCategoryId,
        categoryList,
        setCategoryImage,
        categoryName,
        parentCategoryId
    } = props

    return (
        <MyModal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            onSubmit={onSubmit}
        >

            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category name`}
                        onChange={e => setCategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                </Col>
                <Col>
                    <select className="form-control form-control-sm"
                        value={parentCategoryId}
                        onChange={e => { setParentCategoryId(e.target.value); }}>
                        <option>Select category</option>
                        {categoryList.map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                        }
                    </select>
                </Col>
                
            </Row>
            <Row>
                <Col>
                    <input type="file" name="categoryImage" onChange={e => { setCategoryImage(e.target.files[0]); }} />
                </Col>
            </Row>
            

            
        </MyModal>
    )
}

export default AddCategoryModal;