$(document).ready(function () {

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


  // $('.mask').mousemove(function (e) {
  //   console.log(e.target);
  //   $('.mouse').css('top', `${e.pageY - ($('.mouse').height() / 2)}px`);
  //   $('.mouse').css('left', `${e.pageX - ($('.mouse').width() / 2)}px`);
  //   if(e.target.nodeName.match('A') || e.target.getAttribute('class') === 'goTop' || e.target.getAttribute('class') === 'sharp' || e.target.getAttribute('class') === 'round') {
  //     $('.mouse').css('width', '80px');
  //     $('.mouse').css('height', '80px');
  //     $('.mouse').css('mixBlendMode', 'hard-light');
  //   } else {
  //     $('.mouse').css('width', '55px');
  //     $('.mouse').css('height', '55px');
  //     $('.mouse').css('mixBlendMode', 'normal');
  //   }
  // });

  /* 換頁滑動 - start */
  const body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
  const content = $('.content');
  let curPage = 0; // 初始第一頁
  const lastPages = content.length - 1; // 最後一頁
  let scrollLock = false; // 設定事件只執行一次 (滑動開關)
  // mousewheel DOMMouseScroll

  // 觸碰裝置
  if ("ontouchstart" in window) {
    alert("YES0");

    // 監聽手指 touch 滑動事件
    let startY;

    function touchStart(e) {
      startY = e.touches[0].pageY;
    };

    function touchMoveHandler(e) {
      let moveEndY = e.changedTouches[0].pageY;
      let Y = moveEndY - startY;
      if (scrollLock) {
        return
      };
      if (Y > 0) {
        navigateUp();
      } else if (Y < 0) {
        navigateDown();
      }
    };
    document.addEventListener('touchstart', touchStart);
    document.addEventListener('touchmove', touchMoveHandler);
  } else {
    // 滑鼠裝置
    // 監聽滑鼠滑動事件
    function wheelMoveHandler(e) {
      if (scrollLock) {
        return
      };
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
        navigateUp();
      } else {
        navigateDown();
      }
    };
    $(document).on("mousewheel", wheelMoveHandler);

    // 監聽鍵盤上下鍵
    function keyHandler(e) {
      if (scrollLock) {
        return;
      }
      if (e.which === 38) {
        navigateUp();
      } else if (e.which === 40) {
        navigateDown();
      }
    }
    $(document).on("keydown", keyHandler);
  }

  // 監聽點擊 goTop
  $('.goTop').click(function (e) {
    navigateUp();
  });

  // 監聽 navbar
  $('.js-navLink-00').click(function (e) {
    curPage = 0;
    pagination();
  });
  $('.js-navLink-01').click(function (e) {
    curPage = 1;
    pagination();
  });
  $('.js-navLink-02').click(function (e) {
    curPage = 2;
    pagination();
  });
  $('.js-navLink-03').click(function (e) {
    curPage = 3;
    pagination();
  });

  // 滑動效果、滑動開關
  function pagination() {
    scrollLock = true;
    body.stop().animate({
      scrollTop: content.eq(curPage).offset().top
    }, 1000, 'swing', function () {
      scrollLock = false;
    });
  };

  // 整頁往上移動
  function navigateUp() {
    if (curPage === 0) {
      return;
    }
    curPage--;
    pagination();
  };

  // 整頁往下移動
  function navigateDown() {
    if (curPage === lastPages) {
      return;
    }
    curPage++;
    pagination();
  };
  /* 換頁滑動 - end */



  // 側邊欄 Toggle 效果
  $('.js-navToggler').click(function (e) {
    e.preventDefault();
    $('.js-navToggler').toggleClass('active');
    $('.nav__menu').toggleClass('active');
    $('.layout__side').toggleClass('active');
  });


  /* 裝置尺寸判斷 - start */
  // 00 下方文字 .content__subtitle 調整
  if ($(window).height() < 930) {
    $('.content__subtitle').css('display', 'none');
  }

  if ($(window).width() >= 1300) {
    // nav 載入動畫
    navMoveDesktop();
  }

  // 眼睛動畫
  if ($(window).width() >= 768) {
    eyesMoveDesktop();
  } else {
    eyesMoveMobile();
  }

  // 變更視窗大小 >　重新載入頁面
  $(window).resize(function () {
    location.reload();
  });
  /* 裝置尺寸判斷 - end */

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
    rotate: [-90, -90],
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
  targets: ['.js-content-sub', '.js-content-sub-text'],
  translateY: ['100%', '0'],
  opacity: [0, 1],
  loop: 1,
  duration: 400,
  delay: 1500,
  easing: 'easeInOutQuad'
});


// 畫面動態
// monster body


// $('.monster__sharp').mouseover(function(e) {
//   bodyM.pause();
//   eyes.pause();
// })
// $('.monster__sharp').mouseout(function(e) {
//   bodyM.play();
//   eyes.play();
// })

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
      translateX: [{
          value: 25,
          delay: 800
        },
        {
          value: 0,
          delay: 600
        }
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
      translateX: [{
          value: 33,
          delay: 800
        },
        {
          value: 0,
          delay: 600
        }
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
      translateX: [{
          value: 16,
          delay: 800
        },
        {
          value: 0,
          delay: 100
        }
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
      translateX: [{
          value: 22,
          delay: 800
        },
        {
          value: 0,
          delay: 100
        }
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

// h2 
// anime.timeline({
//   targets: '.js-content-text h2',
//   loop: true,
//   easing: "linear"
// })
// .add({
//   translateY: [{
//       value: 0
//     },
//     {
//       value: '-100%',
//       delay: 1500
//     }
//   ],
//   duration: 1000
// })

// seb 文字
anime.timeline({
    targets: '.js-content-sub-text',
    loop: true,
    easing: "linear"
  })
  .add({
    translateY: [{
        value: '0'
      },
      {
        value: '-100%',
        delay: 1500
      }
    ],
    duration: 1000
  });

// anime({
//   targets: '.js-content-sub',
//   translateY: [0, '-200%'],
//   loop: true,
//   duration: 1000,
//   // direction: 'alternate',
//   easing: 'linear'
// });











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


// swiper
function swiper() {
  // 只在 index、product、product_detail 時執行
  // 當裝置寬度為 768px 時執行
  if ($(window).width() < 992) {

    // 載入 Swiper 
    const swiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 10000,
      },
      slidesPerView: 2,
      slidesPerColumn: 2,
      spaceBetween: 15,
      slidesPerGroup: 2,
      loop: false,
      // loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

  } else if (992 <= $(window).width() < 1200) {

    // 載入 Swiper 
    const swiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 5000,
      },
      slidesPerView: 2,
      slidesPerColumn: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
      loop: false,
      // loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

  } else if (1200 <= $(window).width()) {

    // 載入 Swiper 
    const swiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 5000,
      },
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      // slidesPerColumn: 2,
      loop: false,
      // loopFillGroupWithBlank: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

        // // 滑鼠摸到暫停輪播
        swiper.el.onmouseover = function () {
          swiper.autoplay.stop();
        };
    
        // 滑鼠離開繼續輪播
        swiper.el.onmouseleave = function () {
          swiper.autoplay.start();
        };

  }

  

};
swiper();