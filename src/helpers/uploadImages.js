const uploadImages = async (pic) => {
        
    const form = new FormData();


    form.append('file', pic);
    
    form.append('upload_preset','products');
    const res = await fetch("https://api.cloudinary.com/v1_1/dx58odn8b/image/upload",{
        method:"POST",
        body:form
    });

    return res.json();
    
}

export default uploadImages;