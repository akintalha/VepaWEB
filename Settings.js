var MSQLConfig = {
    user: 'sa',
    password: 'v1e2p3a4!!',
    server: '80.93.220.121\\SQLEXPRESS',
    database: 'BranchPanels'
};

module.exports.CDNPORT=1881;
module.exports.imgpath="../../../VEPATEKCDN/public/CMS/Admin/wwwroot/images";
module.exports.GorselYonetim="../../../VEPATEKCDN/public/CMS/Admin/wwwroot/images/GorselYönetim";
module.exports.TiyatromFiles="../Vepatek.com/CDN/Tiyatrom/assets/files";

module.exports.MSQLConfig = MSQLConfig;
module.exports.hbsextension = "vepa";
module.exports._Port = 3162;
module.exports.sourceAjaxUrl = "http://80.93.220.120:" + module.exports._Port + "/";
module.exports.imagesUrl ="http://80.93.220.120:" + module.exports.CDNPORT + "/CMS/Admin/";
module.exports.targetAjaxurl = "http://80.93.220.120:" + module.exports._Port + "/";