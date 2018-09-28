
// window.onload = function(){
//             //顶部菜单显示按钮
//             toggleGuide = function(e){
//                 let iconO = document.getElementsByClassName('menu_guide').getElementsByClassName('icon-fenlei');
//                 let iconC = document.getElementsByClassName('menu_guide').getElementsByClassName('icon-close');
//                 let menu = document.getElementsByClassName('menu_body');
//                 if(iconO.className == 'guide_hide'){

//                 }else {
//                     iconO.classList.add('guide_hide');
//                     iconC.classList.add('guide_show');
//                 }
//                 // $('.menu_guide .icon-fenlei').toggleClass('guide_show');
//                 // $('.menu_guide .icon-close').toggleClass('guide_hide');
//                 // $('.menu_body').slideToggle();
//                 // e.stopPropagation();
//             };
//             //滚动事件
//             // $(window).scroll(function(){
//             //     //侧边栏最后一个div固定
//             //     var aside_height = $('#aside_r').outerHeight();
//             //     var aside_t = 60 + aside_height ; 
//             //     var scroll = $(document).scrollTop();
//             //     if(scroll > aside_t){
//             //             $('#aside_r>div:last-child').addClass('fixed-to-top'); 
//             //         }else {
//             //             $('#aside_r>div:last-child').removeClass('fixed-to-top'); 
//             //         } 
//             //     //顶部栏固定
//             //     // if( scroll >= 660){
//             //     //     $('header').addClass('position-fixed');
//             //     //     $('#header-nav').addClass('bg-white');
//             //     // }else {
//             //     //     $('header').removeClass('position-fixed');
//             //     //     $('#header-nav').removeClass('bg-white');
//             //     // }     
//             // });
// };
// (function(){
                //顶部菜单显示按钮
                toggleGuide = function(e){
                    let iconO = document.getElementsByClassName('menu_guide')[0].getElementsByClassName('icon-fenlei')[0];
                    let iconC = document.getElementsByClassName('menu_guide')[0].getElementsByClassName('icon-close')[0];
                    let menu = document.getElementsByClassName('menu_body')[0];
                    if(iconO.classList.contains('guide_show')){
                        iconO.classList.remove('guide_show');
                        iconC.classList.remove('guide_hide');
                        menu.classList.remove('d-block');   
                    }else {
                        iconO.classList.add('guide_show');
                        iconC.classList.add('guide_hide');
                        menu.classList.add('d-block');
                    }
                };
// })

