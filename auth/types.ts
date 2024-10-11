import {ApiClientConfigParams} from "@salesforce/commerce-sdk-react/hooks/types";
import {ShopperLoginTypes} from "commerce-sdk-isomorphic";
import {Logger} from "@salesforce/commerce-sdk-react/types";

export interface AuthConfig extends ApiClientConfigParams {
    redirectURI: string;
    proxy: string;
    fetchOptions?: ShopperLoginTypes.FetchOptions;
    fetchedToken?: string;
    OCAPISessionsURL?: string;
    enablePWAKitPrivateClient?: boolean;
    clientSecret?: string;
    silenceWarnings?: boolean;
    logger: Logger;
}