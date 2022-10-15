export const convert = (price: number) => {
    return Math.round(price * 100) / 100;
}