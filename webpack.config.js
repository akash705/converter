const path = require('path');

module.exports=(props)=>{
    console.log(props);
    return {
        mode:"production",
        entry: "./scripts/start.js",
        output:{
            filename: 'main.js',
            path: path.resolve(__dirname,'dist')
        }  
    }
}