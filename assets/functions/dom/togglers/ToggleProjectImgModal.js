/**
 *
 *  This is used to toggle the project image modal
 *
 */

import DeclareStorageVariable from "../../data/storage/DeclareStorageVariable";

export default function ToggleProjectImgModal(e) {
  DeclareStorageVariable("session", "Modal Opened", true);

  document.body.style.pointerEvents = "none";
  document.body.style.overflowY = "hidden";

  document.getElementById("projectImgModalDarken").style.opacity = 1;
  document.getElementById("projectImgModalDarken").style.visibility = "visible";
  document.getElementById("projectImgModal").style.opacity = 1;
  document.getElementById("projectImgModal").style.visibility = "visible";

  const BACKGROUND_IMG = e.currentTarget.style.backgroundImage;
  const IMG_URL = BACKGROUND_IMG.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");

  setTimeout(() => {
    document
      .getElementById("projectImgModalImg")
      .setAttribute("data-src", IMG_URL);
    document.getElementById("projectImgModalImg").src = IMG_URL;
  }, 200);

  setTimeout(() => {
    document.getElementById("projectImgModalDarken").style.pointerEvents =
      "auto";

    document.getElementById("projectImgModal").style.overflowY = "auto";
    document.getElementById("projectImgModal").style.pointerEvents = "auto";
  }, 1200);
}
