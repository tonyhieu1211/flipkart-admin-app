import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout'
import Input from '../../components/UI/input';
import MyModal from '../../components/UI/Modal'
import linearCategoryList from '../../helpers/linearCategoryList';
import {createPageAction} from '../../actions';
import uploadImages from '../../helpers/uploadImages';

const NewPage = (props) => {
    const [createPage, setCreatePage] = useState(false);
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [category,setCategory] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [banners, setBanners] = useState([]);
    const [type, setType] = useState('');
    const [previewBanners, setPreviewBanners] = useState([]);

    const pageReducer = useSelector(state => state.page);
    const categoryReducer = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(()=>{
        setCategories(linearCategoryList(categoryReducer.categories));
    },[categoryReducer])

    useEffect(()=>{
        if(!pageReducer.loading){
            setCreatePage(false);
            setTitle('');
            setDesc('');
            setCategoryId('');
            setBanners([]);
        }
    },[pageReducer]);

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewBanners([...previewBanners,reader.result]);
        };
    }; 

    const handleBannerImg = (e) => {
        setBanners([...banners, e.target.files[0]]);
        previewFile(e.target.files[0]);
    }



    const handleCategoryChange = (e) => {
        console.log(e.target.value);
        const foundCategory = categories.find(cate => cate.name == e.target.value);
        setCategory(foundCategory.name);
        setCategoryId(foundCategory._id);
        
        setType(foundCategory.type ? foundCategory.type : 'store');
    } 

    const submitPageForm = () => {
        
        let bannerImgPromises = [];

        banners.forEach((banner, index) => {
            bannerImgPromises.push(uploadImages(banner));
        });

        Promise.all(bannerImgPromises).then((results) => {
            const bannerUrls = results.map(res => ({
                img:res.url,
                navigateTo:`/bannerClicked?categoryId=${categoryId}&type=${type}`
            }));
            const data = {
                title,
                description:desc,
                category:categoryId,
                type,
                banners:bannerUrls
            }
            
            dispatch(createPageAction(data));
            setCreatePage(false);
        });

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
                                value={category}
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
                    <label>Banners</label>
                    <Row>
                        
                        <Col>
                            <Input 
                                type="file"
                                name="banners"
                                onChange={handleBannerImg}
                            />
                        </Col>
                    </Row>
                    <div style={{ display: 'flex' }}>
                        {previewBanners.length > 0 && previewBanners.map((src, index) =>
                            <img src={src} alt="" style={{ width: "25%", height: "100%", marginRight: '10px' }} />
                        )}
                    </div>
                    {/* <label>Products</label>
                    <Row>
                        <Col>
                            <Input 
                                type="file"
                                name="products"
                                onChange={handleProductImg}
                            />
                        </Col>
                    </Row>
                    <div style={{ display: 'flex' }}>
                        {previewProducts.length > 0 && previewProducts.map((src, index) =>
                            <img src={src} alt="" style={{ width: "25%", height: "100%", marginRight: '10px' }} />
                        )}
                    </div> */}
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
