import fs from "fs";
import path from "path";
import schema from "../data/schema";
import {graphql} from "graphql";
import {introspectionQuery} from "graphql/utilities";

/*eslint-disable no-console*/

console.log("Updating schema...");
(async() => {
    let result = await(graphql(schema, introspectionQuery));
    if (result.errors) {
        console.error("ERROR introspecting schema: ", JSON.stringify(result.errors, null, 2));
    } else {
        fs.writeFileSync(path.join(__dirname, "../data/schema.json"), JSON.stringify(result, null, 2));
        console.log("Schema updated");
    }
})();

/*eslint-enable no-console*/
