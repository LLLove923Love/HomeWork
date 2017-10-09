$(function(){
	var isparse = false;
	//音乐暂停键
	$(".span-left span").eq(1).click(function(){
		isparse = isparse?false:true;
		if(isparse){
			$(this).html("&#xe6a8;");
			runstart();
		}else{
			$(this).html("&#xe60f;");
			runstop();
		}
	});
	
	//声音图标
	$(".span-right span").eq(2).hover(
		function(){
			$(".voice-change").show();
		},
		function(){
				$(".voice-change").hide();
		}
	);
	$(".voice-change").hover(
		function(){
			$(".voice-change").show();
		},
		function(){
			$(".voice-change").hide();
		}
	);
	//播放位置改变时触发的事件
	clicklength();
	//音乐的数组
	var _index = -1;
	var temp= [["music/丑八怪 - 薛之谦.mp3","丑八怪"],["music/绅士 - 薛之谦.mp3","绅士"],["music/一半 - 薛之谦.mp3","一半"],["music/认真的雪 - 薛之谦.mp3","认真的雪"]];
	$(".box-bottom li").mousedown(function(){
		_index = $(this).index();
		nextmusic(temp,_index);
	});
	//下一首
	$(".span-left span").eq(2).mousedown(function(){
		clearTimeout(t);
		if(_index<3){
			_index++;
			nextmusic(temp,_index);
		}else{
			_index = 0;
			nextmusic(temp,_index);
		}
		runstop();
		var t = setTimeout(function(){
			runstart();
		},300);
	});
	//上一首
	$(".span-left span").eq(0).mousedown(function(){
		clearTimeout(t);
		if(_index>0){
			_index--;
			nextmusic(temp,_index);
		}else{
			_index = 3;
			nextmusic(temp,_index);
		}
		runstop();
		var t = setTimeout(function(){
			runstart();
		},300);
	});
	//随机播放
	$(".span-right span").eq(0).click(function(){
		var _index = Math.floor(Math.random()*4);
		nextmusic(temp,_index);
	});
	//重播
	$(".span-right span").eq(1).click(function(){
		
		$("#media").get(0).currentTime = 0;
	});
	//音量控制-开关音
	clickVoice();
});
function runstart(){
	$("#media").get(0).play();
	$(".left-box img").css({
		transform: "rotate(0deg)",
		transition:"all 0.5s 0.2s linear"
	});
	$(".left-inner-box").css("animation", "active 3s 0.7s linear infinite");
	
}
function runstop(){
	$("#media").get(0).pause();
	isparse = false;
	$(".left-box img").css({
		transform: "rotate(-21deg)",
		transition:"all 0.5s 0s linear"
	});
	$(".left-inner-box").css("animation", "");
}

function audioStart(){
	$("#media").get(0).oncanplay = function(){
		var _Time =  $("#media").get(0).duration;
		var mins = parseInt(_Time/60);
		var secs = parseInt(_Time%60);
		$(".min2").text(mins);
		$(".sec2").text(secs);
	};	
}
function audioEnd(){
	
}
//播放顺序
function nextmusic(temp,_index){
	//标题
		$(".right-box h1").text(temp[_index][1]);
		//选择音乐
		$("#media").attr("src",temp[_index][0]);
		$(".span-left span").eq(1).html("&#xe6a8;");
		isparse = true;
		runstop();
		var t = setTimeout(function(){
			runstart();
			audioStart();
		},300);
		
}
//音量控制-开关音
function clickVoice(){
	var listen = true;
	var voilength = $(".voice-length").height();
	$(".span-right span").eq(2).click(function(){
		listen = listen?false:true;
		if(listen){
			$(this).html("&#xe8aa;");
			$(".voice-length").height(voilength);
			$("#media").get(0).volume = parseInt(voilength)/100;
		}else{
			$(this).html("&#xe62d;");
			$("#media").get(0).volume = 0;
			$(".voice-length").height(0);
		}
	});
	$(".voice-change").mousedown(function(e){
		var e = e || event;
		var heivoice = $(this).offset().top - e.clientY + 100;
		if(heivoice>=1){
			$(".voice-length").height(heivoice);
			$("#media").get(0).volume = parseInt(heivoice)/100;
		}	
	});
}
//进度条，播放位置改变时触发的事件
function clicklength(){
		$("#media").get(0).ontimeupdate = function(){
		var _currenTime=$("#media").get(0).currentTime;
		var _Time =  $("#media").get(0).duration;
		var mins = parseInt(_currenTime/60);
		var secs = parseInt(_currenTime%60);
		$(".white-length").width(_currenTime/_Time*300);
		if(mins.toString().length>1){
			$(".min1").text(mins);
		}else{
			$(".min1").text("0"+mins);
		}
		if(secs.toString().length>1){
			$(".sec1").text(secs);
		}else{
			$(".sec1").text("0"+secs);
		}
	};
		$(".length-music").mousedown(function(e){
			var e = e || event;
			var widlength = e.clientX - $(this).offset().left;
				$(".white-length").width(widlength);
				$("#media").get(0).currentTime = parseInt(widlength/$(".length-music").width()*$("#media").get(0).duration);
				console.log($("#media").get(0).currentTime);
		});
}
//方法               方法描述
//addTextTrack()    为音视频加入一个新的文本轨迹    
//canPlayType()    检查指定的音视频格式是否得到支持    
//load()    重新加载音视频标签    
//play()    播放音视频    
//pause()    暂停播放当前的音视频    
//-------------------------
//属性           属性描述
//audioTracks    返回可用的音轨列表（MultipleTrackList对象）    
//autoplay    媒体加载后自动播放    
//buffered    返回缓冲部件的时间范围(TimeRanges对象)    
//controller    返回当前的媒体控制器（MediaController对象）    
//controls    显示播控控件    
//crossOrigin    CORS设置    
//currentSrc    返回当前媒体的URL    
//currentTime    当前播放的时间，单位秒    
//defaultMuted    缺省是否静音    
//defaultPlaybackRate    播控的缺省倍速    
//duration    返回媒体的播放总时长，单位秒    
//ended    返回当前播放是否结束标志    
//error    返回当前播放的错误状态    
//initialTime    返回初始播放的位置    
//loop    是否循环播放    
//mediaGroup    当前音视频所属媒体组 (用来链接多个音视频标签)    
//muted    是否静音    
//networkState    返回当前网络状态    
//paused    是否暂停    
//playbackRate    播放的倍速    
//played    当前播放部件已经播放的时间范围(TimeRanges对象)    
//preload    页面加载时是否同时加载音视频    
//readyState    返回当前的准备状态    
//seekable    返回当前可跳转部件的时间范围(TimeRanges对象)    
//seeking    返回用户是否做了跳转操作    
//src    当前音视频源的URL    
//startOffsetTime    返回当前的时间偏移(Date对象)    
//textTracks    返回可用的文本轨迹(TextTrackList对象)    
//videoTracks    返回可用的视频轨迹(VideoTrackList对象)    
//volume    音量值    
//事件
//事件描述
//abort    当音视频加载被异常终止时产生该事件    
//canplay    当浏览器可以开始播放该音视频时产生该事件    
//canplaythrough    当浏览器可以开始播放该音视频到结束而无需因缓冲而停止时产生该事件    
//durationchange    当媒体的总时长改变时产生该事件    
//emptied    当前播放列表为空时产生该事件    
//ended    当前播放列表结束时产生该事件    
//error    当加载媒体发生错误时产生该事件    
//loadeddata    当加载媒体数据时产生该事件    
//loadedmetadata    当收到总时长，分辨率和字轨等metadata时产生该事件    
//loadstart    当开始查找媒体数据时产生该事件    
//pause    当媒体暂停时产生该事件    
//play    当媒体播放时产生该事件    
//playing    当媒体从因缓冲而引起的暂停和停止恢复到播放时产生该事件    
//progress    当获取到媒体数据时产生该事件    
//ratechange    当播放倍数改变时产生该事件    
//seeked    当用户完成跳转时产生该事件    
//seeking    当用户正执行跳转时操作的时候产生该事件    
//stalled    当试图获取媒体数据，但数据还不可用时产生该事件    
//suspend    当获取不到数据时产生该事件    
//timeupdate    当前播放位置发生改变时产生该事件    
//volumechange    当前音量发生改变时产生该事件    
//waiting    当视频因缓冲下一帧而停止时产生该事件