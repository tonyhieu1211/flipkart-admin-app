import React, {  useState } from 'react'
import { Col, Container, Row, Modal, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProductById } from '../../actions';
import Layout from '../../components/Layout';
import Input from '../../components/UI/input';
import MyModal from '../../components/UI/Modal';
import './style.css';

const Product = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [productPics, setProductPics] = useState([]);
    const [productDetailsModal,setProductDetailsModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const [ showAddProductModal, setShowAddProductModal ] = useState(false);

    

    const productReducer = useSelector(state => state.product);

    const dispatch = useDispatch();


    const categoryReducer = useSelector(state => state.category);



    const createCategoryList = (categories, options = []) => {
        for(let category of categories){
            options.push({ value: category._id, name: category.name });
            if(category.children.length > 0){
                createCategoryList(category.children, options);
            }
        }

        return options;
    }    
    
    const previewFile = (file,key) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProductPics([...productPics,reader.result]);
        };
    };  

    const submitProduct = async () => {
        const form = {
            name,price,quantity,description,category,productPics
        }

        dispatch(addProduct(form));
        setShowAddProductModal(false);
    }
    

    const getCategoryName = (categories, categoryId) => {
        for(let category of categories){
            if(categoryId === category.value){
                return category.name;
            }
        }
    }

    

    const renderTable = () => {
        return (
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th >Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>

                    </tr>
                </thead>
                <tbody>
                    {productReducer.products.map((product) =>
                        <tr  key={product._id}>
                            <td>1</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{
                                product.category.name == undefined ?
                                getCategoryName(createCategoryList(categoryReducer.categories), product.category)
                                : product.category.name
                            }</td>
                            <td>
                                <button onClick={() => showProductDetails(product)} >
                                    info
                                </button>
                                <button onClick={()=>{
                                    const payload = {
                                        productId: product._id
                                    }
                                    dispatch(deleteProductById(payload));
                                }}>
                                    delete
                                </button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </Table>
        );
    }

    const renderAddProductModal = () => {
        return (
            <MyModal
                show={showAddProductModal}
                handleClose={() => setShowAddProductModal(false)}
                modalTitle={'Add new product'}
                onSubmit={submitProduct}
            >
                <Input
                    label="Name"
                    value={name}
                    placeholder={`Product name`}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    label="Price"
                    value={price}
                    placeholder={`Product price`}
                    onChange={e => setPrice(e.target.value)}
                />
                <Input
                    label="Quantity"
                    value={quantity}
                    placeholder={`Product quantity`}
                    onChange={e => setQuantity(e.target.value)}
                />
                <Input
                    label="Description"
                    value={description}
                    placeholder={`Product description`}
                    onChange={e => setDescription(e.target.value)}
                />
                <select className="form-control"
                    value={category}
                    onChange={e => { setCategory(e.target.value); }}>
                    <option>Select category</option>
                    {createCategoryList(categoryReducer.categories).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )
                    }
                </select>
                <input type="file" name="productPic" onChange={e => { 
                   // setProductPics([...productPics, e.target.files[0]]); 
                    previewFile(e.target.files[0]);
                    }} />
                <div style={{display:'flex'}}>
                    {productPics.length > 0 && productPics.map((src, index) =>
                        <img src={src} alt="" style={{ width: "25%", height: "100%",marginRight:'10px' }} />
                    )}
                </div>
            </MyModal>
        );
    }

    const showProductDetails = (product) => {
        setProductDetails(product);
        setProductDetailsModal(true);
    }

    const handleCloseProductDetailsModal = () => {
        setProductDetailsModal(false);
    }

    const renderProductDetailModal = () => {
        if(productDetails === null) return;
        return (
            <MyModal
                show={productDetailsModal}
                handleClose={handleCloseProductDetailsModal}
                modalTitle={'Product detail'}
                size="lg"
            >
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">
                            {getCategoryName(createCategoryList(categoryReducer.categories), productDetails.category)}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <label className="key" >Product Picture</label>
                        <div style={{ display:'flex' }}>
                            {productDetails.productPics.map(pic => 
                                <div className="productPictureContainer" >
                                    <img src={pic.img} />
                                </div>
                                )}
                        </div>
                        
                    </Col>
                </Row>
            </MyModal>
        );
    }

    return (

        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <button onClick={() => setShowAddProductModal(true)}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderTable()}
                    </Col>
                </Row>
            </Container>
            {renderAddProductModal()}
            {renderProductDetailModal()}
        </Layout>
    );
}

export default Product; 