/***
 * Javascript For All Techgig Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 01 June, 2016
 */

var BaseUrl = base_url; 
var base_location = '';
Base_Url = BaseUrl.replace("//", "/"), BaseUrl = -1 != base_location.indexOf("qna") ? base_location.substr(0, base_location.indexOf("qna")) : base_url + "/";
var HeaderHelpText = {};
HeaderHelpText.company = "Search Company..", HeaderHelpText.people = "Search people..", HeaderHelpText.projects = "Search Projects..", HeaderHelpText.jobs = "Search Jobs..", HeaderHelpText.answers = "Search Answers..", HeaderHelpText.webinars = "Search Webinars..", HeaderHelpText.news = "Search Tech News..", HeaderHelpText.courses = "Search Courses..";

var AutoCompleteURLs = {};
AutoCompleteURLs.company = BaseUrl + "ajax_files/autocomplete.php?type=comp_header_search", AutoCompleteURLs.institute = BaseUrl + "ajax_files/autocomplete.php?type=institute", AutoCompleteURLs.people = BaseUrl + "ajax_files/autocomplete.php?type=pp_header_search", AutoCompleteURLs.projects = BaseUrl + "ajax_files/autocomplete.php?type=project_header_search", AutoCompleteURLs.jobs = BaseUrl + "ajax_files/autocomplete.php?type=job_header_search", AutoCompleteURLs.answers = BaseUrl + "ajax_files/autocomplete.php?type=qna_header_search", AutoCompleteURLs.webinars = BaseUrl + "ajax_files/autocomplete.php?type=webinar_header_search", AutoCompleteURLs.news = BaseUrl + "ajax_files/autocomplete.php?type=news_header_search", AutoCompleteURLs.courses = BaseUrl + "ajax_files/autocomplete.php?type=course_header_search" 

//base64 encoding and decoding, calling by Base64.encode(str),Base64.decode(str)
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}



$.getStylesheet = function(href) {
    var $d = $.Deferred();
    var $link = $('<link/>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: href
    }).appendTo('head');
    $d.resolve($link);
    return $d.promise();
};

function trim(str) {
    return $.trim(str);
}

Tg_CommonFunction = new function() {
    var $instance = this;
    $instance.validateEventRegisttrationFrom = function () {   

		var first_name = $.trim($("#first_name").val());
		var email = $.trim($("#register_email").val());
		var password = $.trim($("#user_password").val());
		var gender = $.trim($("#gender-field").val());
		var current_status = $('input[name=current_status]:checked').val();
		var mobile_phone = $.trim($("#mobile_phone").val());
		first_name = (typeof first_name === "undefined") ? "" : first_name;
		email = (typeof email === "undefined") ? "" : email;
		password = (typeof password === "undefined") ? "" : password;
		mobile_phone = (typeof mobile_phone === "undefined") ? "" : mobile_phone;
		gender = (typeof gender === "undefined") ? "" : gender;
		
		$(".error_msg").remove();
		
		if(first_name==''){
			//$('#first_name').parent().addClass('has-error');
			$("<span class='error_msg'> Please enter your name.</span>" ).insertAfter("#first_name");	
		}
		if(email==''){
			//$('#register_email').parent().addClass('has-error');
			$("<span class='error_msg'> Please enter your email.</span>" ).insertAfter("#register_email");
		}
		if(password==''){
			//$('#user_password').parent().addClass('has-error');
			$("<span class='error_msg'> Please enter your password.</span>" ).insertAfter("#user_password");
		}
		
		 if(mobile_phone==''){
			//$('#mobile_phone').parent().addClass('has-error');
			$("<span class='error_msg'> Please enter your mobile number.</span>" ).insertAfter("#mobile_phone");
		}
		
		
		if(gender == ''){
			//$('#current_company').parent().addClass('has-error');
			$("<span class='error_msg'> Please select your gender!</span>" ).insertAfter("#gender-select");
		}
		
		if(first_name!='' && email!='' && password!='' && gender != '' && mobile_phone != '') { //  && mobile_phone!=''
			//$("#page-overlay1").css("display","table");
			return true;
		} else {
			return false;
		}
	
	};
	
    $instance.init = function() {
    	
        //make ajax requext to load the recommendation module
        $(document).on('click', '.open-recommendation-pop', function(){
            var url = base_url + '/tg_recommendation.php';
            $('#recommendation-append').load(url, function(e) {
               
            });
        });
		
		$(document).on('click', '#mob-app-banner a', function(){
			$("#mob-app-banner").fadeOut();
		});
        
		$('[data-toggle="tooltip"]').tooltip();
        
        $(document).on('change', '.recommendation-check', function(){
            var arr_sort = new Array();
            $(".recommendation-check").each(function(){
                if( $(this).is(':checked') ){
                    arr_sort.push($(this).attr("data-roles"));
                }
            });
            $('.add-roles').val(arr_sort);
            var n = arr_sort.length;
            $( "input[type=checkbox]:not(:checked)" ).prop('disabled', (n===3) ? true : false);
        });
		
		if (navigator.userAgent.match(/MSIE\s(9.0)/)) {
			$(".ie-alert").removeClass("hide");
		} else if (navigator.userAgent.match(/MSIE\s(8.0)/)) {
			$(".ie-alert").removeClass("hide");
		} else if (navigator.userAgent.match(/MSIE\s(7.0)/)) {
			$(".ie-alert").removeClass("hide");
		} else if (navigator.userAgent.match(/MSIE\s(6.0)/)) {
			$(".ie-alert").removeClass("hide");
		}
		
		/*if (navigator.userAgent.match(/MSIE\s(?!9.0)/)) {
			$(".coding-page .ie-alert").removeClass("hide");
		}*/
		
		$(".form1 .select select").each(function(){
			var current = $(this).val();
			 
			  if (current != "") {
				  $(this).css('color','#4a4548');
			  } else {
				  $(this).css('color','#999999');
			  }

		});
		
		$('.form1 .select select').change(function() {
			 var current = $(this).val();
			 
			  if (current != "") {
				  $(this).css('color','#4a4548');
			  } else {
				  $(this).css('color','#999999');
			  }
		}); 
		
		$(window).scroll(function() {
			var windowScroll = $(window).scrollTop();
			var onScrollSpace1 = ($("#breadcrumbs").innerHeight() + $(".main-banner").innerHeight() + $(".challenge-tests").innerHeight());
			var hideSideHeight = ($(".left-panel").innerHeight() / 1.2);
			
			if(windowScroll >= onScrollSpace1) {
				$("#contest-summary-widget").addClass('fixed');
				$("#contest-summary-widget .show-on-scroll").show();

			}else {
				$("#contest-summary-widget .show-on-scroll").hide();
				$("#contest-summary-widget").removeClass('fixed');
				$("#common-navigation ul li").removeClass("active");
				$("#common-navigation ul li:first-child").addClass("active");
			}
			
			if(windowScroll >= hideSideHeight) {
				$("#contest-summary-widget").removeClass('fixed');
			}
			
			
			
			
			/*if (windowScroll > (($("#header").innerHeight() + $("#breadcrumbs").innerHeight() + $(".main-banner").innerHeight())) / 1.8 + 20) {
				$('.practice-viewanswers-page #question-controller').addClass('fixed');
			}
			else{
				$('.practice-viewanswers-page #question-controller').removeClass('fixed');
			}*/
		

			if ((windowScroll + $("#footer").innerHeight()) > ($('#coding-platform').height())) {
				
				/*if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ){
					$('.practice-viewanswers-page #question-controller.fixed').css('top', (0 - (( windowScroll + $("#footer").innerHeight() + 15) - $('#coding-platform').height())));
				}else {
					$('.practice-viewanswers-page #question-controller.fixed').css('top', (0 - (( windowScroll + $("#footer").innerHeight() + 41) - $('#coding-platform').height())));
				}*/
				
				$('#coding-platform').addClass('at-bottom');
				
			}
			else{
				$('.practice-viewanswers-page #question-controller.fixed').css('top', 0);
				$('#coding-platform').removeClass('at-bottom');
			}

		});
		
		$(document).on("click", ".practice-viewanswers-page #question-controller .questions-list ul li > a", function() {
			$(".practice-viewanswers-page #question-controller .questions-list ul li").removeClass("current");
			
			if($(this).parent().hasClass("current")) {
				$(this).parent().removeClass("current");
			} else {
				$(this).parent().addClass("current");
			}
		});
		
		$(document).on("click", ".more-jobs-lnk", function() {
			var moretext = "More";
			var lesstext = "Less";	
			
			if($(this).hasClass("less")) {
				$(this).removeClass("less");
				$(this).find('small').html(moretext)
			} else {
				$(this).addClass("less");
				$(this).find('small').html(lesstext);
			}
			$(this).prev('.hidden-txt').toggle();
			return false;
		});
		
		$(document).on("click", ".custom-selectbox .btn", function() {
				
			if($(this).parent().hasClass("open")) {
				$(this).parent().removeClass("open");
			} else {
				$(".custom-selectbox").removeClass("open");
				$(this).parent().addClass("open");
			}
			
			if($(this).parent().hasClass("checkbox")){
				
				var checkVal = $($(this).parent().find("input:checkbox:checked")).map(function() {
				return this.value;
				})
				.get()
				.join(", ");
				$(this).text(checkVal);
				
			}
			
		});
		
		$(document).on("click", function(event){
			var $trigger = $("#problems-content header .inner, #search-filter form > ul li.select-field");
			if($trigger !== event.target && !$trigger.has(event.target).length){
				$(".custom-selectbox").removeClass("open");
			}            
		});
		
		$(".custom-selectbox input").change(function() {
			
			if($(this).attr('type') == 'checkbox'){
				
				var checkVal = $($(this).parents(".custom-selectbox").find("input:checkbox:checked")).map(function() {
				return this.value;
				})
				.get()
				.join(", ");
				
			   $(this).parents(".custom-selectbox").find(".btn").text(checkVal);
			   
			   if ($(this).parents(".custom-selectbox").find("input:checkbox:checked").length == 0 && !this.checked){
					this.checked = true;
					$(this).parents(".custom-selectbox").find(".btn").text($(this).val());
			   }
				
			}else if($(this).attr('type') == 'radio'){
				$(this).parents(".custom-selectbox").find(".btn").text($(this).val());
				$(this).parents(".custom-selectbox").find(".btn").addClass("selected");
			}
		});
		
		
		$(document).on("click", "#page-header .category-menu-btn", function() {
			var moretext = '<i class="fa fa-chevron-circle-down" aria-hidden="true"></i>';
			var lesstext = '<i class="fa fa-chevron-circle-up" aria-hidden="true"></i>';	
			
			if($(this).hasClass("less")) {
				$(this).removeClass("less");
				$(this).html(moretext);
			} else {
				$(this).addClass("less");
				$(this).html(lesstext);
			}
			$(this).prev('#page-header ul').slideToggle();
			return false;
		});
		
		$(document).on("click", "#rating_area ul li", function() {
			
			//$(".main-banner .rating-area .rating1 p .icon").hide();
			
			$('.rate-challenge ul li').unbind( "mouseover, mouseout" );
		
			var rating = 0;
			rating = $(this).attr('id');
			if(rating<=3){
				$("#user-feedback-form").show();
			} else {
				$("#user-feedback-form").hide();
			}
			$("#show_rating").html('');
			if(rating=='1'){
				$("#show_rating ").html('Poor');
				$("#click-to-rate").html('Poor');
			}else if(rating=='2'){
				$("#show_rating").html('Average');
				$("#click-to-rate").html('Average');
			}else if(rating=='3'){
				$("#show_rating").html('Good');
				$("#click-to-rate").html('Good');
			} else if(rating=='4'){
				$("#show_rating").html('Very Good');
				$("#click-to-rate").html('Very Good');
			} else if(rating=='5'){
				$("#show_rating").html('Excellent');
				$("#click-to-rate").html('Excellent');
			} else {
				$("#click-to-rate").html('');
				$("#click-to-rate").html('');
			}
			Tg_CommonFunction.starRating(rating);
		});
		
		$(document).on("click", "#user-feedback-form .close", function() {
			$(this).parent().hide();
		});

		// Show hide content on skilltest banner
		$(document).on("click", ".skill-show-hide-lnk", function() {
			var moretext = "Read More";
			var lesstext = "Read Less";	
			
			if($(this).hasClass("less")) {
				$(this).removeClass("less");
				$(this).html(moretext);
				/*$("html, body").animate({ scrollTop: 0 }, 1000);*/
				
			} else {
				$(this).addClass("less");
				$(this).html(lesstext);
				/*$("html, body").animate({ scrollTop: 100 }, 1000);*/
			}

			$(this).parent().find('.hidden-txt').toggle();
			$(this).parent().find('.dotted').toggle();
			return false;
		});
		
		$('.landing-page .previous-btn, .landing-page .next-btn').click(function() {
			var bLazy = new Blazy();
		});
        
        $(document).on('click','.save-recommendation',function(){
            var allRoles = $('.add-roles').val();
            var allSkills = $("#recommended-skills").val();
            var user_id = $("#recommendation-userid").val();
            var email_id = $("#recommendation-email").val();
            var name = $("#recommendation-name").val();
            $.ajax({
						type: "POST",
						url: base_url + "/tg_recommendation.php",
						data: { 'allRoles': allRoles, 'allSkills': allSkills,'user_id' : user_id, 'email_id':email_id, 'name' : name,'action' : 'saveRecommendation'},
						success: function(data) {
							$('#customize-recommendation').modal('hide');
						}
				});
        });
		
		$("#need_help_coding").click(function(){
			$('#need-help-section .modal-body').load(base_url + "/ajax_files/need_help.php");
			$("#need-help-section").modal('show');
		});
		
	 $('#coding_faq_submit').on('click', function() {
		
		$( "#need-help-section li").removeClass( "has-error" );
		$( "#need-help-section .error_msg").remove();	
		
		
		$('#coding_faq_submit').addClass( "disabled" );
		
		
		var season_id= $(this).data('season_id');
		var season_title= $(this).data('season_title');
		var name = $('#need-help-section #fullname').val();
		var email = $('#need-help-section #email').val();
		var mobile = $('#need-help-section #mobile').val();
		var message = $('#need-help-section #message').val();
		var file_data = $('#need-help-section #chapter_ppt_file').prop('files')[0];   
		var form_data = new FormData();                  
		form_data.append('chapter_ppt_file', file_data);
		form_data.append('season_id', season_id);                                                    
		form_data.append('name', name);                                                    
		form_data.append('email', email);                                                    
		form_data.append('mobile', mobile);                                                    
		form_data.append('message', message);  
		form_data.append('season_title', season_title);  
		
		$.ajax({
				url: base_url+'/ajax_files/saas_candidate_function.php?action=post_need_help_query', 
				dataType: 'text',  // what to expect back from the PHP script, if anything
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,                         
				type: 'post',
				success: function(data){
					data = $.trim(data);
					var msg = data;
					  if(msg.status=='success') {
						$("#need-help-section").modal('hide');
						$('#coding_faq_submit').removeClass( "disabled" );
						$('.msgErrortop .message-box').addClass('success-msg').find('p').html('Query posted successfully!'); 
						Tg_CommonFunction.clearMessage();
					  } else {
						$.each(msg, function (index, value) {
						$("input[name="+index+"], textarea[name="+index+"]").closest('li').addClass( "has-error" );
						$( "<span class='error_msg'> "+value+" </span>" ).insertAfter("input[name="+index+"], select[name="+index+"], textarea[name="+index+"]");
						});
						$('#coding_faq_submit').removeClass( "disabled" );
					  } 
				}
		 });
	});
	
		// Function to follow/unfollow entity
		$(document).on("click", ".follow_entity", function() {
			
			var entity_id = $(this).attr('data-entity_id');
			var entity_type = $(this).attr('data-entity_type');
			var page_type = $(this).attr('data-page_type');
			var action = $(this).attr('data-action');
			
			entity_type = (typeof entity_type === "undefined") ? "company" : entity_type;
			page_type = (typeof page_type === "undefined") ? "" : page_type;
			action = (typeof action === "undefined") ? "" : action;
			
			if(action == 'follow') {
				var status = 'Y';
			} else {
				var status = 'N';
			}
			
			try {
				var url = base_url + "/ajax_files/follow_entity.php";
				$.post(url, {
					'entity_id': entity_id,
					'entity_type': entity_type,
					'page_type': page_type,
					'status': status
				}, function(data) {
					var data_val = $.trim(data);
					var tmp_data = data_val.split('##||##');
					data = tmp_data[0];
					
					if (data.length > 0) {
						if (data != 'Y' && data != 'N') {
							alert(data);
							return false;
						}
						if ($.trim(status) == 'Y') {
							$('#ancFollow_' + entity_id).hide();
							$('#ancUnfollow_' + entity_id).show();
							var temp_cnt = parseInt($('#comp_follow_cnt_inp_' + entity_id).val());
							var cnt_up_tmp = tmp_data[1];
							var cnt_up = temp_cnt + 1;
							$('#comp_follow_cnt_inp_' + entity_id).val(cnt_up);
							$('#comp_follow_cnt_' + entity_id).html(cnt_up_tmp);
							$('#setting_' + entity_id).show();
						} else {
							$('#ancUnfollow_' + entity_id).hide();
							$('#ancFollow_' + entity_id).show();
							var temp_cnt = parseInt($('#comp_follow_cnt_inp_' + entity_id).val());
							var cnt_up_tmp = tmp_data[1];	//temp_cnt - 1;
							var cnt_up = temp_cnt - 1;
							if (cnt_up < 0) {
								cnt_up = 0;
							}
							$('#comp_follow_cnt_inp_' + entity_id).val(cnt_up);
							$('#comp_follow_cnt_' + entity_id).html(cnt_up_tmp);
							$('#setting_' + entity_id).hide();
						}
					}
				});

			} catch (e) {
				alert(e.description);
			}
			
		});
		
		var windowHeight = window.innerHeight;
		$("#page-overlay1").height(windowHeight);
		

		$instance.saveResponseNSetCookieForBanner = function(){
			var url = base_url + '/general_ajax_task.php?action=set_banner_cookie';
			$.post(url, null, function(data){ 
			data = $.trim(data);
			if(data == 'Y') {
			//
			}
			});
			return false;
		}
        
        $.getScript(theme_url + "/javascript/head.core.min.js")
            .done(function() {
                console.log('Headcore loaded');
            })
            .fail(function() {
                console.log('Headcore not loaded');
            });

        /*var bannerSrc = $(".main-banner").find('.banner-bg').attr("src");
        $(".main-banner").css("background-image", "url(" + bannerSrc + ")");*/
		
		var eventsBannerSrc = $(".event-box .banner").find('img').attr("src");
        $(".event-box .banner").css("background-image", "url(" + eventsBannerSrc + ")");
		
		if($('#page-header').length > 0) {

		}else{
			$("#container-wrap").addClass("normal-padding");
		}
		
		$("#detailed-search .tabs1 .nav-tabs > li > a").click(function(){
			var href = $(this).attr('href');
			$("#detailed-search .result-block").hide();
			
			if($(this).parent().hasClass('all-result-tab')){
				$("#detailed-search .result-block").fadeIn();
			}else{
				$(href).fadeIn();
			}	
        });
		
		$(document).on("click", ".message-box .close", function() {
			$(this).parent().css('right',-390);
			$('.message-box').removeClass('success-msg').removeClass('warning-msg').removeClass('error-msg').removeClass('info-msg');
			return false;
		});
		
		$(document).on("click", ".common-message-box .close-msg", function() {
			$('.message-inner-content').addClass('move-top');
			setTimeout(function(){
				$('.message-inner-content').removeClass('success-msg').removeClass('warning-msg').removeClass('error-msg').removeClass('info-msg');
				$('.message-inner-content').removeClass('move-top');
			}, 500);
			return false;
		});
	
		$('#full-screen-question.expanded .half-column .scroll').innerHeight($(window).height() - $("#coding-platform-head").innerHeight());
		
		$(window).resize(function() {
			$('#full-screen-question.expanded .half-column .scroll').innerHeight($(window).height() - $("#coding-platform-head").innerHeight());
		});
		
		/* Clone Downloadapp */
		$("#download-app-pophover").appendTo("#mobile-app-wrap");
		
		
		$(".account-settings .change").click(function(){
			$(".account-settings .block.active").removeClass('active');
			$(this).parent().parent().addClass('active');
			return false;
        });
		
		$(".account-settings .cancel-btn").click(function(){
			$(this).parents().removeClass('active');
			$(".account-settings .change").show();
        });
		
		// Mobile-dropdown-view
		$(document).on("click", ".mobile-dropdown-view .btn, #multi-breakdown-list .btn", function() {
			
			$(".mobile-dropdown-view ul, #multi-breakdown-list ul").slideUp("fast");
			$(".mobile-dropdown-view .btn, #multi-breakdown-list .btn, .contest-section .header .dropdown").removeClass("less");
			$("#common-navigation.for-contest .filter-lists").hide();	
			$("#common-navigation.for-contest .contest-filter .btn").removeClass("less");
			
			if($(this).hasClass("less")) {
				$(this).removeClass("less");
				$(this).parent().find("ul").slideUp("fast");
				
			} else {
				$(this).addClass("less");
				$(this).parent().find("ul").slideDown("fast");
			}
		});
		
		if ($(window).width() < 767) {
			$(document).on("click", function(event){
				var $trigger = $(".mobile-dropdown-view, #multi-breakdown-list, .contest-section .header .dropdown");
				if($trigger !== event.target && !$trigger.has(event.target).length){
					$(".mobile-dropdown-view ul, #multi-breakdown-list ul").slideUp("fast");
					$(".mobile-dropdown-view .btn, #multi-breakdown-list .btn, .contest-section .header .dropdown").removeClass("less");
				}            
			});	
		}

		$(".mobile-dropdown-view .btn, #multi-breakdown-list .btn").each(function() {
			$(this).html($(this).parent().find("ul > li.active a").text()); 
		});
		
		$("#main-navigation ul > li").hover(
		  function() {
			$("#search-result-lists").fadeOut();
			//inactive past search
			$.ajax({
                type: "POST",
                url: base_url + '/common/DismissUserSearch',
                data: {},
                success: function (response) {
	
                }
             });
		  }
		);

		$(document).on("click", ".mobile-dropdown-view ul > li a", function() {
			if ($(window).width() < 767) {
				$(this).parents(".mobile-dropdown-view").find(".btn").removeClass("less").html($(this).html());
				$(".mobile-dropdown-view ul").slideUp("fast");
				
			} else {
				$(this).parents(".mobile-dropdown-view").find(".btn").html($(this).html());
			}
		});
		
		$(document).on("click", "#multi-breakdown-list ul > li a", function() {
			$(this).parents("#multi-breakdown-list").find(".btn").removeClass("less").html($(this).html());
			$("#multi-breakdown-list ul").slideUp("fast");
		});
		
		$(document).on("click", ".mobile-dropdown-view ul > li a, .tabs1 .nav-tabs.three > li", function() {
			if ($(window).width() < 767) {
				setTimeout(function(){ var userBoardWidth = $("#content").width() - 20;  
				$("#active-user-status").width(userBoardWidth);	 }, 1000);
			}
		});
		
		$(window).resize(function() {
			if ($(window).width() < 767) {
				var userBoardWidth = $("#content").width() - 20; 
				$("#active-user-status").width(userBoardWidth);
			}
		});

        $(document).on("click", ".open-recommendation-pop", function() {
            $("#customize-techgig-sm-btn").trigger("click");
        });

		// Forgot Password
		$(document).on("click", "#open-forgot-password", function() {
			$("#TechGigbootStrapModal").modal('hide');
			setTimeout(function(){ $("body").addClass('modal-open'); $("#forgot-password").modal("show"); }, 500);
        });
		
		$(document).ready(function() {
			$('#digital-navigation .menu-btn').click( function(){
				$('#digital-navigation > ul').slideToggle();
			});
		});
		
		$(document).on("click", ".table1-wrap .expand-collapse-btn", function() {
			if($(this).parents("tr").hasClass("current")){
				$(this).parents("tr").removeClass("current").next(".open-content").fadeOut();
				$(this).text("View");
			}
			else {
				$('.table1 tr').removeClass("current");
				$('.table1 tr.open-content').fadeOut();
				$('.table1 .expand-collapse-btn').text("View");
				$('.table1 tr .expand-collapse-btn .fa').removeClass('fa-minus').addClass('fa-plus');
				$(this).parents("tr").addClass("current").next(".open-content").fadeIn();
				$(this).text("Hide");
			}
		});
		
		// TJTOKEN POPUP Password
		/* $(document).on("click", "#open-tjtoken-password", function() {
			$("#TechGigbootStrapModal").modal('hide');
			setTimeout(function(){ $("body").addClass('modal-open'); $("#tj-token-password").modal("show"); }, 500);
        }); */
		
		// TJ PopUp Import Uncheck action
		$('.checkbox-input #usemy-tj').click(function () {
			if (!$(this).is(':checked')) {
				Tg_CommonFunction.saveResponseNRefreshCookiesForTjPopUP();
				$("#tj-token-register-popup").modal('hide');
			}
		});
		
		// Take TJ Token User password and process
		$(document).on('click','#open-tjtoken-password',function(){
            var password = $.trim($("#tj_user_pwd").val());
			password = (typeof password === "undefined") ? "" : password;
			
			var user_tjtoken = $.trim($("#user_tjtoken").val());
			user_tjtoken = (typeof user_tjtoken === "undefined") ? "" : user_tjtoken;
			
			if(password==''){
				$('#err_tj_user_pwd').show().html('Please provide your password first!');
				return false;
			}
			
            $.ajax({
				type: "POST",
				url: base_url + "/general_ajax_task.php",
				data: { 'action': 'verify_tjtoken_user_password', 'password' : password,'auth_token' : user_tjtoken},
				success: function(data) {
					var tmp_data = data.split('||##||');
					
					if($.trim((tmp_data[0])) == 'success') {
						window.location.href=tmp_data[1];
					} else {
						$('#err_tj_user_pwd').show().html(tmp_data[1]);
					}
				}
				});
        });
		
		$(document).on("click", "#test-instructions, #mobile-test-instructions" , function() {
			// window.clearTimeout(SD);
            // window.clearTimeout(UE);
			
			//$("#instructions-popup").modal('show');
			
			$("#instructions-popup").modal({
				backdrop: 'static',
				keyboard: false
			});
			$('#instructions-popup').on('hide.bs.modal', function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
        });

		$(document).on("click", "#pause-test" , function() {
			// window.clearTimeout(SD);
   //                      window.clearTimeout(UE); 
			$("#test-paused").modal({
				backdrop: 'static',
				keyboard: false
			});
			$('#test-paused').on('hide.bs.modal', function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
        });
		
		$(document).on("click", "#submit-your-test" , function() {
			// window.clearTimeout(SD);
   //                      window.clearTimeout(UE);
			$("#submit-test").modal({
				backdrop: 'static',
				keyboard: false
			});
			$("#submit-test").on('hide.bs.modal', function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
        });

		$(document).on("click", "#need_help_coding_common" , function() {
			
			$("#success-message").empty();
			$("#need_help_window").modal("show");
        });
		
		// Need Help Query
		
		$("#formHelpUser").on('submit',(function(e) {
			e.preventDefault();
			$("#success-message").empty();
			var ajax_url = base_url+"/ajax_files/ajax_need_help.php";
			$.ajax({
			url: ajax_url, // Url to which the request is send
			type: "POST",             // Type of request to be send, called as method
			data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
			contentType: false,       // The content type used when sending data to the server.
			cache: false,             // To unable request pages to be cached
			processData:false,        // To send DOMDocument or non processed data file it is set to false
			success: function(data)   // A function to be called if request succeeds
			{
				$('#loading').hide();
				if(data.match('Invalid') || data.match('select')){
					$("#success-message").show();
					$("#success-message").html(data);
				} else {
					$("#success-message").show();
					$("#success-message").html(data);
					$("#message").val('');
					$("#file").val('');
					setTimeout(function(){
					  $('#need_help_window').modal('hide')
					}, 2000);
				}
			}
			});
		}));
	
		
		
		
		// Accordion
		$('#accordion .collapse').collapse({
			toggle: false
		});
		
		// External User PopUp Import Uncheck action
		$('.checkbox-input #usemy-external_data').click(function () {
			if (!$(this).is(':checked')) {
				Tg_CommonFunction.saveResponseNRefreshCookiesForEXTERNALPopUP();
				$("#external-data-register-popup").modal('hide');
			}
		});
		
		// Take External User password and process
		$(document).on('click','#open-external_data-password',function(){
            var password = $.trim($("#external_data_user_pwd").val());
			password = (typeof password === "undefined") ? "" : password;
			
			if(password==''){
				$('#err_external_data_user_pwd').show().html('Please provide your password first!');
				return false;
			}
			
            $.ajax({
				type: "POST",
				url: base_url + "/general_ajax_task.php",
				data: { 'action': 'VERIFY_EXTERNAL_DATA_user_password', 'password' : password},
				success: function(data) {
					var tmp_data = data.split('||##||');
					
					if($.trim((tmp_data[0])) == 'success') {
						window.location.href=tmp_data[1];
					} else {
						$('#err_external_data_user_pwd').show().html(tmp_data[1]);
					}
				}
				});
        });
		
		// Show hide popover
        $(document).on("click", "#search-filter .select-option, #customize-recommendation .form1 .custom-dropdown input[type='text']", function() {
			$("#search-filter .dropdown-menu").slideUp("fast");
            $(this).parent().find(".dropdown-menu").slideToggle("fast");
        });
		
		$(document).on("click", ".rating1 > ul > li" , function() {
			$("#question-area .question-status .rating-thanks").fadeIn();
			if($('.rating1 > ul > li.active').length < 4){
				$("#how-can-improve").fadeIn();
			}else{
				$("#how-can-improve").fadeOut();
			}
        });
		
		$(document).on("click", "#how-to-improve-btn" , function() {
			$("#how-can-improve").hide();
			$("#how-to-improve").modal("show");
        });
		
		
		
		
		$(window).scroll(function() {
			var windowScroll = $(window).scrollTop();
			var topScroll = ($(".main-banner").innerHeight() + $("#header").innerHeight() + $("#challenge-countdown").innerHeight());
			var bannerHeight = $(".main-banner").innerHeight();

			if($(window).width() > 767){
				if (windowScroll > topScroll) {
					$('.challenge-details-page .all-content-wrap').addClass('fixed');
				} else {
					$('.challenge-details-page .all-content-wrap').removeClass('fixed');
				}
			}
			
			if (windowScroll > bannerHeight) {
				$('.up-arrow-icon, .down-arrow-icon').removeClass('animated');
			}

		});
		
		$("#need-help .read-more-faq").click(function() {
			$(this).hide();
			$("#need-help .show-more-faq").show();
		});
		
		$(document).on("click", function(event){
			var $trigger = $(".custom-dropdown");
			if($trigger !== event.target && !$trigger.has(event.target).length){
				$($trigger).find(".dropdown-menu").slideUp("fast");
			}            
		});
		
		// Landing Global Search Form
		/* $('.landing-page #global-search-form').click(function() {
			$(this).addClass("active");
			$('#global-search-form .remove').fadeIn();
		});
		
		$('.landing-page #global-search-form .category-menu').click(function() {
			$("#global-search-form").css("overflow","visible");
		}); */
		
		// Global Search Form Code Starts Here
		$('#global-search-text').keyup(function() {
			if($('#global-search-text').val() == ''){
				$('#global-search-form .remove, #search-result-lists').fadeOut();
			}else{
				 var keywords = $('#global-search-text').val();
				 var category = $('#category_name').val();
				 $.ajax({
						type: "POST",
						url: base_url + "/ajax_files/userSearch.php",
						data: { 'keywords': keywords, 'category': category },
						success: function(data) {
							if(data.indexOf("no records") > -1) {
								$('#global-search-form .remove, #search-result-lists').fadeOut();
							} else {
								$('#search-result-lists').html(data);
								$("#global-search-form").css("overflow","visible");
								$('#global-search-form .remove, #search-result-lists').fadeIn();
							}
						}
				});
		
		
				//$('#global-search-form .remove, #search-result-lists').fadeIn();
				//alert(111);
			}
		});
		
		// Global Search Form Code Starts Here //change focus to click
		$('#global-search-text').click(function() {
			 $.ajax({
                type: "POST",
                url: base_url + '/common/GetPastUserSearch',
                data: {},
                success: function (response) {
					var data = response;
					if(data.status == 1) {
						$('#search-result-lists').html(data.response);
						$('#global-search-form .remove, #search-result-lists').fadeIn();
					}
                }
             });
		});
		
		$(document).on("click", "#global-search-form .remove" , function() {
			$('#global-search-text').val('');
			$('#global-search-form .remove').fadeOut();
			$("#search-result-lists").fadeOut();
			$("#global-search-form").removeClass("active");
			$("#global-search-form").css("overflow","hidden");
		});
		
		if ($(window).width() < 767) {
			$('#global-search-form').click(function() {
				$(this).addClass("active");
				$('#global-search-form .remove').fadeIn();
			});
			
			$('#global-search-form .category-menu').click(function() {
				$("#global-search-form").css("overflow","visible");
			});
		}
		
		// Search Form Code Starts Here
		$('#search-form input[type="text"]').keyup(function(e) {
			if($('#search-form input[type="text"]').val() == ''){
				$('#search-form-content, #search-form a.search-close').fadeOut();
				$('#search-form').removeClass("active");
			}else{

				var keyword = $('#search_skilltest').val();
				var page = $('#search-form input[name="page"]').val();
                                
                                if(page == 'challenge'){
                                    
                                    $.ajax({
						type: "POST",
						url: base_url + "/ajax_files/challenge_search.php",
						data: {'keyword': keyword},
						success: function(data) {
							if(data.indexOf("no records") > -1) {
								$('#search-form-content .no-content').show();
								$('#search-form-content .searched-content').hide();
							} else {
								$('#search-form-content .searched-content').html(data);
								$('#search-form-content .no-content').hide();
								$('#search-form-content .searched-content').show();							
							}
							$('#search-form-content, #search-form a.search-close').fadeIn();
							$('#search-form').addClass("active");
						}
					});
                                    
                }else if(page == "practice"){


                	var code = e.which;
                	switch(code){
						case 40: //down 
							
							var li = $('#search-form-content .searched-content li.practice_li');
							var selected =$('#search-form-content .searched-content li.active');
        					var current_li_num=selected.index('.practice_li');
        					li.removeClass('active');
        					var current;
       						if (current_li_num>=li.length-1) {
				            	current = li.eq(0);
					        } else {
					            current = li.eq(current_li_num+1);
					        }
					        current.addClass('active');
							break;

						case 38: //up

							var li = $('#search-form-content .searched-content li.practice_li');
							var selected =$('#search-form-content .searched-content li.active');
        					var current_li_num=selected.index('.practice_li');
        					li.removeClass('active');
							var current;
       						if (current_li_num<=0) {
				            	current = li.eq(li.length-1);
					        } else {
					            current = li.eq(current_li_num-1);
					        }
					        current.addClass('active');
							break;

						case 13: //enter

							var anchorSelector =$('#search-form-content .searched-content li.active a');
				           	anchorSelector[0].click();
							break;

						default:
							$.ajax({
								type: "POST",
								url: base_url + "/ajax_files/practice_search.php",
								data: {'keyword': keyword},
								success: function(data) {
									if(data.indexOf("no records") > -1) {
										$('#search-form-content .no-content').show();
										$('#search-form-content .searched-content').hide();
									} else {
										$('#search-form-content .searched-content').html(data);
										$('#search-form-content .no-content').hide();
										$('#search-form-content .searched-content').show();							
									}
									$('#search-form-content, #search-form a.search-close').fadeIn();
									$('#search-form').addClass("active");
									$('#search-form-content ul li.practice_li:first').addClass("active");
								}
							});
					}
                	
				} else if(page == "jobs") {
						var keywordArr=keyword.split(",");
						var cnt=keywordArr.length -1;
						var search_txt=keywordArr[cnt];
						
						if(search_txt.replace(/ /g,'').length >0){
							$.ajax({
								type: "POST",
								url: base_url + "/ajax_files/autocomplete_job_search.php",
								data: {'keyword': search_txt},
								success: function(data) {
									if(data.indexOf("no records") > -1 || $.trim(data)=='') {
										$('#search-form-content .no-content').show();
										$('#search-form-content .searched-content').hide();
									} 
									else {
										$('#search-form-content .searched-content').html(data);
										$('#search-form-content .no-content').hide();
										$('#search-form-content .searched-content').show();									
									}
									$('#search-form-content, #search-form a.search-close').fadeIn();
									$('#search-form').addClass("active");
								},
								complete :function(e){
								//console.log(1);
								$("#search-form-content .searched-content span.job_search_item" ).each(function(index) {
									var item_text=$(this).data('text');
									if(keywordArr.indexOf(item_text)> -1) {
										$(this).remove();
									}
							    });
							  }
							});
						}

					}else if(page=='hackathon'){
						var keyword = $('#search_leaderboardname').val();
						if(keyword.length<2){
							return ;
						}
						var page = $('#search-form input[name="page"]').val();
						var platform_type = $('#platform_type').val();
						var season_id = $('#season_id').val();
						var season_url = $('#season_url').val();
						var level = $("#leaderboard_level").val();
						var child_season_id = $("#child_season_id").val();
						var leaderbardType = $("#leaderboardType").val();
						$.ajax({
								type: "POST",
								url: base_url + "/ajax_files/leaderboardname_search.php",
								data: {'keyword': keyword,platform_type:platform_type,season_id:season_id,season_url:season_url,level:level,child_season_id:child_season_id,leaderboardType:leaderbardType},
								success: function(data) {
									if(data.indexOf("no records") > -1) {
										$('#search-form-content .no-content').show();
										$('#search-form-content .searched-content').hide();
									} else {
										$('#search-form-content .searched-content').html(data);
										$('#search-form-content .no-content').hide();
										$('#search-form-content .searched-content').show();							
									}
									$('#search-form-content, #search-form a.search-close').fadeIn();
									$('#search-form').addClass("active");
								}
							});	 

					}else if(page=='webinar'){
						if(keyword.length<2){
							return ;
						}
						$.ajax({
							type: "POST",
							url: base_url + "/ajax_files/webinar_search.php",
							data: {'keyword': keyword},
							success: function(data) {
								if(data.indexOf("no records") > -1) {
									$('#search-form-content .no-content').show();
									$('#search-form-content .searched-content').hide();
								} else {
									$('#search-form-content .searched-content').html(data);
									$('#search-form-content .no-content').hide();
									$('#search-form-content .searched-content').show();							
								}
								$('#search-form-content, #search-form a.search-close').fadeIn();
								$('#search-form').addClass("active");
							}
						});
					}else{

					$.ajax({
						type: "POST",
						url: base_url + "/ajax_files/skilltest_search.php",
						data: {'keyword': keyword},
						success: function(data) {
							if(data.indexOf("no records") > -1) {
								$('#search-form-content .no-content').show();
								$('#search-form-content .searched-content').hide();
							} else {
								$('#search-form-content .searched-content').html(data);
								$('#search-form-content .no-content').hide();
								$('#search-form-content .searched-content').show();							
							}
							$('#search-form-content, #search-form a.search-close').fadeIn();
							$('#search-form').addClass("active");
						}
					});	

				}		
			}
		});
		
		$(document).on("click", "#search-form a.search-close", function() {
			$('#search-form-content, #search-form a.search-close').fadeOut();
			$('#search-form').removeClass("active");
			return false;
        });
		
		$(document).on("click", function(event){
			var $trigger = $("#search-form");
			if($trigger !== event.target && !$trigger.has(event.target).length){
				$('#search-form-content').fadeOut();
				$('#search-form').removeClass("active");
			}            
		});
		
		$('#search-form-content').fadeOut();
		$('#search-form').removeClass("active");
		
		$(".table1 .user-job-detail").innerWidth($(".my-applications").width() - 40);
		$("#question-controller .scroll").innerHeight($(window).height() - ($("#coding-platform-head").innerHeight()));
		
		if(ajax_list == 1) {
			$("#coding-content-area").css("min-height", $(window).height() - $("#coding-platform-head").innerHeight() + 20);
		}else{
			$("#coding-content-area").css("min-height", $(window).height() - $("#coding-platform-head").innerHeight());
		}
		

		
		//$("#intro-section, #intro-section .inner-slide").height($(window).height()-($("#header").height() + $("#event-promotion-banner2").innerHeight()));
		$("#intro-section, #cg-promotion").innerHeight($(window).height()-($("#header").height() + $("#event-promotion-banner2").innerHeight()) + 1);
		$("#intro-section .inner-slide").innerHeight($(window).height()-($("#header").height() + $("#join-us-slide").innerHeight()));
		
		
		var windowWidth = $(window).width();
	
		$(window).resize(function() {
			$(".table1 .user-job-detail").innerWidth($(".my-applications").width()- 40);
			//$("#intro-section, #intro-section .inner-slide").height($(window).height()-$("#header").height());
			$("#intro-section, #cg-promotion").innerHeight($(window).height()-($("#header").height() + $("#event-promotion-banner2").innerHeight()) + 1);
			$("#intro-section .inner-slide").innerHeight($(window).height()-($("#header").height() + $("#join-us-slide").innerHeight()));
			$("#question-controller .scroll").innerHeight($(window).height() - ($("#coding-platform-head").innerHeight()));
			
			if(ajax_list == 1) {
				$("#coding-content-area").css("min-height", $(window).height() - $("#coding-platform-head").innerHeight() + 20);
			}else{
				$("#coding-content-area").css("min-height", $(window).height() - $("#coding-platform-head").innerHeight());
			}

		});
		
		$("#global-search-form .category-lists .dropdown-menu li a").click(function(){
			var menuIcon = $(this).find('span').html();
			var category_name = $(this).data('category');
			var category_full_name = $(this).text();
			$('#global-search-text').attr('placeholder', 'Search for '+category_full_name.toLowerCase()+'...');
			$("#category_name").val(category_name)
			$("#global-search-form .category-menu .icons").html(menuIcon);
			
			//search new reset here
			if($('#global-search-text').val() == ''){
				$('#global-search-form .remove, #search-result-lists').fadeOut();
			}else{
				 var keywords = $('#global-search-text').val();
				 var category = $('#category_name').val();
				 $.ajax({
						type: "POST",
						url: base_url + "/ajax_files/userSearch.php",
						data: { 'keywords': keywords, 'category': category },
						success: function(data) {
							$('#search-result-lists').html(data);
							$('#global-search-form .remove, #search-result-lists').fadeIn();
						}
				});
		
		
				//$('#global-search-form .remove, #search-result-lists').fadeIn();
				//alert(111);
			}
			
		});
		
		if($("body").hasClass("result-page")){
			$(window).scroll(function() {
				var windowScroll = $(window).scrollTop();
				var topScrolling1 = ($(".left-panel").innerHeight() / 1.1);

				if (windowScroll < 0) {
				   $("#active-user-status").hide();
				   $(".table1 tr.my-rank").show();
				}else if (windowScroll > topScrolling1) {
				   $("#active-user-status").hide();
				   $(".table1 tr.my-rank").show();
				}else {
				   $("#active-user-status").show();
				   $(".table1 tr.my-rank").hide();
				}
				
			});
		}else{
			$(window).scroll(function() {
				var windowScroll = $(window).scrollTop();
				var topScrolling = (($("#header").innerHeight() + $("#breadcrumbs").innerHeight() + $(".main-banner").innerHeight() + $(".challenge-tests").innerHeight()) / 1.7);
				var topScrolling1 = ($(".left-panel").innerHeight() / 1.3);

				if (windowScroll < topScrolling) {
				   $("#active-user-status").hide();
				   $(".table1 tr.my-rank").show();
				}else if (windowScroll > topScrolling1) {
				   $("#active-user-status").hide();
				   $(".table1 tr.my-rank").show();
				}else {
				   $("#active-user-status").show();
				   $(".table1 tr.my-rank").hide();
				}
				
			});
		}
	

		// Start Fix Bootstrap Modal Center
		$('.modal').on('show.bs.modal', function() {
		  $(this).show();
		  Tg_CommonFunction.setModalMaxHeight(this);
		});
		

		$(window).resize(function() {
		  if ($('.modal.in').length != 0) {
			Tg_CommonFunction.setModalMaxHeight($('.modal.in'));
		  }
		});
		// End Fix Bootstrap Modal Center
				
		$(document).on("click", "#search-result-lists > h6 .dismiss", function() {
			$("#search-result-lists").fadeOut();
			//inactive past search
			$.ajax({
                type: "POST",
                url: base_url + '/common/DismissUserSearch',
                data: {},
                success: function (response) {
	
                }
             });
		});
		// Global Search Form Code Ends Here
	
		$(document).on('click','.ajax-header-search ul.list1 .details a', function(){
			 var keyword = $('#global-search-text').val();
			 var category = $('#category_name').val();
			 $.ajax({
                type: "POST",
                url: base_url + '/common/SaveUserSearch',
                data: {'category': category, 'keyword': keyword},
                success: function (data) {

                }
             });
		});
		
	setTimeout(function(){ $("#sliding-banner").addClass("open"); }, 3000);
		
		$(document).on("click", "#sliding-banner .close", function() {
            $(this).parent().removeClass("open");
        });	

		$(document).on('click','#header .menu-btn, #coding-platform-head .question-list-menu',function(){
			
			if($(this).hasClass("less")) {
				$(this).removeClass("less");
				$("#container-wrap, body").removeClass("activeMenu");
				
			} else {
				$(this).addClass("less");
				$("#container-wrap, body").addClass("activeMenu");
			}
			
            $("body").addClass("hideScroll");
			$("#question-controller .scroll").height($(window).height() - 17);
        });
		
		if ($(window).width() < 767) {
		
			
			$(document).on('click','#page-header ul li a',function(){
				$("#page-header ul").slideUp();
				$("#page-header .category-menu-btn").removeClass("less").html('<i class="fa fa-chevron-circle-down" aria-hidden="true"></i>');
			});
			
			$(document).on("click", function(event){
				var $trigger = $("#page-header");
				if($trigger !== event.target && !$trigger.has(event.target).length){
					$("#page-header ul").slideUp();
					$("#page-header .category-menu-btn").removeClass("less").html('<i class="fa fa-chevron-circle-down" aria-hidden="true"></i>');
				}            
			});
			
			
			setTimeout(function() {
			   $("#editor-box .editor-controllers").addClass("dropdown-mode");
			   $("#show_owntestcase_btn").hide();
			   $("#straight-page-view").trigger("click");
			   $("#question-area").addClass("extra-small-view");
			}, 1000); 
				

			//var totalWidthCount = GetWidths('#page-header .inner-wrap ul li');
			var totalWidthCount1 = GetWidths('#practice-details nav ul li, #detailed-search .tabs1 .nav-tabs-items .nav-tabs > li');
			//var totalWidthCount2 = GetWidths('.tabs1 .nav-tabs > li');
			
			function GetWidths(id) {
				var i = 0;

				$(id).each(function (index) {
					i += parseInt($(this).innerWidth() + 12);
				});

				return i;
			}
			
			//$("#page-header .inner-wrap ul").width(totalWidthCount + 80);
			$("#practice-details nav ul, #detailed-search .tabs1 .nav-tabs-items .nav-tabs").width(totalWidthCount1);
			//$(".tabs1 .tabs1-nav-wrap .nav-tabs").width(totalWidthCount2);
			
			//$("#page-header .inner-wrap").width($(window).width() - $("#page-header h2").innerWidth() - 35);
			$("#practice-details .practice-items-list, #detailed-search .tabs1 .nav-tabs-items").width($(window).width() - 20);
			
			$(window).resize(function() {
				//$("#page-header .inner-wrap").width($(window).width() - $("#page-header h2").innerWidth() - 35);
				$("#practice-details .practice-items-list").width($(window).width() - 20);
			});
		}
		
		
		
		$(document).on('click','#page-overlay',function(){
            $("#container-wrap, body").removeClass("activeMenu");
			$("body").removeClass("hideScroll");
			$("#header .menu-btn,#coding-platform-head .question-list-menu").removeClass("less");
        });

        if ($('#sub-links').length == 0) {
            $('#header .main-search-btn').hide();
        }

        $(document).on('click','.open_modal',function(e){
			e.preventDefault();
            var action_url = $(this).attr('href');

            var title = $(this).attr('title');
			
			if(action_url.indexOf('ajax_login_register.php') > 0 || action_url.indexOf('ajax_saas_login_register.php') > 0 || action_url.indexOf('ajax_login_register_deloitte.php') > 0){
								
				if(action_url.indexOf('ajax_login_register.php') > 0 && $('#login-register-popup .modal-body #signup-login').length > 0) {
					var action_url_arr = action_url.split('return=');
					var return_url = action_url_arr[1];
					
					$.post(base_url+'/general_ajax_task.php',{action: 'check_loggedin_user'},function(data) {
						var response = $.trim(data);
						if(response=='success'){
							if(typeof return_url != 'undefined' && return_url != '') {						
								window.location.href = return_url;
							}
						} else {
							if(typeof return_url != 'undefined' && return_url != '') {						
								$('#login-register-popup .modal-body input[name="return"]').val(return_url);
							}					
							$('#login-register-popup').modal('show');
						}
					});	
					return false;
				}
				
				$('#login-register-popup').modal('show');
				$('#login-register-popup .modal-body').html('<div class="tg-loader text-center"><img src="' + theme_url + '/images/TG-Loader.gif"></div>');
				
                $.ajax({
                    type: "POST",
                    url: action_url,
                    success: function(response){
                            $('#login-register-popup .modal-body').html(response);
                    }
                });
                
                /* var xhr = new XMLHttpRequest();
                xhr.open('GET', action_url);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        $("#login-register-popup .modal-body").html(xhr.responseText);
						$('#login-register-popup').modal('show');
                        console.log(true);
                    }
                    else {
                        console.log(xhr.status);
                    }
                };
                xhr.send(); */

			} else {
				$('#TechGigbootStrapModal').modal('show');				
				$('#TechGigbootStrapModal .modal-body').html('<div class="tg-loader text-center"><img src="' + theme_url + '/images/TG-Loader.gif"></div>'); 
				$('#TechGigbootStrapModal .modal-title').html(title);
				$('#TechGigbootStrapModal .modal-dialog').removeClass('modal-lg');
                $.ajax({
                    type: "POST",
                    url: action_url,
                    success: function(response){
                            $('#TechGigbootStrapModal .modal-body').html(response);
                    }
                });
                
                /* var xhr = new XMLHttpRequest();
                xhr.open('GET', action_url);
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        $("#TechGigbootStrapModal .modal-body").html(xhr.responseText);
						$('#TechGigbootStrapModal').modal('show');
                        console.log(true);
                    }
                    else {
                        console.log(xhr.status);
                    }
                };
                xhr.send(); */

			}
			return false;
        });
		

		$(document).on("click", "#search-form .styled-dropdown-select", function() {
            $('#srch_more_options').slideToggle();
        });
	
		
		$(document).on("click", "#full-screen-question.normal-view #question-area .tabs1 > .nav-tabs > li > a, .multi-question-format.normal-view .tabs1 .nav-tabs > li > a", function() {
			if($(this).parent().hasClass("domain-problem-tab")){
				$('#editor-box').show();
				$('#front-end').show();
				$('.multi-question-format .file-upload-widget, .multi-question-format .file-upload-block, .multi-question-format .coding-footer').show();
				$("#editor-box .editor-controllers").removeClass("dropdown-mode");
				$("#show_owntestcase_btn").show();
				$("#editor-box .editor-controllers > ul").removeAttr("style");
			}else{
				$('#editor-box').hide();
				$('#front-end').hide();
				$('.multi-question-format .file-upload-widget, .multi-question-format .file-upload-block, .multi-question-format .coding-footer').hide();
			}
        });

		$("#sidebar #sidebar-navigation .scroll").innerHeight($(window).height() - ($("#header").innerHeight() + $("#sidebar-navigation li.questions-status > a").innerHeight() + $("#sidebar-navigation li.all-questions > a").innerHeight() + $(".codehire .user-info-bar").innerHeight() + 42));

        $(window).resize(function() {
            $("body").removeClass("hideScroll");
            $("#container-wrap").removeClass("activeMenu");
			
			$("#sidebar #sidebar-navigation .scroll").innerHeight($(window).height() - ($("#header").innerHeight() + $("#sidebar-navigation li.questions-status > a").innerHeight() + $("#sidebar-navigation li.all-questions > a").innerHeight() + $(".codehire .user-info-bar").innerHeight() + 42));
        });
		
		$(document).on("click", "#straight-page-view", function() {
			
			 
			if ($(window).width() > 767) {
				setTimeout(function(){ 
					Tg_CommonFunction.tabLiBorderMove();  
				}, 100);
			}
			
			var resizeEditorWidth1 = 850;
			
			if($(window).width() > 1200){
				resizeEditorWidth1 = 650
			}else if($(window).width() > 992){
				resizeEditorWidth1 = 500
			}

			if($(this).hasClass("less")) {
                                 $('.less-editor').show();
                                $('.straight-editor').hide();
                                
				$(this).removeClass("less");
				$('#full-screen-question').addClass("expanded").removeClass("normal-view");
				$("#coding-platform-head").find(".center-wrap").removeClass("container").addClass("container-fluid");
				$(".coding-page").css("overflow","hidden");	
				
				if($("#hide-question-area").hasClass("less")){
					
				}else{
					setTimeout(function() {
						$(window).trigger('resize');
						$("#question-area").trigger('resize');
					}, 100);
				}

				$("#coding-platform-head .compile-run-btn").hide();
				
				$("#editor-box #own_testcase .form-control").css("min-height", $(window).height() - ($("#coding-platform-head").innerHeight() + $("#editor-box header").innerHeight()));
				
				setTimeout(function() {
					var maxQustionWidth = $(window).width() * 0.7 ;
					Tg_ChallengeDetailPage.resizeEditor(maxQustionWidth);
				}, 300); 
				
				$(this).next(".tooltip").find(".tooltip-inner").text("Goto Fullscreen Mode");
				$(this).attr('data-original-title', 'Goto Fullscreen Mode').tooltip('show');

			} else {
                               $('.less-editor').hide();
                                $('.straight-editor').show();
				$(this).addClass("less");
				$('#full-screen-question').removeClass("expanded").addClass("normal-view");
				$("#coding-platform-head").find(".center-wrap").addClass("container").removeClass("container-fluid");
				$(".coding-page").css("overflow","visible");
				$("#question-area").removeClass("extra-small-view").removeClass("small-view");
				$("#coding-platform-head .compile-run-btn").show();
				if($("#full-screen-question #question-area .tabs1 .nav-tabs > li.domain-problem-tab").hasClass("active")){
					$('#editor-box').show();
					$('#front-end').show();
				}else{
					$('#editor-box').hide();
					$('#front-end').hide();
				}
				
				if($("#full-screen-question.normal-view #question-area .tabs1 .nav-tabs > li.domain-problem-tab").hasClass("active")){
					$('#editor-box').show();
					$('#front-end').show();
					$("#editor-box .editor-controllers").removeClass("dropdown-mode");
					$("#show_owntestcase_btn").show();
					$("#editor-box .editor-controllers > ul").removeAttr("style");
				}else{
					$('#editor-box').hide();
					$('#front-end').hide();
				}
				$("#full-screen-question.normal-view #editor-box").removeClass("fixed");
				
				$(this).next(".tooltip").find(".tooltip-inner").text("Exit Fullscreen Mode");
				$(this).attr('data-original-title', 'Exit Fullscreen Mode').tooltip('show');				
			}
			setTimeout(function(){ $("#straight-page-view").tooltip('hide'); }, 1500);
			
			$("#question-area").removeClass("extra-small-view");
			$("#editor-box").removeClass("large-view");
			$("#show-tab-lists").css('display','none');
			$(".tabs1 .nav-tabs").removeAttr("style");	

			$("#editor-box .editor-controllers.dropdown-mode > ul > li").removeClass("open");
			$("#editor-box .editor-controllers.dropdown-mode > ul").removeAttr("style");
			$("#editor-box .editor-controllers").removeClass("dropdown-mode");	
			$("#show_owntestcase_btn").show();
			
			if($('#editor-box').width() > resizeEditorWidth1 ){
				$("#editor-box .editor-controllers").removeClass("dropdown-mode");	
				$("#editor-box header .play-vs").show();
				$("#show_owntestcase_btn").show();
			}else{
				$("#editor-box .editor-controllers").addClass("dropdown-mode");	
				$("#editor-box header .play-vs").hide();
				$("#show_owntestcase_btn").hide();
			}
			
		});
		
		$(".smooth-scroll").click(function() {
            var href = $(this).attr('href');
            $(href).addClass("active");
			
			 $('html, body').animate({
				scrollTop: $(href).offset().top - 75
			}, 1000);
			
        });

        $(document).on("click", ".sub-category-list ul li", function() {
            $('#main-navigation').removeClass("activeDropdown").addClass("hide-sub-category");
        });

        $(window).scroll(function() {

            var windowScroll = $(window).scrollTop();

            if ($('.main-banner').length || $('#banner').length || $('#user-info').length) {
                if ($(window).width() < 767) {
                    var topScroll = 0;
                } else {
                    var topScroll = $(".main-banner, #banner, #user-info").innerHeight() - 10;
                }

            } else {
                if ($(window).width() < 767) {
                    var topScroll = 0;
                } else {
                    var topScroll = 88;
                }
            }
        });

        $("#Subscribe-Email").click(function() {
		
			$('#newsletter_success').addClass('hide');
			$('#newsletter_invalid_email').addClass('hide');
			$('#newsletter_error').addClass('hide');

            var email = $('#subscribe_email').val();
			//email = email.replace(/ /g,'').length;
			email = email.replace(/ /g,'')
			if(email == '') {
				$('#newsletter_invalid_email').removeClass('hide');
                setTimeout(function() {
                    $("#newsletter_invalid_email").addClass('hide');
                }, 5000);
				return false;
			}

            var url = base_url + '/general_ajax_task.php?action=save_techgig_subsription_block';

            $.post(url, {
                'email_id': email
            }, function(data) {
                data = $.trim(data);
                if (data != 'NVEMAIL') {
                    if (isNaN(data)) {
						$('#newsletter_error').removeClass('hide');	
                    } else {
						$('#subscribe_news_email').val('');
                        $('#newsletter_success').removeClass('hide');
                    }
                } else {
					$('#newsletter_invalid_email').removeClass('hide');
                }
                
                setTimeout(function() {
                    $("#newsletter_success,#newsletter_invalid_email,#newsletter_error").addClass('hide');
                }, 2000);
        
            });

        });
		
		$("#Subscribe-news-Email").click(function() {
		
			$('#newsletter1_success').addClass('hide');
			$('#newsletter1_invalid_email').addClass('hide');
			$('#newsletter1_error').addClass('hide');

            var email = $('#subscribe_news_email').val();
			// email = email.replace(/ /g,'').length;
			email = email.replace(/ /g,'')
			if(email == '') {
				$('#newsletter1_invalid_email').removeClass('hide');
				return false;
			}

            var url = base_url + '/general_ajax_task.php?action=save_techgig_subsription_block';

            $.post(url, {
                'email_id': email
            }, function(data) {
                data = $.trim(data);
				
                if(data != 'NVEMAIL') {
                    if (isNaN(data)) {
                        $('#newsletter1_error').removeClass('hide');
                    } else {
						$('#subscribe_news_email').val('');
                        $('#newsletter1_success').removeClass('hide');
                    }
                } else {
					$('#newsletter1_invalid_email').removeClass('hide');
                }
            });

        });

        var notification_url = base_url + '/ajax_files/notification_user_count.php';
        $('ul#logged-in-notification li.challenges:eq(0)').load(notification_url + '?type=challenges', function(e) {});
        $('ul#logged-in-notification li.news:eq(0)').load(notification_url + '?type=news', function(e) {});
        $('ul#logged-in-notification li.webinars:eq(0)').load(notification_url + '?type=webinars', function(e) {});
        
        $(document).on('click', '#attempt-data-science-again', function(){
           
            var encrypt_token = $(this).data('encrypt_token');
            $.ajax({
                type: "POST",
                url: base_url + '/ajax_files/saas_candidate_function.php?action=clickDataScienceData',
                data: {encrypt_token: encrypt_token},
                success: function(response){
                        var returnData = response;
                        if(returnData.status == 'success'){
                            window.location.href = returnData.url;
                        }
                    
                    }
                });
            
        });

        $("#feedback").css({
            "z-index": "1000"
        });

        $("#recommended-for-you header").click(function() {
            $(this).parent().toggleClass('banner-hide');
        });

        setTimeout(function() {
            $("#recommended-for-you").removeClass('banner-hide');
        }, 20000);

        $("#Subscribe-Email").click(function() {

            var email = $('#subscribe_email').val();

            var url = base_url + '/general_ajax_task.php?action=save_techgig_subsription_block';

            $.post(url, {
                'email_id': email
            }, function(data) {
                data = $.trim(data);
                if (data != 'NVEMAIL') {
                    if (isNaN(data)) {
                        $('#subscribe-email-form .modal-body').html('<p>Error During Subsription. Please try again.</p>');
                        $('#subscribe-email-form').modal('show');
                    } else {
                        $('#subscribe-email-form .modal-body').html('<p>Thank you for subsribing to TechGig Updates.</p>');
                        $('#subscribe-email-form').modal('show');
                    }
                } else {
                    $('#subscribe-email-form .modal-body').html('<p>Please provide valid email id</p>');
                    $('#subscribe-email-form').modal('show');
                }
                setTimeout(function() {
                    //$('#subscribe-email-form').modal('hide').slow();
                    $('#subscribe-email-form').modal('hide');
                }, 6000);
            });

        });
		
		//This function is used to share content on social networks...Sushil 24-May-2017
		$(".social-share-button").click(function() {
			var social_name		=	$(this).data('social_name');
			var share_title		=	$(this).data('share_title');
			var share_url		=	$(this).data('share_url');
			var share_content	=	$(this).data('share_content');
			
			var custom_content = $('#'+social_name+'-content').val();
			if(custom_content != '') {
				share_content = custom_content;
			}
			
			var url = '';
			switch(social_name) {
				case 'facebook':
					url = 'https://www.facebook.com/sharer/sharer.php?u='+share_url+'&title='+share_title+'&description='+share_content+'&picture=';
					break;
				
				case 'twitter':
					var url = 'http://twitter.com/home/?status='+share_content+' '+share_url;
					break;	

				case 'linkedin':
					var url = 'http://www.linkedin.com/shareArticle?mini=true&url='+share_url+'&title='+share_title+'&summary='+share_content+'&source='+share_url;					
					break;

				case 'google':
					url = 'https://plus.google.com/share?url='+share_url;
					break;		
			}
			
			if(url != '') {
				$instance.generic_social_share(url);
			}
		});
		
		//This function is used to show remaining character count...Sushil 24-May-2017
		$(".char-left-counter").keyup(function() {
			var input_length	=	$(this).val().length;
			var max_length		=	$(this).data('max_length');
			var add_content		=	$(this).data('add_content');
			
			add_content = (typeof add_content === 'undefined') ? '' : add_content;
			if(add_content != '') {
				add_content = ' '+add_content; //1 space for separator character 
				input_length = input_length + add_content.length;
			}
			
			//if entered charcters less than the maximum limit
			if (input_length <= max_length) {
				//Shows number of characters remaining 
				$('#counter-'+this.id).text(max_length-input_length);
			} else {
				$(this).val($(this).val().substring(0, max_length-add_content.length));
			}			
		});
		
		$(".follow_user").click(function() {
            //var user_id = $(this).data('user_id');
            //var follower_id = $(this).data('follower_id');
            var action_type = $(this).data('action_type');
            var encrypt_uid_key = $(this).data('encrypt_uid_key');
			
            var encrypt_webinar_id_key = $(this).data('webinar_id_key');
			encrypt_webinar_id_key = (typeof encrypt_webinar_id_key === "undefined") ? "" : encrypt_webinar_id_key;
			
            var follow_val = $(this).text();
			//console.log(action_type,follow_val,encrypt_uid_key);
			var tmp_id = 'user_'+action_type+'_'+encrypt_uid_key;
			var tmp_id2 = 'user_'+action_type+'_count_'+encrypt_uid_key;
            var url = base_url+"/ajax_files/follow_webinar_expert.php?action=follow_tg_user";
			$.post(url,{'action_type':action_type, 'follow_val':follow_val, 'encrypt_uid_key':encrypt_uid_key, 'encrypt_webinar_id_key':encrypt_webinar_id_key},function(data) {
				data = trim(data);
				var divs = data.split('##');
				if(data.length > 0) {
					$('#'+tmp_id).text(divs[0]);
					$('#'+tmp_id2).text(divs[1]);
					
					/* if(divs[0] == 'Following') {
						$('#'+tmp_id).addClass('button2');
					} else {
						$('#'+tmp_id).removeClass('button2');
					} */
				}
			});
		});
		
		var orig_follow_btn_title;
		$(".follow_user").hover(function () {
			orig_follow_btn_title = $(this).text();
			if(orig_follow_btn_title == 'Following' || orig_follow_btn_title == 'Followed') {
				$(this).text('Unfollow');
			}
		}, function () {
			if($(this).text() == 'Unfollow') {
				$(this).text(orig_follow_btn_title);
			}			
		});
		
		$instance.onScrollingChanges();

		$instance.lazyload();
		
		if ($(window).width() > 767) {
			setTimeout(function(){ 
				$instance.tabLiBorderMove(); 
			}, 300);
		}

		$(document).on('click','.copy-link',function() {	
			try {
				var copyText = $(this).attr('data-copyurl');

				var $temp = $("<input>");
				$("body").append($temp);
				$temp.val(copyText).select();
				success_copy = document.execCommand('copy');
				$temp.remove();		
			} catch(err) {}
			
			if(success_copy) {
				$(this).next('.link-copied:first').html('Link copied to clipboard');
			} else {
				$(this).next('.link-copied:first').html('Copy Url by Ctrl+C: '+copyText);
			}
		});
		
		$(document).on('click','.copy-link-modal',function(event) {	
			try {
				var copyText = $(this).attr('data-copyurl');
			
				var el = document.createElement('input');
				el.value = copyText;
				document.getElementById('span-copylink-modal').appendChild(el);
				el.select();
				success_copy = document.execCommand('Copy');
				document.getElementById('span-copylink-modal').removeChild(el);
			} catch(err) {}	
			
			if(success_copy) {
				$(this).next('.link-copied:first').html('Link copied to clipboard');
			} else {
				$(this).next('.link-copied:first').html('Copy Url by Ctrl+C: '+copyText);
			}
		});	

    }
	
	$instance.lazyload = function() {
        $.getScript(theme_url + "/javascript/jQuery.loadScroll.min.js")
            .done(function() {				
				 var bLazy = new Blazy();
            })
            .fail(function() {
                console.log('bLazy not loaded');
            })
    };
	
	$instance.onScrollingChanges = function(){
		
		if($("#common-navigation").length > 0 || $("#search-filter").length > 0){
			
		}else{	
			// Hide Header on on scroll down
			var didScroll;
			var lastScrollTop = 0;
			var delta = 5;
			var navbarHeight = 0;
			var topHeight = 56;

			$(window).scroll(function(event){
				didScroll = true;
			});

			setInterval(function() {
				if (didScroll) {
					hasScrolled();
					didScroll = false;
				}
			}, 250);

			function hasScrolled() {
				var st = $(this).scrollTop();
				
				// Make sure they scroll more than delta
				if(Math.abs(lastScrollTop - st) <= delta)
					return;
				
				// If they scrolled down and are past the navbar, add class .nav-up.
				// This is necessary so you never see what is "behind" the navbar.
				if (st > lastScrollTop && st > navbarHeight){
					// Scroll Down
					$("#header").removeClass("fixed-header").css("top", -65);
					//$("#container-wrap").css("padding-top", 0);
					$("#contest-summary-widget.fixed").removeClass("move-top");

				} else if (st > $("#header").innerHeight()){
					
					$("#header").addClass("fixed-header").css("top", 0);
					$("#header").css(("position", "fixed"),("trasition",""));
					$("#header").css({
					   'position' : 'fixed',
					   'transition' : 'top 0.3s ease-in-out'
					});
					
				} else if (st == navbarHeight){
					
					$("#header").css("top", 0);
					$("#header").css({
					   'position' : 'absolute'
					});
					//$("#container-wrap").css("padding-top", 56);
					$("#contest-summary-widget.fixed").addClass("move-top");
					
				} else {
					// Scroll Up
					if(st + $(window).height() < $(document).height()) {
						$("#header").addClass("fixed-header").css("top", 0);
						$("#header").css({
						   'position' : 'fixed',
						   'transition' : 'top 0.3s ease-in-out'
						});
						//$("#container-wrap").css("padding-top", 56);
						$("#contest-summary-widget.fixed").addClass("move-top");
					}
				}
				
				if (st > topHeight){
					$("#header").removeClass('notransition');
				}else{
					$("#header").addClass('notransition').removeClass("fixed-header");
				}
				
				lastScrollTop = st;
			} 
		}

		
		$(window).scroll(function() {
			var windowScroll = $(window).scrollTop();
			
			if ($("body").hasClass("search-result-page")){
				var topScroll = ($("#header").innerHeight() + $(".search-word-box").innerHeight() + 96);
			}else if ($(window).width() < 767) {
				var topScroll = ($("#header").innerHeight() + $("#breadcrumbs").innerHeight() + $(".main-banner").innerHeight() + $(".main-search-block").innerHeight() + 8);
			}else{
				var topScroll = ($("#header").innerHeight() + $("#breadcrumbs").innerHeight() + $(".main-banner").innerHeight() + $(".main-search-block").innerHeight() + 29);
			}
			
			/* if ($("body").hasClass("search-result-page")){
				var topScroll = ($("#header").innerHeight() + $(".search-word-box").innerHeight() + 96);
			}else{
				var topScroll = ($("#header").innerHeight() + $(".search-word-box").innerHeight() + 29);
			} */
			
			if($("body").hasClass("job-result-page")){
				var topScrollSecond = $("#header").innerHeight(); 
			}else{
				var topScrollSecond = ($("#header").innerHeight() + $("#breadcrumbs").innerHeight() + $("#search-filter h1").innerHeight() + 4);
			}
			
			
			var minHeight = 100;
			
			if(windowScroll >= topScroll) {
				$("#common-navigation").addClass('fixed').removeClass('normal-view');
				$("#height-block").show();

			}else {
				$("#common-navigation").removeClass('fixed').addClass('normal-view');
				$("#height-block").hide();
			}
			
			if(windowScroll >= topScrollSecond) {
				$("#search-filter .search-form-wrap").addClass('fixed');
				$("#search-height").show();

				if($("body").hasClass("job-result-page")){
					
				}else{
					$("#search-filter").addClass('small-view');
				}

				if ($(window).width() < 767) {
					if($('#search-filter #search-form input[type="text"]').val()){
						$("#search-filter .search-form-wrap.fixed form > ul > li.mobile-hide").fadeIn('fast');
					}else{
						$("#search-filter .search-form-wrap.fixed form > ul > li.mobile-hide").fadeOut('fast');
					}
				}

			}else {
				$("#search-filter .search-form-wrap").removeClass('fixed');
				$("#search-height").hide();
				
				if($("body").hasClass("job-result-page")){
					
				}else{
					$("#search-filter").removeClass('small-view');
				}
				
				if ($(window).width() < 767) {
					$("#search-filter form > ul > li.mobile-hide").fadeIn('fast');
				}
				
			}
			
			if($("#common-navigation").length > 0 || $("#search-filter").length > 0){
			
			}else{
				if(windowScroll <= minHeight) {
					$("#header").css("top", 0);
					$("#container-wrap").css("padding-top", 56);
				}
			}

		});

	 };
	
	$instance.setModalMaxHeight = function(element) {
		  this.$element     = $(element);  
		  this.$content     = this.$element.find('.modal-content');
		  var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
		  var dialogMargin  = $(window).width() < 768 ? 20 : 60;
		  var contentHeight = $(window).height() - (dialogMargin + borderWidth);
		  var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
		  var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
		  var maxHeight     = contentHeight - (headerHeight + footerHeight);

		  this.$content.css({
			  'overflow': 'hidden'
		  });
		  
		  this.$element
			.find('.modal-body').css({
			  'max-height': maxHeight,
			  'overflow-y': 'auto'
		  });
	}
	
	$instance.tabLiBorderMove = function() {
		var $el, leftPos, newWidth;
	  
		$(document).find(".tabs1 .nav-tabs").each(function() {
			
			/* Add Magic Line markup via JavaScript, because it ain't gonna work without */
			if($(this).parents('.tabs2').length){
				
			}else{
				$(this).find(".magic-line").remove();
				$(this).append("<div class='magic-line'></div>");
			}

			/* Cache it */
			var $magicLine = $(this).find(".magic-line");
			
			var activeLiPosition = 0;
			var activeLiWidth = $(this).find(" > li.active").width();
			
			$(this).find(" > li.active").prevAll().each(function() {
				activeLiPosition += $(this).width()
			});

			$magicLine.css({"left": activeLiPosition, "width": activeLiWidth});
				

			$(this).find(" > li > a").hover(function() {
				
				if($(this).parent().hasClass("more-links")){
					
				}else{
					var prevAllTotal = 0;
					$(this).parent().prevAll().each(function() {
						prevAllTotal += $(this).width()
					});
					
					newWidth = $(this).parent().width();
					
					$magicLine.stop().animate({
						left: prevAllTotal,
						width: newWidth
					});
				}
				
			}, function() {
				
				var prevAllTotal = 0;
				$(this).parents(".nav-tabs").find("li.active").prevAll().each(function() {
					prevAllTotal += $(this).width()
				});
				var newActiveLiWidth = $(this).parents(".nav-tabs").find("li.active").width();
				
				if($(this).parent().hasClass("active") || $(this).parent().hasClass("open")){
					$magicLine.stop().animate({
						left: prevAllTotal,
						width: newActiveLiWidth
					});
				}else{
					if($(this).parents(".nav-tabs").find("li").hasClass("active")){
						$magicLine.stop().animate({
							left: prevAllTotal,
							width: newActiveLiWidth
						});
					}else{
						$magicLine.stop().animate({
							left: activeLiPosition,
							width: activeLiWidth
						});
					}
					 
				}				
			});
			
		});

    };
	
	$instance.loadMoreContents = function(ajax_page_url, container_id, content_type, custom_query_string) {
        custom_query_string = (typeof custom_query_string === "undefined") ? "" : custom_query_string;

        var page = $('#page_' + container_id).val();
		var page_news_id = $('#page_news_id').val();
		var pages_to_be_shown = $('#pages_to_be_shown').val();
		pages_to_be_shown = (typeof pages_to_be_shown === "undefined") ? "" : pages_to_be_shown;
		pages_to_be_shown = parseInt(pages_to_be_shown);
		
        $('#anc_more_' + container_id).hide();
        //$('#ajax_status_' + container_id).html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();

        var action_file_url = base_url + '/ajax_files/' + ajax_page_url + '?page=' + page +'&page_news_id='+page_news_id;

        if (custom_query_string != "") {
            var action_file_url = action_file_url + '&' + custom_query_string;
        }

        $.get(action_file_url, function(data) {
            //$('#ajax_status_' + container_id).hide();
            data = $.trim(data);
            if (data == 'no_record') {
                $('#ajax_status_' + container_id).html('<p class="text-center">No more ' + content_type + ' to display.</p>').show();
            } else if (data == 'invalid_type') {
                $('#ajax_status_' + container_id).html('Invalid Request.').show();
            } else {
                $('#' + container_id).append(data);
				
				if(pages_to_be_shown != '' && page >= pages_to_be_shown) {
					$('#ajax_status_' + container_id).html('<p class="text-center">No more ' + content_type + ' to display.</p>').show();
				} else {
					$('#anc_more_' + container_id).show();
				}
				
                page++;
                $('#page_' + container_id).val(page);
				// Check if Class is available
				if (typeof Blazy === 'function') {
					var bLazy = new Blazy();
				}
            }
        });

    };

	$instance.CustomScroll = function() {
        $.getStylesheet(theme_url + "/custom_scrollbar.min.css")
        $.getScript(theme_url + "/javascript/Custom_Scrollbar.min.js")
            .done(function() {				
				 $(".scroll").mCustomScrollbar({
					autoHideScrollbar:true,
					mouseWheelPixels: 200,
					theme:"dark-3"
				 });
            })
            .fail(function() {
                console.log('Scrollbar not loaded');
            })
    };
	
	$instance.QuestionCustomScroll = function(scrollpos) {
        $.getStylesheet(theme_url + "/custom_scrollbar.min.css")
        $.getScript(theme_url + "/javascript/Custom_Scrollbar.min.js")
		
            .done(function() {	
			
				 $("#question-controller .scroll").mCustomScrollbar({
					autoHideScrollbar:true,
					mouseWheelPixels: 200,
					theme:"dark-3"
				 });
				 
				 $(".inner-coding-area .scroll").mCustomScrollbar({
					autoHideScrollbar:true,
					mouseWheelPixels: 200,
					theme:"dark-3"
				 });
				 
				 
				 $('#question-controller .scroll li:eq('+(scrollpos + 2)+')').parent().parent().parent().prev(".panel-heading").find(".panel-title a.collapsed").trigger("click");
				

				setTimeout(function(){ 
					if(scrollpos > 2) {
						$('#question-controller .scroll').mCustomScrollbar('scrollTo', $('#question-controller .scroll').find('.mCSB_container li.current'));
					}
				}, 400);
 
            })
            .fail(function() {
                console.log('Scrollbar not loaded');
            })
    };
	
	$instance.formMaxlength = function() {
        $.getScript(theme_url + "/javascript/bootstrap-maxlength.min.js")
            .done(function() {
				$('.characters-limit').maxlength({
					  alwaysShow: true,
					  placement: 'bottom-right',
					  utf8:false,
					  twoCharLinebreak:false
				});
            })
            .fail(function() {
                console.log('maxlength not loaded');
            })

    }

	$instance.alertMessageDisplay = function (alertClass) {                
		$('.message-inner-content').addClass(alertClass);
	};

	
	// login/Signup Validattion
	
	$instance.validateRegisttrationFrom = function () {   

		var first_name = $.trim($("#first_name").val());
		var email = $.trim($("#register_email").val());
		var password = $.trim($("#user_password").val());
		first_name = (typeof first_name === "undefined") ? "" : first_name;
		email = (typeof email === "undefined") ? "" : email;
		password = (typeof password === "undefined") ? "" : password;
		
		$(".error_msg").remove();
		$("#first_name").parent().removeClass();
		$("#register_email").parent().removeClass();
		$("#user_password").parent().removeClass();
		
		if(first_name==''){
			$('#first_name').parent().addClass('has-error');
			$("<span class='error_msg'> Please enter your name.</span>" ).insertAfter("#first_name");	
		}
		if(email==''){
			$('#register_email').parent().addClass('has-error');
			$("<span class='error_msg'> Please enter your email.</span>" ).insertAfter("#register_email");
		}
		if(password==''){
			$('#user_password').parent().addClass('has-error');
			$("<span class='error_msg'> Please enter your password.</span>" ).insertAfter("#user_password");
		}
		
		if(first_name!='' && email!='' && password!=''){
			return true;
		} else {
			return false;
		}
	
	}
	
	
	// geek goddess login/Signup Validattion
	
	$instance.validateTg3RegisttrationFrom = function () {   
		
		//$("#register_user").attr("disabled",true);
		
		var first_name = $.trim($("#first_name").val());
		var email = $.trim($("#register_email").val());
		var password = $.trim($("#user_password").val());
		var current_company = $.trim($("#current_company").val());
		var college = $.trim($("#int-institute").val());
		var userSkill = $.trim($("#userSkill").val());
		var gender = $.trim($("#sex").val());
		var current_status = $('input[name=current_status]:checked').val();
		var chkbox_agree = $('input[name=chkbox_agree]:checked').val();
		//var mobile_phone = $.trim($("#mobile_phone").val());
		first_name = (typeof first_name === "undefined") ? "" : first_name;
		email = (typeof email === "undefined") ? "" : email;
		password = (typeof password === "undefined") ? "" : password;
		//mobile_phone = (typeof mobile_phone === "undefined") ? "" : mobile_phone;
		current_company = (typeof current_company === "undefined") ? "" : current_company;
		college = (typeof college === "undefined") ? "" : college;
		userSkill = (typeof userSkill === "undefined") ? "" : userSkill;
		gender = (typeof gender === "undefined") ? "" : gender;
		var response = grecaptcha.getResponse(signup_recaptcha);
		
		$(".error_msg").remove();
		//$("#first_name").parent().removeClass();
		//$("#register_email").parent().removeClass();
		//$("#user_password").parent().removeClass();
		//$("#mobile_phone").parent().removeClass();
		//$("#current_company").parent().removeClass();
		
		if(first_name==''){
			//$('#first_name').parent().addClass('has-error');
			$("<span class='error_msg'> Please Enter Your Name.</span>" ).insertAfter("#first_name");	
		} else if(!(first_name.match(/[a-z]/i))) {
			$("<span class='error_msg'> Please Enter Valid Name.</span>" ).insertAfter("#first_name");	
		}
		
		if(email==''){
			//$('#register_email').parent().addClass('has-error');
			$("<span class='error_msg'> Please Enter Your Email.</span>" ).insertAfter("#register_email");
		} else if(!(Tg_CommonFunction.validate_email(email))) {		
			$("<span class='error_msg'> Please Enter Valid Email.</span>" ).insertAfter("#register_email");
		}
						
		if(password==''){
			//$('#user_password').parent().addClass('has-error');
			$("<span class='error_msg'> Please Enter Your Password.</span>" ).insertAfter("#user_password");
		}
		/* if(mobile_phone==''){
			//$('#mobile_phone').parent().addClass('has-error');
			$("<span class='error_msg'> Please Enter Your Mobile Number.</span>" ).insertAfter("#mobile_phone");
		} */
		
		var either_company_or_college_flag = 'Y';
		if(current_status == 'professional' && current_company==''){
			//$('#current_company').parent().addClass('has-error');
			$("<span class='error_msg'> Please Enter Your Current Company.</span>" ).insertAfter("#current_company");
			either_company_or_college_flag = 'N';
		}
		
		if(current_status == 'student' && college==''){
			//$('#current_company').parent().addClass('has-error');
			$("<span class='error_msg'> Please Enter Your College.</span>" ).insertAfter("#int-institute");
			either_company_or_college_flag = 'N';
		}
		
		if(gender == ''){
			//$('#current_company').parent().addClass('has-error');
			$("<span class='error_msg'> Please Select Your Gender.</span>" ).insertAfter("#gender-select");
		}
		
		if(userSkill == ''){
			//$('#current_company').parent().addClass('has-error');
			$("<span class='error_msg'> Please Select Skills You Know.</span>" ).insertAfter("#userSkill");
		}
		if(response.length == 0){
		$("<span class='error_msg'> Please Verify Captcha.</span>" ).insertAfter("#sing_up_form #signup_recaptcha");
	    }
		
		if(chkbox_agree != 1){
			$("<span class='error_msg'> You Must Agree To Terms And Conditions Of The Techgig.com</span>" ).insertAfter($("#chkbox_agree").parent());
		}
		
		if(first_name!='' && email!='' && password!='' && gender != '' && userSkill != '' && either_company_or_college_flag != 'N' && response.length!=0 && chkbox_agree == 1) { //  && mobile_phone!=''
			//$("#page-overlay1").css("display","table");
			return true;
		} else {
			//$("#register_user").attr("disabled",false);
			return false;
		}
	
	}
	// ajax popup signup action
	
	
	// login/Signup Validattion
	
	$instance.validateSignupFrom = function () {   
		
		//$("#register_user").attr("disabled",true);
		var first_name = $.trim($("#first_name").val());
		var email = $.trim($("#register_email").val());
		var password = $.trim($("#user_password").val());
		var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		var reg_source = $.trim($("#reg_source").val());
		var reg_type = $.trim($("#reg_type").val());
		var sex = $.trim($("#sex").val());
		var current_company = $.trim($("#current_company").val());
		var college = $.trim($("#int-institute").val());
		var current_status = $('input[name=current_status]:checked').val();
		var token_input_userSkill = $.trim($("#userSkill").val());
		var return_url = $.trim($("#return").val());
		var form_key = $.trim($("#form_key").val());
		
	   // var txtCaptcha = grecaptcha.getResponse(signup_recaptcha_ajax);
		
		if ($('#chkbox_agree').is(":checked")) {
			var chkbox_agree = 1;
		} else {
			var chkbox_agree = 0;
		}
		
		first_name = (typeof first_name === "undefined") ? "" : first_name;
		email = (typeof email === "undefined") ? "" : email;
		password = (typeof password === "undefined") ? "" : password;
		current_company = (typeof current_company === "undefined") ? "" : current_company;
		college = (typeof college === "undefined") ? "" : college;
		reg_source = (typeof reg_source === "undefined") ? "" : reg_source;
		reg_type = (typeof reg_type === "undefined") ? "" : reg_type;
		form_key = (typeof form_key === "undefined") ? "" : form_key;
		//txtCaptcha = (typeof txtCaptcha === "undefined") ? "" : txtCaptcha;
		token_input_userSkill = (typeof token_input_userSkill === "undefined") ? "" : token_input_userSkill;
		
		//Deloitte Check
		var is_technoutsav = $('input[name="is_technoutsav"]').val();
		is_technoutsav = (typeof is_technoutsav === "undefined") ? "" : is_technoutsav;

		$(".error_msg").remove();
		
		if(first_name==''){
			$("<span class='error_msg'> Please enter your name.</span>" ).insertAfter("#first_name");	
		}
		
		if(email==''){
			$("<span class='error_msg'> Please enter your email.</span>" ).insertAfter("#register_email");
		} else if (!filter.test(email)) {
			$("<span class='error_msg'> Please enter valid email.</span>" ).insertAfter("#register_email");
        }
		
		if(email!=''){
			var action_url = base_url+'/general_ajax_task.php';
			action_block_name = 'check_if_user_already_registered_in_tg';

			if(email != '') {
				$.post(action_url,{action: action_block_name, user_email_id: email},function(data) {
					var response = $.trim(data);
					if(response=='email_exist'){
						$("<span class='error_msg'> You seem to be already registered on TechGig.com</span>" ).insertAfter("#register_email");
					}
			
				})
			}
		}
		
		if(password==''){
			$("<span class='error_msg'> Please enter your password.</span>" ).insertAfter("#user_password");
		}
		
		if(password!=''){
			var text_password = password.match(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/) ? 'TRUE' : 'FALSE';
			if(text_password=='FALSE'){
				$("<span class='error_msg'> Password must be minimum 6 & maximum 16 characters long & a combination of alphabets & numbers. Allowed special characters are _!$@#^&.</span>" ).insertAfter("#user_password");
				password ='';
			}
			
		}
				
		if(sex==''){
			$("<span class='error_msg'> Please select your gender.</span>" ).insertAfter("#gender-select");
		}
		
		var either_company_or_college_flag = 'Y';
		if(current_status == 'professional' && current_company==''){
			$("<span class='error_msg'> Please enter your current company.</span>" ).insertAfter("#current_company");
			either_company_or_college_flag = 'N';
		}
		
		if(current_status == 'student' && college==''){
			$("<span class='error_msg'> Please enter your college.</span>" ).insertAfter("#int-institute");
			either_company_or_college_flag = 'N';
		}
		
		if(chkbox_agree=='') {
			$("<span class='error_msg'> You must agree to Terms and Conditions of the Techgig.com</span>" ).insertAfter("#tg_agreement");
		}
		
		if(form_key == '') {
			$("<span class='error_msg'> Invalid Form Request!. You are being redirected!!</span>" ).insertAfter("#tg_agreement");
			window.location.href = base_url;
		}
		
		/* if(txtCaptcha=='') {
			$("<span class='error_msg'> Please provide Captcha first!.</span>" ).insertAfter("#signup_verification .capcha-box");
		} */
		
		if(token_input_userSkill==''){
		 	$("<span class='error_msg'> Please select your skill.</span>" ).insertAfter(".token-input-list-facebook");
		}
		
		var html_content = $('#signup-form').html();
		
		if(first_name!='' && email!='' && password!='' && chkbox_agree != '' && form_key != '' && either_company_or_college_flag != 'N') {
			
			$('#signup-form').html('');
			//$('#signup-form').html('<p class="tg-loader text-center"><img src="' + theme_url + '/images/TG-Loader.gif"></p>');

			var action_url = base_url+'/general_ajax_task.php';
			action_block_name = 'tg_user_signup';
			$.post(action_url,{action: action_block_name, email: email,first_name:first_name,password:password,sex:sex,reg_source:reg_source,current_company:current_company,reg_type:reg_type,user_skill:token_input_userSkill,form_key:form_key,is_technoutsav:is_technoutsav},function(response) {
					//var data = $.parseJSON(response);
					var data = response;
	
					if(data.message=='error') {
						$('#signup-form').html('');
						$('#signup-form').html(html_content);
						$('#first_name').val(first_name);
						$('#register_email').val(email);
						$('#user_password').val(password);
						$('#sex').val(sex);
						$('#current_company').val(current_company);
						$("<span class='error_msg'>Apart from Alphabets and Numbers Only allowed special chars are _!$@#^& . Min 6 and Max 16 chars.</span>" ).insertAfter("#user_password");

						if(data.email !== "" && is_technoutsav == 1){
							$("<span class='error_msg'> You are not authorized to participate for this event.</span>" ).insertAfter("#register_email");
						}
						// re-activate the disabled submit button if any validation fails
						$("#register_user").attr("disabled",false);
			
					} else if(data.message=='success') {
						window.location.href=return_url;
						//window.location.href=base_url+'/register_steps.php?reutn='+return_url;
					} else if(data.message == 'scrf_error') {
						window.location.href = base_url+'?msg_id=7042';
					} else if(data.message == 'captcha_error') {
						$('#signup-form').html('');
						$('#signup-form').html(html_content);
						$('#first_name').val(first_name);
						$('#register_email').val(email);
						$('#user_password').val(password);
						$('#sex').val(sex);
						$('#current_company').val(current_company);
						//$("<span class='error_msg'>Please provide valid captcha details!</span>" ).insertAfter("#signup_verification .capcha-box");
						
						// Refresh Captcha Block
						//grecaptcha.reset(signup_recaptcha_ajax);
						
						// re-activate the disabled submit button if any validation fails
						$("#register_user").attr("disabled",false);
					}
			
				})
			return false;
		} else {
			// re-activate the disabled submit button if any validation fails
			$("#register_user").attr("disabled",false);
			
			return false;
		}
	
	}
	
	$instance.validateEmailSignup = function () {   
		var email = $.trim($("#frm-email-signup #register_email").val());
		email = (typeof email === "undefined") ? "" : email;
		
		$(".error_msg").remove();
		
		if(email!=''){
			var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
			if (!filter.test(email)) {
			   $("<span class='error_msg'> Please enter valid email.</span>" ).insertAfter($('#frm-email-signup input[type="button"]'));
			   return false;
			}
		
			var action_url = base_url+'/general_ajax_task.php';
			action_block_name = 'check_if_user_already_registered_in_tg';

			if(email != '') {
				$.post(action_url,{action: action_block_name, user_email_id: email},function(data) {
					var response = $.trim(data);
					if(response=='email_exist'){
						var url = base_url+'/register.php?tab=login&msg_id=24012&msg_type=2';
						window.location.href = url;
						return false;	
					} else {
						$('#frm-email-signup').submit();
					}						
				})
			}
		} else {
			$("<span class='error_msg'> Please enter email.</span>" ).insertAfter($('#frm-email-signup input[type="button"]'));	
			return false;
		}
	}
	
	$instance.starRating = function(value) {
        $.getScript(theme_url + "/javascript/star-rating.min.js")
            .done(function() {
                $(".rating1").starRating({
					minus: true,
                                        value:value
				});
            })
            .fail(function() {
                console.log('starRating not loaded');
            })
    };
	
	$instance.validateLoginInForm = function () {   
		$(".error_msg").remove();
		var username = $.trim($("#username").val());
		var password = $.trim($("#password").val());
		username = (typeof username === "undefined") ? "" : username;
		password = (typeof password === "undefined") ? "" : password;
		
		$(".error_msg").remove();
		$("#username").parent().removeClass();
		$("#password").parent().removeClass();
			
		
		if(username==''){
			$('#username').parent().addClass('has-error');
			$("<span class='error_msg'> Please enter your username.</span>" ).insertAfter("#username");
		}
		if(password==''){
			$('#password').parent().addClass('has-error');
			$("<span class='error_msg'> Please enter your password.</span>" ).insertAfter("#password");
		}
		
		if(username!='' && password!=''){
			return true;
			
		} else {
			return false;
		}
	
	}
		
	
	$instance.validateTgLoginInForm = function () {   
		$(".error_msg").remove();
		$('.info_msg').hide();
		var username = $.trim($("#username").val());
		var password = $.trim($("#password").val());
		username = (typeof username === "undefined") ? "" : username;
		password = (typeof password === "undefined") ? "" : password;
		if($("#login_recaptcha").length>0){
		var response = grecaptcha.getResponse(login_recaptcha);
		}
		
		$(".error_msg").remove();
		//$("#username").parent().removeClass();
		//$("#password").parent().removeClass();
			
		
		if(username=='') {
			//$('#username').parent().addClass('has-error');
			$("<span class='error_msg'> Please Enter Your Email.</span>" ).insertAfter("#username");
		}
		
		if(!(Tg_CommonFunction.validate_email(username)) && username!='') {
			$("<span class='error_msg'> Please Enter Valid Email.</span>" ).insertAfter("#username");	
		}
		
		if(password==''){
			//$('#password').parent().addClass('has-error');
			$("<span class='error_msg'> Please Enter Your Password.</span>" ).insertAfter("#password");
		}
		if($("#login_recaptcha").length>0){
			 if(response.length == 0){
				$("<span class='error_msg'> Please Verify Captcha.</span>" ).insertAfter("#login-form .capcha-box");
				return false;
			} 
		}
		if(username!='' && password!=''){
			//$("#page-overlay1").css("display","table");
			return true;
			
		} else {
			return false;
		}
	
	}
	
	/*
	$instance.earn_bits = function () {
				$.ajax({
					type: "POST",
							url: base_url + '/ajax_files/saas_corporate_function.php?action=getTimesPoint',
					data: {},
					success: function(response){
								var data = $.parseJSON(response);
								var timespoint = data.timespoint;
								if(timespoint == null){
									timespoint = 0;
								}
								$('.earn-bits span.bits-cnt').text(timespoint);
					}
				});

	 }
        */
	
	$instance.AdminsidebarSelcted = function () {  
                 
			var current_url = document.location.href;
				$( "#page-header ul li a" ).each(function( index ) {
				var sidebar_title =  $( this ).attr( "href" );
					if (current_url.indexOf(sidebar_title) != -1) {
									$('#page-header ul li').removeClass('active');
									$( this ).closest('li').addClass( "active" );
					
					}
			});

	};
	
	$instance.UpdateTableHeaders = function () {  
	   $(".divition-block, .user-detail-sections").each(function() {
	   
		   var el             = $(this),
			   offset         = el.offset(),
			   scrollTop      = $(window).scrollTop(),
			   floatingHeader = $(".floatingHeader", this)
		   
		   if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
			   floatingHeader.css({
				"visibility": "visible"
			   });
		   } else {
			   floatingHeader.css({
				"visibility": "hidden"
			   });      
		   };
	   });
	};

	$instance.DropzoneProject = function(){
            var contest_redirect_url = $('#test_action_url').val(); 
            var page_number = $('#next_page_count').val();
            var invitation_id = $('#invitation_id').val();
            
            $.getScript(theme_url + "/javascript/dropzone-min.js")
			.done(function() {
				$(".dropzone-project").dropzone({
                                    addRemoveLinks:true,
                                    maxFiles:1,
                                    acceptedFiles:".zip",
                                    maxFilesize:300,
                                    dictFileTooBig: 'Maximum File upload Size is 300 MB',
                                    dictInvalidFileType:"Please upload file in zip archive.",
                                    init: function() {
	                                    this.on("maxfilesexceeded", function(file) {
	                                        this.removeAllFiles();
	                                        this.addFile(file);
	                                    });
	                                    this.on("error", function(file, message) { 
	                                                
	                                                $('.submit-error-project').modal('show');
	                                                var html = "<div class='file-error-message'><p>"+ message+" </p></div>";
	                                                $('.submit-error-project').find('.modal-body').html(html);
	                                                
	                                                this.removeFile(file); 
	                                    });
	                                    this.on("removedfile", function (file) {
	                                    	$('#file_available').val('N');
	                                    });
	                                    
                                    },
                                    url : base_url+'/ajax_files/saas_candidate_function.php?action=UploadZipAttemptFiles',  
                                    params: {
                                        question_id: $('#question_id').val(),
                                        invitation_id : $('#invitation_id').val(),
                                        platform_type: $('#platform_type').val(),
                                        question_category: $('#question_category').val()
                                    },
                                    success: function(file, response){
                                        response = response;
                                        if(response.status=='error'){
                                             $('.submit-error-project').modal('show');
                                            var html = "<div class='file-error-message'><p>"+ response.msg+" </p></div>";
                                            $('.submit-error-project').find('.modal-body').append(html);
                                            return false;
                                            
                                        }else if(response.status == 'success'){
                                        		$('#file_available').val('Y');
                                        		$("#save_file_project").text("Save Project");

                                                $('#check_user_submission').val('Y');
                                                $('.submit-complete').removeAttr('data-toggle');
                								$('.submit-complete').removeAttr('data-target');
                                                // window.location.reload(); 
                                        }
                                    },
                                 	headers: {'X-Csrf-Token': $('meta[name="csrf-token"]').attr('content')}
                                });
				
			})
			.fail(function() {
				console.log('dropzone not loaded');
			});
            
        }
        
    $instance.SaveFileProject = function(){
        
        var file_available = $('#file_available').val();

        if(file_available == "Y"){
        	$("#save_file_project").addClass( "disabled" );
			$("#save_file_project").text("Saving...");

			$("#save_file_project").removeClass( "disabled" );
        	$("#save_file_project").text("Saved");
        }else{
        	$('.submit-error-project').find('.modal-body').html("");
    	    var msg = "Please upload file in zip archive.";
            var html = "<div class='file-error-message'><p>"+ msg+" </p></div>";
            $('.submit-error-project').find('.modal-body').append(html);
            $('.submit-error-project').modal('show');

        }

    };

    $instance.DropzoneProjectFileUpload = function(){
        var contest_redirect_url = $('#test_action_url').val(); 
        var page_number = $('#next_page_count').val();
        var invitation_id = $('#invitation_id').val();
        var ctf_contest = $('#question_category').val();
        
        $.getScript(theme_url + "/javascript/dropzone-min.js")
		.done(function() {
			$(".dropzone-project-file-upload").dropzone({
                                addRemoveLinks:true,
                                maxFiles:1,
                                acceptedFiles:".zip",
                                maxFilesize:300,
                                dictFileTooBig: 'Maximum File upload Size is 300 MB',
                                dictInvalidFileType:"Please upload file in zip archive.",
                                init: function() {
                                    this.on("maxfilesexceeded", function(file) {
                                        this.removeAllFiles();
                                        this.addFile(file);
                                    });
                                    this.on("error", function(file, message) { 
                                        
                                    	//Alexa check
                                    	var theme_name = $('#theme_name').val();
							            if(theme_name === "alexa" && $('#skill_file_upload').val().length <= 0){
                                    		message = "Please Enter Skill Id";
	                                    }

                                        $('.submit-error-file').modal('show');
                                        var html = "<div class='file-error-message'>"+ message+" <p></p></div>";
                                        $('.submit-error-file').find('.modal-body .alert-info').html(html);
                                        
                                        this.removeFile(file); 
                                    });
                                    this.on("removedfile", function (file) {
                                    	$('#file_available').val('N');
                                    });
                                    this.on('sending', function(file, xhr, formData){
                                    	var theme = $('#theme_id').val();
							            formData.append('theme_id', theme);

							            //alexa cg theme check
							            var theme_name = $('#theme_name').val();
							            if(theme_name === "alexa"){
							            	var skill_file_upload = $('#skill_file_upload').val();
							            	if ( skill_file_upload.length <= 0 ) { 
								            	this.removeFile(file); 
								            }else{
								            	formData.append('skill_file_upload', skill_file_upload);
								            }
							            }
							        });
                                },
                                url : base_url+'/ajax_files/saas_candidate_function.php?action=UploadFileSubmission',  
                                params: {
                                    question_id: $('#question_id').val(),
                                    invitation_id : $('#invitation_id').val(),
                                    platform_type: $('#platform_type').val(),
                                    ctf_contest: $('#question_category').val(),
                                    // theme_id: theme
                                },
                                success: function(file, response){
                                    response = response;
                                    if(response.status=='error'){
                                        $('.submit-error-file').modal('show');
                                        var html = "<div class='file-error-message'>"+ response.msg+" <p></p></div>";
                                        $('.submit-error-file').find('.modal-body .alert-info').append(html);

                                        this.removeFile(file); 
                                        return false;
                                        
                                    }else if(response.status == 'success'){

                                		$('#file_available').val('Y');
                                		$("#save_file_upload").text("Save Project");

                                        $('#check_user_submission').val('Y');
                                        $('.submit-complete').removeAttr('data-toggle');
        								$('.submit-complete').removeAttr('data-target');
                                       
					                    if(page_number == 'none'){
					                       if(ctf_contest!=''){
					                    		//return do nothing
					                    	}else{
					                			$('#submit-test').modal('show');
					                		}
					                    }
                                    }
                                },
                             	headers: {'X-Csrf-Token': $('meta[name="csrf-token"]').attr('content')}
                            });
			
		})
		.fail(function() {
			console.log('dropzone not loaded');
		});
        
    }

    $instance.FileAvailableChange = function(){
    	$("#save_file_upload").addClass( "disabled" );
		$("#save_file_upload").text("Saving...");

		$("#save_file_upload").removeClass( "disabled" );
    	$("#save_file_upload").text("Saved");
    };
        
    $instance.SaveFileUpload = function(){
        
        var file_available = $('#file_available').val();

        if(file_available == "Y"){
        	$instance.FileAvailableChange();
        }else{
        	$('.submit-error-file').find('.modal-body').html("");
    	    var msg = "Please upload file in zip archive.";
            var html = "<div class='file-error-message'><p>"+ msg+" </p></div>";
            $('.submit-error-file').find('.modal-body').append(html);
            $('.submit-error-file').modal('show');

        }

    };

    $instance.DeloitteDropzoneProjectFileUpload = function(){
        var page_number = $('#next_page_count').val();
        var invitation_id = $('#invitation_id').val();
        var ctf_contest = $('#question_category').val();
        
        $.getScript(theme_url + "/javascript/dropzone-min.js")
		.done(function() {
			$(".dropzone-brief_business_problem").dropzone({
                                addRemoveLinks:true,
                                maxFiles:1,
                                maxFilesize:20,
                                dictFileTooBig: 'Maximum File upload Size is 20 MB',
                                init: function() {
                                    this.on("maxfilesexceeded", function(file) {
                                        this.removeAllFiles();
                                        this.addFile(file);
                                    });
                                    this.on("error", function(file, message) { 
                                                
                                                $('.submit-error-file').modal('show');
                                                var html = "<div class='file-error-message'><p>"+ message+" </p></div>";
                                                $('.submit-error-file').find('.modal-body').html(html);
                                                
                                                this.removeFile(file); 
                                    });
                                    this.on("removedfile", function (file) {
                                    	$('#file_available').val('N');
                                    });
                                    
                                },
                                url : base_url+'/ajax_files/saas_candidate_function.php?action=DeloitteUploadFile1Submission',  
                                params: {
                                    question_id: $('#question_id').val(),
                                    invitation_id : $('#invitation_id').val(),
                                    platform_type: $('#platform_type').val(),
                                    ctf_contest: $('#question_category').val(),
                                },
                                success: function(file, response){
                                    response = response;
                                    if(response.status=='error'){
                                         $('.submit-error-file').modal('show');
                                        var html = "<div class='file-error-message'><p>"+ response.msg+" </p></div>";
                                        $('.submit-error-file').find('.modal-body').append(html);
                                        return false;
                                        
                                    }else if(response.status == 'success'){

                                		$('#file_available').val('Y');
                                		$("#save_file_upload").text("Save Project");
                                		$('input[name=brief_business_problem]').val(response.msg);

                                    }
                                },
                             	headers: {'X-Csrf-Token': $('meta[name="csrf-token"]').attr('content')}
                            });
			
		})
		.fail(function() {
			console.log('dropzone not loaded');
		});
        
    }
    
    $instance.DeloitteDropzoneProject1FileUpload = function(){
        var page_number = $('#next_page_count').val();
        var invitation_id = $('#invitation_id').val();
        var ctf_contest = $('#question_category').val();
        
        $.getScript(theme_url + "/javascript/dropzone-min.js")
		.done(function() {
			$(".dropzone-proposed_solution").dropzone({
                                addRemoveLinks:true,
                                maxFiles:1,
                                maxFilesize:20,
                                dictFileTooBig: 'Maximum File upload Size is 20 MB',
                                init: function() {
                                    this.on("maxfilesexceeded", function(file) {
                                        this.removeAllFiles();
                                        this.addFile(file);
                                    });
                                    this.on("error", function(file, message) { 
                                                
                                                $('.submit-error-file').modal('show');
                                                var html = "<div class='file-error-message'><p>"+ message+" </p></div>";
                                                $('.submit-error-file').find('.modal-body').html(html);
                                                
                                                this.removeFile(file); 
                                    });
                                    this.on("removedfile", function (file) {
                                    	$('#file_available').val('N');
                                    });
                                    
                                },
                                
                                url : base_url+'/ajax_files/saas_candidate_function.php?action=DeloitteUploadFile1Submission',  
                                params: {
                                    question_id: $('#question_id').val(),
                                    invitation_id : $('#invitation_id').val(),
                                    platform_type: $('#platform_type').val(),
                                    ctf_contest: $('#question_category').val(),
                                },
                                success: function(file, response){
                                    response = response;
                                    if(response.status=='error'){
                                         $('.submit-error-file').modal('show');
                                        var html = "<div class='file-error-message'><p>"+ response.msg+" </p></div>";
                                        $('.submit-error-file').find('.modal-body').append(html);
                                        return false;
                                        
                                    }else if(response.status == 'success'){

                                		$('#file_available').val('Y');
                                		$("#save_file_upload").text("Save Project");
                                		$('input[name=proposed_solution]').val(response.msg);

                                    }
                                },
                             	headers: {'X-Csrf-Token': $('meta[name="csrf-token"]').attr('content')}
                            });
			
		})
		.fail(function() {
			console.log('dropzone not loaded');
		});
        
    }
    
    $instance.DeloitteDropzoneProject2FileUpload = function(){
        var page_number = $('#next_page_count').val();
        var invitation_id = $('#invitation_id').val();
        var ctf_contest = $('#question_category').val();
        
        $.getScript(theme_url + "/javascript/dropzone-min.js")
		.done(function() {
			$(".dropzone-proposed_tech_stack_language").dropzone({
                                addRemoveLinks:true,
                                maxFiles:1,
                                maxFilesize:20,
                                dictFileTooBig: 'Maximum File upload Size is 20 MB',
                                init: function() {
                                    this.on("maxfilesexceeded", function(file) {
                                        this.removeAllFiles();
                                        this.addFile(file);
                                    });
                                    this.on("error", function(file, message) { 
                                                
                                                $('.submit-error-file').modal('show');
                                                var html = "<div class='file-error-message'><p>"+ message+" </p></div>";
                                                $('.submit-error-file').find('.modal-body').html(html);
                                                
                                                this.removeFile(file); 
                                    });
                                    this.on("removedfile", function (file) {
                                    	$('#file_available').val('N');
                                    });
                                    
                                },
                                url : base_url+'/ajax_files/saas_candidate_function.php?action=DeloitteUploadFile1Submission',  
                                params: {
                                    question_id: $('#question_id').val(),
                                    invitation_id : $('#invitation_id').val(),
                                    platform_type: $('#platform_type').val(),
                                    ctf_contest: $('#question_category').val(),
                                },
                                success: function(file, response){
                                    response = response;
                                    if(response.status=='error'){
                                         $('.submit-error-file').modal('show');
                                        var html = "<div class='file-error-message'><p>"+ response.msg+" </p></div>";
                                        $('.submit-error-file').find('.modal-body').append(html);
                                        return false;
                                        
                                    }else if(response.status == 'success'){

                                		$('#file_available').val('Y');
                                		$("#save_file_upload").text("Save Project");
                                		$('input[name=proposed_tech_stack_language]').val(response.msg);

                                    }
                                },
                             	headers: {'X-Csrf-Token': $('meta[name="csrf-token"]').attr('content')}
                            });
			
		})
		.fail(function() {
			console.log('dropzone not loaded');
		});
        
    }
    
    
    $instance.DeloitteDropzoneProject3FileUpload = function(){
        var page_number = $('#next_page_count').val();
        var invitation_id = $('#invitation_id').val();
        var ctf_contest = $('#question_category').val();
        
        $.getScript(theme_url + "/javascript/dropzone-min.js")
		.done(function() {
			$(".dropzone-proposed_tech_stack").dropzone({
                                addRemoveLinks:true,
                                maxFiles:1,
                                maxFilesize:20,
                                dictFileTooBig: 'Maximum File upload Size is 20 MB',
                                init: function() {
                                    this.on("maxfilesexceeded", function(file) {
                                        this.removeAllFiles();
                                        this.addFile(file);
                                    });
                                    this.on("error", function(file, message) { 
                                                
                                                $('.submit-error-file').modal('show');
                                                var html = "<div class='file-error-message'><p>"+ message+" </p></div>";
                                                $('.submit-error-file').find('.modal-body').html(html);
                                                
                                                this.removeFile(file); 
                                    });
                                    this.on("removedfile", function (file) {
                                    	$('#file_available').val('N');
                                    });
                                    
                                },
                                url : base_url+'/ajax_files/saas_candidate_function.php?action=DeloitteUploadFile1Submission',  
                                params: {
                                    question_id: $('#question_id').val(),
                                    invitation_id : $('#invitation_id').val(),
                                    platform_type: $('#platform_type').val(),
                                    ctf_contest: $('#question_category').val(),
                                },
                                success: function(file, response){
                                    response = response;
                                    if(response.status=='error'){
                                         $('.submit-error-file').modal('show');
                                        var html = "<div class='file-error-message'><p>"+ response.msg+" </p></div>";
                                        $('.submit-error-file').find('.modal-body').append(html);
                                        return false;
                                        
                                    }else if(response.status == 'success'){

                                		$('#file_available').val('Y');
                                		$("#save_file_upload").text("Save Project");
                                		$('input[name=proposed_tech_stack]').val(response.msg);

                                    }
                                },
                             	headers: {'X-Csrf-Token': $('meta[name="csrf-token"]').attr('content')}
                            });
			
		})
		.fail(function() {
			console.log('dropzone not loaded');
		});
        
    }
    
    $instance.DeloitteDropzoneProject4FileUpload = function(){
        var page_number = $('#next_page_count').val();
        var invitation_id = $('#invitation_id').val();
        var ctf_contest = $('#question_category').val();
        
        $.getScript(theme_url + "/javascript/dropzone-min.js")
		.done(function() {
			$(".dropzone-market_place_positioning").dropzone({
                                addRemoveLinks:true,
                                maxFiles:1,
                                maxFilesize:20,
                                dictFileTooBig: 'Maximum File upload Size is 20 MB',
                                init: function() {
                                    this.on("maxfilesexceeded", function(file) {
                                        this.removeAllFiles();
                                        this.addFile(file);
                                    });
                                    this.on("error", function(file, message) { 
                                                
                                                $('.submit-error-file').modal('show');
                                                var html = "<div class='file-error-message'><p>"+ message+" </p></div>";
                                                $('.submit-error-file').find('.modal-body').html(html);
                                                
                                                this.removeFile(file); 
                                    });
                                    this.on("removedfile", function (file) {
                                    	$('#file_available').val('N');
                                    });
                                    
                                },
                                url : base_url+'/ajax_files/saas_candidate_function.php?action=DeloitteUploadFile1Submission',  
                                params: {
                                    question_id: $('#question_id').val(),
                                    invitation_id : $('#invitation_id').val(),
                                    platform_type: $('#platform_type').val(),
                                    ctf_contest: $('#question_category').val(),
                                },
                                success: function(file, response){
                                    response = response;
                                    if(response.status=='error'){
                                         $('.submit-error-file').modal('show');
                                        var html = "<div class='file-error-message'><p>"+ response.msg+" </p></div>";
                                        $('.submit-error-file').find('.modal-body').append(html);
                                        return false;
                                        
                                    }else if(response.status == 'success'){

                                		$('#file_available').val('Y');
                                		$("#save_file_upload").text("Save Project");
                                		$('input[name=market_place_positioning]').val(response.msg);

                                    }
                                },
                             	headers: {'X-Csrf-Token': $('meta[name="csrf-token"]').attr('content')}
                            });
			
		})
		.fail(function() {
			console.log('dropzone not loaded');
		});
        
    }
    
    $instance.DeloitteDropzoneProject5FileUpload = function(){
        var page_number = $('#next_page_count').val();
        var invitation_id = $('#invitation_id').val();
        var ctf_contest = $('#question_category').val();
        
        $.getScript(theme_url + "/javascript/dropzone-min.js")
		.done(function() {
			$(".dropzone-effort_and_cost").dropzone({
                                addRemoveLinks:true,
                                maxFiles:1,
                                maxFilesize:20,
                                dictFileTooBig: 'Maximum File upload Size is 20 MB',
                                init: function() {
                                    this.on("maxfilesexceeded", function(file) {
                                        this.removeAllFiles();
                                        this.addFile(file);
                                    });
                                    this.on("error", function(file, message) { 
                                                
                                                $('.submit-error-file').modal('show');
                                                var html = "<div class='file-error-message'><p>"+ message+" </p></div>";
                                                $('.submit-error-file').find('.modal-body').html(html);
                                                
                                                this.removeFile(file); 
                                    });
                                    this.on("removedfile", function (file) {
                                    	$('#file_available').val('N');
                                    });
                                    
                                },
                                url : base_url+'/ajax_files/saas_candidate_function.php?action=DeloitteUploadFile1Submission',  
                                params: {
                                    question_id: $('#question_id').val(),
                                    invitation_id : $('#invitation_id').val(),
                                    platform_type: $('#platform_type').val(),
                                    ctf_contest: $('#question_category').val(),
                                },
                                success: function(file, response){
                                    response = response;
                                    if(response.status=='error'){
                                         $('.submit-error-file').modal('show');
                                        var html = "<div class='file-error-message'><p>"+ response.msg+" </p></div>";
                                        $('.submit-error-file').find('.modal-body').append(html);
                                        return false;
                                        
                                    }else if(response.status == 'success'){

                                		$('#file_available').val('Y');
                                		$("#save_file_upload").text("Save Project");
                                		$('input[name=effort_and_cost]').val(response.msg);

                                    }
                                },
                             	headers: {'X-Csrf-Token': $('meta[name="csrf-token"]').attr('content')}
                            });
			
		})
		.fail(function() {
			console.log('dropzone not loaded');
		});
        
    }
    
    
    $instance.DeloitteDropzoneProject6FileUpload = function(){
        var page_number = $('#next_page_count').val();
        var invitation_id = $('#invitation_id').val();
        var ctf_contest = $('#question_category').val();
        
        $.getScript(theme_url + "/javascript/dropzone-min.js")
		.done(function() {
			$(".dropzone-project6-file-upload").dropzone({
                                addRemoveLinks:true,
                                maxFiles:1,
                                acceptedFiles:".zip",
                                maxFilesize:20,
                                dictFileTooBig: 'Maximum File upload Size is 20 MB',
                                dictInvalidFileType:"Please upload file in zip archive.",
                                init: function() {
                                    this.on("maxfilesexceeded", function(file) {
                                        this.removeAllFiles();
                                        this.addFile(file);
                                    });
                                    this.on("error", function(file, message) { 
                                                
                                                $('.submit-error-file').modal('show');
                                                var html = "<div class='file-error-message'><p>"+ message+" </p></div>";
                                                $('.submit-error-file').find('.modal-body').html(html);
                                                
                                                this.removeFile(file); 
                                    });
                                    this.on("removedfile", function (file) {
                                    	$('#file_available').val('N');
                                    });
                                    
                                },
                                url : base_url+'/ajax_files/saas_candidate_function.php?action=DeloitteUploadFile1Submission&allow=zip',  
                                params: {
                                    question_id: $('#question_id').val(),
                                    invitation_id : $('#invitation_id').val(),
                                    platform_type: $('#platform_type').val(),
                                    ctf_contest: $('#question_category').val(),
                                },
                                success: function(file, response){
                                    response = response;
                                    if(response.status=='error'){
                                         $('.submit-error-file').modal('show');
                                        var html = "<div class='file-error-message'><p>"+ response.msg+" </p></div>";
                                        $('.submit-error-file').find('.modal-body').append(html);
                                        return false;
                                        
                                    }else if(response.status == 'success'){

                                		$('#file_available').val('Y');
                                		$("#save_file_upload").text("Save Project");
                                		$('#file_uploaded_6').val(response.msg);

                                    }
                                },
                             	headers: {'X-Csrf-Token': $('meta[name="csrf-token"]').attr('content')}
                            });
			
		})
		.fail(function() {
			console.log('dropzone not loaded');
		});
        
    }
        
    $instance.DataScienceCSV = function () {
		$.getScript(theme_url + "/javascript/dropzone-min.js")
			.done(function() {
                                $('.dz-details').addClass('hide');
                                $('.response-error').addClass('hide');
				$(".dropzone-csv").dropzone({
                                    maxFiles:1,
                                    addRemoveLinks:true,
                                    acceptedFiles:".zip,.csv",
                                    maxFilesize:300,
                                    dictFileTooBig: 'Maximum File upload Size is 300 MB',
                                    dictInvalidFileType:"Please upload file in zip/csv format.",
                                    init: function() {
                                    this.on("maxfilesexceeded", function(file) {
                                        this.removeAllFiles();
                                        this.addFile(file);
                                    });
                                    this.on("error", function(file, message) { 
                                                
                                                $('#submit-error').modal('show');
                                                var html = "<div class='file-error-message'><p>"+ message+" </p></div>";
                                                $('#submit-error').find('.modal-body').html(html);
                                                
                                                this.removeFile(file); 
                                    });
                                    this.on("addedfile", function(file, message) { 
                                            $('.response-error').addClass('hide');
                                    });
                                    this.on("queuecomplete", function(file, message) { 
                                            $('.response-error').addClass('hide');
                                    });
                                    },
                                    url : base_url+'/ajax_files/saas_candidate_function.php?action=DataScienceCSV', 
                                    params: {
                                        question_id: $('#question_id').val(),
                                        invitation_id : $('#invitation_id').val(),
                                        platform_type: $('#platform_type').val()
                                    },
                                    success: function(file, response){
                                        
                                        this.removeFile(file); 
                                       
                                        $('.dz-details').addClass('hide');
                                        $('.file-uploaded').removeClass('hide');
                                        $('.content-wrapper.after-csv-upload').removeClass('hide');
                                        
                                        var response = response; 
                                        
                                        if(response.status == 'success'){
                                            $('.file-upload-csv').text(response.file_name);
                                            $(".download-icon-uploaded").attr("href", response.file_path);
                                            $(".download-icon-size").text(response.file_size);
                                             $('.hide-after-submit-ds').show();
                                        }
                                    },
									headers: {'X-Csrf-Token': $('meta[name="csrf-token"]').attr('content')}									
                                });
				
			})
			.fail(function() {
				console.log('dropzone not loaded');
			});
	};
        
        $(document).on('click', '.submitg-compile-ds', function(){
            
            $(this).attr('disabled','disabled');
            $('.hide-after-submit-ds').hide();
            $(this).text('Submitting..');
           var encrypt_token = $(this).data('encrypt_token');
           $('.response-error').addClass('hide');
           $.ajax({
                type: "POST",
                url: base_url + '/ajax_files/saas_candidate_function.php?action=saveCandidateDataScienceData', 
                data: {'encrypt_token':encrypt_token},
                success: function(response){
                    $('.submitg-compile-ds').removeAttr('disabled');
                    $('.submitg-compile-ds').text('Submit & Evaluate');
                    response = response;
                    
                    $('.response-error').html(response.html);
                    $('.response-error').removeClass('hide');
                    if(response.status == 'error'){
                        $('.submitg-compile-ds').addClass('hide');
                    }
                    $('#check_user_submission').val('Y');
                    $('.submit-complete').removeAttr('data-toggle');
                    $('.submit-complete').removeAttr('data-target');
                    $('.hide-after-submit-ds').show();
                    $('html, body').animate({
                        scrollTop: $("#dropzone-upload").offset().top - 75
                    }, 1000);
                }
            });
        });
        
        $instance.DataScienceSource = function () {
		$.getScript(theme_url + "/javascript/dropzone-min.js")
			.done(function() {
                            $('.dz-details').addClass('hide');
                            
				$(".dropzone-source").dropzone({
                                    //addRemoveLinks:true,
                                    acceptedFiles:".zip,.tar",
                                    maxFilesize:300,
                                    dictFileTooBig: 'Maximum File upload Size is 300 MB',
                                    dictInvalidFileType:"Please upload file in zip/tar.",
                                    init: function() {
                                    this.on("maxfilesexceeded", function(file) {
                                        this.removeAllFiles();
                                        this.addFile(file);
                                    });
                                    this.on("error", function(file, message) { 
                                                $('#submit-error').modal('show');
                                                var html = "<div class='file-error-message'><p>"+ message+" </p></div>";
                                                $('#submit-error').find('.modal-body').html(html);
                                                
                                                this.removeFile(file); 
                                    });
                                    },
                                    url : base_url+'/ajax_files/saas_candidate_function.php?action=DataScienceSource', 
                                    params: {
                                        question_id: $('#question_id').val(),
                                        invitation_id : $('#invitation_id').val(),
                                        platform_type: $('#platform_type').val()
                                    },
                                    success: function(file, response){
                                         response = response; 
                                        $('.dz-details').addClass('hide');
                                        $('.after-source-file').removeClass('hide');
                                         this.removeFile(file); 
                                        if(response.status=='error'){
                                             $('.submit-error-file').modal('show');
                                            var html = "<div class='file-error-message'><p>"+ response.msg+" </p></div>";
                                            $('.submit-error-file').find('.modal-body').append(html);
                                            return false;
                                            
                                        }else if(response.status == 'success'){
                                           
                                            $('.file-upload-source').text(response.file_name);
                                            $(".download-icon-uploaded").attr("href", response.file_path);
                                            $(".download-icon-size").text(response.file_size);
                                            $(".after-source-file").removeClass('hide');
                                        }
                                    },
									headers: {'X-Csrf-Token': $('meta[name="csrf-token"]').attr('content')}
                                });
				
                                
                                
			})
			.fail(function() {
				console.log('dropzone not loaded');
			});
	};       
        
    $instance.UploadFileType = function(file){
        
        
        var question_id =  $('#question_id').val();
        var invitation_id =  $('#invitation_id').val();
        var platform_type = $('#platform_type').val();
        var theme_id = $('#theme_id').val();
        var ctf_contest='';
		if($("#question_category")){
			ctf_contest = $("#question_category").val();
		}
        var contest_redirect_url = $('#test_action_url').val(); 
        var page_number = $('#next_page_count').val();
        if(typeof theme_id === 'undefined') { theme_id = ''; }                       
        var form_data = new FormData();
        form_data.append('file', file); 
        form_data.append('question_id', question_id); 
        form_data.append('invitation_id', invitation_id); 
        form_data.append('platform_type', platform_type); 
        form_data.append('theme_id', theme_id); 
        if(ctf_contest!=''){
			form_data.append('ctf_contest', ctf_contest);   
		}
       
        $('.dz-details').show();
        $('.default-view').show();
        $('.progress-loading').show();
        $('.file-name-upload').text(file.name);
        $('.file-size-upload').text(bytesToSize(file.size));
        if(ctf_contest){
            $('#ctfFileupload').val(file.name);
        }

        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    $(".dz-upload").css("width", percentComplete+'%');

                    if (percentComplete === 100) {
                        $('.progress-loading').hide();

                    }
                }
                }, false);

                return xhr;
            },
            type: "POST",
            data: form_data,
            contentType: false,
            processData: false,
            cache: false,
            success: function(data) { 

   				//do nothing

            }
    	});
    };
    
	$instance.Dropzone = function () {
		$.getScript(theme_url + "/javascript/dropzone-min.js")
			.done(function() {
				$(".dropzone").dropzone({
                                    addRemoveLinks:true,
                                    maxFiles:1,
                                    maxFilesize:300,
                                    acceptedFiles:".zip,.gz,.rar,.7z",
                                    dictInvalidFileType:"Please upload file in zip/gz/rar/7z archive.",
                                    dictFileTooBig: 'Maximum File upload Size is 300 MB',
                                    init: function() {
                                        this.on("maxfilesexceeded", function(file) {
                                            this.removeAllFiles();
                                            this.addFile(file);
                                        });
                                        this.on("error", function(file, message) { 
                                                
                                                $('.submit-error').modal('show');
                                                var html = "<div class='file-error-message'><p>"+ message+" </p></div>";
                                                $('.submit-error').find('.modal-body').html(html);
                                                
                                                this.removeFile(file); 
                                        });
                                    },
                                    url : base_url+'/ajax_files/saas_candidate_function.php?action=UploadFileSubmission', 
                                    params: {
                                        question_id: $('#question_id').val(),
                                        invitation_id : $('#invitation_id').val(),
                                        platform_type: $('#platform_type').val()
                                    },
                                    success: function(file, response){
                                        response = response;
                                        
                                        if(response.status=='error'){
                                             $('.submit-error').modal('show');
                                            var html = "<div class='file-error-message'><p>"+ response.msg+" </p></div>";
                                            $('.submit-error').find('.modal-body').append(html);
                                            this.removeFile(file); 
                                            
                                        }else if(response.status == 'success'){
                                                var contest_redirect_url = $('#test_action_url').val(); 
                                                var invitation_id = $('#invitation_id').val();
                                                $('#check_user_submission').val('Y');
                                                window.location.href = window.location.href;
                                        }
                                    },
									headers: {'X-Csrf-Token': $('meta[name="csrf-token"]').attr('content')}
                                });
				
			})
			.fail(function() {
				console.log('dropzone not loaded');
			});
	};
	
        
        $instance.Dropzonedummy = function () {
            
            
            var question_id =  $('#question_id').val();
                var invitation_id =  $('#invitation_id').val();
                var platform_type = $('#platform_type').val();
                                        
               var form_data = new FormData();
               form_data.append('file', file); 
               
               $('.dz-details').show();
               $('.progress-loading').show();
                $('.file-name-upload').text(file.name);
                $('.file-size-upload').text(bytesToSize(file.size));
                $.ajax({
                    xhr: function() {
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener("progress", function(evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            percentComplete = parseInt(percentComplete * 100);
                            $(".dz-upload").css("width", percentComplete+'%');

                            if (percentComplete === 100) {
                                $('.progress-loading').hide();
                            }
                    }
                    }, false);

                    return xhr;
                },
                url : base_url+'/ajax_files/saas_candidate_function.php?action=UploadDummySubmission', 
                type: "POST",
                data: form_data,
                contentType: false,
                processData: false,
                cache: false,
                success: function(data) { 
                   
                    var response = $.trim(data);
                    response = response;
                     $('.link-upload').text(response.msg);
                }
        });
            
            
	};
       
	
	$instance.clearMessage = function () {  
		setTimeout(function(){ 
			$('.message-inner-content').addClass('move-top');	
		}, 10000);
		
		setTimeout(function(){
			$('.message-inner-content').removeClass('success-msg').removeClass('warning-msg').removeClass('error-msg').removeClass('info-msg');
			$('.message-inner-content').removeClass('move-top');
		}, 15000);
	};
	
	$instance.showAlertMessage = function (msg,alertClass) {     
		alertClass = (typeof alertClass === "undefined") ? "info-msg" : alertClass;
		$(document).find('.common-message-box .message-inner-content').addClass(alertClass).find('p span').text(msg).show();
        Tg_CommonFunction.clearMessage();
	};
	
	$instance.SecondNavSelected = function (category_id) {  
                 
			$('#page-header .inner-wrap > ul > li').each(function() {  
				var href_var = $(this).find('a').attr('href');
				if(href_var == category_id) {
					$(this).addClass('active');
				}
			});

	};
	
	$instance.SaveUserHistory = function(){
		var keyword = $('#global-search-text').val();
				 var category = $('#category_name').val();
				 $.ajax({
					type: "POST",
					url: base_url + '/common/SaveUserSearch',
					data: {'category': category, 'keyword': keyword},
					success: function (data) {

					}
		 });
	}
	
	$instance.DownloadTechGigApp = function(){
		$('#app-download-form').modal('show');
	}
	
	$instance.SendAppDownloadLink = function(){
		$(".download-app").find('.has-error').removeClass( "has-error" );
		$(".download-app").find('.error_msg').remove();
		$(".download-app .alert").remove();
		
		var mobile_no = $('.download-app input#mobile_no').val();
		var action_url = base_url + '/ajax_files/common_functions.php?action=AppDownload';
		
		$.ajax({
						type: "POST",
						url: action_url, 
						data: {mobile_no:mobile_no},
						success: function(data){
							data = $.trim(data);
							var msg = data;
							var status = msg.status;
							if(status == 'error') {
									$("input[name=mobile_no]").closest('div').addClass( "has-error" );
									$( "<span class='alert alert-danger'> "+msg.msg+" </span>" ).insertAfter(".app-share-form");
							} else {
									$('.msgErrortop .message-box').addClass('success-msg').find('p').html(msg.msg); 
									Tg_CommonFunction.clearMessage();
									$('.download-app input#mobile_no').val('');
							}		
						}
			});
	}
	
	$instance.LoadNotification = function(){
		$('#notification-lists').load(base_url + "/ajax_files/notification_user_count.php");
	}
	
	$instance.MainNavSelected = function(menu_key){
		$("#main-navigation ul li.menu-item > a .menu-text").each(function() {
			var current_key = $(this).html();
			if(menu_key == current_key) {
				$("#main-navigation ul li").removeClass( "active" );
				$( this ).closest('li').addClass( "active" );
			}
		});
	}
	
	$instance.HTTPGet = function(uri, callbackFunction, callbackParameter, callbackParameter2) {
	  var xmlHttp = new XMLHttpRequest();
	  var bAsync = true;
	  if (!callbackFunction)
		bAsync = false;    
	  xmlHttp.open('GET', uri, bAsync);
	  xmlHttp.send(null);  
	  if (bAsync) {
		if (callbackFunction) {
		  xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4)
				callbackFunction(xmlHttp.responseText, xmlHttp, callbackParameter, callbackParameter2)
			}
		}
		return true;
	  }
	  else {
		return xmlHttp.responseText;
	  }
	}
	
	$instance.track_comScore_new = function(e) {
		var t=theme_url+"/javascript/",a=[];a.push({c1:"2",c2:"6036484",c3:"",c4:e});var s=document.createElement("script");s.setAttribute("type","text/javascript"),s.setAttribute("src",t+"comScore.js"),document.getElementsByTagName("head")[0].appendChild(s)
	}
	
	$instance.ajax_track_comScore = function(e) {
		try{$instance.track_comScore_new(e)}catch(t){}
		var a=theme_url+"/javascript/",s=[];s.push({c1:"2",c2:"6036484",c3:"",c4:e});
		var i=document.createElement("script");i.setAttribute("type","text/javascript"),i.setAttribute("src",a+"ajaxComScore.js?"+new Date),document.getElementsByTagName("head")[0].appendChild(i)
	}	
	
	$instance.ReloadParent = function(e) {
		var t=parent.window.location.href;if(-1!=t.indexOf("?")){qstrings=t.substr(t.indexOf("?")+1).split("&");var a=0;for(newqustring=Array(),i=0;i<qstrings.length;i++)-1==qstrings[i].indexOf("msg_id")&&(newqustring[a]=qstrings[i],a++);str_newquery=newqustring.join("&"),t=t.substr(0,t.indexOf("?")),t=t+"?"+str_newquery}else t+="?";var s=t+"&msg_id="+e;parent.window.location.href=s
	}
	
	$instance.chosenSelect = function() {
		$.getScript(theme_url + "/javascript/chosen_jquery.min.js")
				.done(function() {
					$('#subscribe-form .chosen-select').chosen();
				})
				.fail(function() {
					console.log('chosen not loaded');
				});
	};
	
	$instance.chosenSelectSignUp = function() {
		$.getScript(theme_url + "/javascript/chosen_jquery.min.js")
		.done(function() {
			$('.signup-steps .chosen-select').chosen({ max_selected_options: 3 });
		})
		.fail(function() {
			console.log('chosen not loaded');
		});
	};
	
	

    /*$instance.autocomplete = function() {
        $.getScript(theme_url + "/javascript/cg2016_jquery.countdown.js")
            .done(function() {
                $(".form-autocomplete").countDown();
            })
            .fail(function() {
                console.log('autocomplete not loaded');
            });
    };*/

    $instance.challengesCountdown = function() {
        $.getScript(theme_url + "/javascript/cg2016_jquery.countdown.js")
            .done(function() {
                $('.countdown .alt-1').countDown({
                    css_class: 'countdown-alt-2'
                });
            })
            .fail(function() {
                console.log('waitme not loaded');
            })
    };

    $instance.redirecturl = function(e) {
        document.location.href = e
    };
	
	$instance.clientsSlider = function() {
        $.getScript(theme_url + "/javascript/jquery.carouFredSel-6.0.5-packed.js")
            .done(function() {
                $('#our-clients ul').carouFredSel({
                    responsive: true,
                    width: '100%',
                    circular: true,
                    infinite: false,
                    auto: true,
                    scroll: {
                        items: 3,
                        duration: 1000
                    },
                    items: {
                        width: 200,
                        visible: {
                            min: 2,
                            max: 8
                        }
                    }
                });

            })
            .fail(function() {
                console.log('clientsSlider not loaded');
            })
    };

    $instance.tb_show = function(title, url) {
        Tg_CommonFunction.open_url_modal(title, url);
    }
	
	$instance.tb_remove = function () {
		$('#TechGigbootStrapModal').modal('hide');
		return false;
	}
	
	$instance.SlidingTestimonials = function() {
        $.getScript(theme_url + "/javascript/jquery.cycle.all.js")
            .done(function() {
                $('#sliding-testimonials .slides').cycle({
                    slideExpr: '.slide',
                    cleartypeNoBg: ' true',
                    fx: 'fade',
                    timeout: 8000,
                    speed: 500,
                    fit: 1,
                    slideResize: 0,
                    containerResize: 0,
                    height: 'auto',
                    width: null,
                    pager: '.controls'
                });

                $("#sliding-testimonials .slides").height($("#sliding-testimonials .slide").height());
            })
            .fail(function() {
                console.log('SlidingTestimonials not loaded');
            })
    };

    $instance.onePageNav = function() {
        $.getScript(theme_url + "/javascript/onepagenav.js")
            .done(function() {

				if ($(window).width() < 767) {
					$('#page-header ul').onePageNav({
						currentClass: 'active',
						scrollOffset:50,
						scrollThreshold: 0.01,
						changeHash: false,
						filter: ':not(.external)'
					});
				}else if ($("body").hasClass("challenge-details-page")) {
					$('#page-header ul').onePageNav({
						currentClass: 'active',
						scrollOffset:140,
						scrollThreshold: 0.01,
						changeHash: false,
						filter: ':not(.external)'
					});
				}else{
					$('#page-header ul').onePageNav({
						currentClass: 'active',
						scrollOffset:70,
						scrollThreshold: 0.01,
						changeHash: false,
						filter: ':not(.external)'
					});
				}
            })
            .fail(function() {
                console.log('OnePageNav not loaded');
            });
    };
	
	$instance.ChallengeSectionNav = function() {
        $.getScript(theme_url + "/javascript/onepagenav.js")
            .done(function() {
				$('#common-navigation ul').onePageNav({
					currentClass: 'active',
					changeHash: false,
					scrollOffset:80,
					scrollSpeed: 750,
					scrollThreshold: 0.15,
					filter: ':not(.external)',
					easing: 'swing'
				});
            })
            .fail(function() {
                console.log('OnePageNav not loaded');
            });
    };

    $instance.generic_social_share = function(e) {
        return window.open(e, "sharer", "toolbar=0,status=0,width=548,height=425"), !0
    };

    // Add follow entity
    $instance.follow_entity = function(entity_id, user_id, type, entity_type, status, page_type) {
        page_type = (typeof page_type === "undefined") ? "" : page_type;
        if (user_id == '' || user_id <= 0) {
            alert('Please login first for following.');
            return false;
        }
        try {
            var url = base_url + "/ajax_files/follow_entity.php";
            $.post(url, {
                'entity_id': entity_id,
                'user_id': user_id,
                'type': type,
                'entity_type': entity_type,
                'status': status,
                'page_type': page_type
            }, function(data) {
                data = $.trim(data);
                if (data.length > 0) {
                    if (data != 'Y' && data != 'N') {
                        alert(data);
                        return false;
                    }
                    if ($.trim(status) == 'Y') {
                        $('#ancFollow_' + entity_id).hide();
                        $('#ancUnfollow_' + entity_id).show();
                        var temp_cnt = parseInt($('#comp_follow_cnt_inp_' + entity_id).val());
                        var cnt_up = temp_cnt + 1;
                        $('#comp_follow_cnt_inp_' + entity_id).val(cnt_up);
                        $('#comp_follow_cnt_' + entity_id).html(cnt_up);
						$('#setting_' + entity_id).show();
                    } else {
                        $('#ancUnfollow_' + entity_id).hide();
                        $('#ancFollow_' + entity_id).show();
                        var temp_cnt = parseInt($('#comp_follow_cnt_inp_' + entity_id).val());
                        var cnt_up = temp_cnt - 1;
                        if (cnt_up < 0) {
                            cnt_up = 0;
                        }
                        $('#comp_follow_cnt_inp_' + entity_id).val(cnt_up);
                        $('#comp_follow_cnt_' + entity_id).html(cnt_up);
						$('#setting_' + entity_id).hide();
                    }
                }
            });

        } catch (e) {
            alert(e.description);
        }
    }
    $instance.like_unlike_comment = function(module_id, content_id, comment_id, status, module_text_name) {

        try {

            var url = base_url + "/ajax_files/common_wall_comment_likes.php";
            $.post(url, {
                'module_id': module_id,
                'content_id': content_id,
                'status': status,
                'comment_id': comment_id,
                'module_text_name': module_text_name
            }, function(data) {
                if (data.length > 0) {
                    result = data.split('@#$@#$');
                    if ($.trim(result[0]) == 'updated' || $.trim(result[0]) == 'inserted') {
                        $("#comment_likes_" + comment_id).html(result[1]);
                        $("#comment_unlikes_" + comment_id).html(result[2]);
                    } else {
                        alert($.trim(result[0]));
                    }
                }
            });

        } catch (e) {
            alert(e.description);
        }
    }
	
	$instance.showhidereplybox = function(reply_id, action) {

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
	
	$instance.delete_reply=function(comment_id, reply_id) {	
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
			//alert(e.description);
		}
	}
	
	$instance.submitreply=function(module_id, content_id, comment_id) { 
		var reply_count = $('#replies_count_'+comment_id).val();
		try{
			var reply_msg =  $("#reply_msg_"+comment_id).val();

			reply_msg = $.trim(reply_msg);

			if(reply_msg.replace(/ /g,'') == '' ){
				alert("Please enter your reply");
				return false;
			} else {
				//var url = base_url+"/ajax_files/add_common_wall_reply.php";
				var url = base_url+"/ajax_files/add_common_activity_wall_reply.php";
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
	
	
	$instance._sending_activity_invite_mail=function() {
			var user_email = $.trim($('#email_id').val());
			var share_type = $.trim($('#share_type').val());
			var custom_title = $.trim($('#custom_title').val());
			var custom_value = $.trim($('#custom_value').val());
			var captcha_check = $.trim($('#captcha_check').val());
			var event_id = $.trim($('#event_id').val());
			event_id = (typeof event_id === "undefined") ? false : event_id;
			
			if(user_email == '') {
				$('.msgErrortop .message-box').addClass('info-msg').find('p').text('Email id can not be empty!'); 
				Tg_CommonFunction.clearMessage();
				return false;
			}
			
			/*if(!(Tg_CommonFunction.validate_email(user_email))) {		
				$('.msgErrortop .message-box').addClass('info-msg').find('p').text('Please enter valid email id!'); 
				Tg_CommonFunction.clearMessage();
				return false;
			}*/
						
			
			var _inv_ajax_url = base_url+'/ajax_files/send_activity_invitation.php?action=send_external_mail';
			$.post(_inv_ajax_url, {'_mail_id':user_email,'share_type':share_type, 'custom_title':custom_title, 'custom_value':custom_value, 'captcha_check':captcha_check, 'event_id':event_id}, function(data){
				console.log('data => '+data);
				if(data == 1) {
					$('#email_id').val('');
					$('.msgErrortop .message-box').removeClass('info-msg warning-msg error-msg').addClass('success-msg').find('p').text('Invitation successfully sent!'); 
                    $(".page-overlay2").hide();
                    $('#cg-invite').hide();
				} else if(data == 2) {
					$('.msgErrortop .message-box').removeClass('success-msg warning-msg error-msg').addClass('info-msg').find('p').text('Email id can not be empty!'); 
				} else if(data == 3) {
					$('.msgErrortop .message-box').removeClass('info-msg success-msg error-msg').addClass('warning-msg').find('p').text('You have reached your referral limit!'); 
				} else if(data == 4) {
					$('.msgErrortop .message-box').removeClass('info-msg success-msg error-msg').addClass('warning-msg').find('p').text('You have reached your daily mail sending limit!');
				} else if(data == 5) {
					$('.msgErrortop .message-box').removeClass('info-msg success-msg error-msg').addClass('warning-msg').find('p').text('Please provide valid email ids!');
				} else if(data == 6) {
					$('.msgErrortop .message-box').removeClass('info-msg success-msg error-msg').addClass('warning-msg').find('p').text('You already sent invitation!');
				} else {
					$('.msgErrortop .message-box').removeClass('info-msg warning-msg success-msg').addClass('error-msg').find('p').text('Error while sending invitation!');
				}
				Tg_CommonFunction.clearMessage();
				
			}); 
		}

    $instance.open_url_modal = function(title, url, height, width) {
        $('#TechGigbootStrapModal .modal-dialog').removeClass('modal-lg');
        if (typeof url === 'undefined' || url == '') {
            return false;
        }
        if (typeof title === 'undefined') {
            title = '';
        }
		var resizeIframeHight = false;
        if (typeof height === 'undefined') {
            height = '100%';
			resizeIframeHight = true;
        }
        if (typeof width === 'undefined') {
            width = '100%';
        }
		
		/*
        $('#TechGigbootStrapModal .modal-body').load(url, function(e){
        	if(title == '') {
        		$('#TechGigbootStrapModal .modal-header').hide(); //hiding title header
        	} else {
        		$('#TechGigbootStrapModal .modal-title').html(title);
        	}
        	$('#TechGigbootStrapModal').modal('show');
        });
        */

        if (title == '') {
            $('#TechGigbootStrapModal .modal-header').hide(); //hiding title header
        } else {
            $('#TechGigbootStrapModal .modal-title').html(title);
        }

		if(resizeIframeHight) {
			$(".modal-body").html('<iframe width="' + width + '" height="' + height + '" frameborder="0" scrolling="yes" allowtransparency="true" src="' + url + '" onload="Tg_CommonFunction.resizeIframe(this)"></iframe>');
		} else {
			$(".modal-body").html('<iframe width="' + width + '" height="' + height + '" frameborder="0" scrolling="yes" allowtransparency="true" src="' + url + '" ></iframe>');
		}        

        $('#TechGigbootStrapModal').modal('show');
        return false;
    }

    $instance.set_ajax_login_responsive = function() {
        $('#ajax-login').removeClass('mobile-login');
        if ($(window).width() < 550) {
            $('#ajax-login').addClass('mobile-login');
        }
    }
	
	$instance.validate_email = function(email) {
		var emailReg="^[\\w_-]+(\\.[\\w_-]+)*@[\\w_-]+(\\.[\\w_-]+)*\\.[a-z]+$";
		var regex = new RegExp(emailReg);
		regex.multiline=true;
		return regex.test(email);
	}

    $instance.open_div_html_modal = function(title, div_id) {
        $('#TechGigbootStrapModal .modal-dialog').removeClass('modal-lg');
        var div_html = $("#" + div_id).html();
        $('#TechGigbootStrapModal .modal-body').html(div_html);
        $('#TechGigbootStrapModal .modal-title').html(title);
        $('#TechGigbootStrapModal').modal('show');
        return false;
    }

    $instance.open_login_lightbox = function(return_url, title) {
        if (typeof return_url === 'undefined') {
            return_url = '';
        }
        if (typeof title === 'undefined') {
            title = '';
        }
        var url = base_url + '/ajax_files/ajax_login_register.php?return=' + return_url;
        Tg_CommonFunction.open_url_modal(title, url);
    }

    $instance.resizeIframe = function(iframe) {
        var ht = $(iframe).contents().height();
        if (ht > 650) {
            iframe.height = '650px';
        } else {
            iframe.height = ht + "px";
        }
    };


    $instance.open_html_modal = function(title, html) {
        $('#TechGigbootStrapModal .modal-dialog').removeClass('modal-lg');
        $('#TechGigbootStrapModal .modal-body').html(html);
        if (title == '') {
            $('#TechGigbootStrapModal .modal-header').hide(); //hiding title header
        } else {
            $('#TechGigbootStrapModal .modal-title').html(title);
        }
        $('#TechGigbootStrapModal').modal('show');
        return false;
    };

    $instance.set_slider_list = function(container_id, content_width, display_count, scroll_count, duration_val, auto_val,scroll_direction) {
		
		content_width = (typeof content_width === "undefined") ? 270 : content_width;
		display_count = (typeof display_count === "undefined") ? 3 : display_count;
		scroll_count = (typeof scroll_count === "undefined") ? 1 : scroll_count;
		duration_val = (typeof duration_val === "undefined") ? 500 : duration_val;
		scroll_direction = (typeof scroll_direction === "undefined") ? 'left' : duration_val;
		auto_val = (typeof auto_val === "undefined") ? false : auto_val;
		
        $.getScript(theme_url + "/javascript/jquery.carouFredSel-6.0.5-packed.js")
            .done(function() {
                $('#' + container_id + ' ul').carouFredSel({
                    responsive: true,
                    width: '100%',
                    circular: true,
                    infinite: false,
					direction: scroll_direction,
                    auto: auto_val,
                    scroll: {
                        items: scroll_count,
                        duration: duration_val
                    },
                    prev: '#' + container_id + ' .previous-btn',
                    next: '#' + container_id + ' .next-btn',
                    items: {
                        width: content_width,
                        height: 'variable',
                        visible: {
                            min: 1,
                            max: display_count
                        }
                    },
					pagination: '#' + container_id + ' .controls'
                });

                var sliderHeight = $('#' + container_id + ' ul li').height();
                $('#' + container_id + ' .caroufredsel_wrapper').height(sliderHeight);

                $('#' + container_id + ' .previous-btn,#' + container_id + ' .next-btn').show();
				
				$(document).on("click", "#"+container_id+" .next-btn", function() {	
					$("#"+container_id+" .previous-btn").removeClass("not-visible");
				});
				
            })
            .fail(function() {
                console.log('carouFredSel not loaded');
            });


    };
	
	$instance.set_slider_repeat = function(container_id, content_width, display_count, scroll_count, duration_val, auto_val,scroll_direction) {
		
		content_width = (typeof content_width === "undefined") ? 270 : content_width;
		display_count = (typeof display_count === "undefined") ? 3 : display_count;
		scroll_count = (typeof scroll_count === "undefined") ? 1 : scroll_count;
		duration_val = (typeof duration_val === "undefined") ? 500 : duration_val;
		scroll_direction = (typeof scroll_direction === "undefined") ? 'left' : scroll_direction;
		auto_val = (typeof auto_val === "undefined") ? false : auto_val;
		
        $('#' + container_id + ' ul').carouFredSel({
			responsive: true,
			width: '100%',
			circular: true,
			infinite: false,
			direction: scroll_direction,
			auto: auto_val,
			scroll: {
				items: scroll_count,
				duration: duration_val
			},
			prev: '#' + container_id + ' .previous-btn',
			next: '#' + container_id + ' .next-btn',
			items: { 
				width: content_width,
				height: 'variable',
				visible: {
					min: 1,
					max: display_count
				}
			}
		});

		var sliderHeight = $('#' + container_id + ' ul li').height();
		$('#' + container_id + ' .caroufredsel_wrapper').height(sliderHeight);

		$('#' + container_id + ' .previous-btn,#' + container_id + ' .next-btn').show();
		
		$(document).on("click", "#"+container_id+" .next-btn", function() {	
			$("#"+container_id+" .previous-btn").removeClass("not-visible");
		});

    };

    $instance.saveResponseNRefreshCookiesForTjPopUP = function() {
        var url = base_url + '/general_ajax_task.php?action=save_tj_popup_response';
        $.post(url, null, function(data) {
            data = $.trim(data);
            if (data == 'Y') {
                //
            }
        });
        return false;
    };
	
	$instance.saveResponseNRefreshCookiesForEXTERNALPopUP = function() {
        var url = base_url + '/general_ajax_task.php?action=save_external_popup_response';
        $.post(url, null, function(data) {
            data = $.trim(data);
            if (data == 'Y') {
                //
            }
        });
        return false;
    };
	
	$instance.movingSlider = function() {
        function scrollTo(to, callback, options) {
		  var start = this
			? this.scrollLeft
			: document.documentElement.scrollTop || document.body.scrollTop;
		  var change = to - start,
			currentTime = 0,
			increment = 20,
			duration = 500,
			self = this;

		  if (arguments.length < 3) {
			duration = 500;
		  }

		  var animateScroll = function() {
			// increment the time
			currentTime += increment;
			// find the value with the quadratic in-out easing function
			var val = easeInOutQuad(currentTime, start, change, duration);

			if (self) {
			  self.scrollLeft = val;
			} else {
			  // move the document container
			  document.documentElement.scrollTop = val;
			  document.body.scrollTop = val;
			}

			// do the animation unless its over
			if (currentTime < duration) {
			  requestAnimFrame(animateScroll);
			} else {
			  if (typeof callback === 'function') {
				// the animation is done so lets callback
				callback();
			  }
			}
		  };
		  animateScroll();
		}

		function easeInOutQuad(t, b, c, d) {
		  t /= d / 2;
		  if (t < 1) {
			return c / 2 * t * t + b;
		  }
		  t--;
		  return -c / 2 * (t * (t - 2) - 1) + b;
		}

		var requestAnimFrame =
		  window.requestAnimationFrame ||
		  window.webkitRequestAnimationFrame ||
		  window.mozRequestAnimationFrame ||
		  function(callback) {
			window.setTimeout(callback, 1000 / 60);
		  };

		var OVERFLOW_THRESHOLD = 96;
		var nextTestimonial = function(e) {
		  var $this = $(this),
			$scroller = $this.siblings('.scroller'),
			itemWidth = $scroller.find('.item').outerWidth() + 2.5,
			currentPos = $scroller.scrollLeft(),
			nextItem = (2 + (currentPos - itemWidth * 0.75) / itemWidth) >> 0,
			nextPos = itemWidth * nextItem;

		  scrollTo.call($scroller[0], nextPos);
		  
		  $($this).parent().removeClass("moving-left");
		  $($this).parent().addClass("moving-right");
		  
		};

		var prevTestimonial = function(e) {
		  var $this = $(this),
			$scroller = $this.siblings('.scroller'),
			itemWidth = $scroller.find('.item').outerWidth() + 2.5,
			currentPos = $scroller.scrollLeft(),
			prevItem = ((currentPos - itemWidth * 0.75) / itemWidth) >> 0,
			prevPos = itemWidth * prevItem;

		  scrollTo.call($scroller[0], prevPos);
		  
		  $($this).parent().removeClass("moving-right");
		  $($this).parent().addClass("moving-left");
		};

		$('.moving-slides .next-arrow').click(nextTestimonial);
		$('.moving-slides .prev-arrow').click(prevTestimonial);

		$('.moving-slides .scroller').each(function(i,v) {
			var $that=$('.moving-slides .scroller').eq(i);
		  this.addEventListener(
			'scroll',
			function() {
			  var $this = $(this),
				currentPos = $this.scrollLeft(),
				scrollWidth = this.scrollWidth,
				itemWidth = $this.find('.item').outerWidth();

			  if (currentPos < OVERFLOW_THRESHOLD) {
				$this.siblings('.prev-arrow').addClass('hide');
				 $($this).parent().removeClass("moving-left");
				 $($this).parent().addClass("moving-right");
			  } else if (
				scrollWidth - currentPos - $this.find('.wrapper').innerWidth() <
				OVERFLOW_THRESHOLD
			  ) {
				$this.siblings('.next-arrow').addClass('hide');
				 $($this).parent().removeClass("moving-right");
				 $($this).parent().addClass("moving-left");
			  } else {
				$this.siblings('.prev-arrow, .next-arrow').removeClass('hide');
			  }
			},
			{ passive: true }
		  );
		  setInterval(function(){
			  if($($that).parent().hasClass("moving-left")){
				 $($that).parent().find('.prev-arrow').trigger('click'); 
				 $($that).parent().find('.next-arrow').click(function(e) {
					e.stopPropagation();
				 });
			  }else{
				 $($that).parent().find('.next-arrow').trigger('click'); 
				 $($that).parent().find('.prev-arrow').click(function(e) {
					e.stopPropagation();
				 });
			  }
			}, 8000);
		});

		$('.moving-slides').on('keyup', function(e) {
		  e = e || window.event;

		  switch (e.which || e.keyCode) {
			case 37:
			  $(this)
				.find('.prev-arrow')
				.click();
			  break;
			case 39:
			  $(this)
				.find('.next-arrow')
				.click();
		  }
		});

		$('.moving-slides .next-arrow').trigger('click'); 
    }

    $instance.loadECourseAutoPopUpLayer = function(course_title) {
        //<?php echo $course_title_name; ?>
        $('#thanks_block').hide();
        $('#layer2, #init_form').show();
        $('#source_type').val('call_me');
        $('#interested_course_block').hide();
        $('#lead_content').val(course_title);
        $('#layer_heading').html('Interested in this course? Give us your details. We will call you.');
        layerPop('layer2');
    }
	
	$instance.loadCapcha = function() {
		$.getScript(theme_url + "/javascript/ajax_captcha.js")
                .done(function() {
					console.log('captcha not loaded');
                })
                .fail(function() {
                    console.log('captcha not loaded');
                });
	}

    $instance.loadExtraJavascripts = function() {
        $.getScript("http://www.ceoconnect.in/feedback/scripts/feedbackInc.js")
            .done(function() {

            })
            .fail(function() {
                console.log('Js not loaded');
            })
    };

    $instance.saveResponseNSetCookieForBanner = function() {
        var url = base_url + '/general_ajax_task.php?action=set_banner_cookie';
        $.post(url, null, function(data) {
            data = $.trim(data);
            if (data == 'Y') {
                //
            }
        });
        return false;
    };

    $instance.saveCodePlayPopUpCookieForDisplay = function(cookieName) {
        var url = base_url + '/general_ajax_task.php?action=set_tg_banner_cookie&cookie_name_input=' + cookieName;
        $.post(url, null, function(data) {
            data = $.trim(data);
            if (data == 'Y') {
                //
            }
        });
        return false;
    };

    $instance.eCoursePopUpLayer = function() {
        var url = base_url + '/general_ajax_task.php?action=set_ecourse_popup_cookie';
        $.post(url, null, function(data) {
            data = $.trim(data);
            if (data == 'Y') {
                //
            }
        });
        return false;
    };


    $instance.CommonScroll = function(scrollpos) {
        $.getStylesheet(theme_url + "/custom_scrollbar.min.css")
        $.getScript(theme_url + "/javascript/Custom_Scrollbar.min.js")
            .done(function() {				
				 if(scrollpos > 4) {
                                    $("#sidebar .scroll").mCustomScrollbar({
						theme: "rounded"
                                    });
				  $('#sidebar .scroll').mCustomScrollbar('scrollTo', $('#sidebar .scroll').find('.mCSB_container').find('li:eq('+scrollpos+')'));
                                    
                                    }else{
					 $("#sidebar .scroll").mCustomScrollbar({
						theme: "rounded",
						setTop: 0
					});
				 }
            })
            .fail(function() {
                console.log('Scrollbar not loaded');
            })
    };

    $instance.headerAutocomplete = function() {
        $.getScript(theme_url + "/javascript/header_autocomplete.js")
            .done(function() {
                console.log('HeaderAutocomplete loaded');
            })
            .fail(function() {
                console.log('HeaderAutocomplete not loaded');
            })
    };

    $instance.quesAskSuggestion = function(title, asked_to_id, asked_to_name, return_url, question_type, type_id) {
        var skill = title.trim();
        asked_to_id = (typeof asked_to_id === "undefined") ? "0" : asked_to_id;
        asked_to_name = (typeof asked_to_name === "undefined") ? "" : asked_to_name;
        return_url = (typeof return_url === "undefined") ? "" : return_url;
        question_type = (typeof question_type === "undefined") ? "0" : question_type;
        type_id = (typeof type_id === "undefined") ? "0" : type_id;
        var title = '1';
        $.ajax({
            type: "POST",
            //href:base_url +"/ajax_files/questionAsk.php", if u want enable suggestion plz enable think href url
            url: base_url + "/ajax_files/questionSuggestion.php",
            data: {
                'AskQuestionPopUp': title,
                'skill': skill,
                'asked_to_id': asked_to_id,
                'asked_to_name': asked_to_name,
                'return_url': return_url,
                'question_type': question_type,
                'type_id': type_id
            },
            success: function(data) {
                $("#TechGigbootStrapModal .modal-title").html('Ask Your Question');
                $("#TechGigbootStrapModal .modal-body").html(data);
                $("#TechGigbootStrapModal").modal("show");
            }
        });
    }
	
	$instance.checksubmitQna = function() {

		var txt_value = document.getElementById('question_tags').value;
		var que_skill = document.getElementById('que_skill').value;
		var questionId = document.getElementById('questionId').value;
		  
		  $("#frm-question").removeClass( "has-error" );
		  $(".error_msg").hide();
		  
		  /* var txtCaptcha;
		  if (trim(document.getElementById('captcha_visibility').value) == '1') {
			txtCaptcha = document.getElementById('txtCaptcha').value;
		  } */
			var str = txt_value.split(',');
			var return_val = true;
			if (trim(document.getElementById('question_tags').value) == '') {
				document.getElementById('blank_tags_error_msg').style.display = 'block';
				document.getElementById('question_tags').focus();
			   $('ul.token-input-list-facebook').css('border','1px solid #d54343');
				return_val = false;
			} else {
				document.getElementById('blank_tags_error_msg').style.display = 'none';
				 $('ul.token-input-list-facebook').css('border','');
			}
			
			if (trim(document.getElementById('question_description').value) == '') {
				document.getElementById('blank_descp_error_msg').style.display = 'block';
				document.getElementById('question_description').focus();
				$('#question_description').closest('li').addClass( "has-error" );
				return_val = false;
			} else {
				 document.getElementById('blank_descp_error_msg').style.display = 'none';
				 $('#question_description').closest('li').removeClass( "has-error" );
			}
			
			if (trim(document.getElementById('question_title').value) == '') {
				$('#blank_que_error_msg span').html('Please specify a Question.');
				$('#blank_que_error_msg').show();
				$('#blank_que_error_msg').closest('li').addClass( "has-error" );
				document.getElementById('question_title').focus();
				document.getElementById('question_title').classNmae = 'red_border';
				return_val = false;
			} else {
				document.getElementById('blank_que_error_msg').style.display = 'none';
				 $('#question_title').closest('li').removeClass( "has-error" );
				if((trim(document.getElementById('question_title').value)).length < 20 || (trim(document.getElementById('question_title').value)).length > 300){
					return_val = false;
					document.getElementById('question_title').focus();
					$('#blank_que_error_msg span').html('Your Question should contain 20 - 300 charecters!');
					$('#blank_que_error_msg').show();
					$('#blank_que_error_msg').closest('li').addClass( "has-error" );
					//alert("Your Question should contain charecters in between 20 to 300 !");
				}
			}
		  
			if (((document.getElementById('hidden_title').value != document.getElementById('question_title').value) || ((document.getElementById('hidden_title').value != document.getElementById('question_title').value) && (document.getElementById('hidden_tags').value != document.getElementById('question_tags').value)))) {
				document.getElementById('hidden_title').value = document.getElementById('question_title').value;
				document.getElementById('hidden_tags').value = document.getElementById('question_tags').value;
			} else if (str.length > 10) {
				alert('You can not enter more than 10 tag');
				document.getElementById('compose_to').focus();
				return_val = false;
			}
			
			if (trim(document.getElementById('question_title').value) != '' && trim(document.getElementById('question_tags').value) != '') {
			  var title_value = document.getElementById('question_title').value;
			  quesSkill = '';
			  if(typeof que_skill != 'undefined' && que_skill !='') {
				var quesSkill = que_skill; 
			  }
			  var url = base_url + '/ajax_files/qna_saveAnsComment.php'; 
				$.ajax({
					type: "POST",
					url: url,
					// txtCaptcha: txtCaptcha, 
					data: ({ question_title : title_value, question_skill : quesSkill, qid: questionId}),
					async: false,
					success: function(data) {
					data = trim(data).split('@@@@@'); 
						if(data[0] == 'Y') { 
							var quesURL = base_url+'/questiondetail/'+data[1];
							$('#duplicate_ques_error_msg').show();
							$('#duplicate_ques_error_msg').closest('li').addClass( "has-error" );
							$('#duplicate_ques_error_msg span').html("Question already posted!!! <a href="+quesURL+">click here</a> to view");
							return_val = false;
						} else if(data[0] == 'E') { 
							$('#captcha_error').show();
							$('#captcha_error').closest('li').addClass( "has-error" );
							$('#captcha_error span').html(data[1]);
							return_val = false;
						}	
					}
				});
			}
			return return_val;
	}

    $instance.SlidingPanel = function() {
        $.getScript(theme_url + "/javascript/jquery.cycle.all.js")
            .done(function() {
                $('.sliding-panel .slides').cycle({
                    slideExpr: '.slide',
                    cleartypeNoBg: ' true',
                    fx: 'fade',
                    timeout: 8000,
                    speed: 500,
                    fit: 1,
                    slideResize: 0,
                    containerResize: 0,
                    height: 'auto',
                    width: null,
                    next: $('.sliding-panel').find(".previous-btn"),
                    prev: $('.sliding-panel').find(".next-btn")
                });

                $(".sliding-panel .slides, .sliding-panel .slide-img").height($(".sliding-panel .slide").innerHeight());
            })
            .fail(function() {
                console.log('SlidingPanel not loaded');
            })
    };

    $instance.Tab5Slider = function() {
        $.getScript(theme_url + "/javascript/jquery.carouFredSel-6.0.5-packed.js")
            .done(function() {
                $('.tabs5 .tab-pane').each(function() {
                    $(this).find('ul').carouFredSel({
                        responsive: true,
                        width: '100%',
                        circular: true,
                        infinite: false,
                        auto: true,
                        scroll: {
                            items: 2,
                            duration: 500
                        },
                        items: {
                            width: 150,
                            height: 'variable',
                            visible: {
                                min: 1,
                                max: 4
                            }
                        },
                        prev: $(this).find('.previous-btn'),
                        next: $(this).find('.next-btn')
                    });
                });
            })
            .fail(function() {
                console.log('Tab5Slider not loaded');
            });


    };

    $instance.pp_header_search = function(e, t) {
        $("#srch_bx_txt").text(t), $("#srch_more_options").hide(), e = e.substr(e.indexOf("_") + 1), document.getElementById("search_type").value = e, "people" != document.getElementById("search_type").value ? $(".header_advanced").hide() : $(".header_advanced").show(), document.header_search.search.value = "", document.header_search.search.focus(), document.header_search.search.click(), Tg_CommonFunction.SetHelpText();
        $("#search-form .search-selector li").removeClass("active");
        $('#header_' + e).addClass("active");
        var a = document.getElementById("search_type").value;
        return void 0 != AutoCompleteURLs[a] ? (ActiveAutoCompleteAjaxURL = AutoCompleteURLs[a], document.header_search.data_search_url.value = ActiveAutoCompleteAjaxURL) : ActiveAutoCompleteAjaxURL = " ", !1
    };

    $instance.pp_header_splash_search = function(e, t) {
        $(".srch-cat b").removeClass("active"), $("#" + e).addClass("active"), $("#srch_bx_txt").text(t), $("#srch_more_options").hide(), e = e.substr(e.indexOf("_") + 1), document.getElementById("search_type").value = e, "people" != document.getElementById("search_type").value ? $(".header_advanced").hide() : $(".header_advanced").show(), Tg_CommonFunction.SetHelpText();
        var a = document.getElementById("search_type").value;
        return void 0 != AutoCompleteURLs[a] ? (ActiveAutoCompleteAjaxURL = AutoCompleteURLs[a], document.header_search.data_search_url.value = ActiveAutoCompleteAjaxURL) : ActiveAutoCompleteAjaxURL = " ", !1
    };

    $instance.change_specialized_functional_area = function(e, t, a) {
        url = base_url + "/ajax/functional_area_change.php?mfa_id=" + e + "&container_width=" + t + "&parent_id=" + a, $("#available_functional_area_box").html('<div class="color">loading ...</div>'), $.get(url, function(e) {
            $("#available_functional_area_box").html(e)
        })
    };

    $instance.ClearHelpText = function() {
        var e = document.header_search.search.value,
            t = document.getElementById("search_type").value;
        ("" == $.trim(e) || e == HeaderHelpText.people || e == HeaderHelpText.company || e == HeaderHelpText.institute || e == HeaderHelpText.jobs || e == HeaderHelpText.answers || e == HeaderHelpText.webinars || e == HeaderHelpText.news || e == HeaderHelpText.courses || e == HeaderHelpText.projects) && (document.header_search.search.value = "", document.header_search.search.style.color = "#575757");
        try {
            ActiveAutoCompleteAjaxURL = void 0 != AutoCompleteURLs[t] ? AutoCompleteURLs[t] : ""
        } catch (a) {
            ActiveAutoCompleteAjaxURL = ""
        }
    };

    $instance.ClearSplashHelpText = function() {
        var e = document.header_search.search.value,
            t = document.getElementById("search_type").value;
        ("" == $.trim(e) || e == HeaderHelpText.people || e == HeaderHelpText.company || e == HeaderHelpText.institute || e == HeaderHelpText.jobs || e == HeaderHelpText.webinars || e == HeaderHelpText.news || e == HeaderHelpText.courses || e == HeaderHelpText.projects) && (document.header_search.search.value = "", document.header_search.search.style.color = "#575757");
        try {
            ActiveAutoCompleteAjaxURL = void 0 != AutoCompleteURLs[t] ? AutoCompleteURLs[t] : ""
        } catch (a) {
            ActiveAutoCompleteAjaxURL = ""
        }
    };

    $instance.StopSubmitonHelpText = function() {
        {
            var e = document.header_search.search.value;
            document.getElementById("search_type").value
        }
        return "" == $.trim(e) || e == HeaderHelpText.people || e == HeaderHelpText.company || e == HeaderHelpText.institute || e == HeaderHelpText.jobs || e == HeaderHelpText.answers || e == HeaderHelpText.webinars || e == HeaderHelpText.news || e == HeaderHelpText.courses || e == HeaderHelpText.projects ? ($instance.Tg_CommonFunction.SetHelpText(), !1) : void 0
    };

    $instance.StopSubmitonSplashHelpText = function() {
        {
            var e = document.header_search.search.value;
            document.getElementById("search_type").value
        }
        return "" == $.trim(e) || e == HeaderHelpText.people || e == HeaderHelpText.company || e == HeaderHelpText.institute || e == HeaderHelpText.jobs || e == HeaderHelpText.webinars || e == HeaderHelpText.news || e == HeaderHelpText.courses || e == HeaderHelpText.projects ? ($instance.Tg_CommonFunction.SetHelpText(), !1) : void 0
    };

    $instance.SetHelpText = function() {
        var e = document.header_search.search.value;
        if ("" == $.trim(e) || e == HeaderHelpText.people || e == HeaderHelpText.company || e == HeaderHelpText.institute || e == HeaderHelpText.jobs || e == HeaderHelpText.answers || e == HeaderHelpText.webinars || e == HeaderHelpText.news || e == HeaderHelpText.courses || e == HeaderHelpText.projects) {
            var t = document.getElementById("search_type").value;
            document.header_search.search.placeholder = HeaderHelpText[t], document.header_search.search.style.color = "#979797"
        }
    };

    $instance.SetSplashHelpText = function() {
        var e = document.header_search.search.value;
        if ("" == $.trim(e) || e == HeaderHelpText.people || e == HeaderHelpText.company || e == HeaderHelpText.institute || e == HeaderHelpText.jobs || e == HeaderHelpText.webinars || e == HeaderHelpText.news || e == HeaderHelpText.courses || e == HeaderHelpText.projects) {
            var t = document.getElementById("search_type").value;
            document.header_search.search.value = HeaderHelpText[t], document.header_search.search.style.color = "#979797"
        }
    };
	
	
	$instance.RemoveAnalyticsLink = function() {
       $('nav#sub-links li:contains("Analytics")').remove();
    };



    //this function is use to load submenu & recommendations under top menu...Sushil 02-Jun-2016 
    $instance.load_submenu = function(menu_key) {
        if ($('#main-navigation .sub-category-list #submenu-' + menu_key).html() == '') {
            var submenu_url = base_url + '/ajax_files/load_submenu.php?pmenu=' + menu_key;
            $('#main-navigation .sub-category-list #submenu-' + menu_key).load(submenu_url);
        }
        if ($('#main-navigation .category-list-content #submenu-rcm-content-' + menu_key).html() == '') {
            //$('#main-navigation .category-list-content #submenu-rcm-content-' + menu_key).html('<div class="tg-loader text-center"><img src="' + theme_url + '/images/TG-Loader.gif"></div>');

            var recommendations_url = base_url + '/ajax_files/load_recommendations.php?type=menu&content=' + menu_key;
            var submenu_rcm_box_count = 4;
            $('#main-navigation .category-list-content #submenu-rcm-content-' + menu_key).load(recommendations_url, function(e) {
                Tg_CommonFunction.set_slider_list('submenu-rcm-content-' + menu_key, 350, submenu_rcm_box_count);
                $('#main-navigation .category-list-content h2 small').removeClass('hidden');
            });
        }
    };

	
	$('#sing_up_form .form-control').focus(function() {
		//$("#mobile-phone,#company-field,#gender-field,#captcha-field").fadeIn("slow");
		$("#mobile-phone,#gender-field,#professional-field,#captcha-field,#register-in-cg").show();
	});
					
						
		$instance.checkIfUserEmailAlreadyRegisteredOnTg = function(source,return_url) {
		
			$('.info_msg').remove();

			var user_email_id = $.trim($('#register_email').val());
			
			/* if(!(Tg_CommonFunction.validate_email(user_email_id)) && user_email_id!='') {		
				$('.msgErrortop .message-box').addClass('error-msg').find('p').text('Please enter valid email.');
				Tg_CommonFunction.clearMessage();
				return false;
			} */
						
			var action_url = base_url+'/general_ajax_task.php';
			action_block_name = 'check_if_user_already_registered_in_tg';
			
			if(user_email_id != '') {
				$.post(action_url,{action: action_block_name, user_email_id: user_email_id},function(data) {
				
					var output_chk = $.trim(data);
					if(output_chk == 'email_exist') {
						// Show login Tab
						if(source=='home') {
							//var url = base_url+'/geekgoddess/openparticipation/participate/login?msg_id=24012&msg_type=2';
                            var url = base_url + return_url;
                            $.cookie('useremail', user_email_id);
							window.location.href = url;
							return false;
						} else if(source=='TGLOGIN') {
							var url = base_url+'/register.php?tab=login&msg_id=24012&msg_type=2';
							window.location.href = url;
							return false;
						} else {
							$('#login-form').addClass('active') ;
							$('#login_tab').addClass('active') ;
							$('#signup-form').removeClass('active');
							$('#signup_tab').removeClass('active');
							$('#email').attr('value', '');
							$('#password').attr('value', '');
							$("#tmp_msg").css('display','none');
							$("#tmp_msg").css('display','none');
							
							//$('.msgErrortop .message-box').addClass('info-msg').find('p').text('You seem to be already registered on TechGig. Please login below using your TechGig credentials.');
							$("<span class='info_msg'> You seem to be already registered on TechGig. Please login below using your TechGig credentials.</span>" ).insertAfter("#username");
							
							$('#username').val(user_email_id);
							
							return false;
						}
						
					}
					if(source=='home'){	document.hiring_email.submit(); return false;}				
					if(source=='TGLOGIN'){	document.hiring_email.submit(); return false;}				
					
				})
			}else{
                $('.msgErrortop .message-box').addClass('info-msg').find('p').text('Please enter your email');
                $instance.clearMessage();
                return false;
            }
		};
		
		$instance.reSetPassword = function(source_input, url_val) {
		
			$('#err_reset_email').hide();
			
			var err = false;
			var user_email = $.trim($('#reset_email').val());
			var companyName = $.trim($('#companyName').val());
			companyName = (typeof companyName === "undefined") ? "" : companyName;
			var ajax_url = base_url+"/general_ajax_task.php?action=reset_ajax_password&companyName="+companyName;
			
			var login_source_input = source_input;
			var red_url_val = url_val;
			
			login_source_input = (typeof login_source_input === "undefined") ? "CW" : login_source_input;
			red_url_val = (typeof red_url_val === "undefined") ? "codewizards" : red_url_val;
			
			var source_type = login_source_input;
			var companyUrl = $.trim($('#company_page_url').val());
			$("#tmp_msg").css('display','none');
			
			if(!user_email) {
				//$('#err_reset_email').show();
				$("<span id='err_reset_email' class='error_msg'>Please enter an email first!</span>").insertAfter("#reset_email");				
				err = true;
			} 
			
			if(!err){
				$.post(ajax_url, {user_email:user_email,source_type:source_type, companyUrl:companyUrl, url_val:url_val}, function(data){
					data = $.trim(data);
					
					$instance.clearMessage();
					if(data == 'Y') {
						//$('#reset_msg_response').show().html('Password reset mail has been sent!');
						$("<span id='err_reset_email' class='info-msg' style='color:green'>Password reset mail has been sent!</span>").insertAfter("#reset_email");
						setTimeout(function() {
							$('#forgot-password').modal('hide');
						}, 2000);
					} else if(data == 'INVEMAIL') {
						//$('#err_reset_email').show();	
						$("<span id='err_reset_email' class='error_msg'>Please provide valid email id!</span>").insertAfter("#reset_email");						
						return false;
					} else if(data == 'E') {
						//$('.msgErrortop .message-box').addClass('warning-msg').find('p').text('You have exceeded the maximum mail sending limit for a day!');
						//$('#reset_msg_response').show().html('You have exceeded the maximum mail sending limit for a day!');
						$("<span id='err_reset_email' class='error_msg'>You have exceeded the maximum mail sending limit for a day!</span>").insertAfter("#reset_email");
						setTimeout(function() {
							$('#forgot-password').modal('hide');
						}, 3000);
						return false;
					} else if(data == 'N') {
						//$('#err_reset_email').show();
						$("<span id='err_reset_email' class='error_msg'>Incorrect details provided!</span>").insertAfter("#reset_email");
						return false;
					} else {
						//
					}
				});

			}
			return false;
			
		};
		
		
    $instance.mainBanner = function() {
        $.getScript(theme_url + "/javascript/jquery.cycle.all.js")
            .done(function() {
                $('.main-banner .slides').cycle({
                    slideExpr: '.slide',
                    cleartypeNoBg: ' true',
                    fx: 'fade',
                    timeout: 4000,
                    speed: 500,
                    fit: 1,
                    slideResize: 0,
                    containerResize: 0,
                    height: 'auto',
                    width: null,
                    pager: '.controls',
                    prev: '.main-banner a.previous-btn',
                    next: '.main-banner a.next-btn'
                });

                /*$(".main-banner .slide").each(function() {
                    var slideSrc = $(this).find('> img').attr("src");
                    $(this).css("background-image", "url(" + slideSrc + ")");
                });*/
            })
            .fail(function() {
                console.log('Cycle not loaded');
            });

    };
	
	$instance.loadUserSuggestions = function (str) {          
		if(str != '') {
			$.ajax({
				type: "POST",
				url: base_url + "/ajax_files/user_suggestions.php",
				data: {'str': str},
				success: function(data) {
					if(data != 'no_record') {
						$('#user_suggestions').html(data).show();
					}
				}
			});
		}
	};
	
	$instance.loadSkillsSuggestionsDb = function(input_selector,pre_populate_skills) {
		if(typeof pre_populate_skills === 'undefined' || pre_populate_skills == '') { pre_populate_skills = null; }

		$.getScript(theme_url + "/javascript/jquery.tokeninput.js")
            .done(function() {
				$("#"+input_selector).tokenInput(base_url+"/ajax/autocomplete.php?autocomplete=tokeninput&type=technology_tags", {
												theme: "facebook",
												class: "form-control",
												width: 100,
												tabindex: 5,
												maxlength: 30,
												placeholder: 'Enter your skills',	
												prePopulate: pre_populate_skills,
												suggestedContentUrl: base_url+'/ajax/autocomplete.php?autocomplete=tokeninput&type=skills_related_tags',
												suggestedContentHeading: 'Suggested Skills'
										});
			});
	};
	
	$instance.loadSkillsSuggestions = function(input_selector,pre_populate_skills) {
		if(typeof pre_populate_skills === 'undefined' || pre_populate_skills == '') { pre_populate_skills = null; }

		$.getScript(theme_url + "/javascript/jquery.tokeninput.js")
            .done(function() {
				$.ajax({
					type: "GET",
					url:base_url+'/ajax/autocomplete.php?type=technology_tags',
					dataType:'json',
					success: function(data) {
						skill_arr=data;
						$("#"+input_selector).tokenInput(skill_arr, {
							theme: "facebook",
							class: "form-control",
							width: 100,
							tabindex: 5,
							maxlength: 30,
							placeholder: 'Enter skills', 
							prePopulate: pre_populate_skills,
							resultsLimit:20,
							onResult:function (results) {
								var skill_name=$("#token-input-"+input_selector).val();
								if(results.length < 10 && skill_name.length >= 3) {
									$.ajax({				  
										url: base_url+'/ajax/autocomplete.php?autocomplete=tokeninput&type=skills_related_tags',
										dataType: "json",
										data: {string: skill_name,limit: 10},
										async: false,
										success: function(more_results) {
											if(more_results) {
												results = $.merge(results,more_results);
											}											
										}										
									})
									return results;								
								} else {
									return results; 
								}
							}							
						});
					}
				});				
            })
            .fail(function() {
                console.log('tokeninput not loaded');
            });
	};
	
	$(document).on('click', '.msg_user_selection', function(){	
		var uid = $(this).data('uid');
        var profilekey = $(this).data('profilekey');
        $('#receiver_id').val(uid);
		$('#receiver_name').val(profilekey);
        $('#user_suggestions').html('').hide();
	});

	$(document).on('click', '.msg_show_content', function(){	
		var mid = $(this).data('mid');		
		var viewMessage = "+ View Message";
		var closeMessage = "x Close";       
		
		if($(this).hasClass("close-message")) {
			$(this).removeClass("close-message");
			$(this).html(viewMessage);
		} else {
			$(this).addClass("close-message");
			$(this).html(closeMessage);
		}
		$('#tr_msg_'+mid).toggle();
		return false;		
	});
	
	
	$instance.encryptfrm = function() {
		
        var e = $('#password').val();
			e = Base64.encode(e);
			$('#password').val(e);
			
    };
	
	$instance.show_rank_desc = function(tietime){
		tietime = (typeof tietime === "undefined") ? "" : tietime;
		
		var time_desc;		
		switch(tietime) {
			case 'NTNEczQ5cUxobzNtVG90MlFqWE5EQT09':
				time_desc = 'seeing the first problem statement';
				break;
			case 'TjR6a1NrUVBzTU8vQzJDbk5CK2E2UT09':
				time_desc = 'start of the contest';
				break;
			case 'bjB1dVRpRUtjdjBwNnVwbHlUdUt4QT09':
			default:
				time_desc = 'seeing individual problem statement';
		}		
		
		Tg_CommonFunction.open_html_modal("Ranking Criteria", "<p style=\"margin-bottom:16px;\">Developers are ranked according to the total score.</p><p style=\"margin-bottom:16px;\">Developers who have the same total score are ranked by least total time. Here total time is sum of time consumed for each problem solved. The time consumed for a solved problem is the time elapsed from "+time_desc+" to the submission of the first accepted solution.</p><p style=\"margin-bottom:16px;\">In case two developers have taken same time then whoever will hit the leaderboard early, will be ranked accordingly.</p>")
	}
	
	
	// Function to Save Page Views Stats from given detail page
	$instance.push_user_entiry_page_view_stats = function(entity_type,item_id) {
		
		var view_entity_type = entity_type;
		var view_item_id = item_id;
	
		var url = base_url + '/general_ajax_task.php?action=update_item_views_stats';
		$.post(url, {view_entity_type:view_entity_type,view_item_id:view_item_id}, function(data) {
			// No action needed
		});
		
    }

};


/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Client
 * 
 * Author   : Sebin Baby
 * Created  : 19 jan, 2017
 */

Tg_EcourseLanding = new function () {
    $instance = this;

    $instance.init = function () {
        
    };
	
	/* scroll sections starts */

$instance.scroll_section = function (action, block_count_id, animate_div, moving_width) {
//alert(animate_div.id);

var click_count_ecs=parseInt($('#'+block_count_id).attr("alt")); 
//debugger;
//alert(click_count_ecs);
var count = parseInt($('#'+block_count_id).val());
	if((click_count_ecs < count) && (count != 0)) {
		//alert('sdfsd');
		
		if(action == 'left') {
			if(click_count_ecs < count-1) {
				
				 $(animate_div).closest(".ecr-list-bx-in").find(".arrow_rt_brd").show();
				 $(animate_div).closest(".ecr-list-bx-in").find(".arrow_rt_brd_gr").hide();
				
				//$('#image_left').show();
				//$('#image_left_gr').hide();
		
		 $(animate_div).closest(".ecr-list-bx-in").find(".item-move").animate({marginLeft: "-="+moving_width+"px"}, 1000 );
			click_count_ecs++;
			 $('#'+block_count_id).attr("alt",click_count_ecs); 
			 //click_count_ecs = $('#'+block_count_id).attr("alt");
				

			}
			if(click_count_ecs == count-1) {
			
			 $(animate_div).closest(".ecr-list-bx-in").find(".arrow_lft_brd").hide();
				 $(animate_div).closest(".ecr-list-bx-in").find(".arrow_lft_brd_gr").show();
			
			//	$('#image_right').hide();
			//	$('#image_right_gr').show();
			}
		} else if(action == 'right') {
			if(click_count_ecs >= 1) {
				$(animate_div).closest(".ecr-list-bx-in").find(".arrow_lft_brd").show();
				 $(animate_div).closest(".ecr-list-bx-in").find(".arrow_lft_brd_gr").hide();
				// $('#image_right').show();
				// $('#image_right_gr').hide();
				
				$(animate_div).closest(".ecr-list-bx-in").find(".item-move").animate({marginLeft: "+="+moving_width+"px"}, 1000 );
				click_count_ecs--;	   
			  $('#'+block_count_id).attr("alt",click_count_ecs); 
			
			}
			if(click_count_ecs == 0) {
				 $(animate_div).closest(".ecr-list-bx-in").find(".arrow_rt_brd").hide();
				 $(animate_div).closest(".ecr-list-bx-in").find(".arrow_rt_brd_gr").show();
				
			//	$('#image_left').hide();
				//$('#image_left_gr').show();
				
			}
		}
		
	} 
}
/* scroll sections ends */

};

TgContest = new function(){

    var $instance = this;
    var ThisSection;
    var ContentEditor;
    var myNicEditor;
    var currentInstanceNiceEditor;
    var module_id;  
    var content_id; 
    
    $instance.init = function(){ 
        
		module_id = $('#module_id').val();  
        content_id = $('#content_id').val();
		
        $(document).on('click', '.refresh-btn', function(){
            //$('ul.nav-tabs li.active a').trigger('click'); 

            var url = base_url + '/ajax_files/get_comment_on_multi_change.php';
            var season_id = $('#season_id').val();
            var module_id = $('#module_id').val();                        
            $.ajax({
                url : url,
                data: {'content_id':content_id,'module_id':module_id, season_id:season_id,'cmtcnt':1},
                type: 'post',
                cache: false,
                dataType: 'html',
                success: function(data) {
					var tmp_data = data.split('||##||');
					$('.comment-section').html('');
					$('.comment-section').append(tmp_data[0]);
					$('#discussion-forum #comment_count').html(tmp_data[1]);
				}
            });			
        });         
         
        $(document).on('change', '#change-criteria-comment', function() {
        //$('#change-criteria').change(function(){
            var order = $(this).find(":selected").val() ;
            var url = base_url + '/ajax_files/get_comment_on_multi_change.php';
            var season_id = $('#season_id').val();
            var module_id = $('#module_id').val(); 
                        
            $.ajax({
                url : url,
                data: {'order':order, 'content_id':content_id,'module_id':module_id, season_id:season_id},
                type: 'post',
                cache: false,
                dataType: 'html',
                success: function(data) {

                        $('.comment-section').html('');
                        $('.comment-section').append(data);
                        $('.on-change-comment').addClass('hide');
                        }
            });
        });
    
    
        $(document).on("click", "#discussion-forum .nicEdit-main", function() {
            $(this).parents(".editor-block, .comment-box").find(".editor-actions, .footer-links").fadeIn();
        });
		
		$(document).on("click", "#discussion-forum .cancel-comment", function() {
            $("#discussion-forum .editor-block .nicEdit-main").html('');
			$("#discussion-forum .editor-actions").fadeOut();
        });
		
        $(document).on("click", ".nicEdit-main", function() {
            currentInstanceNiceEditor = $(this).parent().next('textarea').attr('id');
        });
        
        $(document).on('click','.check-preview', function(){
            
            var comment_content = $(this).parent().parent().parent().find('p  .nicEdit-main').html();
            comment_content = $.trim(comment_content);

            if($.trim(comment_content) == ''){
                comment_content = 'No Content';
            }
			$("#preview-editor").find('.modal-body').html('');
			$("#preview-editor").modal('show');
			$('#preview-editor').find('.modal-body').append("<p>" +comment_content+ "</p>");

		});
        
        $(document).on('click','.cancel', function(){
            $(this).parent().parent().find('p  .nicEdit-main').html('');
			$(this).parent().parent().addClass('hide');
			$("#discussion-forum .user-area-comment a.add-comment").show();
		});
        
        
        $(document).on('click','.add-content-in-editor', function(){
		
            var notes = ContentEditor.getValue();
            ContentEditor.setValue('');
            $('#code-snippet').find('.modal-body').html('');
            $("#code-snippet").modal('hide');

			//$(notes).find('script').remove();
			
			notes = notes.replace("<script>","");
			notes = notes.replace("<\/script>","");
			
            notes = "<br/><pre>"+ notes + "</pre><br/>";
            var comment_content = ThisSection.find('p  .nicEdit-main').html();
			
            var final_content = comment_content + notes;

            ThisSection.find('p  .nicEdit-main').html(final_content);
        });
        
        
        /* $(document).on('click','#discussion-forum .code-icon', function(){
                ThisSection = $(this).parent().parent();
                $("#code-snippet").modal('show');
                $('#code-snippet').find('.modal-body').html('<p class="content-area"> <textarea class="form-control" cols="100" placeholder="Post a Comment" name="user-code-snippet" id="body_code"></textarea></p>');
                ContentEditor = CodeMirror.fromTextArea(document.getElementById("body_code"), {
                    mode: "text/html",
                    lineNumbers: true
                });
        }); */
        
        $(document).on('click', '.update-comment-reply',function(){

            var This =  $(this);
            var comment_content = nicEditors.findEditor(currentInstanceNiceEditor).getContent();
            var comment_id = $(this).data('comment_id');
            var season_id = $('#season_id').val();
            var module_id = $('#module_id').val(); 
            $.ajax({
                    data: {'comment_content': comment_content, action:'UpdateComment','comment_id': comment_id , season_id:season_id,module_id:module_id},
                    url : base_url + '/ajax_files/comment_multi_ajax.php',
                    type: 'post',
                    cache: false,
                    dataType: 'json',
                    success: function(data) {
                            var response = data;
                            nicEditors.findEditor(currentInstanceNiceEditor).setContent('');
                            This.parent().addClass('hide');
                            This.parent().parent().find('.user-comment-txt').html(response.comment).show();
                        }
                    });
		});
        $(document).on('click','.delete-comment', function(){
                var module_id = $('#module_id').val(); 
                var commentId = $(this).data('comment_id');
                var season_id = $('#season_id').val();
                var This = $(this);
                $.ajax({
                        data: {'action' : 'DeleteComment','comment_id': commentId , season_id:season_id,module_id:module_id},
                        url : base_url + '/ajax_files/comment_multi_ajax.php',
                        type: 'post',
                        cache: false,
                        success: function() {
                                var html = "This Comment has been deleted";
                                This.parent().parent().find('h5').next('p').text(html);
                                This.parent().hide();
                            }
			});
		});
        $(document).on('click','.add-comment', function(){

			$("#discussion-forum .comment-box").addClass('hide');
            $(this).hide().parent().next('.comment-box').removeClass('hide');
            var id = $(this).parent().next('.comment-box').find('p textarea').attr('id');
            $instance.reInitialize(id);
    
        });
        
        $(document).on('click','#discussion-forum .user-area-comment a.edit-comment', function(){
            $(this).parent().parent().find('.user-comment-txt').hide();
            $(this).parent().parent().find('.edit-comment-box').removeClass('hide');

            var id = $(this).parent().parent().find('.edit-comment-box').find('p textarea').attr('id');

            $instance.reInitialize(id);
        });

        $(document).on('click','.edit-comment-reply', function(){
            $(this).parent().parent().find('.user-comment-txt-reply').hide();
            $(this).parent().parent().find('.edit-comment-box-reply').removeClass('hide');

            var id = $(this).parent().parent().find('.edit-comment-box-reply').find('p textarea').attr('id');

            $instance.reInitialize(id);
        });


        $(document).on('click','.edit-comment-cancel', function(){
			$(this).parent().parent().find('.user-comment-txt').show();
			$(this).parent().parent().find('.edit-comment-box').addClass('hide');
		});
        
        
        $(document).on('click','.add-reply', function(){
            $(this).parent().find('.post-comment-error-reply').addClass('hide');
            var This = $(this);
            var commentId = $(this).data('comment_id');
            var module_id = $('#module_id').val(); 
            
            var season_id = $('#season_id').val();
            var comment_content = nicEditors.findEditor(currentInstanceNiceEditor).getContent();
            if($.trim(comment_content) == ''){
                $(this).parent().find('.post-comment-error-reply').html('<span class="error_msg"> Please Enter Content</span>').removeClass('hide');
                return false;
            }
            $.ajax({
                data: {'comment_content': comment_content, action:'AddComment','comment_id': commentId , season_id:season_id,module_id:module_id},
                url : base_url + '/ajax_files/comment_multi_ajax.php',
                type: 'post',
                cache: false,
                dataType: 'json',
                success: function(data) {
                    var response = data;
                    nicEditors.findEditor(currentInstanceNiceEditor).setContent('');
                    $(response.htmlContent).insertAfter(This.parent().parent().parent().parent().find(" > .user-comment"));
                    This.parent().parent().addClass('hide');
					$("#discussion-forum .user-area-comment a.add-comment").show();
                    }
            });

        });
        
        
        $(document).on('click','.like-comments-btn', function(){ 
                var commentId = $(this).data('comment_id');
                var season_id = $('#season_id').val();
                var module_id = $('#module_id').val(); 
                var This = $(this);
                $.ajax({
                data: {'action' : 'LikeComment','comment_id' : commentId , season_id:season_id,module_id:module_id},
                url : base_url + '/ajax_files/comment_multi_ajax.php',
                type: 'post',
                success: function(data) {
                    var response = data;
                    This.find('.like-total').text(response.likecount);
                    This.find('.like-total').addClass('active');
                    This.parent().find('.unlike-comments-btn .unlike-total').text(response.unlikecount);
                    This.parent().find('.unlike-comments-btn').removeClass('active');
                    if($.inArray( response.status, [ "updated", "inserted"] ) == -1){
                        $('#submit-error').find('.modal-title').html('');
                        $('#submit-error').find('.modal-header').remove();
                        $('#submit-error').find('.modal-body').html("<p>"+response.status+"</p>");
                        $('#submit-error').modal('show');
                    }

                }
            });
        });

		$(document).on('click','.unlike-comments-btn', function(){
			var commentId = $(this).data('comment_id');
                        var season_id = $('#season_id').val();
                        var module_id = $('#module_id').val(); 
			var This = $(this);
			$.ajax({
                        data: {'action' : 'UnLikeComment','comment_id' : commentId , season_id:season_id,module_id:module_id},
                        url : base_url + '/ajax_files/comment_multi_ajax.php',
                        type: 'post',
                        success: function(data) {
                        var response = data;
                        This.find('.unlike-total').text(response.unlikecount);
                        This.find('.unlike-total').addClass('active');
                        This.parent().find('.like-comments-btn .like-total').text(response.likecount);
                        
                        This.parent().find('.like-comments-btn').removeClass('active');

                          if($.inArray( response.status, [ "updated", "inserted"] ) == -1){
                            
                                $('#submit-error').find('.modal-title').html('');
                                $('#submit-error').find('.modal-header').remove();
                                $('#submit-error').find('.modal-body').html("<p>"+response.status+"</p>");
                                $('#submit-error').modal('show');
                            }
                        }
			});
		});
        
        
        $(document).on('click', '.post-comment', function(){

//                 //var comment_content = $(this).parent().parent().find('p  .nicEdit-main').html();
                var comment_content = myNicEditor.instanceById(currentInstanceNiceEditor).getContent(); 
                var This = $(this);
                var season_id = $('#season_id').val();
                var content_id = $('#content_id').val();
                var module_id = $('#module_id').val(); 
                if($.trim(comment_content) == ''){
                        $('.post-comment-error').html('<span class="error_msg">Please Enter Content</span>').removeClass('hide');
                        return false;
                }
                $.ajax({
                    data: {'comment_content': comment_content, action:'insertComment', season_id:season_id, module_id:module_id},
                    url : base_url + '/ajax_files/comment_multi_ajax.php',
                    type: 'POST',
                    cache: false,
                    dataType: 'json',
                    success: function(data) {

                        var url = base_url + '/ajax_files/get_comment_on_multi_change.php';
                        $.ajax({
                            url : url,
                            data: {'order':'recent', 'season_id' : content_id,'module_id' : module_id},
                            type: 'post',
                            cache: false,
                            dataType: 'html',
                            success: function(data) {
                                myNicEditor.instanceById(currentInstanceNiceEditor).setContent(''); 
                              
                                $('.comment-section').html('');
                                $('.comment-section').append(data);
                                $('.on-change-comment').addClass('hide');
                            
                                
                                }
                            });
                        }
                    });
		});
		
		$(document).on('click','.report-inappropriate-comment', function(){ 
            var commentId = $(this).data('comment_id');
            var This = $(this);
            $.ajax({
                data: {'action' : 'ReportInappropriate','comment_id': commentId},
				url : base_url + '/ajax_files/comment_multi_ajax.php',
				type: 'post',
				cache: false,
				success: function(data) {
					if(data.status == 'success') {
						Tg_CommonFunction.showAlertMessage('Reported inappropriate successfully','success-msg');
					} else if(data.status == 'already') {
						Tg_CommonFunction.showAlertMessage('Already reported inappropriate','info-msg');
					} else {
						Tg_CommonFunction.showAlertMessage('Failed to report inappropriate, Please Try Again','error-msg');
					}					
				}
            });
        });
    };
    
    
    $instance.reInitialize = function(textId){
        myNicEditor = new nicEditor({
            maxHeight: 150,
            buttonList: ['bold', 'italic', 'ul', 'ol']
        });
        myNicEditor.panelInstance(textId);
    }
	
	$instance.showHideLnk = function(){
		$("#discussion-forum ul.comment-section li").each(function(){
			var liCount = $(this).find("> ul li").length;
			var showLiCount = $(this).find("> ul > li").length;
			
			$(this).find(".action-lnk").find("span").html("View all " + showLiCount + " replies ");
			
			if(liCount > 2){
				$(this).find(" > .user-comment .action-lnk").css("display","inline-block");
				$(this).find(" > ul").hide();
			}
			
		});
                
                
                $(document).on('click','#discussion-forum .action-lnk.less', function(){
                    var showLiCount = $(this).parent().next("ul").find(" > li").length;
                    $(this).removeClass("less");
                    $(this).removeClass("hide-replies").addClass("view-all-replies").find("span").html("View all " + showLiCount + " replies ");
                    $(this).parent().next("ul").slideUp();
                    
                    return false;
                    
                });
                
                
                $(document).on('click','#discussion-forum .action-lnk.view-all-replies', function(){
                    
                    $(this).addClass("less");
                                $(this).removeClass("view-all-replies").addClass("hide-replies").find("span").html("Hide replies");
                                $(this).parent().next("ul").slideDown();
                               
				return false;
                    
                    
                });
		
		/*
		$(document).on('click','#discussion-forum .action-lnk less', function(){
			
			var showLiCount = $(this).parent().next("ul").find(" > li").length;
			
			if($(this).hasClass("less")) {
                                $(this).removeClass("less");
                                $(this).removeClass("hide-replies").addClass("view-all-replies").find("span").html("View all " + showLiCount + " replies ");
                                $(this).parent().next("ul").slideUp();
                                alert('1');
                                return false;
				
			} else {
                                $(this).addClass("less");
                                $(this).removeClass("view-all-replies").addClass("hide-replies").find("span").html("Hide replies");
                                $(this).parent().next("ul").slideDown();
                                alert('2');
				return false;
			}
			return false;
			
		}); */
    }
	
};


/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Static Pages
 * 
 * Author   : Sebin Baby
 * Created  : 09 August, 2016
 */

Tg_StaticPages = new function() {
    var $instance = this;

    $instance.init = function() {

    }

    $instance.addHiredUser = function() {
        var name = $('#name').val();
        var email = $('#email').val();
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        if (name == '' || $.trim(name).length == 0) {
            $("#name_error").html("<span class='error_msg'>Please Enter Name.</span>");
            return false;
        }
        if (email == '') {
            $("#email_error").html("<span class='error_msg'>Please Enter Email.</span>");
            return false;
        }
        if (!filter.test(email)) {
            $("#email_error").html("<span class='error_msg'>Please Enter Correct Email.</span>");
            return false;
        }
        $.ajax({
            type: 'POST',
            url: base_url + '/ajax_files/saas_corporate_function.php?action=addHiredUser',
            data: $("#hired_user").serialize(),
            async: false,
            success: function(response) {
                var msg = response;
                if (msg.status == 'success') {
                    $("#name_error").html('');
                    $("#email_error").html('');
                    $('#name').val('');
                    $('#email').val('');
                    $('#txtCaptcha').val('');
                    $('#captcha_error').html("");
                    $('#alert_success').show().text('Thanks for submiting form. We will contact you soon.');
                } else if (msg.status == 'error') {
                    $('#captcha_error').html(msg.msg);
                }
            }
        })
    }

    $instance.showExpert = function() {
        $('#create-expert').modal('show');
        $("#name_error").html("");
        $("#email_error").html("");
        $('#captcha_error').html("");
    }

    $instance.addExpert = function() {
        var name = $('#name').val();
        var email = $('#email').val();
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        if (name == '' || $.trim(name).length == 0) {
            $("#name_error").html("<span class='error_msg'>Please Enter Name.</span>");
            return false;
        }
        if (email == '') {
            $("#email_error").html("<span class='error_msg'>Please Enter Email.</span>");
            return false;
        }
        if (!filter.test(email)) {
            $("#email_error").html("<span class='error_msg'>Please Enter Correct Email.</span>");
            return false;
        }
        $.ajax({
            type: 'POST',
            url: base_url + '/ajax_files/saas_corporate_function.php?action=addExpert',
            data: $("#add_expert").serialize(),
            async: false,
            success: function(response) {
                var msg = response;
                if (msg.status == 'success') {
                    $('#alert_success').show().text('Thanks for submitting the form. We will contact you soon.');
                    setTimeout(function() {
                        window.location.reload();
                    }, 3000);
                } else if (msg.status == 'error') {
                    $('#captcha_error').html(msg.msg);
                }
            }
        })
    }


};



/***
 * Javascript For Techgig Recommendation Popup
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 20 July, 2016
 */

Tg_RecommendationPopup = new function() {
    var $instance = this;

    $instance.init = function(uid,uemail) {
		uid = (typeof uid === "undefined") ? "0" : uid;
		uemail = (typeof uemail === "undefined") ? "" : uemail;
		
		$.getScript(theme_url + "/javascript/jquery.tokeninput.js")
                .done(function() {
                    console.log('tokeninput loaded');
                })
                .fail(function() {
                    console.log('tokeninput not loaded');
                });

        $(window).load(function() {
            if ($(window).width() > 992) {
                $("#customize-techgig .modal-content").load(base_url + "/ajax_files/load_recommendations.php");

                $.getScript(theme_url + "/javascript/jquery.cookie.js")
                    .done(function() {
                        if (typeof $.cookie("tg_ck_rcm_close") === 'undefined') {
                            $("#customize-techgig-sm-btn").hide();
                            //load recommendation popup after 10 seconds
                            setTimeout(function(){
                            	if (!$('body').hasClass('modal-open')) {
                            		$("#customize-techgig").modal({backdrop: 'static', keyboard: false, show: true});
                            		
                            		setTimeout(function(){
										$.getScript(theme_url + "/javascript/chosen_jquery.min.js")
											.done(function() {
												$('#customize-techgig .chosen-select').chosen();	
											})
											.fail(function() {
												console.log('chosen not loaded');
											});
                            				
                            			Tg_RecommendationPopup.set_tab_pane_content();
                            		}, 200);
                            	}
                            }, 10000);
                        } else {
                            $("#customize-techgig-sm-btn").show(); //dont show this button as its now shown under top menus ...Sushil 16-May-2016
                        }
                    })
                    .fail(function() {
                        console.log('cookie not loaded');
                    });

            }

            $.getScript(theme_url + "/javascript/jquery.carouFredSel-6.0.5-packed.js")
                .done(function() {

                })
                .fail(function() {
                    console.log('carouFredSel not loaded');
                })

            $(document).on("click", "#customize-techgig-sm-btn", function() {
                $("#customize-techgig-sm-btn").hide();
				
				$.getScript(theme_url + "/javascript/chosen_jquery.min.js")
                .done(function() {

                })
                .fail(function() {
                    console.log('chosen not loaded');
                });
				

                $("#customize-techgig").modal({
                    backdrop: 'static',
                    keyboard: false,
                    show: true
                });

                setTimeout(function() {
                    $('#customize-techgig .chosen-select').chosen();
                    Tg_RecommendationPopup.set_tab_pane_content();
                }, 200);
            });

            $(document).on("click", "#btn-rcm-close, #customize-techgig .close", function() {
                $("#customize-techgig").modal('hide');
                $("#customize-techgig-sm-btn").show();  //dont show this button as its now shown under top menus ...Sushil 16-May-2016
                var date = new Date();
                date.setTime(date.getTime() + (3600 * 1 * 1000)); // expires after 1 hours
                $.cookie("tg_ck_rcm_close", "1", {
                    expires: date,
                    path: '/'
                });
            });

            $(document).on("click", "#customize-techgig .pro-roles-pop", function() {
                //$("#professional-roles").modal('show').show();
                $("#professional-roles").modal({
                    backdrop: false,
                    keyboard: false,
                    show: true
                }).show();
            });

            //Tg_RecommendationPopup.set_tab_pane_content();	

            $(document).on("click", "#btn-rcm-usr-role-done", function() {
                var user_roles_array = [];
                var user_skills_array = [];
                var role_name;

                var chkCount1 = $("input[name=chk_roles]:checked").length;
                var chkCount2 = $("input[name=chk_char_roles]:checked").length;
                var chkCount = parseInt(chkCount1) + parseInt(chkCount2);
                if (chkCount < 1) {
                    alert("Select atleast one role");
                    return false;
                }

                //popular array
                $("input[name=chk_roles]:checked").each(function() {
                    role_name = $(this).val();
                    user_roles_array.push(role_name);

                    var role_field_id = this.id;
                    var role_id = role_field_id.replace("role-", "");

                    var role_skills = $('#role-skills-' + role_id).val();
                    var role_skills_arr = role_skills.split(',');

                    $.each(role_skills_arr, function(key, val) {
                        if (val != '') {
                            user_skills_array.push(val);
                        }
                    });
                });

                //alphabetical array
                $("input[name=chk_char_roles]:checked").each(function() {
                    role_name = $(this).val();

                    var role_index = user_roles_array.indexOf(role_name);

                    if (role_index == -1) {
                        user_roles_array.push(role_name);

                        var role_field_id = this.id;
                        var role_id = role_field_id.replace("char-role-", "");

                        var role_skills = $('#role-skills-' + role_id).val();
                        var role_skills_arr = role_skills.split(',');

                        $.each(role_skills_arr, function(key, val) {
                            if (val != '') {
                                user_skills_array.push(val);
                            }
                        });
                    }
                });

                if (user_roles_array.length > 3) {
                    //alert("You can select maximum of 3 roles only");
                    Tg_CommonFunction.open_html_modal("Role selection", "<p class='alert alert-warning'> You can select maximum of 3 roles only  </p>");
                    return false;
                }

                $("#user_roles").html(user_roles_array.toString());

                /*
                //removed skills filling from selected roles...Sushil 03-Jun-2016
                //$("#user_skills").tokenInput("clear");
                $.each(user_skills_array, function(key, val) {
                	$("#user_skills").tokenInput("remove",{id: val, name: val});
                	$("#user_skills").tokenInput("add",{id: val, name: val});	
                });	
                */

                //$("#professional-roles").modal('hide');
                $("#professional-roles").hide();
            });

            $(document).on("click", "#btn-rcm-usr-role-cancel", function() {
                //$("#professional-roles").modal('hide');
                $("#professional-roles").hide();
            });

            $(document).on("click", "#btn-rcm-usr-save", function() {
                var user_roles = $.trim($("#user_roles").val());
                var user_skills = $.trim($("#user_skills").val());
                
				var user_name = '';
				var user_email = '';
				var news_catg = 'none';
                var user_company = 'none';
				
                var rcm_error = '';
                if (user_roles == '') {
                    rcm_error = 'empty';
                } else if (user_skills == '') {
                    rcm_error = 'empty';
                }

				if(rcm_error == '') {				
					if(uid == 0) {
						user_name = $.trim($("#user_name").val());
						user_email = $.trim($("#user_email").val());
						
						if(user_name == '') {
							rcm_error = 'empty';
						} else if(user_email == '') {
							rcm_error = 'empty';
						} else if(!(Tg_CommonFunction.validate_email(user_email))) {		
							rcm_error = 'invalid_email';
						}
					} else {
						user_email = uemail;
					}
				}				

                if (typeof $('#user_news_catg').val() !== 'undefined') {
                    var user_news_catg = $('#user_news_catg').chosen().val();

                    if (user_news_catg != '' && user_news_catg != null) {
                        $.each(user_news_catg, function(key, value) {
                            news_catg += ',' + value;
                        });
                        news_catg = news_catg.substring(1);
                    } else {
                        news_catg = '';
                    }
                }

                if (typeof $('#user_company').val() !== 'undefined') {
                    user_company = $.trim($("#user_company").val());
                }
				
                if (rcm_error == 'empty') {
                    $("#rcm-error-msg").html('Please fill above details').addClass('alert alert-danger');
                    return false;
                } else if (rcm_error == 'invalid_email') {
                    $("#rcm-error-msg").html('Please enter valid email id').addClass('alert alert-danger');
                    document.frm_user_skill.user_email.focus();
                    return false;
                } else {
                    $("#rcm-error-msg").html('').removeClass('alert alert-danger');
                }

                $("#customize-techgig .modal-content .modal-body").html('<div class="loader-area"><div class="inner-loader"><img src="' + THEME_PATH + '/images/techgig_new_images/customize-loader.gif"></div></div>').show();

                //set cookie to load recommendations in future
                var date = new Date();
                date.setTime(date.getTime() + (3600 * 24 * 30 * 1000)); // expires after 30 days
                $.cookie("tg_ck_rcm_user_info", user_email, {
                    expires: date,
                    path: '/'
                });

                $.post(base_url + '/ajax_files/load_recommendations.php', {
                    action: 'save_info',
                    roles: encodeURIComponent(user_roles),
                    skills: encodeURIComponent(user_skills),
                    name: encodeURIComponent(user_name),
                    email: encodeURIComponent(user_email),
                    news_catg: encodeURIComponent(news_catg),
                    company: encodeURIComponent(user_company)
                }, function(data) {
                    data = $.trim(data);
                    //alert(data);
                    $("#customize-techgig .modal-content").html(data).show();
                    Tg_RecommendationPopup.set_tab_pane_content();
                });
            });

            $(document).on("click", "#customize-techgig .customize-btn", function() {                
				
				$.post(base_url + '/ajax_files/load_recommendations.php', {
                    action: 'edit_info'
                }, function(data) {
                    data = $.trim(data);
                    $("#customize-techgig .modal-content").html(data);
                    $.getScript(theme_url + "/javascript/chosen_jquery.min.js")
                        .done(function() {
                            $('#customize-techgig .chosen-select').chosen();
                        })
                        .fail(function() {
                            console.log('chosen not loaded');
                        });				
						
                    $("#btn-rcm-go-back").show();
                });
            });

            $(document).on("click", "#btn-rcm-go-back", function() {
                $("#customize-techgig .modal-content .modal-body").html('<div class="loader-area"><div class="inner-loader"><img src="' + THEME_PATH + '/images/techgig_new_images/customize-loader.gif"></div></div>').show();
                $("#customize-techgig .modal-content").load(base_url + "/ajax_files/load_recommendations.php", function() {
                    Tg_RecommendationPopup.set_tab_pane_content();

                    $.getScript(theme_url + "/javascript/chosen_jquery.min.js")
                        .done(function() {
                            $('#customize-techgig .chosen-select').chosen();
                        })
                        .fail(function() {
                            console.log('chosen not loaded');
                        });
                });

            });

            $("#customize-techgig").tooltip({
                selector: '[data-toggle=tooltip]'
            });
        });

    }

    $instance.set_tab_pane_content = function() {
        $("#customize-techgig .tab-pane").each(function() {
            $(this).find('.slider ul').carouFredSel({
                responsive: true,
                width: '100%',
                circular: true,
                infinite: false,
                auto: false,
                scroll: 1,
                prev: $(this).find('.previous-btn'),
                next: $(this).find('.next-btn'),
                items: {
                    width: 350,
                    height: 'variable',
                    visible: {
                        min: 1,
                        max: 3
                    }
                }
            });

            $(this).find('.slider-full ul').carouFredSel({
                responsive: true,
                width: '100%',
                circular: true,
                infinite: false,
                auto: false,
                scroll: 1,
                prev: $(this).find('.previous-btn'),
                next: $(this).find('.next-btn'),
                items: {
                    width: 700,
                    height: 'variable',
                    visible: {
                        min: 1,
                        max: 1
                    }
                }
            });
        });


    };


    $instance.participateSkillTest = function(previous_season_id, parent_season_id, season_id, utm_tracking) {
        var action_file_url = base_url + '/ajax_files/assessment_check_participation.php?previous_season_id=' + previous_season_id + '&parent_season_id=' + parent_season_id + '&season_id=' + season_id;
        $.get(action_file_url, function(data) {
            var msg = data;
            if (msg.status == 'success') {
                window.location.href = msg.url;
            } else {
                alert(msg.message);
            }
        });
    };

};

function remove_span(val, uid) {
  if (document.getElementById('inbox_' + uid)) {
    document.getElementById('compose_name').removeChild(document.getElementById('inbox_' + uid));
  }
  
  // HACK for adding multiple values
  var to_val_1 = document.getElementById('to_box').value;
  var to_frnd_list_1 = document.getElementById('to_frnd_list').value;
  
  
  var myNewString1 = to_frnd_list_1.replace(uid + ',', '');
  document.getElementById('to_frnd_list').value = myNewString1;
  
  var myNewString2 = to_val_1.replace(val + ',', '');
  document.getElementById('to_box').value = myNewString2;
}

function idledeTector(){

    var IDLE_TIMEOUT = 300; //seconds
    var _idleSecondsCounter = 0;
    document.onclick = function() {
    _idleSecondsCounter = 0;
    };
    document.onmousemove = function() {
    _idleSecondsCounter = 0;
    };
    document.onkeypress = function() {
    _idleSecondsCounter = 0;
    };

    var myInterval = window.setInterval(CheckIdleTime, 1000);

    function CheckIdleTime() {
        _idleSecondsCounter++;
        if (_idleSecondsCounter >= IDLE_TIMEOUT) {
            window.clearInterval(myInterval);
            $('#pause-test').trigger('click');
        }
    }
    
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};



function _custom_poplayer2(tit, wide, custom_function, add_class) { 
	// custom_function is the function that can be passed as a param to this function to be excecuted after calling this layer. make sure that it is defined.
	if(!tit) {
		tit='';
	}
	var l2_id='';
	l2_id = parseInt($('.l2_outer_bx').length) + 1;
	var obj_id = "_l2_id_"+l2_id;
	var hideAll="'#_l2_id_"+l2_id+",#l2_overlay_bx_"+l2_id+"'";
	
	var layer_op = "0.4";
	if(l2_id > 1) { 
		layer_op = "0";
	}
	
	var xtra_cls = '';
	if(add_class) {
		xtra_cls = add_class;
	}
	
	$("body").append('<div id="'+obj_id+'" class="l2_outer_bx '+xtra_cls+'" style="display:none;"><div class="layer-fb-cont"><div class="fb-blue-head"><span><a href="javascript:void(0);" onclick="javascript: _remove_custom_poplayer2('+hideAll+');">X Close</a></span><b id="#_l2_ttl_'+l2_id+'">'+tit+'</b></div><div class="_l2_txt_cnt fb-txt-new" id="_l2_txt_cnt_'+l2_id+'"><span class="_l2_pre_load" id="_l2_pre_load_'+l2_id+'"><span class="_l2_pre_load_img">&nbsp;</span>Loading...</span></div><div id="_l2_btm_'+l2_id+'"></div></div></div>');
	
	var divH='';
	var divW = $("#content_module").width();
	
	$("#"+obj_id).show().css({width:wide+'px'});
	divH = document.documentElement.clientHeight || document.body.clientHeight;
	divW = document.documentElement.clientWidth || document.body.clientWidth;
	var layerH = document.getElementById(obj_id).offsetHeight;
	var layerW = document.getElementById(obj_id).offsetWidth;

	$("#"+obj_id).css({top:(divH-layerH)/2+"px",left:(divW-layerW)/2+"px"});

	
	var lay = $("body").append("<div id='l2_overlay_bx_"+l2_id+"' class='l2_overlay_bx "+xtra_cls+"' style='height:100%; width:100%; background:#000000; position:fixed; top:0; left:0; z-index:900;'></div>");
	$("#l2_overlay_bx_"+l2_id).css({opacity:layer_op});
	
	//$("body").css({overflow:"hidden"}); // $(document).height();
	
	try {
		if(custom_function) custom_function(l2_id);
	} catch(e){}
	
	return l2_id;
} 

function _remove_custom_poplayer2(objs) {
	if(objs) {
		$(objs).remove();
	}
}


function add_city_by_country(selected_value, selected_city) {
get_data = "country="+escape(selected_value)+'&selected_city='+escape(selected_city)+'&select_id=city_combo';
 $.ajax({
       type: "GET",
       url: base_url+"/ajax_files/city_list.php",
       data: get_data,
       success: function(msg) { 
	   msg = msg.replace(/^\s+|\s+$/g,"");
        if(msg) { 
				 //alert(msg);
         document.getElementById('add_city').style.display = 'block';
         document.getElementById('add_city').innerHTML = msg;
         document.getElementById('add_other_city').style.display = 'none';
				 if(from_where == 'register'){
						$('#city_combo').attr({'tabindex':5});
					}
				 checkIfOtherCity('city_combo');
        } else { 
          document.getElementById('add_other_city').style.display = 'block';
          document.getElementById('add_city').innerHTML = '';
					document.getElementById('add_city').style.display = 'none';
        }
      }
    });
  // $('#available_functional_area_box').html('<div class="color">loading ...</div>').load(url);
   
}


function checkIfOtherCity(obj){
	var city_val = $("#"+obj).val();
	var strObj = new String(city_val);
	var city_val_arr = strObj.split(' ');
	var other_val = '';
	for(var i in city_val_arr){
		if(city_val_arr[i] == 'Other' || city_val_arr[i] == 'Others'){
			other_val = 'Others';
			//alert(city_val_arr[i]);
			break;
		}
	}
	//alert(other_val);
	if(other_val == 'Others'){
		var html_txt = "<span class='star'>*</span> City Name :";
		if(obj == "city_combo"){
			$('#add_other_city label').html(html_txt);
			$('#add_other_city').css({"margin-top": "4px"});
			$('#add_other_city').show();
			//$('#add_other_city input').focus();
		}else if(obj == "int_city_combo2"){
			$('#int_add_other_city2 label').html(html_txt);
			$('#int_add_other_city2').css({"margin-top": "4px"});
			$('#int_add_other_city2').show();
			//$('#int_add_other_city input').focus();
		}else{
			$('#int_add_other_city label').html(html_txt);
			$('#int_add_other_city').css({"margin-top": "4px"});
			$('#int_add_other_city').show();
			//$('#int_add_other_city input').focus();
		}
	}else{
		if(obj == "city_combo"){
			$('#add_other_city').hide();
			$('#add_other_city input').val('');
		}else{
			$('#int_add_other_city').hide();
			$('#int_add_other_city input').val('');
		}
	}
	
}

function change_role_by_fa(mfa_id, container_width, selected_role) {
  url = base_url + "/ajax/role_by_fa.php?mfa_id="+mfa_id + '&container_width='+container_width+ '&selected_role='+selected_role;
	//alert(selected_role);
  $('#role_by_sfa_blk p').html('<span class="color">loading ...</span>');//.load(url);
	$.get(url, function(data){
		if(trim(data)){
			$('#role_by_sfa_blk p').html(data);
			$('#add_role_by_sfa_blk').hide();
			$('#other_role_by_sfa_blk').hide();
			$('#role_by_sfa_blk').show();
			$('#role_type').val('role');
			check_role_value('role_select');
		}else{
			$('#role_by_sfa_blk').hide();
			$('#other_role_by_sfa_blk').hide();
			$('#add_role_by_sfa_blk').show();
			$('#role_type').val('add_role');
		}
	});
}

function check_role_value(obj){
	var role_val = $('#'+obj).val();
	//alert(role_val);
	//alert(role_val);
	if(role_val){
		var role_val_arr = role_val.split(' ');
		var other_val = '';
		for(var i in role_val_arr){
			if(role_val_arr[i] == 'Other' || role_val_arr[i] == 'Others'){
				other_val = 'Others';
				//alert(role_val_arr[i]);
				break;
			}
		}
		//alert(other_val);
		if(other_val == 'Others'){
			var html_txt = "<span class='star'>*</span> Role Name";
			$('#other_role_by_sfa_blk label').html(html_txt);
			$('#other_role_by_sfa_blk').show();
			$('#role_type').val('other_role');
		}else{
			$('#other_role_by_sfa_blk').hide();
			$('#other_role_by_sfa_blk input').val('');
			$('#role_type').val('role');
		}
	}
}

	function tb_remove() {
		$('#TechGigbootStrapModal').modal('hide');
		return false;
	}

	function CloseWebinarBoxNRedirect(redirectUrl) {
        parent.tb_remove();
        parent.window.location=redirectUrl;
    }

	
$(function(){
	if($("[data-func]").length > 0){
		var gnode = $("[data-func]");
		$("[data-func]").click(function(){
			var _func = $(this).attr("data-func");
			var targetID = $(this).attr("data-istarget");
			if(targetID != undefined){
				window[_func]($(this),targetID);
			}else{
				window[_func]($(this));
			}
		});
	}
})


	function activestate(currobj,targetID){
		currobj = targetID != undefined ? $(targetID) : currobj;
		console.log(currobj)
		if($(currobj).hasClass("selected")){
			$(currobj).removeClass("selected");
		}else{
			$(currobj).addClass("selected");
		}
	}
	function deactivestate(currobj,targetID){
		currobj = targetID != undefined ? $(targetID) : currobj;
		console.log(currobj)
		$(currobj).prev().removeClass("selected");
	}