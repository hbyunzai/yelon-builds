export interface YunzaiThemeHttpClientConfig {
    /**
     * 空值处理，默认：`include`
     * - include：包含
     * - ignore：忽略
     */
    nullValueHandling?: 'include' | 'ignore';
    /**
     * 时间值处理，默认：`timestamp`
     * - timestamp：时间戳毫秒级
     * - timestampSecond：时间戳秒级
     * - ignore：忽略处理，保持原始状态
     */
    dateValueHandling?: 'timestamp' | 'timestampSecond' | 'ignore';
}
