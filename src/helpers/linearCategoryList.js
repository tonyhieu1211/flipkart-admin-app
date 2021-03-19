const linearCategoryList = (categories, options = []) => {
    for (let category of categories) {
        options.push({ 
            _id: category._id, 
            name: category.name, 
            parent: category.parent,
            type: category.type
        });
        if (category.children.length > 0) {
            linearCategoryList(category.children, options);
        }
    }

    return options;
}

export default linearCategoryList;