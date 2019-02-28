$(function(){
    //  鼠标悬停、点击播放按钮（小）事件
    // 未完成：audio播放，界面初始化（背景，歌词，时长）
    initMusicList();
        initEvent();
        function initBgImage(music){
            $(".mask_bg").css("background-image","url("+music.cover+")");
        }
        function initMusicInfo(music){
            $(".song_info_pic img").attr("src",music.cover);
        }
        function initBar(music){
            $(".music_progress_name").text(music.name+"/"+music.singer);
            $(".music_progress_time").text("00:00/"+music.time);
        }
        function initMusicList(){
           $.ajax({
               url:"./source/musiclist.json",
               dataType:"JSON",
               success:function(data){
                //  1、  使用模板引擎渲染
                  $.each(data,function(index,ele){
                      var $item = createMusicItem(index,ele);
                      $(".content_music ul").append($item);
                  });
                
                //  2、  初始化背景、右边歌曲信息、底部歌曲信息和时长
                initBgImage(data[0]);
                initMusicInfo(data[0]);
                initBar(data[0]);
               },
               error:function(error){
                   console.log(error)
               }
           })
        }
        function createMusicItem(index,music){
            var $item = $(""+
            "<li class=\"list_music\">"+
                "<div class=\"list_check\"><i></i></div>"+
                "<div class=\"list_number\">"+(index+1)+"</div>"+
                "<div class=\"list_name\">"+music.name+
                "<div class=\"list_menu\">"+
                "<a href=\"javascript:;\" title=\"播放\" class=\"list_menu_play\"></a>"+
                "<a href=\"javascript:;\" title=\"添加\"></a>"+
                "<a href=\"javascript:;\" title=\"下载\"></a>"+
                "<a href=\"javascript:;\" title=\"分享\"></a>"+
                "</div> "+
                "</div>"+
                "<div class=\"list_singer\">"+music.singer+"</div>"+
                "<div class=\"list_time\">"+music.time+
                "<span></span>"+
                "<a href=\"javascript:;\" title=\"删除\" class=\"list_menu_del\"></a> "+
                "</div> "+
                "</li>");
            $item.get(0).index = index;
            $item.get(0).music = music;

            return $item
        }

        function initEvent(){
            $(".content_music").delegate(".list_music","mouseenter",function(){
                $(this).find(".list_menu").stop().fadeIn(100);
                $(this).find('.list_time a').stop().fadeIn(100);
                $(this).find('.list_time span').stop().fadeIn(100);
            })
            $(".content_music").delegate(".list_music","mouseleave",function(){
                $(this).find(".list_menu").stop().fadeOut(100);
                $(this).find('.list_time a').stop().fadeOut(100);
                $(this).find('.list_time span').stop().fadeOut(100);
            })
            $(".content_music").delegate(".list_check","click",function(){
                $(this).toggleClass("list_checked");
            })
            // list_menu_play 点击事件（事件要做到排它 还要做到排自己。当前正在播放的音乐，其他没有播放的就不能有那些样式；
                                    // 与此同时，当前音乐点击一次是播放，点击第二次是停止。
                                    // 样式可以toggleClass，文字高亮因为只是调节了 color，
                                    // 所以不能简单的this，this.siblings()，要放在判断里。
            $(".content_music").delegate(".list_menu_play","click",function(){
                var $item =  $(this).parents(".list_music");
                // 1.播放图标 切换样式
                $(this).toggleClass("list_menu_play2");
                $item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
                //2.序号图标切换样式
                $item.find(".list_number").toggleClass("list_number2");
                $item.siblings().find(".list_number").removeClass("list_number2");    
            /* 
                解决 多条list_music被点击播放的时候，底部播放按钮无法分辨的问题。
                ---不需要想 什么锁 直接判定 小按钮的类名有没有 list_menu_play2，有 就更改底部播放按钮也为music_play2
            */
               if($(this).attr("class").indexOf("list_menu_play2") !=-1){
                    // 3.切换底部播放大图标样式（因为会有多个小图标点击触发，不能每次一点击小就切换大的样式，所以要判断）
                    // 3.1 改成正在播放
                    $(".music_play").addClass("music_play2");
                    // 4 因为正在播放，当前高亮，非当前 不高亮（作排它）
                    $item.find("div").css("color","rgba(255, 255, 255, 1)");
                    $item.siblings().find("div").css("color","rgba(255, 255, 255, 0.35)");
                
               }else{
                    // 3.1改成已停止
                    $(".music_play").removeClass("music_play2");
                    // 4.1如果没有 list_menu_play2，那说明是在当前音乐上坐了第二次点击，是停止播放，要去掉高亮显示。
                    $item.find("div").css("color","rgba(255, 255, 255, 0.35)"); 
               }
               
            })  
        } 
    /*
        事件初始化
     */
});
        
   