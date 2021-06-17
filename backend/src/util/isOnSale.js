
module.exports = function isOnSale(product) {

    let isOnSale = false;

    if(product.discount_datetime_start !== null && product.discount_datetime_end !== null){

        const dateNow = new Date();
        const startDate = new Date(product.discount_datetime_start);
        const endDate = new Date(product.discount_datetime_end);

        if(startDate <= dateNow && endDate >= dateNow){
            if(product.discount_percent > 0) {

                isOnSale = true;
            }
        }
    } 

    return isOnSale;
}
