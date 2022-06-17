export default function phoneNumberParsing(x) {
    return x.split(' ').join('').split('(').join('').split(')').join('').split('-').join('');
}
