
/**
 * @param {number} price 
 * @param {number} discountPercent 
 * @returns {string} final price
 */
module.exports = (price, discountPercent) => {

    const finalPrice = (discountPercent != 0)
        ? (Number(price) - ((Number(price) * (discountPercent / 100)))).toFixed(2)
        : Number(price).toFixed(2);

    return finalPrice;
}
