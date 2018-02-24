(()=>{
	var lid=location.search.split("=")[1];
	if(lid !=undefined){
		ajax("get","data/05-product-details/details.php?lid="+lid,"")
			.then(data=>{
				//console.log(data);
				var laptop=data.laptop,
					family=data.family;
				var mImg=document.getElementById("mImg"),
					largeDiv=document.getElementById("largeDiv"),
					icon_list=document.getElementById("icon_list");
				//console.log(mImg,largeDiv,icon_list);
				//设置mImg的src为当前商品的第一章图片的中图片
				mImg.src=laptop.pics[0].md;
				//设置largeDiv的backgroundImage为url（第一章图片的大图片）
				largeDiv.style.backgroundImage=`url(${laptop.pics[0].lg})`;
				var html="";
				for(var pic of laptop.pics){
					html+=`<li class="i1"><img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}"></li>`;
				}
				icon_list.innerHTML=html;
				var title=document.querySelector
					("#show-details>h3>a"),
					price=document.querySelector
					("#show-details>.price>.stu-price>span"),
					promise=document.querySelector
					("#show-details>.price>.promise"),
					spec=document.querySelector
					("#show-details>.spec>div");
				//console.log(title,price,promise,spec);
				title.innerHTML=laptop.title;
				price.innerHTML="￥"+laptop.price;
				promise.innerHTML+=laptop.promise;
				
				var html="";
				for(var l of family.laptop_list){
					if(l.id!=laptop.lid)
						html+=`<a href="05-product-details.html?lib=${l.lid}">${l.spec}</a>`
					else 
						html+=`<a href="05-product-details.html?lib=${l.lid}"class="active">${l.spec}</a>`;
				}
				spec.innerHTML=html;
		/***********放大镜*************/
		/*****移动小图片*****/
		//product_details.css中110行:
			//transition:all .5s linear;
  //查找id为preview下的h1下的class为forward的a保存到aForward
		var aForward=document.querySelector(
			"#preview>h1>.forward");
  //查找id为preview下的h1下的class为backward的a保存到aBackward
		var aBackward=document.querySelector(
			"#preview>h1>.backward");
		var moved=0,LIWIDTH=62;//定义变量
  //为aForward绑定单击事件
		aForward.onclick=function(){
			if(this.className.indexOf("disabled")==-1){
				moved++; move();
			}
		};
		aBackward.onclick=function(){
			if(this.className.indexOf("disabled")==-1){
				moved--; move();
			}
		};
		function move(){
    //修改icon_list的left为-moved*LIWIDTH+20
			icon_list.style.left=-moved*LIWIDTH+20+"px";
			checkA();
		}
		function checkA(){//根据moved，控制a的启用禁用
    //如果当前商品的图片列表的图片张数-moved==5
			if(laptop.pics.length-moved==5)
      //设置aForward的class为forward和disabled
				aForward.className="forward disabled";
			else if(moved==0)//否则 如果moved==0
      //设置aBackward的class为backward和disabled
				aBackward.className="backward disabled"
			else{//否则
      //设置aForward的class为forward
				aForward.className="forward";
      //设置aBackward的class为backward
				aBackward.className="backward";
			}
		}
  //如果当前商品的图片张数<=5
			if(laptop.pics.length<=5)
    //设置aForward的class为"forward disabled"
				aForward.className="forward disabled";
  /*****鼠标进入小图片切换中图片和大图片*****/
		icon_list.onmouseover=function(e){
			var tar=e.target;
			if(tar.nodeName=="IMG"){
				mImg.src=tar.dataset.md;
				largeDiv.style.backgroundImage
					=`url(${tar.dataset.lg})`;
			}
		}
		/*****鼠标进入中图片启动放大镜*****/
		var superMask=document.querySelector("#superMask");
		var mask=document.querySelector("#mask");
		superMask.onmouseover=function(){
			mask.style.display="block";
			largeDiv.style.display="block";
		}
		superMask.onmouseout=function(){
			mask.style.display="none";
			largeDiv.style.display="none";
		}
		 var MSIZE=175,SMSIZE=350;
		superMask.onmousemove=function(e){
			var x=e.offsetX, y=e.offsetY;
			var top=y-MSIZE/2;
			var left=x-MSIZE/2;
			if(top<0) top=0;
			else if(top>SMSIZE-MSIZE)
				top=SMSIZE-MSIZE;
			if(left<0) left=0;
			else if(left>SMSIZE-MSIZE)
				left=SMSIZE-MSIZE;
			mask.style.top=top+"px";
			mask.style.left=left+"px";
			largeDiv.style.backgroundPosition
				=`${-left*16/7}px ${-top*16/7}px`;
		}
		
		});
	}
})()












