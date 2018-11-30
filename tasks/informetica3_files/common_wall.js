 function submit_comment(module_text_name){
	var comment =  $("#comment_body").val();
            comment = $.trim(comment);
	var comment_alert_text = 'Type your '+module_text_name+' here...';
	if(comment == '' || comment == comment_alert_text) {
		alert('Please enter some '+module_text_name);
		$('#preview_reply_body').html('');
		$('#preview_posted_by').html('');
		return false;
	}
	try{
	   //$('#submit_comment_button').hide();
	  //$('#comment_body').attr("disabled", "disabled");
	   
	   var content_id = $('#content_id').val(); 
	   var module_id = $('#module_id').val(); 
	   //var custom_activity_type = $('#custom_activity_type').val();

	   var url = base_url+"/ajax_files/add_common_wall_comment.php";
		
	   var dofollow = '';
	   if(document.getElementById('follow')) {
	   if(document.getElementById('follow').checked){dofollow = 'follow';}else{dofollow = '';}
	   }

	   $.post(url,{'action':'add_comment','comment':comment, 'content_id':content_id, 'module_id':module_id,'follow':dofollow},function(data){

   		data = $.trim(data);
		if(data.length > 0) {
			if($.trim(data) == "already_exist"){
				alert("Comment already exist.");				
			} else {
				if(data != 'Y') {
					var comments_count = $('#comments_count').val();
					var new_count = Number(comments_count)+1;
					$('#comments_count').val(new_count);
					$('#show_comments_count').html(new_count);

					var comments_total_count = $('#comments_total_count').val();
					var new_total_count = Number(comments_total_count)+1;
					$('#comments_total_count').val(new_total_count);
					$('#show_comments_total_count').html(new_total_count);
	
					$('#no_of_comments_display').show();
					$('#sorting_types').show();
	
					$(data).insertAfter('#new_comments_add');
                                        $('#add-new-question').modal('hide');
				} else {
					alert('Content has been sent to Administrator for Moderation.');
				}	
			}
			//$('#comment_body').attr("disabled", "");
			//$('#submit_comment_button').show();			

		}
		clearAndHide(module_text_name); 
	   });
	  }catch(e){
		alert(e.description);
	  }
 }

 
function showHideCommentBlock(obj, action, module_text_name){
  if(action == 'hide') { 
	var value = $("#comment_body").val();
	if(value == '') {
		$("#comment_body").val('Type your '+module_text_name+' here...');
	} 
  } else if(action == 'show'){
	var comment_alert_text = 'Type your '+module_text_name+' here...';
	if(($("#comment_body").val() == '') || ($("#comment_body").val() == comment_alert_text)) {
		$("#comment_body").val('');
	}
  }

  var showUinfo = true;
  var uid = parseFloat($('#user_id').val()); 
  if(uid > 0){
    showUinfo = false;
  }
  if(action == 'show'){
      obj.style.height='60px';      
      if(showUinfo){
	 $('#reply_info').show();
      }
      $('#submitanswer').show();
   }else if (action=='hide'){
	   //obj.style.height='25px';
      if(obj.value.replace(/ /g,'') == ''){
        if(showUinfo){
          $('#reply_info').hide();
	 }
      	 $('#submitanswer').hide();
      }     
   }   
 }
 
//Generate Preview while user is typing the comment..
function ShowPreview(allowed_to_view_posted_by) {
   userComment =  $("#comment_body").val();
   curDate = $('#curdate').val();
   PostedByInfo = "";
   if(userComment.replace(/ /g,'').length){
     var name = $('#name').val(); 
     userComment = userComment.replace(/\n/g,"<br>");
     var designation = $('#designation').val(); 
     var company = $('#company').val(); 
     $("#reply_preview").show(300);    
     document.getElementById('preview_reply_body').innerHTML = userComment;
	 
	 if(allowed_to_view_posted_by == 1) {
		 if(name.length && designation.length && company.length) {
		   PostedByInfo = "Posted By " +  name + ", " +designation+ " at " +company+ " | " + curDate;
		 }else if(name.length && designation.length) {
		   PostedByInfo = "Posted By " +  name + ", " +designation+ " | " + curDate;
		 }else if(name.length && company.length) {
		   PostedByInfo = "Posted By " +  name + ", " +company+ " | " + curDate;
		 }else if(name.length){
		   PostedByInfo = "Posted By " +  name + " | " + curDate;
		 }
		 document.getElementById('preview_posted_by').innerHTML = PostedByInfo;
	 }
	 
   }else{
      $("#reply_preview").hide(300);    
   }
}
 
 
function cancelReply(module_text_name){
	var comment =  $("#comment_body").val();
	var res = true;
	if(comment.replace(/ /g,'').length){
	  res = confirm("Whatever you have typed will be removed. Are you sure you do not want to submit your response?");
	}
	if(res){
		clearAndHide(module_text_name);
	}
}

//Clean the text fields and hide it
function clearAndHide(module_text_name){
	var showUinfo = true;
	var uid = parseFloat($('#user_id').val()); 
	if(uid > 0){
			showUinfo = false;
	}
	$("#comment_body").val('');
	if(showUinfo){
		$('#name').val('');
		$('#designation').val('');
		$('#company').val('');
	}
	$("#reply_preview").hide(300,function(){
		$('#preview_posted_by').html('');
		$('#preview_reply_body').html('');
	});
	obj = $("#comment_body");
	showHideCommentBlock(obj[0], 'hide', module_text_name);
}

function showhidereplybox(reply_id, action) {

	if(action == 'show') {
		$('#add_comment_reply_'+reply_id).show(); // AA
		$('#reply_blk_data_'+reply_id).show(); // AA
		$('#reply_blk_'+reply_id).show(); // AA
		
		$("#reply_blk_nodata_"+reply_id).show();
		$("#reply_"+reply_id).show();
		$("#reply_msg_"+reply_id).focus();
	} else if(action == 'hide') {
		var reply_msg =  $("#reply_msg_"+reply_id).val();
		var res = true;

		if(reply_msg.replace(/ /g,'').length){
		  res = confirm("Whatever you have typed will be removed. Are you sure you do not want to submit your response?");
		}
		if(res){
			$("#reply_blk_nodata_"+reply_id).hide();
			$("#reply_msg_"+reply_id).val('');
			$("#reply_"+reply_id).hide();
		}
	}
	
}

function submitreply(module_id, content_id, comment_id) { 
	var reply_count = $('#replies_count_'+comment_id).val();
	try{
		var reply_msg =  $("#reply_msg_"+comment_id).val();

		reply_msg = $.trim(reply_msg);

		if(reply_msg.replace(/ /g,'') == '' ){
			alert("Please enter your reply");
			return false;
		} else {
			var url = base_url+"/ajax_files/add_common_wall_reply.php";
			$.post(url,{'action':'add_reply','module_id':module_id,'content_id':content_id, 'reply_msg':reply_msg, 'comment_id':comment_id,'reply_count':reply_count},function(data){
				if(data.length > 0) {				
					var new_reply_count = Number(reply_count)+1;
					$("#reply_msg_"+comment_id).val('');
					$('#replies_count_'+comment_id).val(new_reply_count);
					$("#reply_"+comment_id).hide();
					if(reply_count == 0) {
						$('#add_comment_reply_'+comment_id).html(data);
					} else {
						//$(data).insertAfter('#insertreply_'+comment_id);
						var nresult = data.split('@#$@#$');
						
						$('#reply_blk_data_'+comment_id).prepend(data);
						$('#comment_count_'+comment_id).html(nresult[1]);
						
					} 
				}
			});
		}
	}catch(e){
		alert(e.description);
	}
}

function like_unlike_comment(module_id, content_id, comment_id, status, module_text_name) {

	try{

			var url = base_url+"/ajax_files/comment_likes.php";
			$.post(url,{'module_id':module_id,'content_id':content_id, 'status':status, 'comment_id':comment_id,'module_text_name':module_text_name},function(data){
				if(data.length > 0) {	
					result = data.split('@#$@#$');
					if($.trim(result[0]) == 'updated' || $.trim(result[0]) == 'inserted') {
						$("#comment_likes_"+comment_id).html(result[1]);
						$("#comment_unlikes_"+comment_id).html(result[2]);
					} else {
						alert($.trim(result[0]));
					}
				}
			});
		
	}catch(e){
		alert(e.description);
	}
}


function delete_comment(comment_id, module_id) {
	try{
		var url = base_url+"/ajax_files/delete_common_wall_comment.php";
		$.post(url,{'comment_id':comment_id, 'module_id':module_id},function(data){
			if(data.length > 0) {		
				$('#comment_blk_'+comment_id).remove();				
				var comments_count = $('#comments_count').val();
				var new_count = Number(comments_count)-1;
				$('#comments_count').val(new_count);
				$('#show_comments_count').html(new_count);

				var comments_total_count = $('#comments_total_count').val();
				var new_total_count = Number(comments_total_count)-1;
				$('#comments_total_count').val(new_total_count);
				$('#show_comments_total_count').html(new_total_count);

				if(new_count == 0) {
					$('#no_of_comments_display').hide();
					$('#sorting_types').hide();
				}
			}
		});
		
	}catch(e){
		alert(e.description);
	}
}

function delete_reply(comment_id, reply_id) {	
	try{
		var url = base_url+"/ajax_files/delete_common_wall_reply.php";
		$.post(url,{'comment_id':comment_id, 'reply_id':reply_id},function(data){
			if(data.length > 0) {		
				
				var reply_count = $('#replies_count_'+comment_id).val();
				var new_reply_count = Number(reply_count)-1;
				$('#replies_count_'+comment_id).val(new_reply_count);
				$("#reply_"+comment_id).hide();
				
				if(new_reply_count == 0) {
					$('#reply_blk_'+reply_id).remove();
					//$('#add_comment_reply_'+comment_id).html('');	// A-1
					//$('#reply_blk_data_'+comment_id).html(''); // A-2
					$('#reply_blk_data_'+comment_id).hide();
					$("#reply_blk_nodata_"+comment_id).hide();
					$('#add_comment_reply_'+comment_id).hide();
				} else {
					$('#reply_blk_'+reply_id).remove();
				}				
				
			}
		if($(".smlPic:last").parent().find("div.smlBodr"))
		{
		$(".smlPic:last").parent().find("div.smlBodr").remove();
		}
	});
	}catch(e){
		alert(e.description);
	}
}
user = false;
function get_comments(module_id, content_id, order, type, url_text, user) {
	//jais
	if(typeof(url_text)==='undefined') url_text = '';
	if(typeof(user)==='undefined') user = '';
	more_comments_click =2;
	try{
		var url = base_url+"/ajax_files/get_common_wall_comments.php";
		$.post(url,{'module_id':module_id,'content_id':content_id, 'order':order, 'activity':type, 'url_text':url_text, 'user':user},function(data){
			if(data.length > 0) {		
				$('#replies_list_block'+'_'+ order).html(data);				
			}
		});
		
	}catch(e){
		alert(e.description);
	}
}

var more_comments_click=2;
function get_more_comments(module_id, content_id, max_clicks, order, type, url_text, user) {
	//jais
	$('#getViewMore').hide();
	$('#ajax_status').html('Please wait... <img src="'+THEME_PATH+'/images/loading.gif">').show();
	if(typeof(url_text)==='undefined') url_text = '';
	if(typeof(user)==='undefined') user = '';
	var comments_count = $('#comments_count').val();
    //$('div#more_comment_link a span').html("<img src='"+base_url +"/images/loading_transparent.gif'>");
	try{
		var url = base_url+"/ajax_files/get_common_wall_more_comments.php";
		$.post(url,{'module_id':module_id,'content_id':content_id, 'order':order, 'comments_count':comments_count, 'activity':type, 'url_text':url_text, 'user':user},function(data){
			if(data.length > 0) {		
				$('#ajax_status').hide();
				if(order == 'start') {
					$('#new_comments_add_container').remove();
				}
				$('div#more_comment_link a span').text('More Updates');
				var result = data.split('@#$$#@');
				$(result[0]).insertBefore('#get_more_comments');
				
				if((more_comments_click == max_clicks) || ((Number(result[1])) == 0)) {
					$('#more_comment_link').remove();
				}
				
				var new_count = Number(comments_count)+Number(result[1]);
				$('#comments_count').val(new_count);
				$('#show_comments_count').html(new_count);

				if(Number(result[1]) != 0) {
					$('#no_of_comments_display').show();
					$('#sorting_types').show();
				}
				$('#getViewMore').show();
				more_comments_click++;
			}
		});
		
	}catch(e){
		alert(e.description);
	}
}

function get_page_more_comments(module_id, content_id, max_clicks, order, type, url_text, user) {
	//jais
	if(typeof(url_text)==='undefined') url_text = '';
	if(typeof(user)==='undefined') user = '';
	var comments_count = $('#comments_count').val();
    $('div#more_comment_link a span').html("<img src='"+base_url +"/images/loading_transparent.gif'>");
	try{
		var url = base_url+"/ajax_files/get_common_page_wall_more_comments.php";
		$.post(url,{'module_id':module_id,'content_id':content_id, 'order':order, 'comments_count':comments_count, 'activity':type, 'url_text':url_text, 'user':user},function(data){
			if(data.length > 0) {		
				
				if(order == 'start') {
					$('#new_comments_add_container').remove();
				}
				$('div#more_comment_link a span').text('More Updates');
				var result = data.split('@#$$#@');
				$(result[0]).insertBefore('#get_more_comments');
				
				if((more_comments_click == max_clicks) || ((Number(result[1])) == 0)) {
					$('#more_comment_link').remove();
				}
				
				var new_count = Number(comments_count)+Number(result[1]);
				$('#comments_count').val(new_count);
				$('#show_comments_count').html(new_count);

				if(Number(result[1]) != 0) {
					$('#no_of_comments_display').show();
					$('#sorting_types').show();
				}
				
				more_comments_click++;
			}
		});
		
	}catch(e){
		alert(e.description);
	}
}

function blog_article_like_dislike(article_id,type, status,page) {
	if(login_uid == '') {
		alert('Please login to do this action');return false;
	} else {

		try{

			var url = base_url+"/ajax_files/blog_article_likes.php";
			$.post(url,{'article_id':article_id, 'type':type, 'status':status},function(data){
			if(data.length > 0) {
					if(page == 'detail_page') {
						$('#article_like_dislike_'+article_id).html(data);
						$('#article_like_dislike_'+article_id+'_2').html(data);
					} else {					
						$('#article_like_dislike_'+article_id).html(data);
					}	
				}
			});
		
		}catch(e){
			alert(e.description);
		}
	}
}

function show_wall_video(cont_box, v_src, v_width, v_height) {
	if(typeof(v_width)==='undefined') v_width = '400';
	if(typeof(v_height)==='undefined') v_height = '332';

	if(v_src){
	isIE6 = /msie|MSIE 6/.test(navigator.userAgent); 

	if(isIE6) {
	  	var video_elt = document.createElement('embed');
		$(video_elt).attr({'type':'application/x-shockwave-flash','src':v_src,'allowscriptaccess':'never','allowfullscreen':'false','width':v_width,'height':v_height,'wmode':'transparent'});
		$('#'+cont_box).html(video_elt);
	} else {
		//$('#'+cont_box).html("<object width='"+v_width+"' height='"+v_height+"'><param name='movie' value='"+v_src+"'></param><param name='allowfullscreen' value='false'></param><param name='allowscriptaccess' value='never'></param><embed type='application/x-shockwave-flash' src='"+v_src+"' allowscriptaccess='never' allowfullscreen='false' width='"+v_width+"' height='"+v_height+"' wmode='transparent'></embed></object>");
		
		$('#'+cont_box).html("<iframe src='"+v_src+"' width='"+v_width+"' height='"+v_height+"' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px' allowfullscreen=''> </iframe>");
	}
	
	//$('#'+cont_box).css({'float':'none'}); // commented by AB
		//$('#'+cont+' a').hide();
		//alert($('#'+cont_box).html());
	}
}

function show_google_doc(cont_box, v_src) { 
    var fileurl = base_url+v_src;
	//"https://www.techgig.com/files/wall_upload/2486/test.xlsx";
	$('#comment_blk_' + cont_box).prepend("<div id='closeViewer_"+cont_box+"'><iframe src='http://docs.google.com/gview?url="+fileurl+"&embedded=true'style='width:630px;height:500px; padding-top:10px;' frameborder='0' ></iframe></div>" );
	$('#imgopen_' + cont_box).hide();
	$('#imgclose_' + cont_box).show();
	$('#imgDocType_' + cont_box).hide();
	//$("html, body").animate({ scrollTop: 400 }, "slow");
}
function close_google_doc(cont_box) {
  	$('#closeViewer_' + cont_box).html('');
	$('#imgopen_' + cont_box).show();
	$('#imgclose_' + cont_box).hide();
	$('#imgDocType_' + cont_box).show();
	//$('#closeViewer_' + cont_box).hide();
}
function get_lead_to_access_doc(cont_box, v_src, cid, type) {
	$.colorbox({
		open: false,
		scrolling: false,
		height:450,
		width:450,
		opacity:.5,
		href: base_url +"/ajax_files/companypage_access_lead.php",data:{'cont_box': cont_box, 'v_src': v_src, 'cid': cid, 'type': type}
	});return false;
}