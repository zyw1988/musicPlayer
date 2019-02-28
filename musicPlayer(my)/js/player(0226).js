(function(window){
    function Player($audio){
        return new Player.prototype.init($audio);
    }
    Player.prototype = {
        constructor:Player,
        musicList :[],
        init:function($audio){
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        currentIndex:-1,
        playMusic:function(index,music){
            // 类比于高亮显示。同一首音乐第一次点击播放，第二次点击暂停。第一首音乐播放的是，点击其他的则当前的停止，播放其他首
            // 需要个判断：currentIndex
            if(this.currentIndex ==index){
                // 是同一首音乐，查看其播放状态
                if(this.audio.paused){
                    // 是暂停状态，切换为播放
                    this.audio.play();
                }else{
                    // 切换为停止状态
                    this.audio.pause();
                }
            }else{
                // 不是同一首,更改audio的地址，并播放
                this.$audio.attr("src",music.link_url);
                this.audio.play();
                this.currentIndex = index;
            }
        }
    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player =Player;
})(window)