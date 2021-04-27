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


  // $(document).mousemove(function (e) {
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

  /* ------------- 換頁滑動 - start ------------- */
  const body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
  const content = $('.content');
  let curPage = 0; // 初始第一頁
  const lastPages = content.length - 1; // 最後一頁
  let scrollLock = false; // 設定事件只執行一次 (滑動開關)



  // 觸碰裝置
  if ("ontouchstart" in window) {
    // 取消 overflow hidden
    $('body').css('overflow', 'auto');

    $(window).scroll(function () {

      let windowHeight = $(window).height();
      let windowScrollTop = $(window).scrollTop();
      let documentHeight = $(document).height();

      if (windowHeight + windowScrollTop === documentHeight) {
        // scroll 隱藏
        scrollAnimate.pause();
        $('.scroll').css('opacity', '0');
      } else if (windowScrollTop === 0) {
        // scroll 顯示
        scrollAnimate.play();
        $('.scroll').css('opacity', '1');
      }

    });

    // 橫屏
    if (window.orientation === 90 || window.orientation === -90) {
      alert('請豎屏瀏覽獲得最佳體驗 ☺');
    }

    // // 監聽手指 touch 滑動事件
    // let startY;

    // function touchStart(e) {
    //   startY = e.touches[0].pageY;
    // };

    // function touchMoveHandler(e) {
    //   let moveEndY = e.changedTouches[0].pageY;
    //   let Y = moveEndY - startY;
    //   if (scrollLock) {
    //     return
    //   };
    //   if (Y > 0) {
    //     navigateUp();
    //   } else if (Y < 0) {
    //     navigateDown();
    //   }
    // };
    // document.addEventListener('touchstart', touchStart);
    // document.addEventListener('touchmove', touchMoveHandler);
    // document.addEventListener('scroll', touchMoveHandler);
  } else {
    $('body').css('overflow', 'hidden');

    // 變更視窗大小 >　重新載入頁面
    $(window).resize(function () {
      location.reload();
    });

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
    // scroll 顯示
    scrollAnimate.play();
    $('.scroll').css('opacity', '1');

    if (curPage === 0) {
      return;
    }
    curPage--;
    pagination();
  };

  // 整頁往下移動
  function navigateDown() {
    // scroll 隱藏
    if (curPage === 2) {
      scrollAnimate.pause();
      $('.scroll').css('opacity', '0');
    } else {
      scrollAnimate.play();
      $('.scroll').css('opacity', '1');
    }

    if (curPage === lastPages) {
      return;
    }
    curPage++;
    pagination();
  };
  /* ------------- 換頁滑動 - end ------------- */



  /* ------------- 側邊欄 Toggle 效果 - start ------------- */
  $('.js-navToggler').click(function (e) {
    e.preventDefault();
    $('.js-navToggler').toggleClass('active');
    $('.nav__menu').toggleClass('active');
    $('.layout__side').toggleClass('active');
  });
  /* ------------- 側邊欄 Toggle 效果 - end ------------- */



  /* ------------- 裝置尺寸判斷 - start ------------- */
  // 00 下方文字 .content__subtitle 調整
  if ($(window).height() < 930) {
    subtitleAnimate.pause();
    $('.content__block__subtitle').css('opacity', '0');
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
  /* ------------- 裝置尺寸判斷 - end ------------- */
});





/* ------------- Anime - 載入動畫 - start ------------- */
// 數字
anime({
  targets: '.content__block__num',
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
  targets: ['.content__block__title--lineTop', '.content__block__title--lineBottom'],
  width: ['0', '15%'],
  loop: 1,
  duration: 500,
  delay: 700,
  easing: 'linear'
});

anime({
  targets: ['.content__block__title--lineRight', '.content__block__title--lineLeft'],
  height: ['0', '50%'],
  loop: 1,
  duration: 500,
  delay: 500,
  easing: 'linear'
});

anime({
  targets: '.content__block__title h3',
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
let subtitleAnimate = anime({
  targets: ['.content__block__subtitle', '.scroll'],
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
/* ------------- Anime - 載入動畫 - end ------------- */



/* ------------- Anime - 畫面動態 - start ------------- */
// monster - body
anime({
  targets: ['.monster__sharp', '.monster__round'],
  translateY: [0, 15],
  loop: true,
  duration: 800,
  direction: 'alternate',
  easing: 'linear'
});

// monster - eyes
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

let scrollAnimate = anime({
  targets: '.scroll',
  translateY: [0, 3],
  opacity: [0.7, 1],
  loop: true,
  duration: 900,
  direction: 'alternate',
  easing: 'linear'
});
/* ------------- Anime - 畫面動態 - end ------------- */





/* ------------- AOS - 載入 - start ------------- */
AOS.init({
  duration: 800,
  delay: 300,
  once: false
});
/* ------------- AOS - 載入 - end ------------- */





/* ------------- Swiper - 載入 - start ------------- */
function swiperFn() {

  if (1200 <= $(window).width()) {

    // 載入 Swiper 
    const swiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 6000,
      },
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });


    // 滑鼠摸到暫停輪播
    swiper.el.onmouseover = function () {
      swiper.autoplay.stop();
    };

    // 滑鼠離開繼續輪播
    swiper.el.onmouseleave = function () {
      swiper.autoplay.start();
    };

  } else if ($(window).width() < 1200) {

    // 載入 Swiper 
    const swiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 6000,
      },
      slidesPerView: 2,
      // slidesPerColumn: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });

    // 滑鼠摸到暫停輪播
    swiper.el.onmouseover = function () {
      swiper.autoplay.stop();
    };

    // 滑鼠離開繼續輪播
    swiper.el.onmouseleave = function () {
      swiper.autoplay.start();
    };
  }
};
swiperFn();
/* ------------- Swiper - 載入 - end ------------- */