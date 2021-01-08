import Vue from 'vue';
import * as AliMedia from '@/api/aliMedia';

/**
 * AliVod上传
 * @param [region]
 * @param [userId]
 * @return {AliUploader}
 * @constructor
 */
function AliUploader(region, userId = process.env.VUE_APP_ALI_VOD_USER_ID) {
  this.region = region;
  this.userId = userId;
  this.emitter = new Vue();
  this.options = {};
  this._init();
  return this;
}

AliUploader.prototype.setPolicyType = function (policyType) {
  this.policyType = policyType;
};

AliUploader.prototype._init = function () {
  /**
   * @type {AliUploader}
   */
  let self = this;
  let emitter = this.emitter;
  /**
   * @type {AliyunUpload.Vod}
   */
  let uploader = new AliyunUpload.Vod({
    timeout: 60000,
    partSize: 1048576,
    parallel: 5,
    retryCount: 3,
    retryDuration: 2,
    region: self.region,
    userId: self.userId,
    // 添加文件成功
    addFileSuccess: self.addFileSuccess.bind(this),
    // 开始上传
    onUploadstarted: self.onUploadstarted.bind(this),
    // 文件上传成功
    onUploadSucceed: self.onUploadSucceed.bind(this),
    // 文件上传失败
    onUploadFailed: self.onUploadFailed.bind(this),
    // 取消文件上传
    onUploadCanceled: self.onUploadCanceled.bind(this),
    // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
    onUploadProgress: self.onUploadProgress.bind(this),
    // 上传凭证超时
    onUploadTokenExpired: self.onUploadTokenExpired.bind(this),
    // 全部文件上传结束
    onUploadEnd: self.onUploadEnd.bind(this),
  });
  /**
   * @type {AliyunUpload.Vod}
   */
  this.uploader = uploader;
};

/**
 * 获取当前的事件触发器
 * @return {Vue}
 */
AliUploader.prototype.getEmitter = function () {
  return this.emitter;
};

AliUploader.prototype.addFileSuccess = function (uploadInfo) {
  /**
   * @type {AliyunUpload.Vod}
   */
  let uploader = this.uploader;
  /**
   * @type {Vue}
   */
  let emitter = this.emitter;
  console.log("addFileSuccess: " + uploadInfo.file.name);
  emitter.$emit('addFile', uploadInfo);
};

AliUploader.prototype.onUploadstarted = function (uploadInfo) {
  /**
   * @type {AliyunUpload.Vod}
   */
  let uploader = this.uploader;
  /**
   * @type {Vue}
   */
  let emitter = this.emitter;
  // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
  // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
  // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
  // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
  // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
  // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
  if (!uploadInfo.videoId) {
    AliMedia.policy(uploadInfo.file.name.slice(uploadInfo.file.name.lastIndexOf('.') + 1), this.policyType).then((policy) => {
      let uploadAuth = policy.uploadAuth;
      let uploadAddress = policy.uploadAddress;
      let videoId = policy.videoId;
      uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId);
      emitter.$emit('policy', uploadInfo, policy);
    });
    console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
    emitter.$emit('started', uploadInfo);
  } else {
    // 如果videoId有值，根据videoId刷新上传凭证
    AliMedia.refreshPolicy(uploadInfo.videoId).then((policy) => {
      let uploadAuth = policy.uploadAuth;
      let uploadAddress = policy.uploadAddress;
      let videoId = policy.videoId;
      uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId);
      emitter.$emit('refreshPolicy', uploadInfo);
    });
  }
};

/**
 * 上传单个文件成功
 * @param uploadInfo
 */
AliUploader.prototype.onUploadSucceed = function (uploadInfo) {
  /**
   * @type {AliyunUpload.Vod}
   */
  let uploader = this.uploader;
  /**
   * @type {Vue}
   */
  let emitter = this.emitter;
  console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
  emitter.$emit('succeed', uploadInfo);
};
/**
 * 上传单个文件失败
 * @param uploadInfo
 * @param code
 * @param message
 */
AliUploader.prototype.onUploadFailed = function (uploadInfo, code, message) {
  /**
   * @type {AliyunUpload.Vod}
   */
  let uploader = this.uploader;
  /**
   * @type {Vue}
   */
  let emitter = this.emitter;
  console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
  emitter.$emit('failed', uploadInfo, code, message);
};
/**
 * 取消单个上传文件
 * @param uploadInfo
 * @param code
 * @param message
 */
AliUploader.prototype.onUploadCanceled = function (uploadInfo, code, message) {
  /**
   * @type {AliyunUpload.Vod}
   */
  let uploader = this.uploader;
  /**
   * @type {Vue}
   */
  let emitter = this.emitter;
  console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message);
  emitter.$emit('canceled', uploadInfo, code, message);
};
/**
 * 当前上传文件上传进度
 * @param uploadInfo
 * @param totalSize
 * @param progress
 */
AliUploader.prototype.onUploadProgress = function (uploadInfo, totalSize, progress) {
  /**
   * @type {AliyunUpload.Vod}
   */
  let uploader = this.uploader;
  /**
   * @type {Vue}
   */
  let emitter = this.emitter;
  console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%");
  emitter.$emit('progress', uploadInfo, totalSize, Math.ceil(progress * 100));
};
/**
 * 上传凭证超时
 * @param uploadInfo
 */
AliUploader.prototype.onUploadTokenExpired = function (uploadInfo) {
  /**
   * @type {AliyunUpload.Vod}
   */
  let uploader = this.uploader;
  /**
   * @type {Vue}
   */
  let emitter = this.emitter;
  AliMedia.refreshPolicy(uploadInfo.videoId).then((uploadAuth) => {
    uploader.resumeUploadWithAuth(uploadAuth);
    emitter.$emit('refreshToken', uploadInfo, uploadAuth);
  }).catch((...args) => {
    emitter.$emit('refreshTokenFail', args);
  });
  emitter.$emit('tokenExpired', uploadInfo);
};
/**
 * 全部文件上传结束
 * @param uploadInfo
 */
AliUploader.prototype.onUploadEnd = function (uploadInfo) {
  /**
   * @type {AliyunUpload.Vod}
   */
  let uploader = this.uploader;
  /**
   * @type {Vue}
   */
  let emitter = this.emitter;
  emitter.$emit('uploaded', uploadInfo);
  console.log("onUploadEnd: uploaded all the files");
};
/**
 * 开始上传
 */
AliUploader.prototype.startUpload = function () {
  if (this.uploader !== null) {
    this.uploader.startUpload();
  }
};
/**
 * 暂停上传
 */
AliUploader.prototype.stopUpload = function () {
  if (this.uploader !== null) {
    this.uploader.stopUpload();
  }
};
/**
 * 恢复上传
 */
AliUploader.prototype.resumeUpload = function () {
  if (this.uploader !== null) {
    this.uploader.startUpload();
  }
};
/**
 * 添加文件
 * @param {File} file
 */
AliUploader.prototype.addFile = function (file) {
  let userData = '{"Vod":{}}';
  this.uploader.addFile(file, null, null, null, userData);
};
/**
 * 删除上传文件
 * @param {Array} files
 */
AliUploader.prototype.addFiles = function (files) {
  files.every((item) => {
    this.addFile(item);
  });
};
/**
 * 添加多个文件
 * @param {Number} index
 */
AliUploader.prototype.deleteFile = function (index) {
  this.uploader.deleteFile(index);
};
/**
 * 取消单个文件上传
 * @param {Number} index
 */
AliUploader.prototype.cancelFile = function (index) {
  this.uploader.cancelFile(index);
};
/**
 * 取消单个文件上传
 * @param {Number} index
 */
AliUploader.prototype.resumeFile = function (index) {
  this.uploader.resumeFile(index);
};
/**
 * 清理上传文件列表
 */
AliUploader.prototype.cleanList = function () {
  this.uploader.cleanList();
};
/**
 * 获取断点信息
 * @param {File} file
 */
AliUploader.prototype.getCheckpoint = function (file) {
  this.uploader.getCheckpoint(file);
};

export function getInstance() {
  return new AliUploader();
}