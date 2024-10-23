import React from 'react'
import HeaderView from "@/components/header/header-view";
import {getApiClients} from "@/utils/commerce-api";
import {CAT_MENU_DEFAULT_NAV_SSR_DEPTH, CAT_MENU_DEFAULT_ROOT_CATEGORY} from "@/constants";

export interface levelZeroCategoriesQuery {
    categories: Array<CommerceSDK.Category>
}

export default async function Header() {
    const {shopperProducts} = await getApiClients();
    const levelZeroCategoriesQuery = await shopperProducts.getCategory({
        parameters: {id: CAT_MENU_DEFAULT_ROOT_CATEGORY, levels: CAT_MENU_DEFAULT_NAV_SSR_DEPTH}
    }) as unknown as levelZeroCategoriesQuery;

    return <HeaderView levelZeroCategoriesQuery={levelZeroCategoriesQuery} />
}
