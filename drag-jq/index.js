const img_arr = [];
// 文件上传
function uploadFile() {
  $("#file").click();
}

function upload(files) {
  const MAX_COUNT = 3;
  const IMG_COUNT = MAX_COUNT - img_arr.length;
  const additional_arr = [];
  const IMG_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (Array.prototype.some.call(files, function(file) {return !IMG_TYPES.includes(file.type)})) {
    layer.msg("图片格式不正确!!!")
    $("#file").val('');
    return;
  }

  if (files.length > IMG_COUNT) {
    layer.msg(`最多只能上传${MAX_COUNT}张图片!`)
    $("#file").val('');
    return;
  }

  Array.prototype.forEach.call(files, function(file, i, arr) {
    const fileReader = new FileReader();
    const sparkMD5 = new SparkMD5();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      console.log('event.target.result', event.target.result)
      const binary =  event.target.result;
      // 生成图片hash
      const hash = sparkMD5.appendBinary(binary).end();
      // 判断是否存在相同的图片
      if (!isExists(hash)) {
        additional_arr.push({
          hash,
          src: binary,
          file
        });
      } else {
        // 中断文件流
        fileReader.abort();
        layer.msg("请不要上传相同的图片!!!");
      }
    };
    fileReader.onloadend = (event) => {
      // 读取完成
      if (additional_arr.length === arr.length) {
        img_arr.push(...additional_arr);
        show(additional_arr); // 展示在展览区
        $("#file").val('');
      }
    }
  })
} 

// 判断是否有相同的图片
function isExists(hash) {
  return img_arr.some(function(item) {
    return item.hash === hash;
  })
}

// 文件change
function fileChange(that, event) {
  const files = event.target.files;
  upload(files);
}


/** 控制删除icon */
function imgMouseEnter(that) {
  $(that).find("span.del-icon").css('display', 'block');
};

function imgMouseLeave(that) {
  $(that).find("span.del-icon").css('display', 'none');
}


/** 展示图片 */
function show(additional_arr) {
  if (!additional_arr.length) {
    return;
  }

  const img_html = additional_arr.reduce(function(init, item) {
    init += `<span class="img-box" onmouseenter="imgMouseEnter(this);" onmouseleave="imgMouseLeave(this);">
      <span class="img-span"><img src="${item.src}" mode="widthFix" class="img-item" ondrag="imgDragOver(this, event);" ondragend="imgDragEnd(this, event);"/></span>
      <span class="del-icon" hash="${item.hash}" onclick="deleteImg(this)" style="display: none;"></span>
    </span>`
    return init;
  }, '');

  $(".show-area").append(img_html);
}

// 删除
function deleteImg(that) {
  const hash = $(that).attr("hash");
  const $imgBox = $(that).parents(".img-box");
  $imgBox.remove();
  img_arr.splice(img_arr.findIndex(function(item) {
    return item.hash === hash;
  }), 1);
}

// 获取元素位置
function getElementLeft(element){
　var actualLeft = element.offsetLeft;
　var current = element.offsetParent;

　while (current !== null){
　　　actualLeft += current.offsetLeft;
　　　current = current.offsetParent;
　}
　return actualLeft;
}

function getElementTop(element){
　var actualTop = element.offsetTop;
　var current = element.offsetParent;

　while (current !== null){
　　actualTop += current.offsetTop;
　　current = current.offsetParent;
　}
　return actualTop;　
}

/** =================== drag ================= */
function imgDrag(that, event) {
  var e = event || window.event;
  e.preventDefault()
  e.stopPropagation()
}

function dragUpload(that, event) {
  var e = event || window.event;
  e.preventDefault()
  e.stopPropagation()
  const files = e.dataTransfer.files;
  upload(files);
}

// 拖拽删除
function imgDragEnd(that, event) {
  const hash = $(that).attr("hash");
  const $showArea = $(".show-area");
  const $imgBox = $(that).parents(".img-box");
  const width = $showArea[0].clientWidth;
  const height = $showArea[0].clientHeight;
  const origin = {
    x: getElementLeft($showArea[0]),
    y: getElementTop($showArea[0])
  };

  const target = {
    x: event.clientX,
    y: event.clientY
  }

  if (target.x - origin.x > width || target.x < origin.x || target.y - origin.y > height || target.y < origin.y) {
    $imgBox.remove();
    img_arr.splice(img_arr.findIndex(function(item) {
      return item.hash === hash;
    }), 1);
  }
  $showArea.css("border", "1px dashed #c3c3c3")
  console.log(width, height, origin, target)
}

function imgDragOver(that, event) {
  console.log('start', event)
  const $showArea = $(that).parents(".show-area");
  $showArea.css("border", "1px solid #0065ff")
}


/** 赋值粘贴上传 */
function handleMouseEnter(that) {
  $(that).focus();
}

function handleMouseLeave(that) {
  $(that).blur();
}

function pasteUpload(that, event) {
  var e = event || window.event;
  e.preventDefault()
  e.stopPropagation()
  var files = e.clipboardData.files;
  upload(files);
}