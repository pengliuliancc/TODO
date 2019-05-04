/* 1.使用模块化编程写法   --闭包---安全性提高--名字都不是固定的*/
var myTodoModule = (function(){

	/*  4.定义变量   */
	var task_list = [];
	//6. c  5.2
	var $task_list,$content,$addTaskSubmit,$task_detail,$task_content,$desc,$datetime,$detail_submit,$delete;
	var  detailIndex,deteleIndex;//定义点击详情和删除的时候记录的索引index
	



   /*  3.  a.初始化jQuery对象  */
    var initJqVar = function(){
   		//6.b
   		$task_list = $('.task-list');
   		// 5.3
   		$content = $('.content');
   		$addTaskSubmit = $('.addTaskSubmit');
   		$task_detail =$('.task-detail');
   		$task_content = $('.detail-content');
   		$desc = $('.desc');
   		$datetime = $('.datetime');
		$detail_submit = $('.detail-submit');
		$delete = $('.delete');
    }


    /*6. 向页面渲染task_list 页面初始化的时候，从store中取出值，并渲染*/
    var initRenderIndex = function(){
    	//6. d
 		$task_list.html('');
    	// 6. a 取出task_list,并赋值给task_list. 然后下一步遍历
    	task_list = store.get('task_list');
    	//6. f  定义字符串
    	var taskHtmlStr = '';
    	//6. e  遍历   i = task_list.length-1;i >=0;i-- 降序
    	for(var i = task_list.length-1;i >=0;i--){
    		var oneItem = '<div class="task-item">'+
					'<span>'+
					'<input type="checkbox" name="">'+
					'</span>'+
					'	<span class="item-content">'+task_list[i].content+
					'</span>'+
					'<span class="fr">'+
					'<span class="action detail">'+
					'详情'+
					'</span>'+
					'<span class="action delete">'+
					'删除'+
					'</span>'+
					'</span>'+
					'</div>';
					taskHtmlStr = taskHtmlStr + oneItem;//拼接起来
    	}
    	//6.  g
    	$(taskHtmlStr).appendTo($task_list);

    	listenDetail();///必须再次注册click事件 ，重要的----详情的
    	listenDelete();///删除的
    }



   /*  5. 添加task_item操作方法----要和按钮的点击事件绑定*/
   var addTask = function(){
   		//5. 1
   		var new_task = {};
   		//5.4  获取输入框内容
   		new_task.content = $content.val();
   		//5.5  更新数组操作
   		task_list.push(new_task);
   		//5.6  保存task_list，存到数据库中
   		store.set('task_list',task_list);
   		//5.7
   		renderOneItem(new_task);
   }
  /* 5.8 向HTML列表中新添加一条记录 */
  	var renderOneItem = function(new_task){
  		var oneItem = '<div class="task-item">'+
					'<span>'+
					'<input type="checkbox" name="">'+
					'</span>'+
					'	<span class="item-content">'+new_task.content+
					'</span>'+
					'<span class="fr">'+
					'<span class="action detail">'+
					'详情'+
					'</span>'+
					'<span class="action delete">'+
					'删除'+
					'</span>'+
					'</span>'+
					'</div>';
					//追加
					$(oneItem).prependTo($task_list);
					$content.val('');
					listenDetail();///必须再次注册click事件 ，重要的----详情的
					listenDelete();///删除的
  	}


  	//添加任务监听事件
	var listenAddTaskItem = function(){
		$addTaskSubmit.click(function(){
			addTask();
		});
	}



	/*	点击任务item的详情编辑项目明细并保存 */
	var  listenDetail = function(){
		$('.detail').click(function(){
			detailIndex = task_list.length - 1 - $(this).parent().parent().index();
			$task_detail.show();
			$task_content.val(task_list[detailIndex].content);
			$desc.val(task_list[detailIndex].desc);
			$datetime.val(task_list[detailIndex].datetime);
		});
	}
	var listenDetailSave =function(){
		$detail_submit.click(function(){
			var dataTask ={}//空
			dataTask.content = $task_content.val();
			dataTask.desc = $desc.val();
			dataTask.datetime = $datetime.val();
			//$.extend方法，修改更新操作，---要把修改后的对象和原来的对象合并
			task_list[detailIndex] = $.extend(task_list[detailIndex],dataTask);//task_list已经更新了， 
			store.set('task_list',task_list);//保存
			$task_content.val('');
			$desc.val('');
			$datetime.val('');
			$task_detail.hide();
			initRenderIndex ();
		});
	}   



	//删除操作：
	var listenDelete = function(){
		$('.delete').click(function(){
			deteteIndex = task_list.length - 1 - $(this).parent().parent().index();
			var  r = confirm('确认要删除吗？真的确认要删除吗？');
			if (r) {
				task_list.splice(deteteIndex,1);//splice方法移除，从数组中添加、删除项目，然后返回被删除的项目。有两个参数，第一个是索引，第二个是个数*/
				$(this).parent().parent().remove();
		}
		});
	}


    /* 2.页面初始化要执行的方法放在initmodule里面*/

	var initModule = function(){
		/* store.set('task_list',task_list);*///清空
		initJqVar();/*3. b*/
		$datetime.datetimepicker();
		initRenderIndex();
		listenAddTaskItem();//
		listenDetail();
		listenDetailSave();
		listenDelete();
		

	}
	return{
		initModule:initModule 
	}
})();

$(function(){
	myTodoModule.initModule();
});        