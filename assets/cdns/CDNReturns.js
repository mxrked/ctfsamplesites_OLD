/**
 *
 *  This is used to return/get a url for a medias
 *
 */

const SERVER =
  "https://raw.githubusercontent.com/mxrked/freelance_projects_CDN/main/ctfsamplesites_CDN/";

function CDNBGReturn(siteSub, bgSub, bgSubFile, fileExt) {
  let bgSrc;

  if (siteSub) {
    if (bgSub) {
      if (bgSubFile) {
        if (fileExt) {
          bgSrc =
            SERVER + siteSub + "bg/" + bgSub + "/" + bgSubFile + "." + fileExt;
        }
      }
    }
  }

  return bgSrc;
}

function CDNIconReturn(siteSub, iconSub, iconSubFile, fileExt) {
  let iconSrc;

  if (siteSub) {
    if (iconSub) {
      if (iconSubFile) {
        if (fileExt) {
          iconSrc =
            SERVER +
            siteSub +
            "icons/" +
            iconSub +
            "/" +
            iconSubFile +
            "." +
            fileExt;
        }
      }
    }
  }

  return iconSrc;
}

function CDNVideoReturn(siteSub, videoSub, videoSubFile, fileExt) {
  let videoSrc;

  if (siteSub) {
    if (videoSub) {
      if (videoSubFile) {
        if (fileExt) {
          videoSrc =
            SERVER +
            siteSub +
            "videos/" +
            videoSub +
            "/" +
            videoSubFile +
            "." +
            fileExt;
        }
      }
    }
  }

  return videoSrc;
}

function CDNImgReturn(siteSub, imgSub, imgSubFile, fileExt) {
  let imgSrc;

  if (siteSub) {
    if (imgSub) {
      if (imgSubFile) {
        if (fileExt) {
          imgSrc =
            SERVER +
            siteSub +
            "imgs/" +
            imgSub +
            "/" +
            imgSubFile +
            "." +
            fileExt;
        }
      }
    }
  }

  return imgSrc;
}

function CDNFileReturn(siteSub, fileSub, fileSubFile, fileExt) {
  let fileSrc;

  if (siteSub) {
    if (fileSub) {
      if (fileSubFile) {
        if (fileExt) {
          fileSrc =
            SERVER +
            siteSub +
            "files/" +
            fileSub +
            "/" +
            fileSubFile +
            "." +
            fileExt;
        }
      }
    }
  }

  return fileSrc;
}

export {
  CDNBGReturn,
  CDNIconReturn,
  CDNVideoReturn,
  CDNImgReturn,
  CDNFileReturn,
};
