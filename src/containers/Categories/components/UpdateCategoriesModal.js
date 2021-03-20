import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Input from '../../../components/UI/input';
import MyModal from '../../../components/UI/Modal';

const UpdateCategoriesModal = (props) => {
    const {
        size,
        show,
        handleClose,
        modalTitle,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList,
        onSubmit
    } = props;

    return (
        <MyModal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            size={size}
            onSubmit={onSubmit}
        >

            <h6>expanded</h6>

            {expandedArray.map((item, index) =>
                <Row>

                    <Col>
                        <Input
                            value={item.name != undefined ? item.name : ''}
                            placeholder={`Category name`}
                            onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                        />
                    </Col>
                    <Col>
                        <select className="form-control"
                            value={item.parent}
                            onChange={e => handleCategoryInput('parent', e.target.value, index, 'expanded')}>
                            <option>Select category</option>
                            {categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                            }
                        </select>
                    </Col>
                    <Col>
                        <select className="form-control"
                            value={item.type}
                            onChange={e => handleCategoryInput('type', e.target.value, index, 'expanded')}>
                            <option value="">Select type</option>
                            <option value="store">Store</option>
                            <option value="product">Product</option>
                            <option value="page">Page</option>
                        </select>
                    </Col>
                </Row>
            )}

            <h6>checked</h6>

            {checkedArray.map((item, index) =>
                <Row>

                    <Col>
                        <Input
                            value={item.name}
                            placeholder={`Category name`}
                            onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                        />
                    </Col>
                    <Col>
                        <select className="form-control"
                            value={item.parent}
                            onChange={e => handleCategoryInput('parent', e.target.value, index, 'checked')}>
                            <option>Select category</option>
                            {categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                            }
                        </select>
                    </Col>
                    <Col>
                        <select className="form-control"
                            value={item.type}
                            onChange={e => handleCategoryInput('type', e.target.value, index, 'checked')}>
                            <option value="">Select type</option>
                            <option value="store">Store</option>
                            <option value="product">Product</option>
                            <option value="page">Page</option>
                        </select>
                    </Col>
                </Row>
            )}



            {/* <input type="file" name="categoryImage" onChange={e => { setCategoryImage(e.target.files[0]); }} /> */}
        </MyModal>
    )
}

export default UpdateCategoriesModal;