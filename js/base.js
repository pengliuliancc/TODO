/** 模块化编程--闭包--好处是：安全性提高
 */
var myTodoModule = (function(){
	var task_list = [];//定义变量  值等于数组
	var $task_list,$content/*$addTaskSubmit,$task_list,$task_content,$desc,$datetime,$detail_submit,$delete*/;
	/*var  datailIndex,datailIndex;*///定义点击详情和删除的时候记录的索引index
	//初始化jQuery对象 
	var initJqVar = function(){
		
		$task_list = $('.task-list');
		$content = $('.content');//初始化jq对象只执行一次
		/*$addTaskSubmit = $('.addTaskSubmit');//监听，按钮
		$task_detail = $('.task-detail');
		$task_content = $('.detail-content');
		$desc = $('.desc');
		$datetime = $('.datetime');
		$detail_submit = $('.detail-submit');
		$delete = $('.delete');*/

	}

	//添加task_item操作方法----要和按钮的点击事件绑定
	var addTask = function(){
		var new_task={};//定义一个新的对象，存储添加的对象
		new_task.content = $content.val();//将input框的值赋值给新的对象的content。获取input框的内容
		task_list.push(new_task);//更新数组操作
		store.set('task_list',task_list);//保存task_list，存到数据库中
		
		renderOneItem(new_task);//
	}
	//向HTML列表中新添加一条记录
	var renderOneItem = function(new_task){
		var oneItem = '<div class="task-item"  data-index="'+i+'">'+
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
					$(oneItem).prependTo($task_list);
					/*$content.val('');
					listenDetail();*///必须再次注册click事件 ，重要的----详情的
					/*listenDelete();*///删除的

	}
	//添加任务监听事件
	/*var listenAddTaskItem = function(){
		$addTaskSubmit.click(function(){
			addTask();
		});
	}*/
	//向页面渲染task_list 页面初始化的时候，从store中取出值，并渲染
	var initRenderIndex= function(){
		$task_list.html('');//清空 之后遍历
		task_list = store.get('task_list');//取出task_list,并赋值给task_list.
		var taskHtmlStr = '';//定义一个字符串
		//遍历   i =task_list.length-1 i>=0 i--降序
		for(var i =task_list.length-1;i>=0;i--){
			//里面的一个item
			//task-item需要一个索引，点详情、删除的时候
			var oneItem = '<div class="task-item"  data-index="'+i+'">'+
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
					taskHtmlStr  +=oneItem//拼接起来
		}
		/*$task-list.html(taskListHtmlStr);//非task_list填充item*/
		$(taskHtmlStr).appendTo($task_list);
		/*listenDetail();*///必须再次注册click事件

	}

	/*	点击任务item的详情编辑项目明细并保存 */
	/*var  listenDetail = function(){
		$('.datail').click(function(){
			datailIndex = task_list.length - 1 - $(this).parent().parent().index();
			$task_detail.show();
			$task_content.val(task_list[datailIndex].content);
			$desc.val(task_list[datailIndex].desc);
			$datetime.val(task_list[datailIndex].datetime);
		});
	}

	var listenDetailSave =function(){
		$detail_submit.click(function(){
			var dataTask ={}//空
			dataTask.content = $task_content.val();
			dataTask.desc = $desc.val();
			dataTask.datetime = $datetime.val();
			//修改更新操作，---要把修改后的对象和原来的对象合并
			task_list[datailIndex] = $.extend(task_list[datailIndex],dataTask);
			store.set('task_list',task_list);
			$task_content.val('');
			$desc.val('');
			$datetime.val('');
			$task_detail.hide();
			render_task_list ();
		});
	}*/

	//删除操作：
/*	var listenDelete = function(){
		$('.delete').click(function(){
			deleteIndex = task_list.length - 1 - $(this).parent().parent().index();
			var  r = comfirm('确认要删除吗？真的确认要删除吗？');
			if (r) {
				task_list.splice(deleteIndex,1);//splice方法，从数组中添加、删除项目，然后返回被删除的项目。有两个参数，第一个是索引，第二个是个数*/
			/*	$(this).parent().parent().remover();*/
	/*		}
		});*/
	/*}**///


	//页面初始化就要执行的方法放在initmodule里边
	var initModule = function(){
		/*store.set('task_list',task_list)*////清空
		initJqVar();
	/*	$datetime.datetimepicker();*///下载下来的日期插件datetimepicker.js
		addTask();//添加
		/*listenAddTaskItem();*///添加任务列表监听事件
		initRenderIndex();
		/*render_task_list ();
		listenDetail();
		listenDetailSave();
		listenDelete();*/
	}
	return{
		initModule:initModule
	}
})();

$(function(){
	myTodoModule.initModule();
});

