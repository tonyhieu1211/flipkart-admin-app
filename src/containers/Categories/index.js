
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, deleteCategories, getCategories, updateCategories } from '../../actions'
import Layout from '../../components/Layout'
import CheckboxTree from 'react-checkbox-tree';
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowForward, IoIosArrowDown, IoIosAdd, IoIosTrash, IoIosCloudUpload } from "react-icons/io";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './components/UpdateCategoriesModal'
import AddCategoryModal from './components/AddCategoryModal'
import DeleteCategoriesModal from './components/DeleteCategoriesModal'
import './style.css'

const Category = () => {

    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);


    const categoryReducer = useSelector(state => state.category);
    
    const dispatch = useDispatch();

    const categoryList = categoryReducer.categories;
    
    useEffect(()=>{
        if(!categoryReducer.loading) setShow(false);
    },[categoryReducer]);

    const submitAddCategoryForm = () => {
        const form = new FormData();
        if(categoryName == ""){
            alert("Category Name is required");
            setShow(false);
            return;
        }

        form.append('name', categoryName);
        form.append('parent', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }
    
    const renderCategories = (categories) => {
        let categoryArr = [];
        for (let category of categories) {
            categoryArr.push({
                label: category.name,
                value: category._id,
                children: category.children.length > 0 && renderCategories(category.children)
            });
        }
        return categoryArr;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ 
                value: category._id, 
                name: category.name, 
                parent: category.parent,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }

        return options;
    }

    const updateCheckedAndExpandedArray = () => {
        const categories = createCategoryList(categoryReducer.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, _index) => {
            const category = categories.find(item => item.value === categoryId);
            checkedArray.push(category);
        });
        expanded.length > 0 && expanded.forEach((categoryId, _index) => {
            const category = categories.find(item => item.value === categoryId);
            expandedArray.push(category);
        });
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray)
        console.log({ checked, expanded, categories, checkedArray, expandedArray });
    }

    const updateCategory = () => {
        setUpdateCategoryModal(true);
        updateCheckedAndExpandedArray();
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
      
        const formData = new FormData();

        expandedArray.forEach((item, index) => {
            formData.append('name', item.name);
            formData.append('_id',item.value);
            formData.append('parent',item.parent);
            formData.append('type',item.type);
        })

        checkedArray.forEach((item, index) => {
            formData.append('name', item.name);
            formData.append('_id',item.value);
            formData.append('parent',item.parent);
            formData.append('type',item.type);
        })
        dispatch(updateCategories(formData));
        setUpdateCategoryModal(false);
    }

    const deleteCategoriesAction = () => {
        const checkedIdsArray = checkedArray.map(item => { return { _id: item.value } });
        const expandedIdsArray = expandedArray.map(item => ({ _id: item.value }));
        const idsArray = [...checkedIdsArray, ...expandedIdsArray];
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategories(checkedIdsArray));
        }
        setDeleteCategoryModal(false);
    }

    const openDeleteCategoriesModal = () => {
        updateCheckedAndExpandedArray();
        setDeleteCategoryModal(true);
    }

    const handleCloseDeleteCategoriesModal = () => {
        setDeleteCategoryModal(false);
    }




    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Categories</h3>
                            <div className="btnActionContainer">
                                <span>Actions:</span>
                                <button onClick={handleShow}><IoIosAdd /> <span>Add</span></button>
                                <button onClick={openDeleteCategoriesModal}><IoIosTrash /><span>Delete</span></button>
                                <button onClick={updateCategory} ><IoIosCloudUpload /><span>Update</span></button>
                            </div>
                            
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>

                        <CheckboxTree
                            nodes={renderCategories(categoryReducer.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />,

                            }}
                        />
                    </Col>
                </Row>
                
            </Container>
            <AddCategoryModal 
                show = {show}
                handleClose ={() => setShow(false)}
                onSubmit={submitAddCategoryForm}
                modalTitle = {'Add Category'}
                setCategoryName = {setCategoryName}
                setParentCategoryId = {setParentCategoryId}
                categoryList = {categoryList}
                setCategoryImage = {setCategoryImage}
                categoryName = {categoryName}
                parentCategoryId = {parentCategoryId}
            />
            <UpdateCategoriesModal 
                show={updateCategoryModal}
                handleClose={() => { setUpdateCategoryModal(false) }}
                onSubmit={updateCategoriesForm}
                modalTitle={'Update category'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />

            <DeleteCategoriesModal 
               modalTitle={'Delete category'}
               show={deleteCategoryModal}
               handleClose={handleCloseDeleteCategoriesModal}
               buttons={[
                   {
                       label:'Yes',
                       color:'primary',
                       onClick: deleteCategoriesAction
                   },
                   {
                       label:'No',
                       color:'danger',
                       onClick: () => { alert('Yes') }
                   },
               ]}
               checkedArray={checkedArray}
               expandedArray={expandedArray} 
            />

        </Layout>
    )
}

export default Category
