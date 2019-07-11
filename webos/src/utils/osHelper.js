/*
 * @Author: guk 
 * @Date: 2019-07-10 08:46:58 
 * @Last Modified by: guk
 * @Last Modified time: 2019-07-10 08:47:44
 * 桌面相关的公共应用方法
 */

export function fullScreen() {
    // 全屏
    let docElm = document.documentElement;
    // _t.isFullscreen = true;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    }
}

export function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

export function isFullScreen() {
    return (
      document.fullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      false
    );
  }