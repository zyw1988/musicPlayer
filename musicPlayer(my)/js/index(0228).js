$(function(){
        // 完成：初始化音乐信息 并且按照播放顺序更改音乐信息（背景，右边歌曲信息，底部歌曲信息）
        // 未完成：进度条更新 和点击拖拽事件（包括音乐播放进度 ，音量进度）
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
                  initMusicInfo(data[0]);
                //  initBgImage(data[0]);
                
                //  initBar(data[0]);
                },
                error:function(error){
                    console.log(error)
                }
            })
        }
        // 2.初始化歌曲信息
        function initMusicInfo(music){
            $(".song_info_pic img").attr("src",music.cover);
            $(".song_info_name a").text(music.name);
            $(".song_info_singer a").text(music.singer);
            $(".song_info_ablum a").text(music.album);
            $(".music_progress_name").text(music.name+"/"+music.singer);
            $(".music_progress_time").text("00:00/"+music.time);
            $(".mask_bg").css("background-image","url('"+music.cover+"')");
        }
        // 3.初始化事件监听
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
               initMusicInfo($item.get(0).music);
            }); 

            // 底部按钮
            $(".music_play").click(function(){
               
                console.log(1);
                if(player.currentIndex ==-1){
                    // 没有播放过:主动触发第一首音乐的播放按钮事件
                    console.log(2);
                    $(".list_music").eq(0).find(".list_menu_play").trigger("click");
                }else{
                    // 有播放历史，则继续播放
                    $(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
                }
            });
            $(".music_pre").click(function(){
                // 在 player上封装了一个处理向前一个序号的方法，调用即可
                $(".list_music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
            });
            $(".music_next").click(function(){
                // 在 player上封装了一个处理向后一个序号的方法，调用即可
                $(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
            });

           
            $(".content_music").delegate(".list_menu_del","click",function(){
                var $item = $(this).parents(".list_music");
                if($item.get(0).index ==player.currentIndex){
                    $(".music_next").trigger("click");
                }else{
                    $item.remove();
                    player.changeMusic($item.get(0).index);
                    $(".list_music").each(function(index,ele){
                        ele.index = index;
                        $(ele).find(".list_number").text(index+1);
                    });  
                }
            });
        } 
        
        
       
         /*
         function initBgImage(music){
            $(".mask_bg").css("background-image","url("+music.cover+")");
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
        
   