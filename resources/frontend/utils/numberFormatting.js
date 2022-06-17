export default function numberFormatting(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}
