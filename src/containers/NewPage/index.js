import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout'
import Input from '../../components/UI/input';
import MyModal from '../../components/UI/Modal'
import linearCategoryList from '../../helpers/linearCategoryList';
import {createPageAction} from '../../actions';

const NewPage = (props) => {
    const [createPage, setCreatePage] = useState(false);
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [type, setType] = useState('');

    const pageReducer = useSelector(state => state.page);
    const categoryReducer = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(()=>{
        setCategories(linearCategoryList(categoryReducer.categories));
    },[categoryReducer])

    useEffect(()=>{
        console.log(pageReducer);
        if(!pageReducer.loading){
            console.log('page is false....');
            setCreatePage(false);
            setTitle('');
            setDesc('');
            setCategoryId('');
            setProducts([]);
            setBanners([]);
        }
    },[pageReducer]);

    const handleBannerImg = (e) => {
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImg = (e) => {
        setProducts([...products, e.target.files[0]]);
    }

    const handleCategoryChange = (e) => {
        const category = categories.find(cate => cate._id == e.target.value);

        setCategoryId(e.target.value);
        setType(category.type);
    } 

    const submitPageForm = () => {
        const pageForm = new FormData();

        if(title === ""){
            alert('title is required');
            setCreatePage(false);
            return;
        }

        pageForm.append('title',title);
        pageForm.append('description',desc);
        pageForm.append('category', categoryId);
        pageForm.append('type', type);

        banners.forEach((banner, index) => {
            pageForm.append('banners', banner);
        });

        products.forEach((product, index) => {
            pageForm.append('products', product);
        });
        dispatch(createPageAction(pageForm));
        setCreatePage(false);
    }

    const renderCreatePageModal = () => {
        return (
            <MyModal
                show={createPage}
                handleClose={() => { setCreatePage(false) }}
                onSubmit={submitPageForm}
                modalTitle={'Create Page'}
            >
                <Container>
                    <Row>
                        <Col>
                            <Input
                                type="select"
                                value={categoryId}
                                onChange={handleCategoryChange}
                                placeholder={'Select Category'}
                                options={categories}

                            />
                            {/* <select
                                value={categoryId}
                                onChange={handleCategoryChange}
                                className="form-control form-control-sm"
                            >
                                <option value="">Select Category</option>
                                {
                                    categories.map((category,index) =>
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    )
                                }
                            </select> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder={'title'}
                                className="form-control form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                                placeholder={'Description'}
                                className="form-control form-control-sm"
                            />
                        </Col>
                    </Row>
                    {
                        banners.length > 0 ? banners.map((banner,index) => 
                        <Row key={index}>
                            <Col  >{banner.name}</Col>
                        </Row>    
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Input 
                                type="file"
                                name="banners"
                                onChange={handleBannerImg}
                            />
                        </Col>
                    </Row>
                    {
                        products.length > 0 ? products.map((product,index) => 
                        <Row key={index}>
                            <Col >{product.name}</Col>
                        </Row>    
                            ) : null
                    }
                    <Row>
                        <Col>
                            <Input 
                                type="file"
                                name="products"
                                onChange={handleProductImg}
                            />
                        </Col>
                    </Row>
                </Container>


            </MyModal>
        )
    }
    return (
        <Layout sidebar>
            {
                pageReducer.loading ?
                <p>Please wait for a moment...</p>
                :
                <>
                {renderCreatePageModal()}
                <button onClick={() => setCreatePage(true)}>Create Page</button>
                </>
            }
            
        </Layout>
    )
}

export default NewPage
