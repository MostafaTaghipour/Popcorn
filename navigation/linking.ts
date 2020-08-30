import { LinkingOptions } from "@react-navigation/native/lib/typescript/src/types";
/**
 * If you are using universal links, you need to add your domain to the prefixes.
 * https://reactnavigation.org/docs/deep-linking/
 * 
 *  @type {*} */
const options: LinkingOptions = {
  prefixes: ["https://popcorn.com", "popcorn://"],
  // config: {
  // },
};
export default options;
