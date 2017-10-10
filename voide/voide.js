$(function(){
	var isparse = true;
	var listen = true;
	var change = false;
	//播放暂停键
	$(".startOrend span").click(function(){
		isparse = isparse?false:true;
		if(isparse){
			$(this).html("&#xe603;");
			$("#media").get(0).play();	
		}else{
			$(this).html("&#xe635;");
			$("#media").get(0).pause();	
		}
	});
	//音量控制-开关音
	clickVoice();
	//初始时间
	audioStart();
	//播放时间
	clicklength();
	$(".window-change span").mousedown(function(){
		change = change?false:true;
		if(change){
			$(this).html("&#xe65f;");
			$(this).css("fontSize","30px");
			$(".container").css({
				"width":"100%",
				"height":"100%"
			});
			$("#media").css({
				"width":"100%",
				"height":"100%"
			});
			$(".container").get(0).webkitRequestFullScreen();
		}else{
			$(this).html("&#xe602;");	
			$(this).css("fontSize","24px");
			$(".container").css({
				"width":"1024px",
				"height":"581px"
			});
			$("#media").css({
				"width":"1024px",
				"height":"576px"
			});
			document.webkitCancelFullScreen();
		}
	});
});
//音量控制-开关音
function clickVoice(){
	var listen = true;
	var voilength = $("#whiteLength").css("left");
		$("#media").get(0).volume = parseInt(voilength)/$(".listen-change").width();
		$(".listen span").click(function(){
		listen = listen?false:true;
		if(listen){
			$(this).html("&#xe617;");
			$(this).css({"fontSize":"28px","marginRight":"0px"});
			$("#media").get(0).volume = parseInt(voilength)/$(".listen-change").width();
			$("#whiteLength").css("left",voilength);
			console.log(voilength);
		}else{
			$(this).html("&#xe62d;");
			$(this).css({"fontSize":"24px","marginRight":"4px"});
			$("#media").get(0).volume = 0;
			$("#whiteLength").css("left",0);
		}
	});
	$(".listen-change").mousedown(function(e){
		var e = e || event;
		var heivoice = e.clientX - $(this).offset().left;
		if(heivoice>=0){
			$("#whiteLength").css("left",heivoice);
			$("#media").get(0).volume = parseInt(heivoice)/$(this).width();
			voilength = $("#whiteLength").css("left");
		}	
	});
}
function clicklength(){
		$("#media").get(0).ontimeupdate = function(){
			var _currenTime=$("#media").get(0).currentTime;
			var _Time =  $("#media").get(0).duration;
			$("#voide-white").css("left",_currenTime/_Time*$(".voide-change").width());
			var time = parseInt(_currenTime);
			$("#currentTime").text(time);
		};
		$(".voide-change").mousedown(function(e){
			var e = e || event;
			var widlength = e.clientX - $(this).offset().left;
				$("#voide-white").css("left",widlength);
				$("#media").get(0).currentTime = parseInt(widlength/$(".voide-change").width()*$("#media").get(0).duration);
		});
}
function audioStart(){
	$("#media").get(0).oncanplay = function(){
		var _Time =  $("#media").get(0).currentTime;
		var _allTime =  $("#media").get(0).duration;
		var time = parseInt(_Time);
		var alltime = parseInt(_allTime);
		$("#currentTime").text(time);
		$("#allTime").text(alltime);
	};	
}
