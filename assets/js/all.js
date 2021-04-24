
$(document).ready(function () {

  // sideBar - toggle - jQ
    $('.js-navToggler').click(function (e) {
        e.preventDefault();
        $('.js-navToggler').toggleClass('active');
        $('.nav__menu').toggleClass('active');
        $('.layout__side').toggleClass('active');
    });

    // mouse - js
    // const cursor = document.querySelector('.mouse');
    // const setCursorPos = (e) => {
    //   const { pageX: posX, pageY: posY } = e;
    //   cursor.style.top = `${posY - (cursor.offsetHeight / 2)}px`;
    //   cursor.style.left = `${posX - (cursor.offsetWidth / 2)}px`;

    //   // console.log(e.target.getAttribute('class'));
    //   if(e.target.nodeName.match('A') || e.target.getAttribute('class') === 'goTop' || e.target.getAttribute('class') === 'sharp' || e.target.getAttribute('class') === 'round') {
    //     cursor.style.width = '80px';
    //     cursor.style.height = '80px';
    //     cursor.style.mixBlendMode = 'hard-light';
    //   } else {
    //     cursor.style.width = '55px';
    //     cursor.style.height = '55px';
    //     cursor.style.mixBlendMode = 'normal';
    //   }
    // };
    // document.addEventListener('mousemove', setCursorPos);

    
    // $('document').mousemove(function (e) {
    //   const { pageX: posX, pageY: posY } = e;
    //   $('.mouse').css('top', `${posY - ($('.mouse').offsetHeight / 2)}px`);
    //   $('.mouse').css('left', `${posX - ($('.mouse').offsetWidth / 2)}px`);

    //   if(e.target.nodeName.match('A') || e.target.getAttribute('class') === 'goTop' || e.target.getAttribute('class') === 'sharp' || e.target.getAttribute('class') === 'round') {
    //     cursor.style.width = '80px';
    //     cursor.style.height = '80px';
    //     cursor.style.mixBlendMode = 'hard-light';
    //   } else {
    //     cursor.style.width = '55px';
    //     cursor.style.height = '55px';
    //     cursor.style.mixBlendMode = 'normal';
    //   }
    // });


      $(window).resize(function(){

        // 00 下方文字 .content__subtitle 調整
        if ($(window).height() >= 930) {
          $(".content__subtitle").css('opacity', '1');
        } else {
          $(".content__subtitle").css('opacity', '0');
        }

        // nav 載入動畫
        if ($(window).width() >= 992) {
          navMoveDesktop();
        }
        
        // 眼睛動畫
        if ($(window).width() >= 768) {
          eyesMoveDesktop();
        } else {
          eyesMoveMobile();
        }
      }).resize();
});



$(document).ready(function () {
// 換頁


const $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
let $section = $('section');

var numOfPages = $section.length - 1; //取得section的數量
let curPage = 0; //初始頁
let scrollLock = false;
// mousewheel DOMMouseScroll

function scrollPage() {

  // 監聽滑鼠滑動事件
  function wheelMoveHandler(e) {
    if (scrollLock) {return};
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      navigateUp();
    } else {
      navigateDown();
    }
  };
  $(document).on("mousewheel", wheelMoveHandler);
  


// 監聽手指 touch 事件
if("ontouchstart" in window){
  alert("YES111");

  let startY;

  function touchStart(e) {
    startY = e.touches[0].pageY;
  };

  function touchMoveHandler(e) {
    let moveEndY = e.changedTouches[0].pageY;
    let Y = moveEndY - startY;
    // console.log(startY,moveEndY,Y);
    // console.log(curPage);
    if ( Y > 0 ) {
        navigateUp();
    } else if ( Y < 0 ) {
        navigateDown();
    }
  };
  document.addEventListener('touchstart', touchStart);
  document.addEventListener('touchmove', touchMoveHandler);
}

  // 監聽鍵盤上下鍵
  $(document).on("keydown", function(e) {
    if (scrollLock) {
      return;
    }
    if (e.which === 38) {
      navigateUp();
    }
    else if (e.which === 40) {
      navigateDown();
    }
  });
}

// 監聽點擊 goTop
$('.goTop').click(function (e) {
  navigateUp();
});

function pagination() {
  scrollLock = true;
  $body.stop().animate({
    scrollTop: $section.eq(curPage).offset().top
  }, 1000, 'swing', function(){
    scrollLock = false;
  });
};

// 整頁往上移動
function navigateUp () {
  if (curPage === 0) {
    return;
  }
  curPage--;
  pagination();
};

// 整頁往下移動
function navigateDown() {
  if (curPage === numOfPages) return;
  curPage++;
  pagination();
};

// 頁面滑動
$(function() {
  scrollPage();
});
});


// const blobCursor = (() => {  
//     const cursor = document.querySelector('.mouse');
//     // const cursorBack = document.querySelector('.mouseBack');
//     // const LINKS = document.querySelectorAll('.nav__link');
//     const setCursorPos = (e) => {
//       const { pageX: posX, pageY: posY } = e;
//       cursor.style.top = `${posY - (cursor.offsetHeight / 2)}px`;
//       cursor.style.left = `${posX - (cursor.offsetWidth / 2)}px`;

      
//       if(e.target.nodeName.match('A') || e.target.getAttribute('class') === 'goTop') {
//         cursor.style.width = '80px';
//         cursor.style.height = '80px';
//         cursor.style.mixBlendMode = 'hard-light';
//       } else {
//         cursor.style.width = '55px';
//         cursor.style.height = '55px';
//         cursor.style.mixBlendMode = 'normal';
//       }
//     };
//     document.addEventListener('mousemove', setCursorPos);
    
//     // const setCursorHover = () => CURSOR.style.transform = 'scale(2.5)';
//     // const removeCursorHover = () => CURSOR.style.transform = '';
//     // LINKS.forEach(link => link.addEventListener('mouseover', setCursorHover));
//     // LINKS.forEach(link => link.addEventListener('mouseleave', removeCursorHover));
    
//   })();


// $(document).ready(function () {
//   $('.js-sharp-body').click(function (e) {
//       $('.js-sharp-body').addClass('animate__zoomInDown');
//   });
// });


/* Anime */
// 載入動畫

// 數字
anime({
  targets: '.content__num',
  translateX: ['100%', '0'],
  opacity: [0, 1],
  loop: 1,
  duration: 500,
  easing: 'linear'
});



function navMoveDesktop() {
    // nav
    anime({
      targets: '.nav',
      translateX: ['-100%', '0'],
      opacity: [0, 1],
      loop: 1,
      duration: 500,
      easing: 'linear'
    });
  
    // nav link
    anime({
      targets: '.nav__menu__link',
      translateY: ['-50%', '0'],
      opacity: [0, 1],
      loop: 1,
      duration: 200,
      delay: 1000,
      // delay: (el, i) => 300 + 25 * i,
      easing: 'linear'
    });
  
    // side
    anime({
      targets: '.layout__side',
      translateY: ['-100%', '0'],
      opacity: [0, 1],
      loop: 1,
      duration: 500,
      easing: 'linear'
    });
    anime({
      targets: '.layout__side__text',
      rotate: [-90 ,-90],
      translateY: ['-50%', '0'],
      opacity: [0, 1],
      loop: 1,
      duration: 200,
      delay: 1000,
      easing: 'linear'
    });
}


// logo
anime({
  targets: '.logo span',
  translateY: ['-50%', '0'],
  opacity: [0, 1],
  loop: 1,
  duration: 200,
  delay: 1000,
  easing: 'linear'
});



// 標題框線
anime({
  targets: ['.content__title--lineTop', '.content__title--lineBottom'],
  width: ['0', '15%'],
  loop: 1,
  duration: 500,
  delay: 700,
  easing: 'linear'
});

anime({
  targets: ['.content__title--lineRight', '.content__title--lineLeft'],
  height: ['0', '50%'],
  loop: 1,
  duration: 500,
  delay: 500,
  easing: 'linear'
});

anime({
  targets: '.content__title h3',
  translateX: ['-10%', '0'],
  opacity: [0, 1],
  loop: 1,
  duration: 500,
  delay: 650,
  easing: 'linear'
});


// goTop
anime({
  targets: '.goTop',
  translateY: ['100%', '0'],
  opacity: [0, 1],
  loop: 1,
  duration: 600,
  delay: 600,
  easing: 'linear'
});

// 底部文字
anime({
  targets: '.content__subtitle',
  opacity: [0, 1],
  loop: 1,
  duration: 600,
  delay: 1000,
  easing: 'linear'
});

// monster
anime({
  targets: ['.monster__sharp', '.monster__round'],
  opacity: [0, 1],
  loop: 1,
  duration: 800,
  delay: 1000,
  easing: 'linear'
});

// monster text
anime({
  targets: '.js-content-text img',
  translateY: ['100%', '0'],
  opacity: [0, 1],
  loop: 1,
  duration: 400,
  delay: 1200,
  easing: 'easeInOutQuad'
});
anime({
  targets: '.js-content-text h2',
  translateY: ['100%', '0'],
  opacity: [0, 1],
  loop: 1,
  duration: 400,
  delay: 1200,
  easing: 'easeInOutQuad'
});
anime({
  targets: '.js-content-sub',
  translateY: ['100%', '0'],
  opacity: [0, 1],
  loop: 1,
  duration: 400,
  delay: 1500,
  easing: 'easeInOutQuad'
});


// 畫面動態
// monster body
anime({
  targets: ['.monster__sharp', '.monster__round'],
  translateY: [0, 15],
  loop: true,
  duration: 800,
  direction: 'alternate',
  easing: 'linear'
});

// monster eyes
function eyesMoveDesktop() {
  anime.timeline({
    targets: ['.monster__eyeLeft--white', '.monster__eyeRight--white'],
    loop: true,
    easing: "easeOutExpo"
  })
  .add({
    translateX: [
      { value: 25, delay: 800 },
      { value: 0, delay: 600 }
    ],
    duration: 3000
  })
  .add({
    height: ['53px', '0'],
    opacity: [1, 0],
    duration: 50
  })
  .add({
    height: ['53px', '0'],
    opacity: [1, 0],
    delay: 350,
    duration: 80
  });
  
  anime.timeline({
    targets: ['.monster__eyeLeft--black', '.monster__eyeRight--black'],
    loop: true,
    easing: "easeOutExpo"
  })
  .add({
    translateX: [
      { value: 33, delay: 800 },
      { value: 0, delay: 600 }
    ],
    duration: 3000
  })
  .add({
    height: ['48px', '0'],
    opacity: [1, 0],
    duration: 50
  })
  .add({
    height: ['48px', '0'],
    opacity: [1, 0],
    delay: 350,
    duration: 80
  });
}

function eyesMoveMobile() {
anime.timeline({
    targets: ['.monster__eyeLeft--white', '.monster__eyeRight--white'],
    loop: true,
    easing: "easeOutExpo"
  })
  .add({
    translateX: [
      { value: 16, delay: 800 },
      { value: 0, delay: 100 }
    ],
    duration: 3000
  })
  .add({
    height: ['36px', '0'],
    opacity: [1, 0],
    duration: 50
  })
  .add({
    height: ['36px', '0'],
    opacity: [1, 0],
    delay: 350,
    duration: 80
  });
  
  anime.timeline({
    targets: ['.monster__eyeLeft--black', '.monster__eyeRight--black'],
    loop: true,
    easing: "easeOutExpo"
  })
  .add({
    translateX: [
      { value: 22, delay: 800 },
      { value: 0, delay: 100 }
    ],
    duration: 3000
  })
  .add({
    height: ['32px', '0'],
    opacity: [1, 0],
    duration: 50
  })
  .add({
    height: ['32px', '0'],
    opacity: [1, 0],
    delay: 350,
    duration: 80
  });
}










// let animation = anime.timeline({
//     loop: true
// })
// .add({
//     targets: '.js-sharp',
//     // scale: [0, 1],
//     translateY: [0, -5, 0 -5],
//     duration: 1500,
//     easing: "easeOutExpo",
//     // elasticity: 600
// });

// anime({
//   targets: '.js-sharp',
//   points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
//   baseFrequency: 0,
//   scale: 1,
//   loop: true,
//   direction: 'alternate',
//   easing: 'easeInOutExpo'
// });


// anime({
//   targets: '.js-sharp',
//   translateX: [
//     { value: 250, duration: 1000, delay: 500 },
//     { value: 0, duration: 1000, delay: 500 }
//   ],
//   translateY: [
//     { value: -40, duration: 500 },
//     { value: 40, duration: 500, delay: 1000 },
//     { value: 0, duration: 500, delay: 1000 }
//   ],
//   easing: 'easeOutElastic(1, .8)',
//   loop: true
// });


// let animation = anime.timeline({
//     loop: true
// })
// .add({
//     targets: '.js-sharp-body',
//     // translateY: [0, 30, 0, 30],
//     // translateX: [0, 0 ,-30],
//     rotate: [15, 0],
//     scale: [0, 1],
//     duration: 1500,
//     elasticity: 600
// }).add({
//     targets: '.js-sharp-body',
//     opacity: 0,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 1000
//   });

  // 載入 AOS
//   AOS.init({
//     // easing: 'ease',
//     duration: 800,
//     delay: 200,
//     once: false
// });