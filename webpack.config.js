var config = {
    entry : './src/app.js',
    output : {
        path : './dist/',
        filename : 'n_datatable.js'
    },
    module : {
        loaders : [
            {
                test : /\.js?$/,
                exclude : /node_modules/,
                loader : 'babel',
                query : {
                    presets : ['react', 'es2015']
                }
            }
        ]
    }
}

module.exports = config;