// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import authentication from "./authentication";
import bids from "@store/bids";
import test from "@store/test";

const rootReducer = { navbar, layout, authentication,bids, test };

export default rootReducer;
