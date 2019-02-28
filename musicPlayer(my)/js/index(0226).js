$(function(){
        // 封装Player。html中引入，index.js中通过var实例获取。并通过在创建音乐列表的时候将索引值和音乐列表绑定到创建的每一条音乐上。
        // 使用语句 get(0).index / get(0).music 传入 player实例。（播放音乐需要获取到索引值找到音乐保存的路径，并将其赋值为audio的src属性上）
        // 点击 list_menu_play 播放音乐。点击自身播放/暂停。点击其他切换播放。
        // 未完成：底部播放按钮（大）点击事件（有无历史播放）
        // 未完成：一首音乐播放结束开始下一首（第一首和最后一首注意）
        // 未完成：右边歌词和底部歌曲信息初始化。
        var $audio  = $("audio");
        var player = new Player($audio);
        // 1.初始化音乐列表
        initMusicList();
        function initMusicList(){
            $.ajax({
                url:"./source/musiclist.json",
                dataType:"JSON",
                success:function(data){
                    player.musicList = data;
                    $.each(data,function(index,ele){
                       var $item = createMusicItem(index,ele);
                       $(".content_music ul").append($item);
                    });
                 
                 initBgImage(data[0]);
                 initMusicInfo(data[0]);
                 initBar(data[0]);
                },
                error:function(error){
                    console.log(error)
                }
            })
        }
        // 2.初始化事件监听
        initEvent();
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
          
            $(".content_music").delegate(".list_menu_play","click",function(){
                var $item =  $(this).parents(".list_music");
                $(this).toggleClass("list_menu_play2");
                $item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
                $item.find(".list_number").toggleClass("list_number2");
                $item.siblings().find(".list_number").removeClass("list_number2");    
                
                if($(this).attr("class").indexOf("list_menu_play2") !=-1){
                    $(".music_play").addClass("music_play2");
                    $item.find("div").css("color","rgba(255, 255, 255, 1)");
                    $item.siblings().find("div").css("color","rgba(255, 255, 255, 0.35)");
                
                }else{
                    $(".music_play").removeClass("music_play2");
                    $item.find("div").css("color","rgba(255, 255, 255, 0.35)"); 
                }
               player.playMusic($item.get(0).index,$item.get(0).music);
            })  
        } 
        
       /*  function initBgImage(music){
            $(".mask_bg").css("background-image","url("+music.cover+")");
        }
        function initMusicInfo(music){
            $(".song_info_pic img").attr("src",music.cover);
        }
        function initBar(music){
            $(".music_progress_name").text(music.name+"/"+music.singer);
            $(".music_progress_time").text("00:00/"+music.time);
        } */
        
        // 方法-创建一条歌曲
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

        
    /*
        事件初始化
     */
});
        
   