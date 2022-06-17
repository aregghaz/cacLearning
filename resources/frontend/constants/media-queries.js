const sizes = {
    small: { min: 320, max: 479 },
    medium: { min: 480, max: 767 },
    large: { min: 768, max: 1023 },
    xLarge: { min: 1024, max: 1599 },
    xxLarge: { min: 1600, max: 1919 },
    xxxLarge: { min: 1920 },
};

const smallOnly = `screen and (max-width: ${sizes.small.max}px)`;
const mediumOnly = `screen and (min-width: ${sizes.medium.min}px) and (max-width: ${sizes.medium.max}px)`;
const largeOnly = `screen and (min-width: ${sizes.large.min}px) and (max-width: ${sizes.large.max}px)`;
const mediumOrWider = `screen and (min-width: ${sizes.medium.min}px)`;
const mediumOrNarrower = `screen and (max-width: ${sizes.medium.max}px)`;
const largeOrNarrower = `screen and (max-width: ${sizes.large.max}px)`;
const largeOrWider = `screen and (min-width: ${sizes.large.min}px)`;
const mediumOrLarge = `screen and (min-width: ${sizes.medium.min}px) and (max-width: ${sizes.large.max}px)`;
const xLargeOrWider = `screen and (min-width: ${sizes.xLarge.min}px)`;
const xxLargeOrWider = `screen and (min-width: ${sizes.xxLarge.min}px)`;
const xxLargeOrNarrower = `screen and (max-width: ${sizes.xxLarge.min}px)`;

export {
    sizes,
    smallOnly,
    mediumOnly,
    largeOnly,
    mediumOrWider,
    mediumOrNarrower,
    largeOrNarrower,
    largeOrWider,
    mediumOrLarge,
    xLargeOrWider,
    xxLargeOrWider,
    xxLargeOrNarrower,
};
