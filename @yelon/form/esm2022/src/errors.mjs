export const ERRORSDEFAULT = {
    'false schema': `布尔模式出错`,
    $ref: `无法找到引用{ref}`,
    additionalItems: `不允许超过{ref}`,
    additionalProperties: `不允许有额外的属性`,
    anyOf: `数据应为 anyOf 所指定的其中一个`,
    dependencies: `应当拥有属性{property}的依赖属性{deps}`,
    enum: `应当是预设定的枚举值之一`,
    format: `格式不正确`, // `应当匹配格式 "{format}"`,
    type: `类型应当是 {type}`,
    required: `必填项`,
    maxLength: `至多 {limit} 个字符`,
    minLength: `至少 {limit} 个字符以上`,
    minimum: `必须 {comparison}{limit}`,
    formatMinimum: `必须 {comparison}{limit}`,
    maximum: `必须 {comparison}{limit}`,
    formatMaximum: `必须 {comparison}{limit}`,
    maxItems: `不应多于 {limit} 个项`,
    minItems: `不应少于 {limit} 个项`,
    maxProperties: `不应多于 {limit} 个属性`,
    minProperties: `不应少于 {limit} 个属性`,
    multipleOf: `应当是 {multipleOf} 的整数倍`,
    not: `不应当匹配 "not" schema`,
    oneOf: `只能匹配一个 "oneOf" 中的 schema`,
    pattern: `数据格式不正确`,
    uniqueItems: `不应当含有重复项 (第 {j} 项与第 {i} 项是重复的)`,
    custom: `格式不正确`,
    propertyNames: `属性名 "{propertyName}" 无效`,
    patternRequired: `应当有属性匹配模式 {missingPattern}`,
    switch: `由于 {caseIndex} 失败，未通过 "switch" 校验`,
    const: `应当等于常量`,
    contains: `应当包含一个有效项`,
    formatExclusiveMaximum: `formatExclusiveMaximum 应当是布尔值`,
    formatExclusiveMinimum: `formatExclusiveMinimum 应当是布尔值`,
    if: `应当匹配模式 "{failingKeyword}"`
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZm9ybS9zcmMvZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRztJQUMzQixjQUFjLEVBQUUsUUFBUTtJQUN4QixJQUFJLEVBQUUsYUFBYTtJQUNuQixlQUFlLEVBQUUsWUFBWTtJQUM3QixvQkFBb0IsRUFBRSxXQUFXO0lBQ2pDLEtBQUssRUFBRSxxQkFBcUI7SUFDNUIsWUFBWSxFQUFFLDZCQUE2QjtJQUMzQyxJQUFJLEVBQUUsY0FBYztJQUNwQixNQUFNLEVBQUUsT0FBTyxFQUFFLHVCQUF1QjtJQUN4QyxJQUFJLEVBQUUsY0FBYztJQUNwQixRQUFRLEVBQUUsS0FBSztJQUNmLFNBQVMsRUFBRSxnQkFBZ0I7SUFDM0IsU0FBUyxFQUFFLGtCQUFrQjtJQUM3QixPQUFPLEVBQUUsd0JBQXdCO0lBQ2pDLGFBQWEsRUFBRSx3QkFBd0I7SUFDdkMsT0FBTyxFQUFFLHdCQUF3QjtJQUNqQyxhQUFhLEVBQUUsd0JBQXdCO0lBQ3ZDLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixhQUFhLEVBQUUsa0JBQWtCO0lBQ2pDLGFBQWEsRUFBRSxrQkFBa0I7SUFDakMsVUFBVSxFQUFFLHVCQUF1QjtJQUNuQyxHQUFHLEVBQUUsb0JBQW9CO0lBQ3pCLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsT0FBTyxFQUFFLFNBQVM7SUFDbEIsV0FBVyxFQUFFLGdDQUFnQztJQUM3QyxNQUFNLEVBQUUsT0FBTztJQUNmLGFBQWEsRUFBRSx5QkFBeUI7SUFDeEMsZUFBZSxFQUFFLDRCQUE0QjtJQUM3QyxNQUFNLEVBQUUsbUNBQW1DO0lBQzNDLEtBQUssRUFBRSxRQUFRO0lBQ2YsUUFBUSxFQUFFLFdBQVc7SUFDckIsc0JBQXNCLEVBQUUsK0JBQStCO0lBQ3ZELHNCQUFzQixFQUFFLCtCQUErQjtJQUN2RCxFQUFFLEVBQUUsMkJBQTJCO0NBQ2hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB0eXBlIHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgTnpGb3JtQ29udHJvbFN0YXR1c1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2Zvcm0nO1xuXG5pbXBvcnQgdHlwZSB7IFNGVmFsdWUgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgdHlwZSB7IEZvcm1Qcm9wZXJ0eSwgUHJvcGVydHlHcm91cCB9IGZyb20gJy4vbW9kZWwvZm9ybS5wcm9wZXJ0eSc7XG5cbmV4cG9ydCBjb25zdCBFUlJPUlNERUZBVUxUID0ge1xuICAnZmFsc2Ugc2NoZW1hJzogYOW4g+WwlOaooeW8j+WHuumUmWAsXG4gICRyZWY6IGDml6Dms5Xmib7liLDlvJXnlKh7cmVmfWAsXG4gIGFkZGl0aW9uYWxJdGVtczogYOS4jeWFgeiuuOi2hei/h3tyZWZ9YCxcbiAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGDkuI3lhYHorrjmnInpop3lpJbnmoTlsZ7mgKdgLFxuICBhbnlPZjogYOaVsOaNruW6lOS4uiBhbnlPZiDmiYDmjIflrprnmoTlhbbkuK3kuIDkuKpgLFxuICBkZXBlbmRlbmNpZXM6IGDlupTlvZPmi6XmnInlsZ7mgKd7cHJvcGVydHl955qE5L6d6LWW5bGe5oCne2RlcHN9YCxcbiAgZW51bTogYOW6lOW9k+aYr+mihOiuvuWumueahOaemuS4vuWAvOS5i+S4gGAsXG4gIGZvcm1hdDogYOagvOW8j+S4jeato+ehrmAsIC8vIGDlupTlvZPljLnphY3moLzlvI8gXCJ7Zm9ybWF0fVwiYCxcbiAgdHlwZTogYOexu+Wei+W6lOW9k+aYryB7dHlwZX1gLFxuICByZXF1aXJlZDogYOW/heWhq+mhuWAsXG4gIG1heExlbmd0aDogYOiHs+WkmiB7bGltaXR9IOS4quWtl+espmAsXG4gIG1pbkxlbmd0aDogYOiHs+WwkSB7bGltaXR9IOS4quWtl+espuS7peS4imAsXG4gIG1pbmltdW06IGDlv4Xpobsge2NvbXBhcmlzb259e2xpbWl0fWAsXG4gIGZvcm1hdE1pbmltdW06IGDlv4Xpobsge2NvbXBhcmlzb259e2xpbWl0fWAsXG4gIG1heGltdW06IGDlv4Xpobsge2NvbXBhcmlzb259e2xpbWl0fWAsXG4gIGZvcm1hdE1heGltdW06IGDlv4Xpobsge2NvbXBhcmlzb259e2xpbWl0fWAsXG4gIG1heEl0ZW1zOiBg5LiN5bqU5aSa5LqOIHtsaW1pdH0g5Liq6aG5YCxcbiAgbWluSXRlbXM6IGDkuI3lupTlsJHkuo4ge2xpbWl0fSDkuKrpoblgLFxuICBtYXhQcm9wZXJ0aWVzOiBg5LiN5bqU5aSa5LqOIHtsaW1pdH0g5Liq5bGe5oCnYCxcbiAgbWluUHJvcGVydGllczogYOS4jeW6lOWwkeS6jiB7bGltaXR9IOS4quWxnuaAp2AsXG4gIG11bHRpcGxlT2Y6IGDlupTlvZPmmK8ge211bHRpcGxlT2Z9IOeahOaVtOaVsOWAjWAsXG4gIG5vdDogYOS4jeW6lOW9k+WMuemFjSBcIm5vdFwiIHNjaGVtYWAsXG4gIG9uZU9mOiBg5Y+q6IO95Yy56YWN5LiA5LiqIFwib25lT2ZcIiDkuK3nmoQgc2NoZW1hYCxcbiAgcGF0dGVybjogYOaVsOaNruagvOW8j+S4jeato+ehrmAsXG4gIHVuaXF1ZUl0ZW1zOiBg5LiN5bqU5b2T5ZCr5pyJ6YeN5aSN6aG5ICjnrKwge2p9IOmhueS4juesrCB7aX0g6aG55piv6YeN5aSN55qEKWAsXG4gIGN1c3RvbTogYOagvOW8j+S4jeato+ehrmAsXG4gIHByb3BlcnR5TmFtZXM6IGDlsZ7mgKflkI0gXCJ7cHJvcGVydHlOYW1lfVwiIOaXoOaViGAsXG4gIHBhdHRlcm5SZXF1aXJlZDogYOW6lOW9k+acieWxnuaAp+WMuemFjeaooeW8jyB7bWlzc2luZ1BhdHRlcm59YCxcbiAgc3dpdGNoOiBg55Sx5LqOIHtjYXNlSW5kZXh9IOWksei0pe+8jOacqumAmui/hyBcInN3aXRjaFwiIOagoemqjGAsXG4gIGNvbnN0OiBg5bqU5b2T562J5LqO5bi46YePYCxcbiAgY29udGFpbnM6IGDlupTlvZPljIXlkKvkuIDkuKrmnInmlYjpoblgLFxuICBmb3JtYXRFeGNsdXNpdmVNYXhpbXVtOiBgZm9ybWF0RXhjbHVzaXZlTWF4aW11bSDlupTlvZPmmK/luIPlsJTlgLxgLFxuICBmb3JtYXRFeGNsdXNpdmVNaW5pbXVtOiBgZm9ybWF0RXhjbHVzaXZlTWluaW11bSDlupTlvZPmmK/luIPlsJTlgLxgLFxuICBpZjogYOW6lOW9k+WMuemFjeaooeW8jyBcIntmYWlsaW5nS2V5d29yZH1cImBcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JEYXRhIHtcbiAgW2tleTogc3RyaW5nXTogTnpTYWZlQW55O1xuXG4gIC8qKlxuICAgKiBXaGVuIHNwZWNpZnlpbmcgYGtleXdvcmRgLCB5b3UgY2FuIHVzZSBgc2ZgIGJ1aWx0LWluIHNvbWUgY29tbW9uIHR5cGVzIFtFUlJPUlNERUZBVUxUXShodHRwczovL2dpdGh1Yi5jb20vaGJ5dW56YWkveWVsb24vYmxvYi9tYXN0ZXIvcGFja2FnZXMvZm9ybS9zcmMvZXJyb3JzLnRzI0w0KSAsIGRpcmVjdCBjb252ZXJzaW9uLiBPciB1c2UgdGhlIGBtZXNzYWdlYCBwYXJhbWV0ZXIgdG8gc3BlY2lmeSBhbiBlcnJvciBtZXNzYWdlLlxuICAgKlxuICAgKiDlvZPmjIflrpogYGtleXdvcmRgIOaXtu+8jOWPr+S7peWIqeeUqCBgc2ZgIOWGhee9ruS4gOS6m+W4uOingeexu+WeiyBbRVJST1JTREVGQVVMVF0oaHR0cHM6Ly9naXRodWIuY29tL2hieXVuemFpL3llbG9uL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL2Zvcm0vc3JjL2Vycm9ycy50cyNMNCnvvIznm7TmjqXovazljJbjgILmiJbogIXkvb/nlKggYG1lc3NhZ2VgIOWPguaVsOadpeaMh+WumumUmeivr+a2iOaBr+OAglxuICAgKi9cbiAga2V5d29yZD86IHN0cmluZyB8IG51bGw7XG4gIGRhdGFQYXRoPzogc3RyaW5nO1xuICBkYXRhPzogdW5rbm93bjtcbiAgc2NoZW1hUGF0aD86IHN0cmluZztcbiAgaW5zdGFuY2VQYXRoPzogc3RyaW5nO1xuICAvKipcbiAgICogUGFyYW1ldGVycyByZXF1aXJlZCBmb3IgdGVtcGxhdGUgcGFyc2luZ1xuICAgKlxuICAgKiDmjIflrprmqKHmnb/op6PmnpDmiYDpnIDopoHnmoTlj4LmlbBcbiAgICovXG4gIHBhcmFtcz86IFJlY29yZDxzdHJpbmcsIE56U2FmZUFueT47XG4gIC8qKlxuICAgKiBTcGVjaWZ5IGVycm9yIG1lc3NhZ2VcbiAgICpcbiAgICog5oyH5a6a6ZSZ6K+v5raI5oGvXG4gICAqL1xuICBtZXNzYWdlPzogc3RyaW5nIHwgKChlcnI6IEVycm9yRGF0YSkgPT4gc3RyaW5nKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFcnJvclNjaGVtYSB7XG4gIC8qKlxuICAgKiDmmK/lkKblrp7ml7bmoKHpqozvvIzpu5jorqTvvJpgdHJ1ZWBcbiAgICogLSBgdHJ1ZWAg5q+P5LiA5qyh6YO95qCh6aqMXG4gICAqIC0gYGZhbHNlYCDmj5DkuqTml7bmoKHpqoxcbiAgICovXG4gIGxpdmVWYWxpZGF0ZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiDoh6rlrprkuYnplJnor6/kv6Hmga/mlofmnKzvvIzplK7lkI3otZ7lkIwgYEVycm9yRGF0YS5rZXl3b3JkYCDlgLxcbiAgICovXG4gIGVycm9ycz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgKChvYmo6IEVycm9yRGF0YSkgPT4gc3RyaW5nKSB9O1xuICAvKipcbiAgICog5piv5ZCm5Y+q5bGV56S66ZSZ6K+v6KeG6KeJ5LiN5pi+56S66ZSZ6K+v5paH5pys77yM6buY6K6k77yaYGZhbHNlYFxuICAgKi9cbiAgb25seVZpc3VhbD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiDmmK/lkKblv73nlaXmn5DkupvmlbDmja7nsbvlnovmoKHpqowgYEVSUk9SU0RFRkFVTFRgXG4gICAqIC0g5YC85aeL57uI5YyF5ZCrIGBZZWxvblNjaGVtYUZvcm1Db25maWcuaWdub3JlS2V5d29yZHNgXG4gICAqL1xuICBpZ25vcmVLZXl3b3Jkcz86IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGZvcmNlIHRvIGRpc3BsYXkgYCpgIG9uIHRoZSBsYWJlbCB0byBpbmRpY2F0ZSB0aGF0IGl0IGlzIHJlcXVpcmVkXG4gICAqXG4gICAqIOaYr+WQpuW8uuWItuWcqOagh+etvuS4iuaYvuekuiBgKmAg5p2l6KGo56S65b+F5aGr77yM5LiA6Iis5Zyo5b2T5L2/55So6Ieq5a6a5LmJ5qCh6aqMIGB2YWxpZGF0b3JgIOWPr+iDvemcgOimgeW/heWhq+mhueWkhOeQhlxuICAgKi9cbiAgc2hvd1JlcXVpcmVkPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ3VzdG9tIHZlcmlmaWNhdGlvbiwgdGhlIGZpbmFsIHJlc3VsdCB3aWxsIGJlIG1lcmdlZCB3aXRoIEFqdiB2ZXJpZmljYXRpb24gcmVzdWx0c1xuICAgKlxuICAgKiDoh6rlrprkuYnmoKHpqozvvIzmnIDlkI7nu5PmnpzkvJrkuI4gQWp2IOagoemqjOe7k+aenOi/m+ihjOWQiOW5tuaYvuekulxuICAgKi9cbiAgdmFsaWRhdG9yPzogKFxuICAgIHZhbHVlOiBTRlZhbHVlLFxuICAgIGZvcm1Qcm9wZXJ0eTogRm9ybVByb3BlcnR5LFxuICAgIGZvcm06IFByb3BlcnR5R3JvdXBcbiAgKSA9PiBFcnJvckRhdGFbXSB8IE9ic2VydmFibGU8RXJyb3JEYXRhW10+O1xuXG4gIC8qKlxuICAgKiBGb3JtIHN0YXR1cyB2YWx1ZSwgb25seSBzdXBwb3J0cyBgdGhpcy5zZi5nZXRQcm9wZXJ0eSgnL2RlcGFydG1lbnQnKT8udXBkYXRlRmVlZGJhY2soJ3ZhbGlkYXRpbmcnKWAgY2FsbGluZyBtZXRob2RcbiAgICpcbiAgICog6KGo5Y2V54q25oCB5YC877yM5Y+q5pSv5oyBIGB0aGlzLnNmLmdldFByb3BlcnR5KCcvZGVwYXJ0bWVudCcpPy51cGRhdGVGZWVkYmFjaygndmFsaWRhdGluZycpYCDosIPnlKjmlrnlvI9cbiAgICpcbiAgICogPiDms6jvvJroi6XpgYfliLDlh7rnjrDmoKHpqozml7blpLHnhKbvvIzlj6/lsJ3or5Xlj5bmtohcbiAgICovXG4gIGZlZWRiYWNrPzogTnpGb3JtQ29udHJvbFN0YXR1c1R5cGU7XG59XG4iXX0=