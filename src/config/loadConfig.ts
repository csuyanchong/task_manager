import {config} from "dotenv";
import path from "path";

const loadConfig = () => {
    // config({path: "/src/config.env"});
    const result = config({path: path.join(__dirname, "/.env") });
    if (result.error) {
        throw result.error;
    }
    console.log(result.parsed);
}

export default loadConfig;