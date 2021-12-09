export const isValid = (str) => {
    return !/[~`';,"<>]/g.test(str);
}