// 操作进度条，将进度条的各种信息做成一个对象传进封装函数中
(function(window){
    function Progress($progressBar,$progressLine,$progressDot){
        return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
    }
    Progress.prototype = {
        constructor:Progress,
        init:function($progressBar,$progressLine,$progressDot){
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        // 检测 有没有拖动的 锁，默认是false，即
        isMove:false,
        progressClick:function(callback){
            var  $this = this;
            this.$progressBar.click(function(e){
                // 获取位置
                // 1.progressBar 最左边距离浏览器边界的位置
                var normalLeft = $(this).offset().left;
                // console.log(normalLeft);
                // 2. 鼠标点击点距离浏览器边界的位置
                var eventLeft = e.clientX;
                // console.log(eventLeft-normalLeft);
               $this.$progressLine.css("width",eventLeft-normalLeft);
               $this.$progressDot.css("left",eventLeft-normalLeft);

              // 3.点击 时 使音乐播放到指定位置
                var value = ((eventLeft-normalLeft)/$(this).width());
                callback(value);
            });
        },
        progressMove:function(callback){
            var  $this = this;
            var normalLeft = this.$progressBar.offset().left;
            var eventLeft;
            this.$progressBar.mousedown(function(e){
                $this.isMove = true;
                //  isMOve 为true的时候，setProgress 是直接return的，即拖拽的时候，进度条不会随着歌曲更新。
                $(document).mouseover(function(e){
                    eventLeft = e.clientX;
                    // console.log(eventLeft-normalLeft);
                    if(eventLeft-normalLeft<0 ||eventLeft-normalLeft>$this.$progressBar.width) return;
                    $this.$progressLine.css("width",eventLeft-normalLeft);
                    $this.$progressDot.css("left",eventLeft-normalLeft);
                });
            });
            // 结束拖拽的时候，即 鼠标抬起的时候，再将isMove改为false，让进度条再随着歌曲播放更新。
            $(document).mouseup(function(e){
                $(document).off("mouseover");
                $this.isMove = false;
                // 3.点击 时 使音乐播放到指定位置
                var value = ((eventLeft-normalLeft)/ $this.$progressBar.width());
                callback(value);
            });
        },
        // 根据歌曲播放进度 设置进度条（与手动调节进度条会冲突，可设置布尔值isMove来选择一个执行。
        //  当 拖拽的时候，关闭 setProgress语句。当不拖拽的时候再开启setProgress
        setProgress:function(value){
            // 默认 isMove是false，不会return 会执行以下的设置语句。
            if(this.isMove) return;
            if(value <0 ||value >100) return;

            this.$progressLine.css("width",value+"%");
            this.$progressDot.css("left",value+"%");
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress =Progress;
})(window)