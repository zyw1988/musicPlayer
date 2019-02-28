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
        isMove:false,
        progressClick:function(callback){
            var  $this = this;
            this.$progressBar.click(function(e){
                // 1.progressBar 最左边距离浏览器边界的位置
                var normalLeft = $(this).offset().left;
                // 2. 鼠标点击点距离浏览器边界的位置
                var eventLeft = e.clientX;
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
            var barWidth = this.$progressBar.width();
            this.$progressBar.mousedown(function(e){
                $this.isMove = true;
                $(document).mouseover(function(e){
                    eventLeft = e.clientX;
                    if(eventLeft-normalLeft<0 ||eventLeft-normalLeft>barWidth) return;
                    $this.$progressLine.css("width",eventLeft-normalLeft);
                    $this.$progressDot.css("left",eventLeft-normalLeft);
                });
            });
            $(document).mouseup(function(e){
                $(document).off("mouseover");
                $this.isMove = false;
                // 3.点击 时 使音乐播放到指定位置
                var value = ((eventLeft-normalLeft)/ $this.$progressBar.width());
                callback(value);
            });
        },
        setProgress:function(value){
            if(this.isMove) return;
            if(value <0 ||value >100) return;
            if(isNaN(value)) return;
            this.$progressLine.css("width",value+"%");
            this.$progressDot.css("left",value+"%");
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress =Progress;
})(window)