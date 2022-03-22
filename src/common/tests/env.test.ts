import fs from 'fs';
import path from 'path';

export default class Environment {
    set() :void {
        const config = JSON.parse( fs.readFileSync(path.resolve(__dirname, '../../../config/test-dev.json')).toString() );
        const keysConfig = Object.keys(config);
        if(keysConfig && keysConfig.length){
            keysConfig.map( key =>{
                process.env[key] = config[key];
            });
        }
    }

}
