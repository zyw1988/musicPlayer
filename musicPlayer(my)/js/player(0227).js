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
            if(this.currentIndex ==index){
                if(this.audio.paused){
                    this.audio.play();
                }else{
                    this.audio.pause();
                }
            }else{
                this.$audio.attr("src",music.link_url);
                this.audio.play();
                this.currentIndex = index;
            }
        },
        preIndex:function(){
            var index = this.currentIndex -1;
            if(index <0){
                index = this.musicList.length - 1;
            }
            return index;
        },
        nextIndex:function(){
            var index = this.currentIndex +1;
            if(index >this.musicList.length-1){
                index = 0;
            }
            return index;
        },
        changeMusic:function(index){
            this.musicList.splice(index,1);
            // 因为 删除正在播放的音乐时，需要播放下一首，会用到参数 currentIndex，
            // 意外情况：当删除 当前播放音乐的 前面的歌曲时（每次删除一首），按照之前的语句 
            // 会触发“下一首”按钮点击事件。而这里 事件当中的 参数 currentIndex 还是index更新之前的，会多1
            // 这里将参数 currentIndex 操作一下，-1即可。
            if(index < this.currentIndex){
                this.currentIndex = this.currentIndex -1;
            }
        } 
    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player =Player;
})(window)