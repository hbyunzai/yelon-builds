"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LANGS_CONFIG = void 0;
exports.getLangConfig = getLangConfig;
exports.getLangData = getLangData;
const fs = require("fs");
const path = require("path");
exports.LANGS_CONFIG = [
    {
        langs: ['zh-Hans', 'zh-cn', 'zh-Hans-CN', 'zh'],
        zorro: 'zh_CN',
        date: 'zhCN',
        yelon: 'zh_CN',
        fileName: 'zh-CN.json'
    },
    {
        langs: ['zh-Hant', 'zh-tw', 'zh-Hant-TW'],
        zorro: 'zh_TW',
        date: 'zhTW',
        yelon: 'zh_TW',
        fileName: 'zh-TW.json'
    },
    { langs: ['en'], zorro: 'en_US', date: 'enUS', yelon: 'en_US', fileName: 'en-US.json' },
    { langs: ['tr'], zorro: 'tr_TR', date: 'tr', yelon: 'tr_TR', fileName: 'tr-TR.json' },
    { langs: ['pl'], zorro: 'pl_PL', date: 'pl', yelon: 'pl_PL', fileName: 'pl-PL.json' },
    { langs: ['el'], zorro: 'el_GR', date: 'el', yelon: 'el_GR', fileName: 'el-GR.json' },
    { langs: ['ko'], zorro: 'ko_KR', date: 'ko', yelon: 'ko_KR', fileName: 'ko-KR.json' },
    { langs: ['hr'], zorro: 'hr_HR', date: 'hr', yelon: 'hr_HR', fileName: 'hr-HR.json' },
    { langs: ['ja'], zorro: 'ja_JP', date: 'ja', yelon: 'ja_JP' },
    { langs: ['sl'], zorro: 'sl_SI', date: 'sl', yelon: 'sl_SI', fileName: 'sl-SI.json' },
    { langs: ['fr'], zorro: 'fr_FR', date: 'fr', yelon: 'fr_FR', fileName: 'fr-FR.json' },
    { langs: ['es'], zorro: 'es_ES', date: 'es', yelon: 'es_ES', fileName: 'es-ES.json' },
    { langs: ['it'], zorro: 'it_IT', date: 'it', yelon: 'it_IT', fileName: 'it-IT.json' },
    { langs: ['vi'], zorro: 'vi_VI', date: 'vi', yelon: 'vi_VI', fileName: 'vi_VI.json' },
    { langs: ['ar'], zorro: 'ar_EG', date: 'ar', yelon: 'ar_SA', fileName: 'ar-SA.json' }
];
function getLangConfig(lang) {
    return exports.LANGS_CONFIG.find(w => w.langs.includes(lang));
}
function getLangData(lang) {
    let langCog = getLangConfig(lang);
    if (!langCog || !langCog.fileName) {
        langCog = getLangConfig('zh');
    }
    const langFilePath = path.join(__dirname, `../application/files/i18n/${langCog.fileName}`);
    if (!fs.existsSync(langFilePath)) {
        console.log(`No found language files`);
        return null;
    }
    return JSON.parse(fs.readFileSync(langFilePath).toString('utf8')) || null;
}
//# sourceMappingURL=lang.config.js.map