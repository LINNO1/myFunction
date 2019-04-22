/*
  解决不同浏览器下监听事件的兼容问题

*/

/*版本1：解决参数问题
  问题：但是 this 代表不同, addEventListener是触发元素本身, attachEvent 是window
*/
/*function addEvent(node,type,handle){
	if(node){ return false; }
	if(node.addEventListener){
		node.addEventListener(type,handle,false);
		return true;
	}else{
		node.attachEvent('on'+type,handle);
		return true;
	}
   return false;
}*/
/*版本2：解决this的作用域 handle.apply(node,handle);
  问题：们这样等于添加了一个匿名的事件处理程序，无法用detachEvent取消事件处理程序
*/
/*function addEvent(node,type,handle){
	if(node){ return false; }
	if(node.addEventListener){
		node.addEventListener(type,handle,false);
		return true;
	}else if(node.attachEvent){
		node.attachEvent('on'+type,function(){
			handle.apply(node);//改变作用域，用node来执行该函数
			// handle.call(node,handle);
		});
		return true;
	}
   return false;
}*/
/*版本3：终极版 jQuery创始人 用闭包
*/
function addEvent(node,type,handle){
	if(node===undefined){ return false; }
	if(node.addEventListener){
		node.addEventListener(type,handle,false);
		console.log('node.addEventListener')
		return true;
	}else if(node.attachEvent){
		node['e'+type+handle]=handle;
		node[type+handle]=function(){
			node['e'+type+handle](window.event);
		}
		node.attachEvent('on'+type,node[type+handle]);
		console.log('node.attachEvent')
		return true;
	}
   return false;
}
function removeEvent(node,type,handle){
   if(node){ return false; }
	if(node.removeEventListener){
		node.removeEventListener(type,handle,false);
		return true;
	}else if(node.detachEvent){
		node.detachEvent('on'+type,node[type+handle]);
		node[type+handle]=null;
		return true;
	}
   return false;

}

function getEvent(e) {
    return e || window.event;
}

function getTarget(e) {
    return e.target || e.scrElement;
}

function preventDefault(e) {
    if (e.preventDefault)
        e.preventDefault();
    else
        e.returnValue = false;
}

function stopPropagation(e) {
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;
}