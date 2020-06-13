
/**
 * @param {number} fatherId
 * @param {Array<{ id: number, parent_id: number}>} categories
 * @returns {number[]}
 */
module.exports = function findCategoriesChildrenIds(fatherId, categories){

    let categoriesIds = [];
    
    const children = categories.filter( (category) => category.parent_id == fatherId);
    
    children.forEach( (category) => {
        
        categoriesIds.push(...findCategoriesChildrenIds(category.id, categories));
    });

    return [ fatherId, ...categoriesIds ];
}
