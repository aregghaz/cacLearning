require('./resources/frontend/plugins/laravel-mix-react-css-modules');
const mix = require('laravel-mix');

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /(\.(gif|webp)$)/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: path => {
                                if (!/node_modules|bower_components/.test(path)) {
                                    return Config.fileLoaderDirs.images + '/[name].[ext]?[hash]';
                                }
                                return (
                                    Config.fileLoaderDirs.images +
                                    '/vendor/' +
                                    path
                                        .replace(/\\/g, '/')
                                        .replace(
                                            /((.*(node_modules|bower_components))|images|image|img|assets|videos)\//g,
                                            '',
                                        ) +
                                    '?[hash]'
                                );
                            },
                            publicPath: Config.resourceRoot,
                        },
                    },
                    {
                        loader: 'img-loader',
                        options: Config.imgLoaderOptions,
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
        ],
    },
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/frontend/app.js', 'public/js')
    .reactCSSModules()
    .copy('resources/frontend/plugins/react-toastify/style.css', 'public/css/react-toastify.css')
    .copy('resources/frontend/styles/style.css', 'public/css/style.css')
    .copy('resources/frontend/plugins/swiper/swiper-customized.css', 'public/css/swiper.css')


    //.sass('resources/frontend/styles/carousel.scss', 'public/css/carousel.css')
    //.copy('resources/frontend/styles/phoneInput.css', 'public/css/phoneInput.css')
    ;


