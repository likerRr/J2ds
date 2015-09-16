createPost = function () {
  var o = {};
  /*Свойства*/
  o.blurFrames = [];

  /*Функции*/
  o.sepia = _PE_sepia;
  o.invert = _PE_invert;
  o.setRotation = _PE_setRotation;
  o.flip = _PE_flip;
  o.lightness = _PE_lightness;
  o.motionBlur = _PE_motionBlur;
  o.blurBETA = _PE_blurBETA;
  o.alphaBlur = _PE_alphaBlur;
  o.mirror = _PE_mirror;

  return o;
};


_PE_mirror = function (_x, _y) {
  var img = scene.context.createPattern(scene.canvas, 'no-repeat');

  scene.clear();

  scene.context.save();
  scene.context.translate(scene.width / 2, scene.height / 2);
  scene.context.scale(_x ? -1 : 1, _y ? -1 : 1);
  scene.context.translate(-scene.width / 2, -scene.height / 2);
  scene.context.fillStyle = img;
  scene.context.fillRect(0, 0, scene.width, scene.height);

  scene.context.restore();
};


_PE_alphaBlur = function (_vol) {
  _vol = Math.ceil(_vol);
  this.blurFrames.push(scene.context.createPattern(scene.canvas, 'no-repeat'));

 if (this.blurFrames.length >= _vol) {
  this.blurFrames.shift();
 }

  scene.context.fillStyle = this.blurFrames[_vol];
  scene.context.globalAlpha = 1;

  var blurStep = 1 / _vol;

  for (var i = 0; i < _vol; i += 1) {
    if (this.blurFrames[i]) {
      var rX = j2ds.Math.random(2, 10);
      var rY = j2ds.Math.random(2, 10);
      scene.context.globalAlpha -= blurStep;
      scene.context.fillStyle = this.blurFrames[i];
      scene.context.fillRect(-rX, -rY, scene.width + rX * 2, scene.height + rY * 2);
    }
  }
};


_PE_motionBlur = function (_vol) {
  _vol = Math.ceil(_vol);
  this.blurFrames.push(scene.context.createPattern(scene.canvas, 'no-repeat'));

 if (this.blurFrames.length >= _vol) {
  this.blurFrames.shift();
 }

  scene.context.fillStyle = this.blurFrames[_vol];

  var blurStep = 1 / _vol;

  for (var i = _vol - 1; i >= 0; i -= 1) {
    if (this.blurFrames[i]) {
      scene.context.globalAlpha -= blurStep;
      scene.context.fillStyle = this.blurFrames[i];
      scene.context.fillRect(0, 0, scene.width, scene.height);
    }
  }
  scene.context.globalAlpha = 1;
};


_PE_lightness = function (_vol) {
  _vol = _vol || 10;
  var img = scene.context.getImageData(0, 0,
    scene.width,
    scene.height);
  var pixels = img.data;
  for (var i = 0, n = pixels.length; i < n; i += 4) {
    pixels[i] += _vol;
    pixels[i + 1] += _vol;
    pixels[i + 2] += _vol;
  }
  scene.context.putImageData(img, 0, 0);
};


_PE_blurBETA = function (_vol) {
  var img = scene.context.getImageData(0, 0, scene.width, scene.height),
    pixels = img.data,
    iSumRed,
    iSumGreen,
    iSumBlue,
    iSumOpacity,
    iCnt,
    aCloseData,
    iMW;

  for (var br = 0; br < _vol; br += 1) {
    for (var i = 0, n = pixels.length; i < n; i += 4) {
      iMW = 4 * scene.width;
      iSumOpacity = iSumRed = iSumGreen = iSumBlue = 0;
      iCnt = 0;
      aCloseData = [
        i - iMW - 4, i - iMW, i - iMW + 4,
        i - 4, i + 4,
        i + iMW - 4, i + iMW, i + iMW + 4
      ];

      for (var e = 0; e < aCloseData.length; e += 1) {
        if (aCloseData[e] >= 0 && aCloseData[e] <= pixels.length - 3) {
          iSumOpacity += pixels[aCloseData[e]];
          iSumRed += pixels[aCloseData[e] + 1];
          iSumGreen += pixels[aCloseData[e] + 2];
          iSumBlue += pixels[aCloseData[e] + 3];
          iCnt += 1;
        }
      }
      pixels[i] = (iSumOpacity / iCnt);
      pixels[i + 1] = (iSumRed / iCnt);
      pixels[i + 2] = (iSumGreen / iCnt);
      pixels[i + 3] = (iSumBlue / iCnt);
    }
  }


  scene.context.putImageData(img, 0, 0);
};


_PE_flip = function (_angle) {
  var img = scene.context.createPattern(scene.canvas, 'no-repeat');

  scene.clear();

  scene.context.fillStyle = img;
  scene.context.fillRect(scene.width, 0, -scene.width, scene.height);
};


_PE_setRotation = function (_angle) {
  var img = scene.context.createPattern(scene.canvas, 'no-repeat');

  scene.clear();

  scene.context.save();
  scene.context.translate(scene.width / 2, scene.height / 2);
  scene.context.rotate(rad(_angle));
  scene.context.translate(-scene.width / 2, -scene.height / 2);

  scene.context.fillStyle = img;
  scene.context.fillRect(0, 0, scene.width, scene.height);

  scene.context.restore();
};


_PE_invert = function () {
  var img = scene.context.getImageData(0, 0,
    scene.width,
    scene.height);
  var pixels = img.data;
  for (var i = 0, n = pixels.length; i < n; i += 4) {
    pixels[i] = 255 - pixels[i];
    pixels[i + 1] = 255 - pixels[i + 1];
    pixels[i + 2] = 255 - pixels[i + 2];
  }
  scene.context.putImageData(img, 0, 0);
};


_PE_sepia = function (_vol) {
  _vol = _vol || 0;
  var img = scene.context.getImageData(0, 0,
    scene.width,
    scene.height);
  var pixels = img.data;
  for (var i = 0; i < pixels.length; i += 4) {
    var r = pixels[i];
    var g = pixels[i + 1];
    var b = pixels[i + 2];
    pixels[i] = (r * 0.393) + (g * 0.769) + (b * 0.189) + _vol; // red
    pixels[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168) + _vol; // green
    pixels[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131) + _vol; // blue
  }
  scene.context.putImageData(img, 0, 0);
};











