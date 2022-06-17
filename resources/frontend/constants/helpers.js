import Col from '../components/grid/col/col';

export const MS_PER_DAY = 86400000; //one day in milliseconds

export const filter = (title) => title.replace('AM', '').replace('PM', '');

export const numberFormatting = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");

export const paymentMethod = {
    0: 'self-delivery',
    1: 'courier',
    2: 'delivery_russia',
};

export const BUY_TYPES = {
    newestItems: 1,
    dailyDeals: 2,
    specialOffers: 3,
};

export const headerMenuItems = {
    menuLinks: [
        {
            id: 1,
            name: 'BRANDS',
            page: '/brands',
        },
        {
            id: 2,
            name: 'WATCH',
            page: '/catalogue_watches',
        },
        {
            id: 3,
            name: 'DECORATION',
            page: '/catalogue_decoration',
        },
        {
            id: 4,
            name: 'ACCESSORIES',
            page: '/catalogue_accessories',
        },
        {
            id: 5,
            name: 'SHOP',
            page: '/shop',
        },
        {
            id: 6,
            name: 'SERVICE',
            page: '/service',
        },

        {
            id: 7,
            name: 'ABOUT',
            page: '/about',
        },
    ],
    decorationItems: [
        {
            name: 'rings',
            page: '/catalogue_decoration/types__1',
        },
        {
            name: 'earrings',
            page: '/catalogue_decoration/types__3',
        },
        {
            name: 'pendants',
            page: '/catalogue_decoration/types__4',
        },
        {
            name: 'bracelets',
            page: '/catalogue_decoration/types__2',
        },
    ],
    accessoriesItems: [
        {
            name: 'straps',
            page: '/catalogue_accessories/types__1',
        },
        {
            name: 'glasses',
            page: '/catalogue_accessories/types__2',
        },
        {
            name: 'leather_products',
            page: '/catalogue_accessories/types__3',
        },
    ],
};

export const catalogueSelectOptions = [
    { id: 1, name: 'site:from-a-to-z' },
    { id: 2, name: 'site:from-z-to-a' },
    { id: 3, name: 'site:from-low-to-high' },
    { id: 4, name: 'site:from-high-to-low' },
    { id: 5, name: 'site:new-released' },
    { id: 6, name: 'site:main-collection' },
];

export const footerItemsMobile = [
    {
        size: '7',
        items: [
            {
                id: 1,
                item: 'BRANDS',
                page: '/brands',
            },
            {
                id: 2,
                item: 'WATCH',
                page: '/catalogue_watches',
            },
            {
                id: 3,
                item: 'DECORATION',
                page: '/catalogue_decoration',
            },
            {
                id: 4,
                item: 'ACCESSORIES',
                page: '/catalogue_accessories',
            },

            {
                id: 5,
                item: 'privacy_policy',
                page: '/privacy-policy',
            },
            {
                id: 6,
                item: 'CART',
                page: `/cart`,
            },
        ],
    },
    {
        size: '5',
        items: [
            {
                id: 5,
                item: 'SHOP',
                page: '/shop',
            },
            {
                id: 6,
                item: 'SERVICE',
                page: '/service',
            },
            {
                id: 7,
                item: 'ABOUT',
                page: '/about',
            },
            {
                id: 8,
                item: 'guarantee',
                page: '/guarantee',
            },
            {
                id: 10,
                item: 'delivery_payment',
                page: '/delivery-payment',
            },
            {
                id: 12,
                item: 'legal_information',
                page: '/legal',
            },
        ],
    },
];
