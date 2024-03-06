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
    constructor() {
        this.page = {};
    }
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
    constructor(pageNum, pageSize, param) {
        this.pageNum = 1;
        this.pageSize = 30;
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
