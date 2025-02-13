var NavType;
(function (NavType) {
    NavType["APPLICATION"] = "application";
    NavType["GROUP"] = "group";
    NavType["TILE"] = "tiled";
    NavType["BLANK"] = "blank";
    NavType["TABS"] = "tabs"; // 选项卡
})(NavType || (NavType = {}));

const YUNZAI_PAGE = {
    PAGE_NUM: 1,
    PAGE_SIZE: 1000
};
class YunzaiPageBuilder {
    page = {};
    pageNum(pageNum) {
        this.page.pageNum = pageNum;
        return this;
    }
    pageSize(pageSize) {
        this.page.pageSize = pageSize;
        return this;
    }
    pageParam(param) {
        this.page.pageParam = param;
        return this;
    }
    default() {
        this.page.pageNum = YUNZAI_PAGE.PAGE_NUM;
        this.page.pageSize = YUNZAI_PAGE.PAGE_SIZE;
        return this;
    }
    build() {
        return this.page;
    }
}
class Page {
    pageNum = 1;
    pageSize = 30;
    param;
    constructor(pageNum, pageSize, param) {
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.param = param;
    }
    static create() {
        return new Page(1, 30);
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { NavType, Page, YunzaiPageBuilder };
//# sourceMappingURL=mtypes.mjs.map
