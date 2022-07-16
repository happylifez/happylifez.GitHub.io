var contentParams = [
  {
    theme: "yeah",
    imgUrl: "img/yeah_01.jpg",
    imgUrl_final: "img/yeah_01.jpg",
    dialogStr: "WaYaaaaaaaaa!<br>多元宇宙最靓阿啾<br>生日快乐！！！",
    dialogType: "typing",
    dialogColor: "#8a2be2eb",
    fontColor: "#fff",
    bgColor: "#e6e7dbc9",
  },
  {
    theme: "Cheems",
    imgUrl: "img/Cheems.jpg",
    imgUrl_final: "img/BuffDoge.jpg",
    dialogStr: "1551...<br>这就是最Lucky锦鲤鲤大人吗？<br>好强大！",
    dialogType: "typing",
    dialogColor: "#8a2be2eb",
    fontColor: "#fff",
    bgColor: "#e6e7dbc9",
  },
  {
    theme: "popCat",
    imgUrl: "img/popCat1.jpg",
    imgUrl2: "img/popCat2.jpg",
    imgUrl_final: "img/popCatZ.jpg",
    dialogStr: "mew!Mew!Meeeew!<br>是谁比Pop Cat还可爱？<br>是阿啾！",
    dialogType: "typing",
    dialogColor: "#8a2be2eb",
    fontColor: "#fff",
    bgColor: "#e6e7dbc9",
  },
];

var nowContentType = 0;

document.addEventListener(
  tap,
  function (e) {
    changeMainContent(e);
  },
  false
);

var imgPlay = anime({
  targets: "#mainImg",
  keyframes: [{ translateY: 48 }],
  duration: 3000,
  direction: "alternate",
  easing: "easeInOutSine",
  loop: true,
});

// 点击触发此事件
function changeMainContent(e) {
  imgPlay.pause();
  var contentParam = contentParams[nowContentType];
  console.log("type" + nowContentType);
  console.log(contentParam);
  $("#mainImg").attr("src", contentParam.imgUrl);
  $("#dialogueContent").html("汪汪汪!");
  $("#dialogue").css("background-color", contentParam.dialogColor);
  $("#dialogue").css("color", contentParam.fontColor);
  $("#dialogue").css("box-shadow", "3px 3px 8px 0 " + contentParam.dialogColor);
  $("#dialogue::before").css(
    "border-color",
    "transparent " + contentParam.fontColor + " transparent transparent"
  );

  $("body").css("background-color", contentParam.bgColor);
  //执行说话方法
  window[contentParam.dialogType](contentParam);
}

var timer = 0;
var typelength = 0;
function typing() {
  let contentParam = contentParams[nowContentType];
  if (contentParam && contentParam.dialogStr) {
    var str = contentParam.dialogStr;

    if (typelength <= str.length) {
      //console.log(str.slice(0, typelength++) + "_");
      $("#dialogueContent").html(str.slice(0, typelength++) + "_");
      if (contentParam.theme == "popCat" && typelength % 3 == 1) {
        $("#mainImg").attr("src", contentParam.imgUrl2);
      } else {
        $("#mainImg").attr("src", contentParam.imgUrl);
      }
      timer = setTimeout("typing()", 80 + Math.random() * 130);
    } else {
      window.human = false;
      autoClick(); //继续自动点击
      $("#dialogueContent").html(str); //结束打字,移除 _ 光标
      clearTimeout(timer);
      typelength = 0;
      imgPlay.play();
      //最终图片
      if (contentParam.imgUrl_final) {
        $("#mainImg").attr("src", contentParam.imgUrl_final);
      }

      //循环计数器
      if (nowContentType < contentParams.length - 1) {
        nowContentType++;
      } else {
        nowContentType = 0;
      }
    }
  }
}

function doNothing(contentParam) {}
