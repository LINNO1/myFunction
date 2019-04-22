/*
这是自制的简易版的jquery,实现了 jquery 的 如下方法：
    $('xxx').on();
    $('xxx').addClass()
    $('xxx').removeClass()
    $('xxx').toggleClass()
    $('xxx').text()
    $('xxx').html()
    $('xxx').find()
    $('xxx').end()
  还可以链式调用：$('xxx').find().addClass()..html()

*/

window.jQuery=window.$=function(selector){
	var array=[];
    
    // return {
  // 	on: function(eventType,funct){},
  // 	addClass: function(){},
  // 	removeClass: function(){},
  // 	text: function(){},
  // 	html: function(){},
  //    find: function(){},
  //    end: function(){}

  // }
    /*var getElement = document.querySelectorAll(selector);
    console.log(getElement)
    for(var i=0;i<getElement.length;i++){
    	array.push(getElement[i]);
    }
*/
    if(selector instanceof Array ){
    	for(var i=0;i<selector.length;i++){
    	     array.push(selector[i]);
       }
        array.preSelector=selector.preSelector; //把之前记录的上一级赋值
    }else{
        var getElement = document.querySelectorAll(selector);
    
        for(var i=0;i<getElement.length;i++){
    	     array.push(getElement[i]);
         }


    }


    array.on=on;
    array.addClass=addClass;
    array.removeClass=removeClass;
    array.toggleClass=toggleClass;
    array.text=text;
    array.html=html;
    array.find=find;
    array.end=end;
    return array;


    function on(eventType,funct){
    	for(var i=0;i<array.length;i++){
    	  array[i].addEventListener(eventType,funct);
      }
      return array;
    }
    function addClass(className){
    	for(var i=0;i<array.length;i++){
    	  array[i].classList.add(className);
      }
      return array;
    }
      function removeClass(className){
    	for(var i=0;i<array.length;i++){
    	  array[i].classList.remove(className);
      }
      return array;
    }
      function toggleClass(className){
    	for(var i=0;i<array.length;i++){
    	  array[i].classList.toggle(className);
      }
      return array;
    }
     function text(value){
     	if(value!=undefined){
     		for(var i=0;i<array.length;i++){
    	            array[i].textContent=value;
            }
     	}else{
     		var result=[];
     		for(var i=0;i<array.length;i++){
    	           result.push(array[i].textContent);
            }
            return result;
     	}

    }
    function html(value){
     	if(value!=undefined){
     		for(var i=0;i<array.length;i++){
    	            array[i].innerHTML=value;
            }
     	}else{
     		var result=[];
     		for(var i=0;i<array.length;i++){
    	           result.push(array[i].innerHTML);
            }
            return result;
     	}

    }

  /* find: 找该元素下的符合条件的所有子元素,返回的是jquery对象,得用递归实现，这里实现的是寻找直接子元素*/
  /* children: 找该元素下的符合条件的直接子元素,返回的是jquery对象,*/
    function find(selector){
    	var childArray=[];
    	for(var i=0;i<array.length;i++){
    	         var element=array[i].querySelectorAll(selector);
    	         for(var j=0;j<element.length;j++){
                   childArray.push(element[j]);
    	         }
            }
            childArray.preSelector=array;//记录上一级的信息， 数组也是对象，可以加上属性
            return jQuery(childArray); /*返回的是jquery对象，于是修改前面的构造函数*/


    }
    /*返回上一级*/
    function end(){
    	return array.preSelector;
    }

}

    /*------------------BOM操作--------------------------------------------------*/
   /*注意事项: 函数也是对象,也有属性*/
   /*需求分析： 实现BOM的search功能： window.location.search 返回 ?a=1&b=2
     具体： $.bom.search(key,value)
   */

   //在函数$上添加一个属性，该属性也是个对象
   window.jQuery.bom=window.$.bom={
     openAtcenter: function(width,height,url){

     	     let f='width='+width+'px,height='+height+'px,screenX='+(screen.width/2-width/2)+'px,screenY='+(screen.height/2-height/2)+'px';
              console.log(f)
              window.open(url,'_blank',f);

     },
     search: function(key,value){
     	     let searchAll =function(){
     		     let resule={};
                 let search=window.location.search; //返回 ?a=1&b=2
                 /*操作：正则或其他，使之变成
                 result= {   a:1,
	                         b:2
                   }*/
                  if(search[0]==='?'){
						search=search.slice(1); //slice原字符串不变，结果再赋给原字符串 a=1&b=2
                   }
                  
                  let searchArray=search.split('&'); //searchArray=['a=1','b=2']
                  for(var i=0;i<searchArray.length;i++){
                  	let part=searchArray[i].split('=');
                  	result[encodeURIComponent(part[0])]=encodeURIComponent(part[1]);
                  }
                  return result;
     	       }

     		if(value===undefined){  //如果value不存在，说明是查询
     			 return searchAll()[key];
     		}else{  //如果key存在，修改value值；否则添加key=value
     			let result=searchAll();   
     			console.log('result') 			
     			let newSearch='&';
                   if(result[key]===undefined){  
                        if(window.location.search===''){
                          window.location.search+=encodeURIComponent(key)+'='+encodeURIComponent(value);
                        }else{
                        window.location.search+='&'+encodeURIComponent(key)+'='+encodeURIComponent(value);
                        }
                   	   
                   	     
                   }else{
                   	 result[key]=value;
                   	 for(let keyy in result){
                   	 	newSearch+=encodeURIComponent(keyy)+'='+encodeURIComponent(result[keyy])+'?';
                   	 }
                   	 window.location.search=newSearch.slice(0,length-1);
                   }
     		}

  	     }
     
   }


  


