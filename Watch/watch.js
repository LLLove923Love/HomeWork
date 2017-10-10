$(function(){
	var canvas = $("#canvas").get(0);
	//时间不停在动，需要重绘
	var canvasCover = $("#canvas2").get(0);
	var context = canvas.getContext("2d");
	var contextCover = canvasCover.getContext("2d");
	//背景
	context.save();
	context.beginPath();
	context.lineWidth = 3;
	context.strokeStyle = "#333";
	context.arc(350,300,240,Math.PI*0,Math.PI*2,false);
	//定义阴影
	context.shadowColor="#999";
	context.shadowOffsetY = 30;
	context.shadowBlur = 60;
	context.fillStyle = "#999";
	context.fill();
	context.stroke();
	context.closePath();
	//内边框
	context.save();
	context.beginPath();
	context.lineWidth = 2;
	context.strokeStyle = "#ccc";
	context.arc(350,300,239,Math.PI*0,Math.PI*2,false);
	context.fillStyle = "#333";
	context.fill();
	context.stroke();
	context.closePath();
	context.restore();
	//表数
	context.font='bold 30px calibri';
	context.fillStyle = "#fff";
	context.fillText('12',335,115);
	context.fillText('3',540,308);
	context.fillText('6',343,500);
	context.fillText('9',150,308);
	context.beginPath();
	//表中心
	context.arc(350,300,26,Math.PI*0,Math.PI*2,false);
	context.fillStyle = "rgba(0,0,0,0.5)";
	context.fill();
	context.stroke();
	context.restore();
	
	context.translate(350,300);
	contextCover.translate(350,300);
	setInterval(function(){
		activeTime(contextCover);
	},1000);
	for(var i = 0;i<12;i++){
		context.save();
		context.beginPath();
		context.rotate(i*(1/6)*Math.PI);
		context.rect(-1,-233,2,16);
		context.fillStyle = "#fff";
		context.fill();
		context.strokeStyle = "#fff";
		context.stroke();
		context.restore();	
	}
	for(var i = 1;i<=43;i++){
		var rotateX = Math.random()*230;
		var rotateY = -Math.random()*230;
		lineWatch(rotateX,rotateY,context);
		context.rotate(i*(1/6)*Math.PI);
	}
	

});
function lineWatch(start,end,context){
	context.beginPath();
	context.rect(start,end,0.5,0.5);
	context.fillStyle = "#fff";
	context.fill();
	context.strokeStyle = "#ff0";
	context.stroke();
}
function activeTime(context){
	context.clearRect(-350,-300,700,600);
	var _date = new Date();
	var hours = _date.getHours()*30;
	var mins = _date.getMinutes()*6;
	var secs =_date.getSeconds()*6;
	//时针
	context.save();
	context.rotate(hours*Math.PI/180);
	context.beginPath();
	context.rect(-7,-120,14,135);
	context.fillStyle = "#fff";
	context.strokeStyle = "#fff";
	context.fill();
	context.stroke();
	context.restore();
	//分针
	context.save();
	context.rotate(mins*Math.PI/180);
	context.beginPath();
	context.rect(-4,-150,8,170);
	context.strokeStyle = "#fff";
	context.fillStyle = "#fff";
	context.fill();
	context.stroke();
	context.restore();
	//秒针
	context.save();
	context.rotate(secs*Math.PI/180);
	context.beginPath();
	context.rect(-2,-180,4,205);
	context.strokeStyle = "#f00";
	context.fillStyle = "#f00";
	context.fill();
	context.stroke();
	context.restore();
	//中心小圆
	context.beginPath();
	context.arc(0,0,7,Math.PI*0,Math.PI*2,false);
	context.strokeStyle = "#f00";
	context.fillStyle = "#f00";
	context.fill();
	context.stroke();
}
