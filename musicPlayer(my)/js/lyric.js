(function(window){
    function Lyric(path){
        return new Lyric.prototype.init(path);
    }
    Lyric.prototype = {
        constructor:Lyric,
        init:function(path){
           this.path = path;
        },
        times:[],
        lyrics:[],
        index:-1,
        loadLyric:function(callBack){
            // 保存歌词和时间序列的数组 要清空。不然没吃都是第一首
            this.times=[];
            this.lyrics = [];
            var $this= this;
            $.ajax({
                url:$this.path,
                dataType:"text",
                success:function(data){
                    // console.log(data);
                    $this.parseLyric(data);
                    callBack();
                },
                error:function(error){
                    console.log(error)
                }
            })
        },
        parseLyric:function(data){
            var $this = this;
            var array = data.split("\n");
            var timeReg = /\[(\d*:\d*\.\d*)\]/
            $.each(array,function(index,ele){
                // 歌词
                var lrc = ele.split("]")[1];
                if(lrc.length ==1) return true;  // 为什么用 ==""判断排除不行
                $this.lyrics.push(lrc);

                // 时间
                // console.log(ele);
                var res = timeReg.exec(ele);
                if(res ==null) return true; // return ture = continue
                var timeStr = res[1];//00:00.02
                // console.log(timeStr);
                var res2 = timeStr.split(":");
                var min = parseInt(res2[0]) * 60;
                var sec = parseFloat(res2[1]);
                var time = parseFloat(Number(min + sec).toFixed(2)); //总秒数 toFixed转换之后是字符串，用parseFloat转换
                $this.times.push(time);

            
            });
            console.log($this.times,$this.lyrics);
        },
        currentIndex:function(currentTime){
            // console.log(currentTime)
            if(currentTime >=this.times[0]){
                this.index++;
                this.times.shift();//
            }
            return this.index;
        }
    }
    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric =Lyric;
})(window)