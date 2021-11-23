import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';

// import partImg from './partImg.jpg';

/** 接口返回的图片坐标是相对于原图左上角的定位 */
const imgInfo = {
  lableBottom: '492',
  lableLeft: '342',
  lableRight: '353',
  lableTop: '470',
  position: '03',
  src: 'https://parts-images.cassmall.com/bmw_test/322664.jpg?version=16'
};

const WIDTH = 466;
const HEIGHT = 326;
const SCALE = 0.2;
//
const DynamicStyle = () => {
  const imgRef = React.createRef<HTMLImageElement>();
  /** 初始化缩放比例，默认为1 */
  const [rate, setRate] = useState(1);
  /** 图片样式 */
  const [imgStyle, setImgStyle] = useState<React.CSSProperties>({});
  /** 记录鼠标是否按下 */
  const [mouseDowmFlag, setMouseDowmFlag] = useState(false);
  /** 记录鼠标按下的坐标 */
  const [mouseDowmPos, setMouseDowmPos] = useState<{x: number, y: number}>({ x: 0, y: 0 });
  /** 图片原始大小，默认设置为1是防止计算图片原始大小与初始大小比例出现无穷大 */
  const [natural, setNatural] = useState<{width: number, height: number}>({ width: 1, height: 1 });
  /** 图片现在大小 */
  const [initial, setInitial] = useState<{width: number, height: number}>({ width: WIDTH, height: HEIGHT });

  useEffect(() => {
    const { naturalWidth, naturalHeight, width, height } = imgRef.current as HTMLImageElement;
    setNatural({ width: naturalWidth, height: naturalHeight });
    setInitial({ width, height });
  }, [imgRef]);

  useEffect(() => {
    document.onmouseover = () => {
      if (mouseDowmFlag) {
        setMouseDowmFlag(false);
      }
    };
    return () => {
      document.onmouseover = null;
    };
  }, [mouseDowmFlag]);

  /** 缩放 */
  const handleWheelImage = (event: React.WheelEvent<HTMLImageElement>) => {
    // 向上为负，向下为正
    const bigger = event.deltaY > 0 ? -1 : 1;
    // transform偏移量
    const transformX = -initial.width / 2;
    const transformY = -initial.height / 2;
    if (bigger > 0 && rate < 2) {
      const enlargeRate = rate + SCALE;
      setImgStyle({
        ...imgStyle,
        transform: `matrix(${enlargeRate}, 0, 0, ${enlargeRate}, ${transformX}, ${transformY})` // 默认以图片中心为原点进行缩放
      });
      setRate(enlargeRate);
    } else if (bigger < 0 && rate > 1) {
      const shrinkRate = rate - SCALE;
      setImgStyle({
        ...imgStyle,
        transform: `matrix(${shrinkRate}, 0, 0, ${shrinkRate}, ${transformX}, ${transformY})`
      });
      setRate(shrinkRate);
    }
  };

  /** 平移 */
  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = event;
    event.stopPropagation();
    event.preventDefault(); // 阻止浏览器默认行为，拖动会打开图片
    setMouseDowmFlag(true); // 控制只有在鼠标按下后才会执行mousemove
    setMouseDowmPos({
      x: clientX,
      y: clientY
    });
  };
  //
  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const { clientX, clientY } = event;
    const diffX = clientX - mouseDowmPos.x;
    const diffY = clientY - mouseDowmPos.y;
    if (!mouseDowmFlag || (diffX === 0 && diffY === 0)) return;
    const { offsetLeft, offsetTop } = imgRef.current as HTMLImageElement;
    const offsetX = parseInt(`${diffX + offsetLeft}`, 10);
    const offsetY = parseInt(`${diffY + offsetTop}`, 10);

    setMouseDowmPos({
      x: clientX,
      y: clientY
    });
    setImgStyle({
      ...imgStyle,
      left: offsetX,
      top: offsetY
    });
  };
  //
  const handleMouseUp = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setMouseDowmFlag(false);
  };

  // 初始图片缩放比例（图片有原始的图片大小）
  const imgScaleRateX = initial.width / natural.width;
  const imgScaleRateY = initial.height / natural.height;
  //
  const labelTransformOrigin = () => {
    return `${initial.width / 2 - Number(imgInfo.lableLeft) * imgScaleRateX}px ${
      initial.height / 2 - Number(imgInfo.lableTop) * imgScaleRateY
    }px`;
  };

  /** 图标位置计算 */
  const labelStyle = (): React.CSSProperties => {
    const transformX = -initial.width / 2;
    const transformY = -initial.height / 2;
    // 距离微调
    const distanceAdjust = (22 * rate) / 2;
    const labelLeft = parseInt(`${imgInfo.lableLeft}`, 10) * imgScaleRateX + Number(imgStyle.left || WIDTH / 2) - distanceAdjust;
    const labelTop = parseInt(`${imgInfo.lableTop}`, 10) * imgScaleRateY + Number(imgStyle.top || HEIGHT / 2) - distanceAdjust;
    return {
      left: labelLeft,
      top: labelTop,
      transformOrigin: labelTransformOrigin(),
      transform: `matrix(${rate}, 0, 0, ${rate}, ${transformX}, ${transformY})`
    };
  };

  return (
    <div className={styles.imgArea}>
      <img
        src={imgInfo.src}
        alt='part'
        height={326}
        style={imgStyle}
        ref={imgRef}
        onWheel={handleWheelImage}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
      </img>
      <span className={styles.label} style={labelStyle()}></span>
    </div>
  );
};

export default DynamicStyle;
