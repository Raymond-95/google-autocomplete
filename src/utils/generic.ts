export const maskedText = (text: string) => {
    const nonMaskDigit = 4;
    const textArr = text.split('');
    const prefix = textArr.slice(0, -nonMaskDigit);
    const last4digits = textArr.slice(-nonMaskDigit);

    for (let index = 0; index < prefix.length; index++) {
        if (prefix[index] !== ' ') {
            prefix[index] = 'x';
        }
    }

    return prefix.concat(last4digits).join('');
};