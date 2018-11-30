/***
 * Javascript For Challenges Page
 * 
 * This script is intended to provide all client side functionality 
 * required for Techgig Project
 * 
 * Author   : Sebin Baby
 * Created  : 20 July, 2016
 */

Tg_ChallengesPage = new function() {
    var $instance = this;

    $instance.init = function() {
			
                        
			$('#previous-challenges .nav.nav-tabs li a').click (function () {
				var type = $(this).data('challenge_type');
				$('#previous-challenges .tab-pane').attr('id', type + '-challenges');
				$('#previous-challenges .tab-pane .col-sm-6').remove();
				$('#challenge_type').val(type);
				$('#page_number').val(1);
				$('#search_past_challenge').val('');
				$instance.LoadPreviousContest();
			});	
			
			$('#leaderboard1 .nav.nav-tabs li a').click (function () {
				var type = $(this).data('type');
				$('#leaderboard1 .tab-pane').attr('id', type + '-challenges');
				$('#leaderboard1 .tab-pane table tbody tr.row-header').remove();
				$('#leaderboard1 .tab-pane table tbody tr.user-row').remove();
				$('#type').val(type);
				$('#page_number').val(1);
				$instance.LoadLeaderBoardChallenge();
			});
			
		   $(document).on("change", "#leaderboard1 table tr.row-header select", function() {
				var season_id = $(this).val();
				$('#leaderboard1 .tab-pane table tbody tr.row-header').remove();
				$('#leaderboard1 .tab-pane table tbody tr.user-row').remove();
				$('#page_number').val(1);
				$('#season_id').val(season_id);
				$instance.LoadLeaderBoardChallenge();
			});
			
			$(document).on("click", "#common-navigation.for-contest .contest-filter .btn", function() {
				if($(this).hasClass("less")) {
					$(this).removeClass("less");
					$(this).parent().find(".filter-lists").hide();	
				} else { 
					$(this).addClass("less");
					$(this).parent().find(".filter-lists").show();	
					if ($(window).width() < 767) {
						$(".mobile-dropdown-view ul").slideUp("fast");
					}
				}
			});
			
			$(document).on("click", function(event){
				var $trigger = $("#common-navigation.for-contest .contest-filter");
				if($trigger !== event.target && !$trigger.has(event.target).length){
					$("#common-navigation.for-contest .filter-lists").hide();	
					$("#common-navigation.for-contest .contest-filter .btn").removeClass("less");
				}   
			});
			
			//search challenge
		$('#search_past_challenge').keyup (function () {
		
			 var filter = $(this).val();
			 var keyword = $('#search_past_challenge').val();
			 var challenge_type = $('#challenge_type').val();
			 $('#page_number').val(1);
			
			 
			 //search if more than 2 character
			 if(keyword.length > 2) {
			
			$('#previous-challenges div.col-sm-6').remove();
			$('#ViewMore').hide();
			$('#ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
			
			var action_file_url = base_url + '/ajax_files/codecontestspreviouschallenges.php?keyword=' + keyword + '&type='+ challenge_type;
			$.ajax({
				type: "POST",
				url: action_file_url,
				data: ({}),
				success: function(data) {
					data = $.trim(data);
					if (data == 'none') {
						$('#no_more_user').html('<p class="text-center">Challenges not found.</p>');
						$('#ViewMore').hide();
						$('#ajax_previous_contest').html('');
					} else if (data == 'no_record') {
						$('#no_more_user').html('<p class="text-center">No more challenges to display.</p>');
						$('#ViewMore').hide();
						$('#ajax_previous_contest').html('');
					} else {
					    $('#previous-challenges div.col-sm-6').remove();
						$(data).insertBefore('.ajax_previous_contest');
						$('#ajax_previous_contest').hide();
					}
				}
			});
			
			} else {	
				$('#previous-challenges div.col-sm-6').remove();
				Tg_ChallengesPage.LoadPreviousContest();
			}
			
		});
		
		$(document).on('click', '#next-mcq',function(){		
			var invitation_id = $(this).data('invitation_id');
			var check_clear_validation=$('#clear_option_check').val();
			
			var answer_option = '';
			$('#attempted_option ul li.active').each(function() {
				if(answer_option == '') {
					answer_option = $(this).attr('id');
				} else {
					answer_option = answer_option+'@@'+$(this).attr('id');
				}
			});
			
			if(answer_option == '' && check_clear_validation==0) { 
				$('#submit-error').modal('show');
				return false;
			}
			
			var webcam_val = $('#webcam_enable').val(); 
			var platform_type = $('#platform_type').val(); 
			var page_number = $('#next_page_count').val(); 
			var event_name = $('#event_name').val(); 
			var test_action_url = $('#test_action_url').val(); 
			var practice = $('#practice').val();
			var finalsubmit = $('#final-submit').val();
			$("#next-mcq").addClass( "disabled" );
			$("#next-mcq").val("Redirecting...");
			
			//check here platform_type 
			if(platform_type == 'codejudge') {			
				if(contest_saas_prefix=='techchallenge'){
					var contest_redirect_url = base_url+'/'+saas_prefix+'/question';
				} else {
					var contest_redirect_url = base_url+'/'+saas_prefix+'/tests/questions';
				}			
			} else {
				var contest_redirect_url = base_url+'/'+assessment_url+'/question';
			}
			
			if(test_action_url != '') {
				var contest_redirect_url = test_action_url;
			}
			
			try {
				if(webcam_val == 1) { //webcam
					$('#clear_option_check').val("0");
					if(page_number != 'none') {
						var action_url = contest_redirect_url+'/ajax/'+invitation_id+'/'+page_number;
						$('#content').load(action_url, function(responseTxt, statusTxt, xhr){
													
						});	
					}		
				} else if(page_number == 'none') {
					var final_url = contest_redirect_url+'/'+invitation_id;
					window.location.href = final_url;
				} else {
					if($.trim(practice) && practice !=0){
						if(finalsubmit == '1'){
							$('#codejudge_requirement').submit();
						} else {
							window.location.href = contest_redirect_url+'/'+invitation_id;
						}
					} else {
						window.location.href = contest_redirect_url+'/'+invitation_id+'/'+page_number;
					}
				} 
			} catch (e){
				//alert(e.description);
			}
		});
		
		// Load live challenge filter
		$(document).on('click', '.contest-section .header .dropdown .btn',function(){	
		
			$(".mobile-dropdown-view ul, #multi-breakdown-list ul").slideUp("fast");
			$(".mobile-dropdown-view .btn, #multi-breakdown-list .btn").removeClass("less");
		
			if($(this).parent().hasClass("less")) {
				$(this).parent().removeClass("less");	
			} else { 
				$(this).parent().addClass("less");
			}
		});	

		
		$(document).on('click', '#attempted_option .bookmark-icon, #mcq-questions-list .bookmark-icon',function(){		
			var encrypt_token = $(this).data('token');
			var platform_type = $('#platform_type').val();
			var question_id = $(this).data('question_id');
			var category = $(this).data('category');
			var objectBtn = $(this);
			
			var bookmark = 'true';
			if($(this).hasClass("active")) {
				bookmark = 'false';
			}

			var url = base_url + '/ajax_files/saas_candidate_function.php?action=bookmark_question';
			$.post(url, {'invitation_id': encrypt_token, 'question_id': question_id, 'platform_type': platform_type, 'category': category, 'bookmark': bookmark}, function(data) {
				if(data.status == 'success') {
					if(bookmark == 'true') {
                        $('.bookmark_'+question_id).addClass("active");
						$('.bookmark_'+question_id).next(".tooltip").find(".tooltip-inner").text("Question Marked");
						$('.bookmark_'+question_id).attr('data-original-title', 'Question Marked');
						$(objectBtn).tooltip('show');
					} else {
                        $('.bookmark_'+question_id).removeClass("active");
						$('.bookmark_'+question_id).next(".tooltip").find(".tooltip-inner").text("Mark Question");
						$('.bookmark_'+question_id).attr('data-original-title', 'Mark Question');
						$(objectBtn).tooltip('show');
					}
					setTimeout(function(){ $('.bookmark_'+question_id).tooltip('hide'); }, 1000);
				}
			});			
		});	
		
		// Load upcoming prize recommanded challenge
		$(document).on('click', '#upcoming-job-filter-mob, #upcoming-prize-filter-mob',function(){	
			
			 var upcoming_job_filter = $('input[name=upcoming_job_filter_mob]:checked').val();
			var upcoming_prize_filter = $('input[name=upcoming_prize_filter_mob]:checked').val();
            
            if(typeof upcoming_job_filter === 'undefined') { upcoming_job_filter = ''; }
            if(typeof upcoming_prize_filter === 'undefined') { upcoming_prize_filter = ''; }
            
            $('#upcoming_contest_listing .prize-hiring-1, #upcoming_contest_listing .prize-hiring-2').hide();
            
            if(upcoming_job_filter == 1) {
                $('#upcoming_contest_listing .prize-hiring-1').show();
            } else {
                $('#upcoming_contest_listing .prize-hiring-1').hide();
            }
            
            if(upcoming_prize_filter == 2) {
                $('#upcoming_contest_listing .prize-hiring-2').show();
            } else {
                $('#upcoming_contest_listing .prize-hiring-2').hide();
            }
            
            if(upcoming_job_filter == '' && upcoming_prize_filter == '') {
                $('#upcoming_contest_listing .prize-hiring-1, #upcoming_contest_listing .prize-hiring-2').show();
            }
            
            $('#upcoming_count_id').text($('#upcoming_contest_listing .contest-box:visible').length);
            var bLazy = new Blazy();
            
		});	

			// Load upcoming prize recommanded challenge
		$(document).on('click', '#upcoming-prize-filter, #upcoming-job-filter',function(){	
			
            var upcoming_job_filter = $('input[name=upcoming_job_filter]:checked').val();
			var upcoming_prize_filter = $('input[name=upcoming_prize_filter]:checked').val();
            
            if(typeof upcoming_job_filter === 'undefined') { upcoming_job_filter = ''; }
            if(typeof upcoming_prize_filter === 'undefined') { upcoming_prize_filter = ''; }
            
            $('#upcoming_contest_listing .prize-hiring-1, #upcoming_contest_listing .prize-hiring-2').hide();
            
            if(upcoming_job_filter == 1) {
                $('#upcoming_contest_listing .prize-hiring-1').show();
            } else {
                $('#upcoming_contest_listing .prize-hiring-1').hide();
            }
            
            if(upcoming_prize_filter == 2) {
                $('#upcoming_contest_listing .prize-hiring-2').show();
            } else {
                $('#upcoming_contest_listing .prize-hiring-2').hide();
            }
            
            if(upcoming_job_filter == '' && upcoming_prize_filter == '') {
                $('#upcoming_contest_listing .prize-hiring-1, #upcoming_contest_listing .prize-hiring-2').show();
            }
            
            $('#upcoming_count_id').text($('#upcoming_contest_listing .contest-box:visible').length);
            var bLazy = new Blazy();

            
		});	
		
		// Load live challenge filter
		$(document).on('click', '#live-job-filter-mob, #live-prize-filter-mob',function(){	
			
            var upcoming_job_filter = $('input[name=live_job_filter_mob]:checked').val();
			var upcoming_prize_filter = $('input[name=live_prize_filter_mob]:checked').val();
            
            if(typeof upcoming_job_filter === 'undefined') { upcoming_job_filter = ''; }
            if(typeof upcoming_prize_filter === 'undefined') { upcoming_prize_filter = ''; }
            
            $('#live-contest-listing .prize-hiring-1, #live-contest-listing .prize-hiring-2').hide();
            
            if(upcoming_job_filter == 1) {
                $('#live-contest-listing .prize-hiring-1').show();
            } else {
                $('#live-contest-listing .prize-hiring-1').hide();
            }
            
            if(upcoming_prize_filter == 2) {
                $('#live-contest-listing .prize-hiring-2').show();
            } else {
                $('#live-contest-listing .prize-hiring-2').hide();
            }
            
            if(upcoming_job_filter == '' && upcoming_prize_filter == '') {
                $('#live-contest-listing .prize-hiring-1, #live-contest-listing .prize-hiring-2').show();
            }
            
            $('#live_running_id').text($('#live-contest-listing .contest-box:visible').length);
            var bLazy = new Blazy();
            
		});	
		
		// Load live challenge filter
		$(document).on('click', '#live-prize-filter, #live-job-filter',function(){	
        
			/*var upcoming_job_filter = $('input[name=live_job_filter]:checked').val();
			var upcoming_prize_filter = $('input[name=live_prize_filter]:checked').val();
			var contest_type = 'running';
			upcoming_job_filter = (typeof upcoming_job_filter === "undefined") ? "" : upcoming_job_filter;
			upcoming_prize_filter = (typeof upcoming_prize_filter === "undefined") ? "" : upcoming_prize_filter;
			$('#live-contest-listing').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
			var url = base_url + '/ajax_files/ajax_load_upcoming_challenge.php';
			$.post(url, {'prize_filter': upcoming_prize_filter, 'job_filter': upcoming_job_filter, 'contest_type': contest_type}, function(data) {
				var running = data.split('@@$$#!#@@');
				$("#live-contest-listing").html();
				$("#live-contest-listing").html(running[0]);
				$("#live_running_id").html($.trim(running[1]));
				var bLazy = new Blazy();
				return false;
				
			});	*/	
            
            var upcoming_job_filter = $('input[name=live_job_filter]:checked').val();
			var upcoming_prize_filter = $('input[name=live_prize_filter]:checked').val();
            
            if(typeof upcoming_job_filter === 'undefined') { upcoming_job_filter = ''; }
            if(typeof upcoming_prize_filter === 'undefined') { upcoming_prize_filter = ''; }
            
            $('#live-contest-listing .prize-hiring-1, #live-contest-listing .prize-hiring-2').hide();
            
            if(upcoming_job_filter == 1) {
                $('#live-contest-listing .prize-hiring-1').show();
            } else {
                $('#live-contest-listing .prize-hiring-1').hide();
            }
            
            if(upcoming_prize_filter == 2) {
                $('#live-contest-listing .prize-hiring-2').show();
            } else {
                $('#live-contest-listing .prize-hiring-2').hide();
            }
            
            if(upcoming_job_filter == '' && upcoming_prize_filter == '') {
                $('#live-contest-listing .prize-hiring-1, #live-contest-listing .prize-hiring-2').show();
            }
            
            $('#live_running_id').text($('#live-contest-listing .contest-box:visible').length);
            var bLazy = new Blazy();

            
		});

    }
	
    $instance.score_breakdown_leaderboard = function(season_id,user_id){

        $('#score_breakdown_leaderboard').modal('show');
        //loader show
        $('#score_breakdown_leaderboard .modal-body').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>');

        $.ajax({
                url: base_url + "/ajax_files/saas_candidate_function.php?action=get_score_breakdown_leaderboard",
                data: {season_id: season_id, user_id:user_id},
                type: 'POST',
                cache: false,
                success: function (data) {
                    $('#score_breakdown_leaderboard .modal-body').html(data);
                }
            });

        return false;
    }
	
	// Load Start Test PopUp
	$instance.open_start_test_popup = function(count, season_id, contest_flag, is_digital_source){
		if(typeof(is_digital_source) === 'undefined') { is_digital_source='N'; }
		
		if(contest_flag=='') { contest_flag='N'; }
		$("#hiring-challenge-popup #hiring_season_id").val(season_id);
		//$("#start-test-detail-ajax").html("<p class='tabs_loader text-center'><img src='"+THEME_PATH+"/images/TG-Loader.gif'> </p>");
		var action_url = base_url+"/ajax_files/ajax_start_test.php?season_id="+season_id+"&contest_flag="+contest_flag+"&is_digital_source="+is_digital_source;
		$('#start-test-detail-ajax').load(action_url, function(responseTxt, statusTxt, xhr){
                        $("#hiring-challenge-popup").modal('hide');
                        $("#hiring-challenge-popup").modal('show');
			return false;
		});	

		
	}
	
	
	$instance.leaderboardTabs = function(){
		$.getScript(theme_url+"/javascript/jquery_ui.min.js")
                .done(function () {
                    $( ".tabs3" ).tabs();
                })
                .fail(function () {
                    console.log('Tabs not loaded');
                })
		
	}
	
	$instance.CorrectAnswersNav = function() {
        $.getScript(theme_url + "/javascript/onepagenav.js")
            .done(function() {
				$('#question-controller .questions-list ul').onePageNav({
					currentClass: 'active',
					scrollOffset:0,
					scrollThreshold: 0.01,
					changeHash: false,
					filter: ':not(.external)'
				});

            })
            .fail(function() {
                console.log('OnePageNav not loaded');
            });
    };
	
	$instance.running_challenge_cnt = function(){
		var running_challenge_cnt = $('#running_challenge_cnt').val();
        var running_challenge_event = $('#running_challenge_cnt_event').val();
        var total_running_challenge = running_challenge_cnt;
        
        if(running_challenge_event){
         total_running_challenge = parseInt(running_challenge_cnt) + parseInt(running_challenge_event);
        }
        
        
		if(running_challenge_cnt > 0) {
			$('#page-header ul#challenge_nav li:eq(0) a').append('<span class="number">'+ total_running_challenge+'</span>');
		}
	}
	
	$instance.upcoming_challenge_cnt = function(){
		var upcoming_challenge_cnt = $('#upcoming_challenge_cnt').val();
		if(upcoming_challenge_cnt > 0) {
			$('#page-header ul#challenge_nav li:eq(1) a').append('<span class="number">'+ upcoming_challenge_cnt +'</span>');
		}else{
			$('#page-header ul#challenge_nav li:eq(1) a').hide();

		}
	}
	
	$instance.recommended_challenge_cnt = function(){
		var recommended_challenge_cnt = $('#recommended_challenge_cnt').val();
		if(recommended_challenge_cnt > 0) {
			$('#page-header ul#challenge_nav li:eq(0) a').append('<span class="number">'+ recommended_challenge_cnt +'</span>');
		}
	}
	
	$instance.recommended_skilltest_cnt = function(){
		var recommended_skilltest_cnt = $('#recommended_skilltest_cnt').val();
		if(recommended_skilltest_cnt > 0) {
			$('#page-header ul#challenge_nav li:eq(1) a').append('<span class="number">'+ recommended_skilltest_cnt +'</span>');
			$('#page-header ul#skilltest_nav li:eq(0) a').append('<span class="number">'+ recommended_skilltest_cnt +'</span>');
		}
	}
	
	$instance.recommended_webinar_cnt = function(){
		var recommended_webinar_cnt = $('#recommended_webinar_cnt').val();
		if(recommended_webinar_cnt > 0) {
			$('#page-header ul#webinar_nav li:eq(0) a').append('<span class="number">'+ recommended_webinar_cnt +'</span>');
			$('#page-header ul#challenge_nav li:eq(2) a').append('<span class="number">'+ recommended_webinar_cnt +'</span>');
		}
	}
	
	$instance.recommended_news_cnt = function(){
		var recommended_news_cnt = $('#recommended_news_cnt').val();
		if(recommended_news_cnt > 0) {
			$('#page-header ul#technews_nav li:eq(0) a').append('<span class="number">'+ recommended_news_cnt +'</span>');
			$('#page-header ul#challenge_nav li:eq(3) a').append('<span class="number">'+ recommended_news_cnt +'</span>');
		}
	}
	
	$instance.recommended_skillpage_cnt = function(){
		var recommended_skillpage_cnt = $('#recommended_skillpage_cnt').val();
		if(recommended_skillpage_cnt > 0){
			$('#page-header ul#skillpage_nav li:eq(0) a').append('<span class="number">'+ recommended_skillpage_cnt +'</span>');
		}
	}
	
	$instance.recommended_company_cnt = function(){
		var recommended_company_cnt = $('#recommended_company_cnt').val();
		if(recommended_company_cnt > 0) {
			$('#page-header ul#company_nav li:eq(0) a').append('<span class="number">'+ recommended_company_cnt +'</span>');
		}
	}
	
	$instance.challengeCalender = function(){
			var action_url_calender =  base_url + '/challenge_calender.php';
			$('#challenges-calender .calender').load(action_url_calender, function(e){
				//load success
			});	
	};
	
	$instance.LoadRecentTakersData = function(div_id, d, type){
		if(type == 2) {
		var cols = 4;
		$('#leaderboard_page').val(2);			
		} else if(type == 3) {
		var cols = 3;
		$('#final_leaderboard_page').val(2);
		} else {
		var cols = 4;
		$('#recent_page').val(2);
		}
		$("#"+div_id+"-"+d+" tbody").html("<span class='tabs_loader'>please wait loading... <img src='"+THEME_PATH+"/images/loading.gif'> </span>");
		 var url = base_url+'/ajax_files/assessment_recent_takers.php?season_id='+d+'&type='+type+'&div_id='+div_id;
		 $("#"+div_id+"-"+d+" tbody").load(url, function(response, status, xhr) {
			response = $.trim(response);
			if(response == 'no_record') {
				$("#"+div_id+"-"+d+" tbody").html("<tr style='display: table-row;'><td align='center' colspan='"+cols+"'>No users to display.</td></tr>");
			}
		 });
		 return false;
	}
	
	$instance.LoadRecentTakersDataPagination = function(div_id, d, type,event_type, event_name,current_page_url){
		if(type == 2) {
		var cols = 4;
		var page = $('#leaderboard_page').val();
		} else if(type == 3) {
		var cols = 3;
		var page = $('#final_leaderboard_page').val();
		} else {
		var cols = 4;
		var page = $('#recent_page').val();
		}
		
		
		
		if(typeof event_type === 'undefined') { event_type = ''; }
		if(typeof event_name === 'undefined') { event_name = ''; }
                if(event_name){
                var cols = 5;
                }

		if(typeof current_page_url === 'undefined') { current_page_url = ''; }
		$('#view_more_users-'+div_id+'-'+d).hide();
		$('#ajax_'+div_id+'-'+d).html('<td colspan="'+cols+'" align="center">please wait loading... <img src="'+THEME_PATH+'/images/loading.gif"> </td>'); 
		var action_file_url = base_url+'/ajax_files/assessment_recent_takers.php?season_id='+d+'&type='+type+'&div_id='+div_id+'&page_no='+page+'&event_type='+event_type+'&event_name='+event_name+'&page_url='+current_page_url;
		$.get(action_file_url, function(data) {
					$('#ajax_'+div_id+'-'+d).hide();
					data = $.trim(data);
					if(data == 'no_record') {
						$('#ajax_'+div_id+'-'+d).html('<td style="text-align:center" colspan="'+cols+'" align="center">No more users to display.</td>');
						$('#ajax_'+div_id+'-'+d).show();
					} else {
						$(data).insertBefore('.ajax_'+div_id+'-'+d);
						page++;
						if(type == 2) {
						$('#leaderboard_page').val(page);
						} else if(type == 3) {
						$('#final_leaderboard_page').val(page);
						} else {
						$('#recent_page').val(page);
						}
						$('#view_more_users-'+div_id+'-'+d).show();
					}
		});
	}

    $instance.checkUserParticipation = function(previous_season_id, parent_season_id, season_id, is_digital_source) {
		if(typeof(is_digital_source) === 'undefined') { is_digital_source='N'; }
        $("div[id^='contestMsg_']").html('');
        var action_file_url = base_url + '/ajax_files/assessment_check_participation.php?previous_season_id=' + previous_season_id + '&parent_season_id=' + parent_season_id + '&season_id=' + season_id + '&is_digital_source=' + is_digital_source;
        $.get(action_file_url, function(data) {
            data = $.trim(data);
            var msg = data;
            if (msg.status == 'success') {
                window.location.href = msg.url;
            } else {
				 $('.msgErrortop .message-box').addClass('warning-msg').find('p').html(msg.message); 
				 Tg_CommonFunction.clearMessage();
            }
        });
    };
	
	$instance.participateTest = function(season_id,msg_div,is_digital_source,attempt_page,curr_element_id,event_page_url) {
		if(typeof(is_digital_source) === 'undefined') { is_digital_source='N'; }
		if(typeof(attempt_page) === 'undefined') { attempt_page='N'; }
		if(typeof(event_page_url) === 'undefined') { event_page_url=''; }
        $("div[id^='contestMsg_']").html('');
        Tg_CommonFunction.clearMessage();
        
        if(window.location.href.indexOf("skilltest") > -1) {
            $('#TechGigbootStrapModal .modal-body').html('<div class="text-center"> <p> We are preparing your test.  <br />  <br /> Please wait <img style="height:7px;" src="'+base_url+'/files/loader_dot.gif" >  </p> </div>'); 
            $('#TechGigbootStrapModal .modal-dialog').addClass('modal-sm');
            $('#TechGigbootStrapModal').modal('show');
            $('#TechGigbootStrapModal .close').hide();
        }
        
        
        var action_file_url = base_url + '/ajax_files/assessment_check_participation.php?season_id=' + season_id + '&is_digital_source=' + is_digital_source + '&attempt_page=' + attempt_page+'&event_name='+event_page_url;
        $.get(action_file_url, function(data) {
            var msg = data;
            console.log(msg);
            if (msg.status == 'success') {
                var target = $("#"+msg_div).attr("data-target");
				if(target == '_blank') {
					window.open(msg.url,target);
				} else {
					window.location.href = msg.url;
				}				
            } else {
				// $('.msgErrortop .message-box').addClass('warning-msg').find('p').html(msg.message); 
				//  Tg_CommonFunction.clearMessage();
                

                 if(window.location.href.indexOf("skilltest") > -1) {
                    $('#TechGigbootStrapModal .modal-body').html('<div class="text-center"> <p> '+msg.message+'  </p> </div>'); 
                    $('#TechGigbootStrapModal .close').show(); 
                    /* $('#TechGigbootStrapModal').modal('hide');   
                    $('#TechGigbootStrapModal .modal-dialog').removeClass('modal-sm');  */
                 }else{
                     if(msg_div!=''){
                        $("#"+msg_div).show();
                        $("#"+msg_div).html(msg.message); 
                     } else {
                        $("#message_div").show();
                        $("#message_div").html(msg.message);  
                     }
                 }
                 
				 

                 if (msg.message.indexOf("Participation will start on") >= 0){
                    $('#'+curr_element_id).text("Registered");
                    $('#'+curr_element_id).addClass("disabled");
                 }
				 
            }
        });
    };
    
        $instance.participateTestWithOutLogin = function(season_id) {

            var action_file_url = base_url + '/ajax_files/participateTestWithOutLogin.php?season_id=' + season_id;
            $.get(action_file_url, function(data) {
            });
        };
    
	
	$instance.pauseTest = function(attempt_id, evaluateFLag) { 
            
            window.clearTimeout(SD);
            $("#test-paused").modal({
                backdrop: 'static',
                    keyboard: false
            });
            $('#test-paused').on('hide.bs.modal', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
                        
		var url = base_url + '/ajax_files/saas_candidate_function.php?action=pause_user_test';
		$.post(url, {
			'attempt_id': attempt_id
		}, function(data) {
			data = $.trim(data);
			data = data;
                        if(data.status == 'success') {
				
                            if(evaluateFLag == 'N'){
                                idledeTector();
                            }
			}
		});	
    };
    
    $instance.resumeUserTest = function(attempt_id, evaluateFLag) { 
            window.clearTimeout(SD);
            window.clearTimeout(UE);
            var url = base_url + '/ajax_files/saas_candidate_function.php?action=resume_user_test';
		$.post(url, {
			'attempt_id': attempt_id
		}, function(data) {
                        if(data.status == 'success') {
                            $("#ancResumeUserTest").text("resume test");
                            $('#instructions-popup, #test-paused,#submit-test').unbind();
                            $("#instructions-popup").modal("hide");
                            $("#test-paused").modal("hide");
                            $("#submit-test").modal("hide");
                            Tg_ChallengesPage.setCountDown();
                             UE = setInterval(updateEvaluation, 10 * 1000);
                            if(evaluateFLag == 'N'){
                                idledeTector();
                            }
                            $("#submit_code input").removeClass( "disabled" );
                            $("#submit_code input").val("Submit");
			}
		});
        
                	
    };
	
	$instance.saveMCQAnswer = function() {
		var invitation_id = $('#encrypt_token').val();
		var question_id = $('#question_id').val();
		var platform_type = $('#platform_type').val();
		
		try {			
			var answer_option = '';
			$('#attempted_option ul li.active').each(function() {
				if(answer_option == '') { answer_option = $(this).attr('id'); } 
				else { answer_option = answer_option+'@@'+$(this).attr('id'); }
			});
			//'question_id':question_id,
			var url = base_url+"/ajax_files/codejudge_save_mcq_answer.php";
			$.post(url,{'answer_option':answer_option, 'invitation_id':invitation_id, 'platform_type':platform_type},function(data){
				data = $.trim(data);	
				if(data.length > 0) {
                                        
					if(data == 'timeout') {
						alert('Contest Time is over. Click OK to see the result');
						$('#codejudge_requirement').submit();
					} else if(data == 'failure') {                    
						
					}else{
						
                        //Call to update counter of attemppted question
                        $instance.attemptedQuestionCount(invitation_id);

                        $('#check_user_submission').val('Y');
                        $('.submit-complete').removeAttr('data-toggle');
                        $('.submit-complete').removeAttr('data-target');
                    }
				}
			});		
		} catch(e){
			//alert(e.description);
		}
	};
	
	$instance.attemptedQuestionCount = function(invitation_id) {       

        $.ajax({
            type: 'POST',
            url: base_url + '/ajax_files/saas_candidate_function.php?action=get_attempted_question_cnt',
            data: {'invitation_id':invitation_id},
            success: function(response) {
                var msg = response;
                console.log(msg);
                if (msg.status == 'success') {
                    $("#attempt_question_cnt").text(msg.attempt_question_cnt);
                }
            }
        });
    };

	$instance.setCountDown = function(category_key, question_id, encrypt_token, platform_type, isEventPage) {		
			seconds++;
                        remaining_time--;
                        
                        var remainTime  = 100-((remaining_time/seasonDuration)*100);
                        $('.timer-progress').css('width',remainTime+'%');
			if (seconds > 59){ minutes++; seconds = 0; }			
			if (minutes > 59){ hours++; minutes = 0; }			
			if (hours > 23){ days++; hours = 0; }
			
			if (days == 0) {			
				if(minutes < 10){ minutes = ('0' + minutes).slice(-2); }
				if(hours < 10){ hours = ('0' + hours).slice(-2); }
				if(seconds < 10){ seconds = ('0' + seconds).slice(-2); }				
				
				if(hours > 0) {
					var left_time = hours + ":" + minutes + ":" + seconds;
				} else {
					var left_time = minutes + ":" + seconds;
				}	
				$('#remain').html(left_time);
				$('#remainSideBar').html(left_time);
			} else {
				if(days < 10){ days = ('0' + days).slice(-2); }
				if(hours < 10){ hours = ('0' + hours).slice(-2); }
				if(minutes < 10){ minutes = ('0' + minutes).slice(-2); }
				if(seconds < 10){ seconds = ('0' + seconds).slice(-2); }
				
				if(days > 1){
				
                                    $('#remain').html(days + " days and " + hours + ":" + minutes + ":" + seconds);
                                    $('#remainSideBar').html(days + " days and " + hours + ":" + minutes + ":" + seconds);
                                }else{
                                    $('#remain').html(days + " day and " + hours + ":" + minutes + ":" + seconds);
                                    $('#remainSideBar').html(days + " day and " + hours + ":" + minutes + ":" + seconds);
                                    
                                }
			}
			
			SD = window.setTimeout("Tg_ChallengesPage.setCountDown('"+category_key+"', '"+question_id+"', '"+encrypt_token+"', '"+platform_type+"', '"+isEventPage+"')", 1000);
			if (remaining_time == 0) {
				seconds = 0;
				window.clearTimeout(SD);
				
				//Time has been finished so now auto submit the test;
				Tg_ChallengesPage.autoSubmitTest(category_key, question_id, encrypt_token, platform_type, isEventPage);
			}
				
    };
	
	var refreshTimer = null;
	$instance.leaderboardRefreshTimer = function(seconds,selector) {
		selector = (typeof selector === "undefined") ? "" : selector;
		
		if (typeof(refreshTimer) != 'undefined') {
    		clearInterval(refreshTimer);	
    	}
    	refreshTimer = setInterval(countTimer, 1000);  	
		
		function countTimer() {
			if(seconds>0){
	   			--seconds;
				var hour = Math.floor(seconds /3600);
	   			var minute = Math.floor((seconds - hour*3600)/60);
	   			var second = seconds - (hour*3600 + minute*60);

				var html = '';
				if(hour > 0) {
					if(hour < 10) { hour = '0'+hour; }
					html = hour + ':';
				}
				
				if(minute < 10) { minute = '0'+minute; }
				if(second < 10) { second = '0'+second; }
				html += minute + ':' + second;
				$("#time-counter").html(html);
	   		} else{
	   			clearInterval(refreshTimer);
				if(selector != '') {
					$('#'+selector).trigger('click');
				} else {
					window.location.reload();
				}
	   		}
		}		
    }
	
	$instance.autoSubmitTest = function(category_key, question_id, encrypt_token, platform_type, isEventPage) {
                
                    if(!$.trim(isEventPage)){
                            isEventPage = 'N';
                        }
                        
		$("#auto_submit_code").val('Y');
		bootbox.alert({
			//size: 'small',
			title: "Contest time is over",
			message: "<p class='alert alert-warning'>Warning : Contest time is over. Click OK to see the result</p>",
			callback: function(result){
			if ($("#defaultCode").length > 0) {
				if(isEventPage == 'Y'){
                                     $('#form_post').val('2');
                                     compile_test('submit', question_id, encrypt_token, 'tg_testcase', platform_type, 'N');
                                     event_execution()
                                    return false;
                                }else{
                                    $('#form_post').val('1');
                                    compile_test('submit', question_id, encrypt_token, 'tg_testcase', platform_type, 'N');
                                    $('#codejudge_requirement').submit();
                                }
			}
			
                            
                            if(isEventPage == 'Y'){
                            $('.submit-test-response-data').trigger('click');
                            return false;
                        }else{
                             
                             
                             if (category_key == 'coding' || category_key == 'approximate_solution'|| category_key == 'botchallenge') {
                                 $('#form_post').val('1');
                                compile_test('submit', question_id, encrypt_token, 'tg_testcase', platform_type, 'N');
                             }
                             $('#codejudge_requirement').submit();
                             
                        }
			
			}
		});
	};	

    $instance.LoadPreviousContest = function() {
		$("#previous-challenges .contest-box").removeClass("last");
        var page = $('#page_number').val();
		var challenge_type = $('#challenge_type').val();
        $('#ViewMore').hide();
        //$('#ajax_previous_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/codecontestspreviouschallenges.php?page_no=' + page + '&type='+ challenge_type;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#no_more_user').html('<p class="text-center">No more challenges to display.</p>');
                    $('#ViewMore').hide();
					$('#ajax_previous_contest').html('');
                } else {
                    $(data).insertBefore('.ajax_previous_contest');
                    page++;
                    $('#page_number').val(page);
                    $('#ajax_previous_contest').hide();
                    $('#ViewMore').show();
                }
				var bLazy = new Blazy();
            }
        });

    };
	
	
	$instance.LoadLeaderBoardChallenge = function() {

       var page = $('#page_number').val();
		  var display_type = $('#type').val();
		  var season_id = $('#season_id').val();	  
          $('#ViewMore').hide();
          $('.no_user_display').remove();
        $('#ajax_leaderboard_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/assessment_leaderboard.php?page_no=' + page + '&type='+ display_type + '&season_id='+ season_id;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(response) {
                data = response.trim();
                if (data.indexOf("no_record") >= 0) {
                    $('#ViewMore').hide();
					$('#ajax_leaderboard_contest').html('');
					$(data).insertBefore('.ajax_leaderboard_contest');
					$('<tr class="no_user_display"><td colspan="4">  Be the first one to ace the leaderboard </td> </tr>').insertBefore('.ajax_leaderboard_contest');
                } else {
                    $(data).insertBefore('.ajax_leaderboard_contest');
                    page++;
                    $('#page_number').val(page);
                    $('#ajax_leaderboard_contest').hide();
                    $('#ViewMore').show();
                }
            }
        });

    };
	
	
	$instance.LoadRecommendedSkillTest = function() {

        var page = $('#page_number_skilltest').val();
        $('#ViewMore_recommended_skilltest').hide();
		
        $('#ajax_recommended_skilltest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/show_more_skilltest.php?page_no=' + page;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#no_more_skilltest').html('<div class="text-center view-all-block clearfix"><p class="text-center">No more skill tests to display.</p></div>');
                    $('#ViewMore_recommended_skilltest').hide();
					$('#ajax_recommended_skilltest').html('');
					// Hide the Main Block
					if(page == 1){
						$('#recommended-skill-test').hide();
					}
                } else {
                    $(data).insertBefore('.ajax_recommended_skilltest');
                    page++;
                    $('#page_number_skilltest').val(page);
                    $('#ajax_recommended_skilltest').hide();
                    $('#ViewMore_recommended_skilltest').show();
                }
            }
        });

    };
	
	$instance.LoadRecommendedSkillPages = function() {

        var page = $('#page_number_skillpages').val();
        $('#ViewMore_recommended_skillpages').hide();
		
        $('#ajax_recommended_skillpages').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/show_more_skillpages.php?page_no=' + page;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#no_more_skillpages').html('<p class="text-center">No more skill pages to display.</p>');
                    $('#ViewMore_recommended_skillpages').hide();
					$('#ajax_recommended_skillpages').html('');
					// Hide the Main Block
					if(page == 1){
						$('#recommended-skill-page').hide();
					}
                } else {
                    $(data).insertBefore('.ajax_recommended_skillpages');
                    page++;
                    $('#page_number_skillpages').val(page);
                    $('#ajax_recommended_skillpages').hide();
                    $('#ViewMore_recommended_skillpages').show();
                }
            }
        });

    };
	
	$instance.LoadRecommendedCompany = function() {

        var page = $('#page_number_company').val();
        $('#ViewMore_recommended_company').hide();
		
        $('#ajax_recommended_company').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/show_more_company.php?page_no=' + page;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#no_more_company').html('<p class="text-center">No more Company to display.</p>');
                    $('#ViewMore_recommended_company').hide();
					$('#ajax_recommended_company').html('');
					// Hide the Main Block
					if(page == 1){
						$('#recommended-companies').hide();
					}
                } else {
                    $(data).insertBefore('.ajax_recommended_company');
                    page++;
                    $('#page_number_company').val(page);
                    $('#ajax_recommended_company').hide();
                    $('#ViewMore_recommended_company').show();
                }
            }
        });

    };
	
	$instance.LoadRecommendedChallenge = function() {

        var page_challenge = $('#page_number_challenge').val();
        $('#ViewMore_recommended_challenge').hide();

        $('#ajax_recommended_challenge').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/show_more_challenge.php?page_no=' + page_challenge;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#no_more_challenge').html('<div class="text-center view-all-block clearfix"><p class="text-center">No more challenges to display.</p></div>');
                    $('#ViewMore_recommended_challenge').hide();
					$('#ajax_recommended_challenge').html('');
					// Hide the Main Block
					if(page_challenge == 1){
						$('#recommended-challenges').hide();
					}
                } else {
                    $(data).insertBefore('.ajax_recommended_challenge');
                    page_challenge++;
                    $('#page_number_challenge').val(page_challenge);
                    $('#ajax_recommended_challenge').hide();
                    $('#ViewMore_recommended_challenge').show();
                }
            }
        });

    };
	
	$instance.LoadRecommendedWebinar = function() {

        var page_webinar = $('#page_number_webinar').val();
        $('#ViewMore_recommended_webinar').hide();

        $('#ajax_recommended_webinar').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/show_more_webinar.php?page_no=' + page_webinar;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(data) {
                data = $.trim(data);
                if (data == 'no_record') {
                    $('#no_more_webinar').html('<div class="text-center view-all-block clearfix"><p class="text-center">No more webinars to display.</p></div>');
                    $('#ViewMore_recommended_webinar').hide();
					$('#ajax_recommended_webinar').html('');
					// Hide the Main Block
					if(page_webinar == 1){
						$('#recommended-webinar').hide();
					}
                } else {
                    $(data).insertBefore('.ajax_recommended_webinar');
                    page_webinar++;
                    $('#page_number_webinar').val(page_webinar);
                    $('#ajax_recommended_webinar').hide();
                    $('#ViewMore_recommended_webinar').show();
                }
            }
        });

    };
	
    var p = 10;
    $instance.timeout_trigger = function(total_registration_val, total_developers_val, total_submissions_val) {
        $('#registered-developers').html('<span class="number">' + total_registration_val + '</span><div id="slice"' + (p > 50 ? ' class="gt50"' : '') + '><div class="pie"></div>' + (p > 50 ? '<div class="pie fill"></div>' : '') + '</div>');
        $('#registered1-developers').html('<span class="number">' + total_developers_val + '</span><div id="slice"' + (p > 50 ? ' class="gt50"' : '') + '><div class="pie"></div>' + (p > 50 ? '<div class="pie fill"></div>' : '') + '</div>');
        $('#registered2-developers').html('<span class="number">' + total_submissions_val + '</span><div id="slice"' + (p > 50 ? ' class="gt50"' : '') + '><div class="pie"></div>' + (p > 50 ? '<div class="pie fill"></div>' : '') + '</div>');

        var deg = 360 / 100 * p;

        $('#registered-developers #slice .pie, #registered1-developers #slice .pie, #registered2-developers #slice .pie').css({
            '-moz-transform': 'rotate(' + deg + 'deg)',
            '-webkit-transform': 'rotate(' + deg + 'deg)',
            '-o-transform': 'rotate(' + deg + 'deg)',
            'transform': 'rotate(' + deg + 'deg)'
        });

        if (p != 100) {
            setTimeout('Tg_ChallengesPage.timeout_trigger(' + total_registration_val + ',' + total_developers_val + ',' + total_submissions_val + ')', 25);
        }

        p++;
    }


    $instance.webcamTypeMcq = function(question_type, question_id, question_token, allow_new_tab, auto_submit_time_limit, out_movement_allowed_number, platform_type) {
        var focusLostCounter = 0;
        var focusLostFlag = 0;
        var focusLostStartTime = '';
        var focusLostEndTime = '';
        var timeElapsed = 0;
        var focusOutTimeInterval = 5000;


        /* if(auto_submit_time_limit == 0) {
        var timeElapsedLimit = '<?php echo TIME_ELAPSED_LIMIT; ?>';
        } else { */
        var timeElapsedLimit = auto_submit_time_limit;
        //}

        if (timeElapsedLimit > 0) {
            var doAutoSubmitFlag = 'Y';
        }


        /* if(out_movement_allowed_number == 0) {
        var movingOutAllowedCounter = 10;
        } else { */
        var movingOutAllowedCounter = out_movement_allowed_number;
        //}


        // main visibility API function 
        // use visibility API to check if current tab is active or not
        var vis = (function() {
            var stateKey,
                eventKey,
                keys = {
                    hidden: "visibilitychange",
                    webkitHidden: "webkitvisibilitychange",
                    mozHidden: "mozvisibilitychange",
                    msHidden: "msvisibilitychange"
                };
            for (stateKey in keys) {
                if (stateKey in document) {
                    eventKey = keys[stateKey];
                    break;
                }
            }
            return function(c) {
                if (c) document.addEventListener(eventKey, c);
                return !document[stateKey];
            }
        })();

        // check if browser window has focus		
        var notIE = (document.documentMode === undefined),
            isChromium = window.chrome;

        if (notIE && !isChromium) {

            // check if current tab is active or not
            vis(function() {

                if (vis()) {

                    // User has come back on the Page, So reset the Focus Lost Flag
                    //focusLostCounter = 0;
                    focusLostFlag = 0;

                    // But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

                    if (timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {

                        if (doAutoSubmitFlag == 'Y') {

                            $('#disable_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');
                            $('#disable_combination .modal-title').text('');
                                $('#disable_combination').modal('show');


                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }
                        // Logging in Error Log file will go here
                        //alert(config.webcam_log[4]);
                        //saveWebcamLog(config.webcam_log[4]);

                        // reset the flags
                        //timeElapsed = 0;
                    } else {
                        timeElapsed = 0;
                    }

                } else {

                    focusLostCounter++;
                    if (movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
                        //alert('OUT OF FOCUS Going Limit Reached..');

                        if (doAutoSubmitFlag == 'Y') {
                            $('#disable_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');
                            $('#disable_combination .modal-title').text('');

                                $('#disable_combination').modal('show');

                            // Logging in Error Log file will go here
                            //alert(config.webcam_log[4]);
                            saveWebcamLog(config.webcam_log[4]);

                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }

                    } else {

                        if (allow_new_tab == 'Y') {
                            $('#disable_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                            $('#disable_combination .modal-title').text('');
                                $('#disable_combination').modal('show');

                        } else {

                            // Activated in Chrome on mouse New tab click AND windows tab Click
                            if (focusLostCounter == 1) {
                                if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

                                    // Write Movement in Log File
                                    //saveWebcamLog(config.webcam_log[3]);

                                    // Set focus Lost flag to true
                                    focusLostFlag = 1;
                                    focusLostStartTime = new Date().getTime();
                                    setInterval(myTimeoutFunction, focusOutTimeInterval);

                                }
                            } else {
                                // Write Movement in Log File
                                //saveWebcamLog(config.webcam_log[3]);

                                // Set focus Lost flag to true
                                focusLostFlag = 1;
                                focusLostStartTime = new Date().getTime();
                                setInterval(myTimeoutFunction, focusOutTimeInterval);
                            }

                        }
                    }

                }
            });

        } else {

            // checks for IE and Chromium versions
            if (window.addEventListener) {

                // CHROME BLOCK

                // bind focus event
                window.addEventListener("focus", function(event) {

                    // User has come back on the Page, So reset the Focus Lost Flag
                    //focusLostCounter = 0;
                    focusLostFlag = 0;

                    // But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

                    //alert(timeElapsed);

                    if (timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {

                        if (doAutoSubmitFlag == 'Y') {
                            $('#disable_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');
                            $('#disable_combination .modal-title').text('');

                                $('#disable_combination').modal('show');


                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }

                        // Logging in Error Log file will go here
                        //alert(config.webcam_log[4]);
                        //saveWebcamLog(config.webcam_log[4]);

                        // reset the flags
                        //timeElapsed = 0;
                    } else {
                        timeElapsed = 0;
                    }

                }, false);

                // bind blur event
                window.addEventListener("blur", function(event) {

                    focusLostCounter++;
                    if (movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
                        //alert('OUT OF FOCUS Going Limit Reached..');

                        if (doAutoSubmitFlag == 'Y') {
                            $('#disable_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');
                            $('#disable_combination .modal-title').text('');
                                $('#disable_combination').modal('show');

                            // Logging in Error Log file will go here
                            //alert(config.webcam_log[4]);
                            saveWebcamLog(config.webcam_log[4]);

                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }

                    } else {
                        if (allow_new_tab == 'Y') {
                            $('#disable_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                            $('#disable_combination .modal-title').text('');

                                $('#disable_combination').modal('show');

                        } else {

                            // Activated in Chrome on mouse New tab click AND windows tab Click
                            if (focusLostCounter == 1) {
                                if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

                                    // Write Movement in Log File
                                    //saveWebcamLog(config.webcam_log[3]);

                                    // Set focus Lost flag to true
                                    focusLostFlag = 1;
                                    focusLostStartTime = new Date().getTime();
                                    setInterval(myTimeoutFunction, focusOutTimeInterval);

                                }
                            } else {
                                // Write Movement in Log File
                                //saveWebcamLog(config.webcam_log[3]);

                                // Set focus Lost flag to true
                                focusLostFlag = 1;
                                focusLostStartTime = new Date().getTime();
                                setInterval(myTimeoutFunction, focusOutTimeInterval);
                            }

                        }
                    }

                }, false);

            } else {

                // IE BLOCK

                // bind focus event
                window.attachEvent("focus", function(event) {

                    // User has come back on the Page, So reset the Focus Lost Flag
                    //focusLostCounter = 0;
                    focusLostFlag = 0;

                    // But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

                    if (timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {
                        if (doAutoSubmitFlag == 'Y') {
                            $('#disable_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');
                            $('#disable_combination .modal-title').text('');
                                $('#disable_combination').modal('show');


                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }

                        // Logging in Error Log file will go here
                        //alert(config.webcam_log[4]);
                        //saveWebcamLog(config.webcam_log[4]);

                        // reset the flags
                        //timeElapsed = 0;
                    } else {
                        timeElapsed = 0;
                    }

                });

                // bind focus event
                window.attachEvent("blur", function(event) {

                    focusLostCounter++;
                    if (movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
                        //alert('OUT OF FOCUS Going Limit Reached..');

                        if (doAutoSubmitFlag == 'Y') {
                            $('#disable_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window.');
                            $('#disable_combination .modal-title').text('');
                                $('#disable_combination').modal('show');


                            // Logging in Error Log file will go here
                            //alert(config.webcam_log[4]);
                            saveWebcamLog(config.webcam_log[4]);

                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }

                    } else {
                        if (allow_new_tab == 'Y') {
                            $('#disable_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                            $('#disable_combination .modal-title').text('');

                                $('#disable_combination').modal('show');

                        } else {

                            // Activated in Chrome on mouse New tab click AND windows tab Click
                            if (focusLostCounter == 1) {
                                if (confirm('Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!')) {

                                    // Write Movement in Log File
                                    //saveWebcamLog(config.webcam_log[3]);

                                    // Set focus Lost flag to true
                                    focusLostFlag = 1;
                                    focusLostStartTime = new Date().getTime();
                                    setInterval(myTimeoutFunction, focusOutTimeInterval);

                                }
                            } else {
                                // Write Movement in Log File
                                //saveWebcamLog(config.webcam_log[3]);

                                // Set focus Lost flag to true
                                focusLostFlag = 1;
                                focusLostStartTime = new Date().getTime();
                                setInterval(myTimeoutFunction, focusOutTimeInterval);
                            }

                        }
                    }

                });
            }
        }

        function myTimeoutFunction() {
            timeElapsed = new Date().getTime() - focusLostStartTime; // time in ms
            timeElapsed = (timeElapsed / 1000); // time in seconds
            timeElapsed = Math.round(timeElapsed % 60); // formatting the time in seconds
            return timeElapsed;
        }


        function autoSubmitUserContest(question_id,question_token,platform_type,question_type) {

            if (question_type == 'code') {
                
                $('#form_post').val('1');
                compile_test('submit', question_id, question_token, 'tg_testcase', platform_type, 'N');
            } else {
                $('#codejudge_requirement').submit();
            }

        }
    }

    $instance.webcamNormal = function(question_type, question_id, question_token, allow_new_tab, auto_submit_time_limit, out_movement_allowed_number, platform_type) {
        var focusLostCounter = 0;
        var focusLostFlag = 0;
        var focusLostStartTime = '';
        var focusLostEndTime = '';
        var timeElapsed = 0;
        var focusOutTimeInterval = 5000;

        //Deloitte check
        if(typeof toggle_msg === "undefined"){
            toggle_msg = "Are you sure you want to move out of current window during this contest! Doing So would eventually auto submit your attempt!";
        }
        /* if(auto_submit_time_limit == 0) {
        var timeElapsedLimit = '<?php echo TIME_ELAPSED_LIMIT; ?>';
        } else { */
        var timeElapsedLimit = auto_submit_time_limit;
        //}

        if (timeElapsedLimit > 0) {
            var doAutoSubmitFlag = 'Y';
        }

        /* if(out_movement_allowed_number == 0) {
        var movingOutAllowedCounter = 10;
        } else { */
        var movingOutAllowedCounter = out_movement_allowed_number;
        //}


        // main visibility API function 
        // use visibility API to check if current tab is active or not
        var vis = (function() {
            var stateKey,
                eventKey,
                keys = {
                    hidden: "visibilitychange",
                    webkitHidden: "webkitvisibilitychange",
                    mozHidden: "mozvisibilitychange",
                    msHidden: "msvisibilitychange"
                };
            for (stateKey in keys) {
                if (stateKey in document) {
                    eventKey = keys[stateKey];
                    break;
                }
            }
            return function(c) {
                if (c) document.addEventListener(eventKey, c);
                return !document[stateKey];
            }
        })();

        // check if browser window has focus		
        var notIE = (document.documentMode === undefined),
            isChromium = window.chrome;

        if (notIE && !isChromium) {

            // check if current tab is active or not
            vis(function() {

                if (vis()) {

                    // User has come back on the Page, So reset the Focus Lost Flag
                    //focusLostCounter = 0;
                    focusLostFlag = 0;

                    // But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

                    if (timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {

                        if (doAutoSubmitFlag == 'Y') {
                            $('#disable_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');
                            $('#disable_combination .modal-title').text('');

                                $('#disable_combination').modal('show');


                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type, question_type);
                            }, 5000);

                        }
                        // Logging in Error Log file will go here
                        saveWebcamLog(config.webcam_log[4]);

                        // reset the flags
                        //timeElapsed = 0;
                    } else {
                        timeElapsed = 0;
                    }

                } else {

                    var codingEditorFocusFlag = 0;

                    var specific_element_id = $(document.activeElement).attr('id');
                    //alert($( document.activeElement ).attr('id'));

                    if (specific_element_id == 'frame_user_code' || specific_element_id == 'auto_save_code') {
                        codingEditorFocusFlag = 1;
                    } else {
                        //alert('Increment Counter..');
                        focusLostCounter++;
                    }

                    if (!codingEditorFocusFlag) {
                        if (movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
                            //alert('OUT OF FOCUS Going Limit Reached. 1.');

                            if (doAutoSubmitFlag == 'Y') {
                                $('#disable_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly by moving out of the contest window.');
                                $('#disable_combination .modal-title').text('');

                                    $('#disable_combination').modal('show');

                                // Logging in Error Log file will go here
                                //alert(config.webcam_log[4]);
                                saveWebcamLog(config.webcam_log[4]);

                                // Auto Submit Call will go here
                                setTimeout(function() {
                                    autoSubmitUserContest(question_id,question_token,platform_type);
                                }, 5000);

                            }

                        } else {
                            
                            if (allow_new_tab == 'Y') {
                                //alert('You are not allowed to move out of current window during this contest!');
                                $('#disable_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                                $('#disable_combination .modal-title').text('');
                                $('#disable_combination').modal('show');
                                saveWebcamLog(config.webcam_log[3]);

                            } else {

                                // Activated in Chrome on mouse New tab click AND windows tab Click
                                if (focusLostCounter == 2) {

                                    if (confirm(toggle_msg)) {

                                        // Write Movement in Log File
                                        saveWebcamLog(config.webcam_log[3]);

                                        // Set focus Lost flag to true
                                        focusLostFlag = 1;
                                        focusLostStartTime = new Date().getTime();
                                        setInterval(myTimeoutFunction, focusOutTimeInterval);

                                    }
                                } else if (focusLostCounter > 2) {
                                    // Write Movement in Log File
                                    saveWebcamLog(config.webcam_log[3]);

                                    // Set focus Lost flag to true
                                    focusLostFlag = 1;
                                    focusLostStartTime = new Date().getTime();
                                    setInterval(myTimeoutFunction, focusOutTimeInterval);
                                }

                            }
                        }

                    }

                }
            });

        } else {
            // checks for IE and Chromium versions
            if (window.addEventListener) {

                // CHROME BLOCK

                // bind focus event
                window.addEventListener("focus", function(event) {

                    // User has come back on the Page, So reset the Focus Lost Flag
                    //focusLostCounter = 0;
                    focusLostFlag = 0;

                    // But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

                    if (timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {
                        if (doAutoSubmitFlag == 'Y') {
                            $('#disable_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window');
                            $('#disable_combination .modal-title').text('');
                                $('#disable_combination').modal('show');

                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }

                        // Logging in Error Log file will go here
                        //alert(config.webcam_log[4]);
                        saveWebcamLog(config.webcam_log[4]);

                        // reset the flags
                        //timeElapsed = 0;
                    } else {
                        timeElapsed = 0;
                    }

                }, false);

                // bind blur event
                window.addEventListener("blur", function(event) {

                    var codingEditorFocusFlag = 0;

                    var specific_element_id = $(document.activeElement).attr('id');
                    //alert($( document.activeElement ).attr('id'));

                    if (specific_element_id == 'frame_user_code' || specific_element_id == 'auto_save_code') {
                        codingEditorFocusFlag = 1;
                    } else {
                        //alert('Increment Counter..');
                        focusLostCounter++;
                    }

                    if (!codingEditorFocusFlag) {

                        if (movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
                            //alert('OUT OF FOCUS Going Limit Reached.');

                            if (doAutoSubmitFlag == 'Y') {
                                $('#disable_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window');
                                $('#disable_combination .modal-title').text('');
                                    $('#disable_combination').modal('show');


                                // Logging in Error Log file will go here
                                //alert(config.webcam_log[4]);
                                saveWebcamLog(config.webcam_log[4]);

                                // Auto Submit Call will go here
                                setTimeout(function() {
                                    autoSubmitUserContest(question_id,question_token,platform_type);
                                }, 5000);

                            }

                        } else {

                            if (allow_new_tab == 'Y') {
                                //alert('You are not allowed to move out of current window during this contest!');
                                $('#disable_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                                $('#disable_combination .modal-title').text('');
                                $('#disable_combination').modal('show');
                                saveWebcamLog(config.webcam_log[3]);

                                setInterval(function() {

                                    window.focus();
                                }, 1000);
                            } else {

                                // Activated in Chrome on mouse New tab click AND windows tab Click
                                if (focusLostCounter == 2) {
                                    if (confirm(toggle_msg)) {

                                        // Write Movement in Log File
                                        saveWebcamLog(config.webcam_log[3]);

                                        // Set focus Lost flag to true
                                        focusLostFlag = 1;
                                        focusLostStartTime = new Date().getTime();
                                        setInterval(myTimeoutFunction, focusOutTimeInterval);

                                    }
                                } else if (focusLostCounter > 2) {
                                    // Write Movement in Log File
                                    saveWebcamLog(config.webcam_log[3]);

                                    // Set focus Lost flag to true
                                    focusLostFlag = 1;
                                    focusLostStartTime = new Date().getTime();
                                    setInterval(myTimeoutFunction, focusOutTimeInterval);
                                }

                            }

                        }

                    }

                }, false);

            } else {

                // IE BLOCK

                // bind focus event
                window.attachEvent("focus", function(event) {

                    // User has come back on the Page, So reset the Focus Lost Flag
                    //focusLostCounter = 0;
                    focusLostFlag = 0;

                    // But check the time passed in this duration. If user is coming back after specified time limit then show an alert and process for Auto Submit. Write the movement in log file.

                    if (timeElapsed >= timeElapsedLimit || focusLostCounter >= movingOutAllowedCounter) {
                        if (doAutoSubmitFlag == 'Y') {
                            $('#disable_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window');
                            $('#disable_combination .modal-title').text('');
                                $('#disable_combination').modal('show');

                            // Auto Submit Call will go here
                            setTimeout(function() {
                                autoSubmitUserContest(question_id,question_token,platform_type);
                            }, 5000);

                        }

                        // Logging in Error Log file will go here
                        //alert(config.webcam_log[4]);
                        saveWebcamLog(config.webcam_log[4]);

                        // reset the flags
                        //timeElapsed = 0;
                    } else {
                        timeElapsed = 0;
                    }

                });

                // bind focus event
                window.attachEvent("blur", function(event) {

                    var codingEditorFocusFlag = 0;

                    var specific_element_id = $(document.activeElement).attr('id');
                    //alert($( document.activeElement ).attr('id'));

                    if (specific_element_id == 'frame_user_code' || specific_element_id == 'auto_save_code') {
                        codingEditorFocusFlag = 1;
                    } else {
                        //alert('Increment Counter..');
                        focusLostCounter++;
                    }

                    if (!codingEditorFocusFlag) {

                        if (movingOutAllowedCounter > 0 && focusLostCounter >= movingOutAllowedCounter) {
                            //alert('OUT OF FOCUS Going Limit Reached. 3.');

                            if (doAutoSubmitFlag == 'Y') {
                                $('#disable_combination .modal-body p').html('We are auto submitting your contest as you have not followed instructions properly as you have moved out of the contest window');
                                $('#disable_combination .modal-title').text('');

                                    $('#disable_combination').modal('show');

                                // Logging in Error Log file will go here
                                //alert(config.webcam_log[4]);
                                saveWebcamLog(config.webcam_log[4]);

                                // Auto Submit Call will go here
                                setTimeout(function() {
                                    autoSubmitUserContest(question_id,question_token,platform_type);
                                }, 5000);

                            }

                        } else {
                            if (allow_new_tab == 'Y') {
                                $('#disable_combination .modal-body p').html('You are not allowed to move out of current window during this contest!');
                                $('#disable_combination .modal-title').text('');
                                    $('#disable_combination').modal('show');
                                    saveWebcamLog(config.webcam_log[3]);

                            } else {

                                // Activated in Chrome on mouse New tab click AND windows tab Click
                                if (focusLostCounter == 2) {
                                    if (confirm(toggle_msg)) {

                                        // Write Movement in Log File
                                        saveWebcamLog(config.webcam_log[3]);

                                        // Set focus Lost flag to true
                                        focusLostFlag = 1;
                                        focusLostStartTime = new Date().getTime();
                                        setInterval(myTimeoutFunction, focusOutTimeInterval);

                                    }
                                } else if (focusLostCounter > 2) {
                                    // Write Movement in Log File
                                    saveWebcamLog(config.webcam_log[3]);

                                    // Set focus Lost flag to true
                                    focusLostFlag = 1;
                                    focusLostStartTime = new Date().getTime();
                                    setInterval(myTimeoutFunction, focusOutTimeInterval);
                                }
                            }

                        }

                    }

                });
            }
        }

        function myTimeoutFunction() {
            timeElapsed = new Date().getTime() - focusLostStartTime; // time in ms
            timeElapsed = (timeElapsed / 1000); // time in seconds
            timeElapsed = Math.round(timeElapsed % 60); // formatting the time in seconds
            return timeElapsed;
        }

        function autoSubmitUserContest(question_id,question_token,platform_type) {

            if (question_type == 'code') {
                $('#form_post').val('1');
                compile_test('submit', question_id, question_token, 'tg_testcase', platform_type, 'N');
            } else {
                $('#codejudge_requirement').submit();
            }

        }
    }

};

Jstree = new function () {
    $instance = this;
    $instance.init = function (directory,platform_type,encryptToken,questionCategory) {        
        $('#tree')
                .jstree({
                    'core': {
                        'data': {
                            'url': base_url + "/file_project_question.php?operation=get_node&directory=" + directory + "&cache=" + $.now(),
                            'data': function (node) {
                                return {'id': node.id};
                            }
                        },
                        'check_callback': function (o, n, p, i, m) {
                            if (m && m.dnd && m.pos !== 'i') {
                                return false;
                            }
                            if (o === "move_node" || o === "copy_node") {
                                if (this.get_node(n).parent === this.get_node(p).id) {
                                    return false;
                                }
                            }
                            return true;
                        },
                        'force_text': true,
                        'themes': {
                            'responsive': false,
                            'variant': 'small',
                            "stripes": true
                        }
                    },
                    'sort': function (a, b) {
                        return this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : (this.get_type(a) >= this.get_type(b) ? 1 : -1);
                    },
                    'contextmenu': {
                        'items': function (node) {
                            var tmp = $.jstree.defaults.contextmenu.items();
                            delete tmp.create.action;
                            tmp.create.label = "Create";
                            tmp.create.submenu = {
                                "create_folder": {
                                    "separator_after": true,
                                    "label": "Folder",
                                    "action": function (data) {
                                        var inst = $.jstree.reference(data.reference),
                                                obj = inst.get_node(data.reference);
                                        inst.create_node(obj, {type: "default", directoy: directory, cache: $.now()}, "last", function (new_node) {
                                            setTimeout(function () {
                                                inst.edit(new_node);
                                            }, 0);
                                        });
                                    }
                                },
                                "create_file": {
                                    "label": "File",
                                    "action": function (data) {
                                        var inst = $.jstree.reference(data.reference),
                                                obj = inst.get_node(data.reference);
                                        inst.create_node(obj, {type: "file", directory: directory, cache: $.now()}, "last", function (new_node) {
                                            setTimeout(function () {
                                                inst.edit(new_node);
                                            }, 0);
                                        });
                                    }
                                }
                            };
                            if (this.get_type(node) === "file") {
                                delete tmp.create;
                            }
                            return tmp;
                        }
                    },
                    'types': {
                        'default': {'icon': 'folder'},
                        'file': {'valid_children': [], 'icon': 'file'}
                    },
                    'unique': {
                        'duplicate': function (name, counter) {
                            return name + ' ' + counter;
                        }
                    },
                    'plugins': ['state', 'sort', 'types', 'contextmenu', 'unique', 'themes']
                })
                .on('delete_node.jstree', function (e, data) {
                    $.get(base_url + '/file_project_question.php?operation=delete_node', {id: data.node.id, directory: directory, cache: $.now()})
                            .fail(function () {
                                data.instance.refresh();
                            })
                            .done(function () {
                                //$("#tree > ul > li > i.jstree-icon").remove();
                                //$("#tree > ul > li > a.jstree-anchor").remove();
                            });
                })
                .on('create_node.jstree', function (e, data) {
                    $.get(base_url + '/file_project_question.php?operation=create_node', {type: data.node.type, id: data.node.parent, text: data.node.text, directory: directory, cache: $.now()})
                            .done(function (d) {
                                data.instance.set_id(data.node, d.id);
                                //$("#tree > ul > li > i.jstree-icon").remove();
                                //$("#tree > ul > li > a.jstree-anchor").remove();
                            })
                            .fail(function () {
                                data.instance.refresh();
                            });
                })
                .on('rename_node.jstree', function (e, data) {
                    $.get(base_url + '/file_project_question.php?operation=rename_node', {id: data.node.id, text: data.text, directory: directory, cache: $.now()})
                            .done(function (d) {
                                data.instance.set_id(data.node, d.id);
                                //data.instance.refresh();
                                //$("#tree > ul > li > i.jstree-icon").remove();
                                //$("#tree > ul > li > a.jstree-anchor").remove();

                            })
                            .fail(function () {
                                data.instance.refresh();
                            });
                })
                .on('move_node.jstree', function (e, data) {
                    $.get(base_url + '/file_project_question.php?operation=move_node', {id: data.node.id, parent: data.parent, directory: directory, cache: $.now()})
                            .done(function (d) {
                                data.instance.load_node(data.parent);
                                //data.instance.refresh();
                                //$("#tree > ul > li > i.jstree-icon").remove();
                                //$("#tree > ul > li > a.jstree-anchor").remove();
                            })
                            .fail(function () {
                                data.instance.refresh();
                            });
                })
                .on('copy_node.jstree', function (e, data) {
                    $.get(base_url + '/file_project_question.php?operation=copy_node', {id: data.original.id, parent: data.parent, directory: directory, cache: $.now()})
                            .done(function (d) {
                                data.instance.load_node(data.parent);
                                //  data.instance.refresh();
                                //$("#tree > ul > li > i.jstree-icon").remove();
                                //$("#tree > ul > li > a.jstree-anchor").remove();
                            })
                            .fail(function () {
                                data.instance.refresh();
                            });
                })
                .on('changed.jstree', function (e, data) {
                    if (data && data.selected && data.selected.length) {
                        $.get(base_url + '/file_project_question.php?operation=get_content&id=' + data.selected.join(':'), {directory: directory, cache: $.now()}, function (d) {
                            if (d && typeof d.type !== 'undefined') {
                                $('#data .content').hide();
                                switch (d.type) {
                                    case 'text':
                                    case 'txt':
                                    case 'md':
                                    case 'htaccess':
                                    case 'log':
                                    case 'sql':
                                    case 'php':
                                    case 'js':
                                    case 'json':
                                    case 'css':
                                    case 'html':
                                    case 'py':
                                    case 'pl':
                                    case 'java':
                                    case 'xml':
                                    case 'properties':
                                    case 'gradle':
                                        $('#data .code').show();
                                        $('#body_code').next().remove();

                                        var info = CodeMirror.findModeByExtension(d.type);

                                        mode = info.mode;
                                        spec = info.mime;

                                        var editor = CodeMirror.fromTextArea(document.getElementById('body_code'), {
                                            mode: spec,
                                            lineNumbers: true,
                                            lineWrapping: true,
                                            smartIndent: true
                                        });

                                        editor.setValue(d.content);
                                        CodeMirror.autoLoadMode(editor, mode);

                                        OnChange = function (cm) {
                                            saveContentData(directory, data.node.id, cm.getValue());
                                        };
                                        CodeMirror.on(editor, 'change', $.proxy(OnChange, this));
                                        break;
                                    case 'png':
                                    case 'jpg':
                                    case 'jpeg':
                                    case 'bmp':
                                    case 'gif':
                                        $('#data .image img').one('load', function () {
                                            $(this).css({'marginTop': '-' + $(this).height() / 2 + 'px', 'marginLeft': '-' + $(this).width() / 2 + 'px'});
                                        }).attr('src', d.content);
                                        $('#data .image').show();
                                        break;
                                    default:
                                        $('#data .default').html(d.content).show();
                                        break;
                                }
                            }
                        }
                        );
                    }
                    else {
                        $('#data .content').hide();
                        $('#data .default').html('Select a file from the Directory.').show();
                    }
                });
        function saveContentData(directory, fileName, values) {
            $.ajax({
                type: "POST",
                url: base_url + '/ajax_files/saas_corporate_function.php?action=saveFileProjectData',
                data: {directory: directory, fileName: fileName, values: values},
                dataType: 'json',
                cache: false,
                success: function (data) {

                }
            });
        }

        $('#submitproject').on('click', function () {
            var value = $('.file-project-data').attr('data-value');
            var next_page_count = $("#next_page_count").val();
            $('.disable-before-result input').attr("disabled","disabled");
            
            $.ajax({
                url: base_url + "/ajax_files/saas_candidate_function.php?action=saveCompleteFileProject",
                data: {platform_type: platform_type, invitation_id: encryptToken, category: questionCategory},
                type: 'POST',
                cache: false,
                success: function (data) {
                	$('.disable-before-result input').removeAttr("disabled");
                	
                    if(next_page_count == 'none'){
                         $('#submit-test').modal('show');
                    }else{
                        $('.project-save').modal('show');
                    }
                    $('#check_user_submission').val('Y');
                    $('.submit-complete').removeAttr('data-toggle');
                    $('.submit-complete').removeAttr('data-target');
                }

            });
        });
        $('.download-candidate-code').on('click', function () {

            $.ajax({
                url: base_url + "/ajax_files/saas_corporate_function.php?action=downloadCandidateProject",
                data: {project_dir: directory},
                type: 'POST',
                cache: false,
                success: function (response) {
                    window.location.href = base_url + '/' + directory + '/project.zip';
                }

            });
        });

        $('#download-project').on('click', function () {
            $.ajax({
                url: base_url + "/ajax_files/qrcode_generator.php",
                data: {directory: directory},
                type: 'POST',
                cache: false,
                success: function (response) {
                    $('#model-download-apk .modal-body').html(response);
                }

            });
        });

        $("#tree").on("loaded.jstree", function (e, data) {
            //$("#tree > ul > li > i.jstree-icon").remove();
            //$("#tree > ul > li > a.jstree-anchor").remove();
        });

    };

    $instance.uploadProject = function (season_id, question_id, attempt_id, directory) {
        var file_data = $('#file_upload').prop('files')[0];
        var invitation_id = $('#invitation_id').val();
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('project_dir', directory);
        form_data.append('season_id', season_id);
        form_data.append('question_id', question_id);
        form_data.append('attempt_id', attempt_id);
        form_data.append('invitation_id', invitation_id);
        var webcam_val = $('#webcam_enable').val();
        
        var page_number = $('#next_page_count').val();
        var test_action_url = $('#test_action_url').val(); 
        if(test_action_url != '') {
            var contest_redirect_url = test_action_url;
        }
        
        var question_no = $('#question-controller .questions-list li.current .list-full-module').attr('data-question_no');
        var question_category = $('#question-controller .questions-list li.current .list-full-module').attr('data-question_category');
        
        $('.loader_ajax').show();
        $('.error_msg').remove();
        $.ajax({
            url: base_url + "/ajax_files/saas_corporate_function.php?action=uploadCandidateProject",
            data: form_data,
            type: 'POST',
            processData: false,
            contentType: false,
            cache: false,
            success: function (response) {
                $('.loader_ajax').hide();
         
                if (response.status == 'error') {
                    $("<span class='error_msg'> " + response.file + " </span>").insertAfter(".btn-file");
                }else if(ajax_list) {
                    var modules = 'SaasCandidateQuestionDetail';
                    var params = {
                         question_id : question_id,
                         question_no : question_no,
                         question_category : question_category,
                         invitation_id : invitation_id
                    };
                    Tg_QuestionList.makeAjaxrequestForCoding(params, modules);  
                        $('#upload-zip-file').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
        } else if (response.status == 'success') {
                    $('#upload-zip-file').modal('hide');
                    window.location.reload();
                } else {
                    $("<span class='error_msg'> Could not upload file </span>").insertAfter(".btn-file");
                }

            }

        });
    };

    $instance.fileProjectData = function (questionCategory, encrypt_token, buttonCode) {
        $('.show-response').html('');
        $('#project-status').html('');
        $('.show-response').hide();
        $('#download-project').hide();
        $('.show-status').show();
        $('#project-status').html("");
        if(questionCategory == "javaproject"){
            $('#project-status').html("Running Unit Test...");
        }else{
            $('#project-status').html("Building project...");
        }
        $('.disable-before-result input').attr("disabled","disabled");
        // $('.disable-before-result').addClass("hide");

        var scroll = $("#debug-project-data").offset().top;
        $('html, body').animate({
            scrollTop: scroll - 60
        }, 1000, function () {
        });


        $.ajax({
            url: base_url + "/ajax_files/codeJudgeCompileTest.php",
            data: {action: 'run', buttonCode: buttonCode, language: questionCategory, encrypt_token: encrypt_token},
            type: 'POST',
            cache: false,
            success: function (data) {
                $('.disable-before-result input').removeAttr("disabled");
                // $('.disable-before-result').removeClass("hide");
                var scroll = $("#debug-project-data").offset().top;
                $('html, body').animate({
                    scrollTop: scroll - 60
                }, 1000, function () {
                });

                if ($.trim(data) == '0*||*failure') {
                    $('.show-status').show();
                    $('#project-status').html("Please Retry Again!!");
                    return;
                }
                $('.show-response').html(data.output);
                $('.show-status').show();
                $('#project-status').html(data.iscompiled);
                $('.show-response').show();
                
                if (questionCategory == 'androidproject' && data.iscompiled.includes("Build Success")) {
                    $('#download-project').show();
                }
            }

        });
    };
};


/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Assesment Result Page
 * 
 * Author   : Sebin Baby
 * Created  : 16 August, 2016
 */
Tg_AssesmentResult = new function () {
    var $instance = this;
	
	$instance.init = function () {
		
		$(document).on( 'shown.bs.tab', 'a[href="#analytics-tab-content"]', function (e) {
			var attempt_id = $(this).attr('data-attempt_id');
			$instance.user_result_charts(attempt_id);
		})
		
		$(document).on( 'click', '#analytics_graph_catgeory li a', function (e) {
			var attempt_id = $(this).attr('data-attempt_id');
			$("#analytics_graph_catgeory li").removeClass('active');
			$(this).parent().addClass('active');
			$.post(base_url + '/ajax_files/load_result_analytics.php',{'attempt_id':attempt_id},function(data) {
				var data = data;
				if(data.status=='success'){
					//Marks Distribution 
					var chart = Highcharts.chart('marks-distribution', {
						
						chart: { height: 250 },
						title: { text: '' },
						subtitle: { text: '' },			
						navigation: { buttonOptions: { enabled: false } },
						yAxis: { opposite:false },
						credits: { enabled: false },			
						plotOptions: { 
							column: {
								states: {
									hover: {
										color: '#2d1846'                                                           
									}
								},
								colorByPoint: true,
								colors: data.marks_color_codes,
							}
						},
			
						yAxis: {
							title: {
									text: 'Users',
									/*"textAlign": 'right',
									"rotation": 0,
									x: 0,
									y: -10*/
								},
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								},
								align: 'right'
							},
							min: 0, 
							max: data.max_users_count,
							tickInterval: 1,
							lineColor: '#ffffff',
							lineWidth: 1
						},
					
						tooltip: {
							useHTML: true,
							backgroundColor: null,
							borderWidth: 0,
							shadow: false,
							formatter: function () {					
								if (this.key != this.x) {							
									return '<div style="left:-35px; top:-50px;" class="tooltip top fade in" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+this.y+'</div></div>';
								} else {
									return '<div style="left:-35px; top:-32px;" class="tooltip top fade in" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+this.y+'</div></div>';
								}
							}
						},
						
						xAxis: {
							title: { text: 'Marks' },
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								}
							},
							categories: data.marks_range_keys
						},

						series: [{
							type: 'column',
							dataLabels: {
								enabled: true,
								y: 10,
								formatter: function () {		
									if (this.key != this.x) {					
										return '<div style="line-height:18px; font-size:14px; color:#19171a; font-weight:bold; text-transform:uppercase; bottom:-10px; left:-1px; position:relative;">'+this.key+'</div>';
									}
								}
							},
							data: data.marks_users_count,
							showInLegend: false
						}]
					});				
		
					//Time Spent
					if(data.question_type=='MCQ'){
					var chart = Highcharts.chart('time-spent', {

						chart: { height: 350 },
						title: { text: '' },
						subtitle: { text: '' },	
						navigation: { buttonOptions: { enabled: false } }, 
						credits: { enabled: false },  
						tooltip: { shared: true, crosshairs: true },
						yAxis: {
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								}
							},
							title: { text: 'Time (min)' },
							min: 0, max: data.max_range_time
						},
						xAxis: {
							title: { text: 'Questions' },
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								}
							},
							categories: ['0 - 5', '6 - 10', '11 - 15', '16 - 20', '21 - 25']
						},
			
						legend: {
							itemStyle: {
								color: '#4a4548',
								fontWeight: 'normal',
								fontSize: '14px',
								fontFamily:'lato'
							},
							symbolPadding: 10,
							symbolWidth: 0,
							symbolRadius: 0
						},	

						series: [{
							name: data.user_name+'(min)',
							color: '#d7263d',
							marker : {symbol : 'circle'},
							data: data.user_time
						}, {
							name: 'Average(min)',
							 color: '#4c877f',
							 marker : {symbol : 'circle'},
							data: data.avg_user_time
						},  {
							name: 'Topper(min)',
							 color: '#674c87',
							 marker : {symbol : 'circle' },
							data: data.topper_time
						}]

					});
				}
				}
			});		
			
		});
		
		
		$(document).on( 'shown.bs.tab', 'a[href="#leaderboard-tab-content"], #leaderboard-tab-content .nav-tabs a', function (e) {			
			var leaderboard_type = $(this).attr('data-lbtype');
			if(typeof leaderboard_type == 'undefined' || leaderboard_type == '') { leaderboard_type = 'users'; }
			
			$('a[href="#leaderboard-tab-content"]').attr('data-lbtype', leaderboard_type);
			$instance.load_assessment_leaderboard(leaderboard_type);
		})
		
		$instance.showLeaderboardTab = function(lbtype) {
			$('a[href="#leaderboard-tab-content"]').attr('data-lbtype', lbtype).trigger("click");
			$('#leaderboard-tab-content .nav-tabs li').removeClass('active');
			$('a[href="#'+lbtype+'-content-tab"]').parent('li').addClass('active');
		};

	}

	/*$instance.LeaderboardCustomScroll = function() {
        $.getStylesheet(theme_url + "/custom_scrollbar.min.css")
        $.getScript(theme_url + "/javascript/Custom_Scrollbar.min.js")
            .done(function() {				
				 $(".scroll").mCustomScrollbar({
					theme:"dark-3",
					callbacks:{
						onScroll :function(){
							$instance.onScrollShow(this);
						},
						onTotalScroll:function(){
							$instance.onScrollHide(this);
						}
					}
				 });
            })
            .fail(function() {
                console.log('Scrollbar not loaded');
            })
    };
	
	$instance.onScrollShow = function() {
       $("#active-user-status").show();
    };
	
	$instance.onScrollHide = function() {
       $("#active-user-status").hide();
    };*/
	
	$instance.loadScoreBreakdown = function(season_id,attempt_id){
			//$("#load_score_breakdown").html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();;
			$("#load_score_breakdown").html('').show();;
			$.post(base_url + '/ajax_files/load_result_scorebord.php',{'season_id':season_id,'attempt_id':attempt_id},function(data) {
				if(data){
					$("#load_score_breakdown").html(data);
				}
			});
		
	};
	
	$instance.setCountDown = function(attempt_id, event_name, company_page_url){
					seconds--;
					SD=window.setTimeout( "Tg_AssesmentResult.setCountDown(attempt_id, event_name, company_page_url)", 1000 );
					if (seconds == 0) { 
						window.clearTimeout(SD);		
						var url = base_url+"/codejudge_coding_question_result.php";
						$.post(url,{'attempt_id':attempt_id,'event_name':event_name,'company_page_url':company_page_url},function(data){
							
							data = $.trim(data);
										
							if(data == 'P') { 
								seconds = 2;
								Tg_AssesmentResult.setCountDown();
								//window.location.href = window.location.href;
							} else {
								//$('#result_box').html(data);
								window.clearTimeout(SD);
								window.location.href = window.location.href;
									
							}
						
						});
					
					} 
					
		};
	
	
	//this function is used to load contest Result charts ...Sebin 26-April-2017 

	$instance.user_result_charts = function(attempt_id){		
		$.getScript(theme_url + "/javascript/highcharts.min.js")
		.done(function() {
	
			$.post(base_url + '/ajax_files/load_result_analytics.php',{'attempt_id':attempt_id},function(data) {
				var data = data;
				if(data.status=='success'){
					//Marks Distribution 
					var chart = Highcharts.chart('marks-distribution', {
						
						chart: { height: 250 },
						title: { text: '' },
						subtitle: { text: '' },			
						navigation: { buttonOptions: { enabled: false } },
						yAxis: { opposite:false },
						credits: { enabled: false },			
						plotOptions: { 
							column: {
								states: {
									hover: {
										color: '#2d1846'                                                           
									}
								},
								colorByPoint: true,
								colors: data.marks_color_codes,
							}
						},
			
						yAxis: {
							title: {
									text: 'Users',
									/*"textAlign": 'right',
									"rotation": 0,
									x: 0,
									y: -10*/
								},
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								},
								align: 'right'
							},
							min: 0, 
							max: data.max_users_count,
							tickInterval: 1,
							lineColor: '#ffffff',
							lineWidth: 1
						},
					
						tooltip: {
							useHTML: true,
							backgroundColor: null,
							borderWidth: 0,
							shadow: false,
							formatter: function () {					
								if (this.key != this.x) {							
									return '<div style="left:-35px; top:-50px;" class="tooltip top fade in" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+this.y+'</div></div>';
								} else {
									return '<div style="left:-35px; top:-32px;" class="tooltip top fade in" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+this.y+'</div></div>';
								}
							}
						},
						
						xAxis: {
							title: { text: 'Marks' },
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								}
							},
							categories: data.marks_range_keys
						},

						series: [{
							type: 'column',
							dataLabels: {
								enabled: true,
								y: 10,
								formatter: function () {console.log(data.marks_users_count);		
									if (this.key != this.x) {					
										return '<div style="line-height:18px; font-size:14px; color:#19171a; font-weight:bold; text-transform:uppercase; bottom:-10px; left:-1px; position:relative;">'+this.key+'</div>';
									}
								}
							},
							data: data.marks_users_count,
							showInLegend: false
						}]
					});				
		
					//Time Spent
					if(data.question_type=='MCQ'){
					var chart = Highcharts.chart('time-spent', {

						chart: { height: 350 },
						title: { text: '' },
						subtitle: { text: '' },	
						navigation: { buttonOptions: { enabled: false } }, 
						credits: { enabled: false },  
						tooltip: { shared: true, crosshairs: true },
						yAxis: {
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								}
							},
							title: { text: 'Time (min)' },
							min: 0, max: data.max_range_time
						},
						xAxis: {
							title: { text: 'Questions' },
							labels: {
								style: {
								   color: '#8a858d',
									fontWeight: 'normal',
									fontSize: '12px',
									fontFamily:'lato'
								}
							},
							categories: ['0 - 5', '6 - 10', '11 - 15', '16 - 20', '21 - 25']
						},
			
						legend: {
							itemStyle: {
								color: '#4a4548',
								fontWeight: 'normal',
								fontSize: '14px',
								fontFamily:'lato'
							},
							symbolPadding: 10,
							symbolWidth: 0,
							symbolRadius: 0
						},	

						series: [{
							name: data.user_name+'(min)',
							color: '#d7263d',
							marker : {symbol : 'circle'},
							data: data.user_time
						},  {
							name: 'Average(min)',
							 color: '#4c877f',
							 marker : {symbol : 'circle'},
							data:  data.avg_user_time
						}, {
							name: 'Topper(min)',
							 color: '#674c87',
							 marker : {symbol : 'circle' },
							data: data.topper_time
						}]

					});
				  }
				}
			});		
		})
		.fail(function() {
			console.log('highcharts not loaded');
		});
	};
	
	//this function is used to load average marks distribution chart ...Kuldeep 04-July-2016 
	$instance.avg_marks_distribution = function(average_time_taken, average_time_taken_value){
		
			$('#avg_marks_distribution').highcharts({
					chart: {
						type: 'column'
					},
					title: {
						text: 'Time Taken Analytics'
					},
					subtitle: {
						text: ''
					},
					xAxis: {
						categories: average_time_taken,
						crosshair: true
					},
					yAxis: {
						min: 0,
						title: {
							text: 'Time (Sec) '
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px;color:{series.color};padding:0">{series.name}: {point.key}</span><table>',
						pointFormat: '<td style="padding:0"><b> {point.y} Sec</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						name: 'Time',
						data: average_time_taken_value

					}],
					credits: {
						enabled: false
					},
			});
		
	};
	
	//this function is used to load company participation chart ...Kuldeep 04-July-2016
	$instance.company_participation_chart = function(company_category, comp_participation_value, comp_submission_value){
		
			 $('#company_participation').highcharts({
					chart: {
						type: 'bar'
					},
					title: {
						text: 'Top Number of Submission/Participation From Top Company'
					},
					subtitle: {
						text: ''
					},
					xAxis: {
						categories: company_category,
						title: {
							text: null
						}
					},
					yAxis: {
						min: 0,
						title: {
							text: 'Users ',
							align: 'high'
						},
						labels: {
							overflow: 'justify'
						}
					},
					tooltip: {
						valueSuffix: ' Users'
					},
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true
							}
						}
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'top',
						x: -40,
						y: 80,
						floating: true,
						borderWidth: 1,
						backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
						shadow: true
					},
					credits: {
						enabled: false
					},
					series: [{
						name: 'Company Participation',
						data: comp_participation_value
					}, {
						name: 'Company Submission',
						data: comp_submission_value
					}]
			});
		
	};
	
	//this function is used to load institute participation chart ...Kuldeep 04-July-2016
	$instance.institute_participation_chart = function(institute_category, instt_participation_value, instt_submission_value){
			
			
			$('#institute_participation').highcharts({
					chart: {
						type: 'bar'
					},
					title: {
						text: 'Top Number Of Submission/Participation From Top Institute'
					},
					subtitle: {
						text: ''
					},
					xAxis: {
						categories: institute_category,
						title: {
							text: null
						}
					},
					yAxis: {
						min: 0,
						title: {
							text: 'Users',
							align: 'high'
						},
						labels: {
							overflow: 'justify'
						}
					},
					tooltip: {
						valueSuffix: ' Users'
					},
					plotOptions: {
						bar: {
							dataLabels: {
								enabled: true
							}
						}
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'top',
						x: -40,
						y: 80,
						floating: true,
						borderWidth: 1,
						backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
						shadow: true
					},
					credits: {
						enabled: false
					},
					series: [{
						name: 'Institute Participation',
						data: instt_participation_value
					}, {
						name: 'Institute Submission',
						data: instt_submission_value
					}]
			});
	
	
	};
	$instance.showleaderboard = function(level, season_id, level_season_id,flag_one,click_flag) {
		if(typeof leaderboard_type == 'undefined' || leaderboard_type == '') { leaderboard_type = 'challenge'; }
		var page = $('#page_number').val();		
		if(click_flag=='Y'){
			var page = 1;
		}
				
        var attempt_id = $('#attempt_id').val();
		var attempt_key = $('#attempt_key').val();
		if(typeof attempt_id == 'undefined' || attempt_id == '') { attempt_id = ''; }
		//$('#leaderboard-tab-content').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/load_assessment_leaderboard.php?page=' + page + '&type='+ leaderboard_type + '&season_id='+ season_id +'&level='+level+'&level_season_id='+level_season_id+"&attempt_key="+attempt_key;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(response) {
                data = response.trim();
				$("#leaderboard .tabs2 .nav-tabs > li").removeClass('active');
				$("#leaderboard_"+level).parent().addClass('active');
					 
                if (data.indexOf("no_record") >= 0) {
					$('#leaderboard-tab-content').html('');
					$('#view_all_leaderboard').html('');
					$('#view_all_leaderboard').html('<p> Be the first one to ace the leaderboard </p>');
                } else {
					//alert("#leaderboard_"+level)
					 $('#view_all_leaderboard').html('');
			         $('#view_all_leaderboard').html(data);
			    }
            }
        });

    };
	
	
	$instance.load_assessment_leaderboard = function(leaderboard_type) {
		if(typeof leaderboard_type == 'undefined' || leaderboard_type == '') { leaderboard_type = 'users'; }
		
		var page = $('#page_number').val();				
        var season_id = $('#season_id').val();
        var attempt_id = $('#attempt_id').val();
		if(typeof attempt_id == 'undefined' || attempt_id == '') { attempt_id = ''; }
		//$('#ajax_leaderboard_contest').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
        var action_file_url = base_url + '/ajax_files/load_assessment_leaderboard.php?page=' + page + '&type='+ leaderboard_type + '&season_id='+ season_id + '&attempt_id='+ attempt_id;
        $.ajax({
            type: "POST",
            url: action_file_url,
            data: ({}),
            success: function(response) {
                data = response.trim();
				
                if (data.indexOf("no_record") >= 0) {
					$('#ajax_leaderboard_contest').html('');
					$('#leaderboard-tab-content #users-content-tab').html('<p>Be the first one to ace the leaderboard</p>');    
					//$('<tr class="no_user_display"><td colspan="4">  No users to display. </td> </tr>').insertBefore('.ajax_leaderboard_contest');
                } else {
	                $('#leaderboard-tab-content #users-content-tab').html(data);                    
                }
            }
        });

    };
	
	$instance.compile_own_testcase = function(action, contest_id, encrypt_token, testcase_type, platform_type, language,ques_no){

					try{
						$('#code_result_heading').hide();
						$('#user_compile_code_text').show();
						$('#user_compile_code').hide();
							
						$('#code_result_'+contest_id).html('');
						var code = $('#user_code_'+contest_id).html();
						var own_testcase_input = $('#own_testcase_input'+ques_no).val();
						var url = base_url+"/ajax_files/codeJudgeCompileTest.php";
						$.post(url,{'code':code,'action':action,'contest_id':contest_id, 'language':language, 'encrypt_token':encrypt_token, 'testcase_type':testcase_type,'own_testcase_input':own_testcase_input,'platform_type':platform_type,'source':'resultpage'},function(data){
							//alert(data);
							$('#code_result_heading').show();
							if($.trim(data) == '') {
								$('#code_result_'+contest_id).html('Some Error occured');
							} else {				
								var new_data = $.trim(data);
								var res = new_data.split('*||*');
								if(res[1] == 'failure') {
									$('#code_result_'+contest_id).html('Some technical error has occured.Please try again after some time.');							
								} else if(res[1] == 'timeout') {
									$('#code_result_'+contest_id).html('Contest Timeout.');
								} else {
									$('#code_result_'+contest_id).html(res[1]);							
								}					
							}
							$('#user_compile_code').show();
							$('#user_compile_code_text').hide();

						});
						
					}catch(e){
						alert(e.description);
					}
					
				};
};

/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Assessment Analytics Page
 * 
 * Author   : Sebin Baby
 * Created  : 09 August, 2016
 */

Tg_assessmentAnalytics = new function() {
    var $instance = this;

    $instance.init = function(subtitleText,submission_count,compile_count,not_compile_count,categories_val,all_score_categories,seriesData,all_score_seriesData,city_seriesData,company_seriesData) {
		
		$.getScript(theme_url + "/javascript/highcharts-v1.js")
            .done(function() {
                $('#all_submission_data').highcharts({
					chart: {
						type: 'column'
					},
					title: {
						text: 'Submissions Analytics'
					},
					subtitle: {
						text: 'Test:'+subtitleText
					},
					xAxis: {
						categories: [
							'Solutions submitted',
							'Compile Success',
							'Compile Error'
						],
						crosshair: true
					},
					yAxis: {
						min: 0,
						title: {
							text: 'number of Submissions '
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px;color:{series.color};padding:0">{series.name}: {point.key}</span><table>',
						pointFormat: '<td style="padding:0"><b> {point.y} submissions</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						name: 'Submissions Analytics',
						data: [submission_count, compile_count, not_compile_count]

					}],
					credits: {
						enabled: false
					},
				});

				
				
				
				$('#all_langauge_data').highcharts({
					chart: {
						type: 'column'
					},
					title: {
						text: 'Language Analytics'
					},
					subtitle: {
						text: 'Test:'+subtitleText
					},
					xAxis: {
						categories: categories_val,
						crosshair: true
					},
					yAxis: {
						min: 0,
						title: {
							text: 'number of Submissions '
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px;color:{series.color};padding:0">{series.name}: {point.key}</span><table>',
						pointFormat: '<td style="padding:0"><b> {point.y} submissions</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						name: 'Language',
						data: seriesData

					}],
					credits: {
						enabled: false
					},
				});
				
				
				$('#all_score_analytics').highcharts({
					chart: {
						type: 'column'
					},
					title: {
						text: 'Score Analytics'
					},
					subtitle: {
						text: 'Test:'+subtitleText
					},
					xAxis: {
						categories: all_score_categories,
						crosshair: true
					},
					yAxis: {
						min: 0,
						title: {
							text: 'number of Submissions '
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px;color:{series.color};padding:0">{series.name}: {point.key}</span><table>',
						pointFormat: '<td style="padding:0"><b> {point.y} submissions</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0
						}
					},
					series: [{
						name: 'Score',
						data: all_score_seriesData

					}],
					credits: {
						enabled: false
					},
				});

				
				$('#city_graph').highcharts({
					chart: {
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false,
						type: 'pie'
					},
					title: {
						  text: 'City Analytics'
					},
					 subtitle: {
						text: 'Test:'+subtitleText
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true,
								format: '<b>{point.name}</b>: {point.percentage:.1f} %',
								style: {
									color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
								}
							}
						}
					},
					series: [{
						name: 'City',
						colorByPoint: true,
						data: city_seriesData
					}], credits: {
						enabled: false
					}
				});
				
				
				
				$('#company_graph').highcharts({
					chart: {
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false,
						type: 'pie'
					},
					title: {
						  text: 'Company Analytics'
					},
					 subtitle: {
						text: 'Test:'+subtitleText
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							dataLabels: {
								enabled: true,
								format: '<b>{point.name}</b>: {point.percentage:.1f} %',
								style: {
									color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
								}
							}
						}
					},
					series: [{
						name: 'Company',
						colorByPoint: true,
						data: company_seriesData
					}], credits: {
						enabled: false
					}
				});
            })
            .fail(function() {
                console.log('highcharts not loaded');
            })

    }

};


/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Practice And Code Page
 * 
 * Author   : Sebin Baby
 * Created  : 22 August, 2016
 */

Tg_practiceCode = new function() {
    var $instance = this;
    $instance.seasonVal = "";
    $instance.UrlPath = '';

    $instance.init = function(url_path ,seasonurl) {
		$instance.UrlPath = seasonurl;
		$('[data-toggle="tooltip"]').tooltip();
		
		$(".practice-box  ul").each(function () {
            var LiN = $(this).find('li').length;

            if (LiN >4) {
                $('li', this).eq(3).nextAll().hide().addClass('toggleable');
                $(this).append('<div class="hide-show-buttons"><a href="javascript:void(0);" class="loadMore">View more</a></div>');
            }
        });
        $('ul.term-list').on('click', '.hide-show-buttons', function () {

            if ($(this).hasClass('showLess')) {
                $(this).removeClass('showLess').find('a').text('View more');
            } else {
                $(this).addClass('showLess').find('a').text('View less');
            }

            $(this).siblings('li.toggleable').fadeToggle();

        });
		
		
           /* var loc = window.location.href.split('/');
					var page = loc[loc.length - 1];
					$('#practice-details nav ul li').each(function (i) {
			var href = $(this).attr('id');
					if (href.indexOf(page) !== - 1) {
			$('#practice-details nav ul li.active').removeClass('active');
					$(this).addClass('active');
					return false;
			}
			});*/
//					var $thumbs = $('#practice-details nav ul li').click(function (e) {
//			e.preventDefault();
//					$('#practice-details nav ul li.active').removeClass('active');
//					$(this).addClass('active');
//			});
    };
    /*$(document).on('click','#video-tab', function(){
         $('#page-overlay1').css('display','table');
         $('.box-watch-video').hide();
        var id = $(this).attr('data-val'); 
        var parent_season = $(this).attr('data-season-val');
        var url = base_url+'/practice/' + parent_season + '/' + $instance.UrlPath+"/"+id;
        window.location.href = url;
    });*/

};

/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Client
 * 
 * Author   : Sebin Baby
 * Created  : 31 August, 2016
 */

CustomCompanyLandingPage = new function () {
    $instance = this;
    
    $instance.init = function () {
    $(document).on('click', '.custom-register', function(){
        var seasonId = $(this).attr('data-val');
        $.ajax({
            type: "POST",
            url: base_url + "/ajax_files/saas_corporate_function.php?action=customCompanyCheck",
            data: {season_id:seasonId},
            success: function (value) { 
                var value =value;
                if(value.loggedIn === 'true'){ 
                    if(value.url !== null){
                        window.location.href = value.return_url;
                    }else{
                        $('.msgErrortop .message-box').addClass('error-msg').find('p').text(value.message);
                    }
                }else{ 
                    if(value.platform_type === 'codejudge'){
                        $('.custom-register').addClass('open_modal').removeClass('custom-register');
                        var url = base_url + "/ajax_files/ajax_saas_login_register.php?is_season_url=Y&season_url="+value.season_url;
                        $('.open_modal').attr('href', url).trigger('click');
                    }else{
                        $('.custom-register').addClass('open_modal').removeClass('custom-register');
                        var url = base_url + "/ajax_files/ajax_login_register.php?season_url="+value.season_url;
                        $('.open_modal').attr('href', url).trigger('click');
                    }
                }
            }
        });
        });
    };

};



/***
 * This script is intended to provide all client side functionality 
 * required for Techgig Challenge Details Page
 * 
 * Author   : Sebin Baby
 * Created  : 16 August, 2016
 */

Tg_ChallengeDetailPage = new function() {
    var $instance = this;
	
        $(document).on('click', '.move-to-editor', function(){
            var result_id = $(this).data('result_id');
            var language = $(this).data('language');
            var submittedCode = $('#result_'+result_id).text();
            $('.change-language-confirmation-testcase').val(language).change();
            editor.setValue('');
            setTimeout(function(){ 
                editor.setValue(submittedCode);
                updateUserCode();
                $('#submit_code').show();
            }, 1000);
            
        });
    
	var questionAreaWidth = $('#question-area').innerWidth();
	$("#maxquestion-width").val(questionAreaWidth);
	var editorBoxWidth = $('#editor-box').innerWidth();
	var resizeEditorWidth = 900;
	var resizeEditorWidth1 = 850;
	var resizeEditorWidth2 = 700;
	
	if($(window).width() > 1200){
		resizeEditorWidth = 750
		resizeEditorWidth1 = 650
		resizeEditorWidth2 = 550
	}else if($(window).width() > 992){
		resizeEditorWidth = 600
		resizeEditorWidth1 = 500
		resizeEditorWidth2 = 400
	}
	
	$(document).on('click','#refresh-custom-input' ,function(){
		$('#own_testcase_input').val('');
		$(this).html("Refreshed <i class='pass-icon'></i>");
	});


	//$("#editor-box header").innerWidth($('#editor-box').width() - 18);	
	
	$('#editor-box .editor-controllers > ul > li').on({
		mouseenter: function() {
			$(this).find(".tooltip").show();
		},
		mouseleave: function() {
			$(this).find(".tooltip").hide();
		}
	})
	
	$("#editor-box").addClass("first-view");
	$(document).on("click", ".expanded #editor-box.first-view #editor, .expanded #editor-box.first-view #split-editor, .expanded #editor-box.first-view #front-end .CodeMirror-lines", function() {
		$("#editor-box").removeClass("first-view"); 
		$("#full-screen-question.expanded #question-area").animate({ width : 30 + '%' }, 500);
		$("#full-screen-question.expanded #editor-box").animate({ width : 70 + '%' }, 500);
		
		$("#editor-box .editor-controllers").removeClass("dropdown-mode");	
		$("#editor-box .editor-controllers > ul, #editor-box header .play-vs").show();
		$("#show_owntestcase_btn").show();
		
		if($(window).width() < 767){
			setTimeout(function(){
				if($('#editor-box').width() > resizeEditorWidth){
					$("#question-area").addClass("extra-small-view");
				}else{
					$("#question-area").addClass("extra-small-view");
				}
				
			}, 500); 
		}else {
			setTimeout(function(){
				if($('#editor-box').width() > resizeEditorWidth){
					$("#question-area").addClass("extra-small-view");
					$("#editor-box").addClass("large-view");
					$("#show-tab-lists").css('display','block');
				}else{
					$("#question-area").removeClass("extra-small-view");
					$("#editor-box").removeClass("large-view");
					$("#show-tab-lists").css('display','none');
					$(".tabs1 .nav-tabs").removeAttr("style");	
				}
				
			}, 500); 
		}
		
		
		setTimeout(function(){
			//window.dispatchEvent(new Event('resize'));
			var evt = document.createEvent('UIEvents');
			evt.initUIEvent('resize', true, false, window, 0);
			window.dispatchEvent(evt);
		}, 500);

	});
	
	$("#full-screen-question.expanded #editor-box #editor,#flex-container").css("min-height", $(window).height() - ($("#coding-platform-head").innerHeight() + $("#editor-box header").innerHeight() + $("#editor-box .editor-footer").innerHeight() + 20));
	
	$("#full-screen-question #editor-box #editor.for-split-editors").css("min-height", $(window).height() / 3);

	
	$(window).resize(function() {
		$("#full-screen-question.expanded #editor-box #editor, #flex-container").css("min-height", $(window).height() - ($("#coding-platform-head").innerHeight() + $("#editor-box header").innerHeight() + $("#editor-box .editor-footer").innerHeight() + 20));
		
		$("#full-screen-question #editor-box #editor.for-split-editors").css("min-height", $(window).height() / 3);
	}); 

	$(window).scroll(function() {

		var windowScroll = $(window).scrollTop();
		
		if($("body").hasClass("coding-page")){
			
			if($("#full-screen-question").hasClass("multi-question-view")){
				var topScroll = ($("#coding-platform-head").innerHeight() + $("#question-area").innerHeight() - 5);
			}else{
				var topScroll = ($("#coding-platform-head").innerHeight() + $("#question-area").innerHeight() - 72);
			}
			var topScrollExtra = ($("#coding-platform-head").innerHeight() + $("#question-area").innerHeight() + ($('#editor-box #editor').height() / 1.5) + ($('#editor-box #split-editor').height() / 1.5) + ($('#editor-box #split-tail-editor').height() / 1.5) - 72);
		}else{
			var topScroll = ($("#header").innerHeight() + $(".main-banner").innerHeight() + $("#practice-tutorials .inner-wrap").innerHeight() + 10);
			var topScrollExtra = ($("#header").innerHeight() + $(".main-banner").innerHeight() + $("#practice-tutorials .inner-wrap").innerHeight() + ($('#editor-box #editor').height() / 1.1) + ($('#editor-box #split-editor').height() / 1.1) + ($('#editor-box #split-tail-editor').height() / 1.1));
		}
		
		if($("body").hasClass("codememo-page")){
			var topScroll = ($("#header").innerHeight() + $(".heading1").innerHeight() - 18);
			var topScrollExtra = ($("#header").innerHeight() + $('#editor-box #editor').height() / 1.5);
		}

		if (windowScroll > topScroll) {
		    $('#full-screen-question.normal-view.fixing-editor #editor-box').addClass('fixed');
			$(".bottom-action #compile_code").show();
		} else {
			$('#full-screen-question.normal-view.fixing-editor #editor-box').removeClass('fixed').removeClass('absolute');
			$(".bottom-action #compile_code").hide();
		}
		
		if(windowScroll > topScrollExtra){
			$('#full-screen-question.normal-view.fixing-editor #editor-box').removeClass('fixed').addClass("absolute");
			$(".bottom-action #compile_code").show();
		}else {
			$('#full-screen-question.normal-view.fixing-editor #editor-box').removeClass("absolute");
			$(".bottom-action #compile_code").hide();
		}


    });	
	
	$(document).on("click", "#challenge_edit_profile", function() {
			$("#challenge_edit_profile").hide();
			$("#challenge_save_change").show();
			$("#challenge_profile_view").hide();
			$("#challenge_profile_edit").show();
	});
	
	$(document).on("click", "#studying-here", function() {
		if(document.getElementById('studying-here').checked) {
            
			$("#current_company_id").hide();
            $("#work_level_of_expertises").hide();
			$("#designation_id").hide();
			$("#salary_id").hide();
			$("#roll_number_id").show();
            $("#job_id_change").hide();
            
		} else {
            
            $("#current_company_id").show();
			$("#work_level_of_expertises").show();
			$("#designation_id").show();
			$("#salary_id").show();
			$("#roll_number_id").hide();
            $("#job_id_change").show();
			
		}
	
	});
	
	$(document).on("click", "#show-tab-lists", function() {
		if($(window).width() < 767){
			$(".normal-view .tabs1 .nav-tabs").slideToggle("fast");
		}else{
			$(".extra-small-view .tabs1 .nav-tabs").slideToggle("fast");
		}
	});
	
	$(document).on("click", ".extra-small-view .tabs1 .nav-tabs > li a", function() {
		$("#show-tab-lists").html($(this).html());
		
		if($(window).width() < 767){
			$(".normal-view .tabs1 .nav-tabs").slideUp("fast");
		}else{
			$(".extra-small-view .tabs1 .nav-tabs").slideUp("fast");
		}	
		
	});

	if($(window).width() < 767){
		$(document).on("click", "#common-navigation ul > li a", function() {
			$("#common-navigation ul").slideUp("fast");
		});
	}
	
	$(document).on("click", "#challenge_save_change", function() {
		
		var season_id = $('#profile_token_form #season_id').val();
		$("#profile_token_form .error_msg").remove();
		var first_name = $('#profile_token_form #first_name').val();
		var last_name = $('#profile_token_form #last_name').val();
		var mobile_phone = $('#profile_token_form #mobile_phone').val();
		var exp_yr = $('#profile_token_form #exp_yr').val();
		var city = $('#profile_token_form #city').val();
		var exp_month = $('#profile_token_form #exp_month').val();
		var user_skills = $('#profile_token_form #user_skills').val();
		var key_skills = $('#profile_token_form #key_skills').val();
		first_name = (typeof first_name === "undefined") ? "" : first_name;
		last_name = (typeof last_name === "undefined") ? "" : last_name;
		mobile_phone = (typeof mobile_phone === "undefined") ? "" : mobile_phone;
		exp_yr = (typeof exp_yr === "undefined") ? "" : exp_yr;
		city = (typeof city === "undefined") ? "" : city;
		exp_month = (typeof exp_month === "undefined") ? "" : exp_month;
		key_skills = (typeof key_skills === "undefined") ? "" : key_skills;
		user_skills = (typeof user_skills === "undefined") ? "" : user_skills;
		$('#challenge-details').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/saas_corporate_function.php?action=save_edit_profile';
		//
		$.post(url, {'season_id':season_id,'first_name':first_name,'last_name':last_name,'mobile_phone':mobile_phone,'exp_yr':exp_yr,'city':city,'exp_month':exp_month,'key_skills':key_skills,'user_skills':user_skills}, function(data) {
			 var msg = data;
			
			 if(msg.status == 'success') {
				$("#profile_token_form").submit();
				return true;
			} else if(msg.status == 'error') {
				var result = msg;
				$.each(result, function(k, v) {
					//display the key and value pair 
					if(k=='exp_yr'){
						$("<span class='error_msg'>"+v+"</span>").insertAfter("#profile_token_form #work_experience_div");
					} else if(k=='city'){
						$("<span class='error_msg'>"+v+"</span>").insertAfter("#profile_token_form #city_div");
					} else if(k=='mobile_phone'){
						$("<span class='error_msg'>"+v+"</span>").insertAfter("#profile_token_form #mobile_error_id");
					} else {
						$("<span class='error_msg'>"+v+"</span>").insertAfter("#profile_token_form #"+k);
					}
					
				});
				return false;
			}
		});
		
	});
	
	if($('#editor-box').width() > resizeEditorWidth1 ){
		$("#editor-box .editor-controllers").removeClass("dropdown-mode");	
		$("#show_owntestcase_btn").show();
		$("#editor-box header .play-vs").show();
	} else {
		$("#editor-box .editor-controllers").addClass("dropdown-mode");	
		$("#show_owntestcase_btn").hide();
		$("#editor-box header .play-vs").hide();
	}
	
	
	$('#question-area').resize(function() {
		if ($(window).width() > 767) {
			Tg_CommonFunction.tabLiBorderMove();  
		}
		$("#hide-question-area").removeClass("less");
		$("#question-area").removeClass("hide-contents");
		questionAreaWidth = $('#question-area').innerWidth()* 100 / $(window).innerWidth();
		editorBoxWidth = (100 - questionAreaWidth) + '%';
		questionAreaWidth = questionAreaWidth + '%';
		
		$("#editor-box .editor-controllers.dropdown-mode > ul").removeAttr("style");	
		//$("#editor-box header").innerWidth($('#editor-box').width() - 17);	
		
		//window.dispatchEvent(new Event('resize'));
		var evt = document.createEvent('UIEvents');
		evt.initUIEvent('resize', true, false, window, 0);
		window.dispatchEvent(evt);
		
		if($('#editor-box').width() > resizeEditorWidth1 ){
			$("#editor-box .editor-controllers").removeClass("dropdown-mode");	
			$("#editor-box header .play-vs").show();
			$("#editor-box .editor-controllers.dropdown-mode > ul").removeAttr("style");	
			$("#show_owntestcase_btn").show();
		}else{
			$("#editor-box .editor-controllers").addClass("dropdown-mode");	
			$("#editor-box .editor-controllers.dropdown-mode > ul").hide();
			$("#editor-box header .play-vs").hide();
			$("#editor-box .editor-controllers.dropdown-mode > ul > li").removeClass("open");
			$("#show_owntestcase_btn").hide();
		}
		
		if($('#editor-box').width() > resizeEditorWidth2 ){
			$("#question-area").addClass("small-view");
		}else{
			$("#question-area").removeClass("small-view");
		}
		
		if($('#editor-box').width() > resizeEditorWidth ){
			$("#question-area").addClass("extra-small-view");
			$("#editor-box").addClass("large-view");
			$("#show-tab-lists").css('display','block');
		}else{
			$("#question-area").removeClass("extra-small-view");
			$("#editor-box").removeClass("large-view");
			$("#show-tab-lists").css('display','none');
			$(".tabs1 .nav-tabs").removeAttr("style");	
		}
		
		if($('#question-area').width() < 5 ){
			$("#hide-question-area").addClass("less");
		}else{
			$("#hide-question-area").removeClass("less");
		}

	});
	
	var selectedTab = $(".tabs1 .nav-tabs > li.active a").html();
	
	$("#show-tab-lists").text(selectedTab);
	
	$(document).on("click", "#editor-box .editor-controllers .show-editor-controllers", function() {
		$("#editor-box .editor-controllers.dropdown-mode > ul").toggle();			
	});
	
	$(document).on("click", function(event){
		var $trigger = $("#editor-box .editor-controllers");
		if($trigger !== event.target && !$trigger.has(event.target).length){
			$(this).find("#editor-box .editor-controllers.dropdown-mode > ul").hide();
		}            
	});
	
	/*Challenge Details Tab Code @Naman  9 Jan 2018 starts */
	 $(document).on("click", "#tablist_holder>li > a", function() {
		var dataToSend = {};
		var holder_id;
		var holder_id_href;
		var seasonID;
		var newSeasonID;
		var season_id_val;
		var skipArr = new Array();
		skipArr = ["#leaderboard"];
        $("#tabs_content_holder > div.tab-pane").hide();
        holder_id_href = $.trim($(this).attr('href'));
		seasonID = $.trim($(this).data('season_id'));
		newSeasonID = $.trim($(this).data('new_season_id'));
        holder_id = holder_id_href + "_holder";
        season_id_val = seasonID;
				/* console.log(holder_id_href);
				console.log(skipArr);
				console.log(holder_id);
				console.log($.trim($(holder_id).html()).length);
				console.log(skipArr.indexOf(holder_id_href)); */
        if (skipArr.indexOf(holder_id_href) == -1) {
            var existing_data = $.trim($(holder_id).html());
			//console.log(existing_data.length);
            if(typeof(existing_data)!='undefined' && existing_data.length > 0){
                $(holder_id).show();
                return false;
            }
            var request_for = $.trim($(this).data("request"));
			/* console.log("holder_id======="+holder_id);
			console.log("request_for======="+request_for); */
            if (typeof(request_for) != 'undefined') {
                dataToSend['request_for'] = request_for;
            }
			season_id_val = (typeof season_id_val === "undefined") ? "" : season_id_val;
            dataToSend['season_id'] = season_id_val;
            $(holder_id).show();
            $(holder_id).html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
            var url = base_url + '/ajax_files/ajax_load_challenge_details.php';
			$.ajax({
            type: "POST",
            url: url,
            data: dataToSend,
            success: function(response) {
               $(holder_id).html('');
               $(holder_id).html(response);
            },
			error: function (request, status, error) {
				console.log(request.responseText);
			}
          });
        }
    });
	
   		$(document).on("click", "#challenge_leaderboard", function() {
   		    leaderboard_type = 'challenge';
			if($.trim($('#view_all_leaderboard').html()).length>0){
				 $("#leaderboard,#view_all_leaderboard").show();
				 return;
			}
   		    var page = $('#page_number').val();
   		    var season_id = $('#season_id').val();
   		    var attempt_id = $('#attempt_id').val();
   		    $("#showsubmission").hide();
   		    $("#leaderboard").show();
   		    if (typeof attempt_id == 'undefined' || attempt_id == '') {
   		        attempt_id = '';
   		    }
   		    $('#view_all_leaderboard').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
   		    var action_file_url = base_url + '/ajax_files/load_assessment_leaderboard.php?page=' + page + '&type=' + leaderboard_type + '&season_id=' + season_id + '&attempt_id=' + attempt_id + '&contest_type=coding';
   		    $.ajax({
   		        type: "POST",
   		        url: action_file_url,
   		        data: ({}),
   		        success: function(response) {
   		            data = response.trim();
   		            if (data.indexOf("no_record") >= 0) {
   		                $('#view_all_leaderboard').html('<p> Be the first one to ace the leaderboard.</p>');
   		            } else {
   		                $('#view_all_leaderboard').html(data);
   		            }
   		        }
   		    });
   		});	
	
	$(document).on("click", "#show_submission", function() {
		var season_id = $("#new_season_id").val();
		var existing_data=$.trim($("#view_all_submission").html());
		if(typeof(existing_data)!='undefined' && existing_data.length>0){
			$("#tabs_content_holder > div.tab-pane").hide();
			$("#showsubmission,#view_all_submission").show();
			return;
		}
		$("#tabs_content_holder > div.tab-pane").hide();
		$("#showsubmission,#view_all_submission").show();
		season_id = (typeof season_id === "undefined") ? "" : season_id;
		$('#view_all_submission').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/ajax_load_challenge_details.php';
		$.post(url, {'season_id': season_id,'request_for':'submission'}, function(data) {
			$("#view_all_submission").html('');
			$("#view_all_submission").html(data);
			return false;
			
		});	
	});
	
	/*Challenge Details Tab Code @Naman  9 Jan 2018 ends */
	
	$instance.loadDefaultSubmissionDetails = function(season_id){
	
		$("#leaderboard").hide();
		$("#challenge_details_div").hide();
		$("#showsubmission").show();
		$("#view_all_submission").show();
		season_id = (typeof season_id === "undefined") ? "" : season_id;
		$('#view_all_submission').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/ajax_load_challenge_details.php';
		$.post(url, {'season_id': season_id,'request_for':'submission'}, function(data) {
			$("#view_all_submission").html('');
			$("#view_all_submission").html(data);
			return false;
			
		});	
		
	}
	
	$(document).on("click", "#hide-question-area", function() {

		if($(this).hasClass("less")) {
			$(this).removeClass("less");
			$("#question-area").removeClass("hide-contents");
			$('#question-area').animate({ width : questionAreaWidth }, 500);
			$('#editor-box').animate({ width : editorBoxWidth }, 500);
			//$('#editor-box header').animate({ width : editorBoxWidth - 56 }, 500);
			
		} else { 
			$(this).addClass("less");
			$("#question-area").addClass("hide-contents");
			$('#question-area').animate({ width : (4 + '%') }, 500);
			$('#editor-box').animate({ width : (96 + '%') }, 500);
			//$('#editor-box header').animate ({ width : (91.9 + '%')}, 500);
		} 
		
		$("#editor-box").removeClass("first-view"); 
		
		setTimeout(function(){
			if($('#editor-box').width() > resizeEditorWidth1 ){
				$("#editor-box .editor-controllers").removeClass("dropdown-mode");	
				$("#show_owntestcase_btn").show();
				$("#editor-box .editor-controllers > ul, #editor-box header .play-vs").show();	
			}else{
				$("#editor-box .editor-controllers").addClass("dropdown-mode");	
				$("#editor-box header .play-vs").hide();  
				$("#show_owntestcase_btn").hide();
			}
			if($('#editor-box').width() > resizeEditorWidth ){
				$("#question-area").addClass("extra-small-view");
				$("#editor-box").addClass("large-view");
				$("#show-tab-lists").css('display','block');
			}else{
				$("#question-area").removeClass("extra-small-view");
				$("#editor-box").removeClass("large-view");
				$("#show-tab-lists").css('display','none');
				$(".tabs1 .nav-tabs").removeAttr("style");	
			}
		}, 500);
		
		setTimeout(function(){
			//window.dispatchEvent(new Event('resize'));
			var evt = document.createEvent('UIEvents');
			evt.initUIEvent('resize', true, false, window, 0);
			window.dispatchEvent(evt);
		}, 500);
		
	
	});  
	
	
	$instance.loadDefaultDetails = function() {
		var season_id = $('#season_id').val();
		$("#showsubmission").hide();
		season_id = (typeof season_id === "undefined") ? "" : season_id;
		$('#challenge_details_div').html('<p class="text-center tg-loader"><img src="' + THEME_PATH + '/images/TG-Loader.gif"></p>').show();
		var url = base_url + '/ajax_files/ajax_load_challenge_details.php';
		$.post(url, {'season_id': season_id}, function(data) {
			$("#challenge_details_div").html('');
			$("#challenge_details_div").html(data);
			return false;
			
		});	
		
	} 
	

	$instance.resizeEditor = function(maxQustionWidth) {
		
		var dummyquestionAreaWidth = (typeof maxQustionWidth === "undefined") ? questionAreaWidth : maxQustionWidth;

		$(".half-column").resizable({
			handles: 'e',
			maxWidth: dummyquestionAreaWidth, 
			minWidth: 250,
			resize: function () {
				$('.half-column:first-of-type').css('width', $('.half-column:first-of-type').outerWidth() * 100 / $(window).innerWidth() + '%');
				$('.half-column:nth-of-type(2)').css('width', 100 - ($('.half-column:first-of-type').outerWidth() * 100 / $(window).innerWidth()) + '%');
			}

		});

    };

    
    $instance.setOtherEditorConfig = function(){
            headditor.setOptions({
                maxLines: Infinity,
                minLines: 5,
                readOnly: true,
                highlightActiveLine: false,
                highlightGutterLine: false,
                useWorker: false,
                fontSize: '16px'
            });

            taileditor.setOptions({
                maxLines: Infinity,
                minLines: 5,
                readOnly: true,
                highlightActiveLine: false,
                highlightGutterLine: false,
                useWorker: false,
                fontSize: '16px'
                
        });
        taileditor.$blockScrolling = Infinity;
        taileditor.getSession().foldAll();
        headditor.getSession().foldAll();
        headditor.$blockScrolling = Infinity;
        taileditor.getSession().setMode("ace/mode/javascript");
        headditor.getSession().setMode("ace/mode/javascript");
        
    };
    
    
    $instance.disableCopyPaste = function(){
    
        function disableSelection(target){
            if (typeof target.onselectstart != "undefined") //IE route
                target.onselectstart = function(){return false}
            else if (typeof target.style.MozUserSelect != "undefined") //Firefox route
                target.style.MozUserSelect = "none"
            else //All other route (ie: Opera)
                target.onmousedown = function(){return false}
                target.style.cursor = "default"
        }
        
        function clickIE() {
            if (document.all) {
                $('#submit-error .modal-body').html('Right click disabled');
                $('#submit-error').modal('show');
            }
        }
    
    
        if (document.layers) {
            document.captureEvents(Event.MOUSEDOWN);
            document.onmousedown = clickNS;
        }else {
            document.onmouseup = clickNS;
            document.oncontextmenu = clickIE;
        }
        document.oncontextmenu = new Function("return false");
        disableSelection(document.body);
        
    };
    
    $instance.handleLanguageCursor = function(countDefaultHeadCodeAfterChange){
        
        var cursorPos =  editor.getCursorPosition();
        var mainEditorLength = editor.session.getLength();

        editor.setOption("firstLineNumber", countDefaultHeadCodeAfterChange + 1);
        taileditor.setOption("firstLineNumber", countDefaultHeadCodeAfterChange+mainEditorLength+1);

        $("#RowNum").text(cursorPos.row+countDefaultHeadCodeAfterChange + 1);
        $("#ColsNum").text(cursorPos.column);

        editor.getSession().selection.on('changeCursor', function(e) {
        var cursorPos =  editor.getCursorPosition();

        $("#RowNum").text(countDefaultHeadCodeAfterChange+cursorPos.row+1);
            $("#ColsNum").text(cursorPos.column);
            taileditor.setOption("firstLineNumber", countDefaultHeadCodeAfterChange+cursorPos.row + 1);
        });
    };
    
    $instance.SetEditorValuesOnCodeUpload = function(msg){
        var question_id = $('option:selected', $('.change-language-confirmation-testcase')).attr('question_id');
        var evaluationType = $('option:selected', $('.change-language-confirmation-testcase')).attr('evaluationType');
        var lang_id = $('option:selected', $('.change-language-confirmation-testcase')).attr('lang_id');   
        
        var url = base_url+'/ajax_files/saas_candidate_function.php?action=selectTemplate';
    
        $.ajax({
                type: "POST",
                url: url,
                data: ({'question_id':question_id,'lang_id':lang_id,'evaluationType': evaluationType}),
                success: function(data) {
                    var data = data;
					console.log(data);
                    if($.trim(data.headTemplate) !=='' || $.trim(data.footTemplate) !==''){
                            
                            $instance.setOtherEditorConfig();
                            headditor.setValue(data.headTemplate, 1);
                            taileditor.setValue(data.footTemplate, 1)

                            $(".tail-split-editor").show();$(".tail-split-editor").show();
                            $("#split-editor").show();
                            var headLines = data.headTemplate.split(/\r\n|\r|\n/);
                            var countDefaultHeadCodeAfterChange = headLines.length;

                            var tailLines = data.footTemplate.split(/\r\n|\r|\n/);
                            var countDefaultTailCodeAfterChange = tailLines.length;

                            } else {
                                $("#split-editor").hide();
                                $(".tail-split-editor").hide();

                            }
                            editor.setValue(msg.code, 1);
                            
                            if($.trim(data.headTemplate) !=='' || $.trim(data.footTemplate) !==''){
                                $('#editor').addClass('for-split-editors');
                                var headLines = data.headTemplate.split(/\r\n|\r|\n/);
                                var countDefaultHeadCodeAfterChange = headLines.length;
                                $instance.handleLanguageCursor(countDefaultHeadCodeAfterChange);
                                        
                            } else {
                                $('#editor').addClass('for-split-editors');
                                editor.setOption("firstLineNumber",  1);
                                var headLines = data.middleTemplate.split(/\r\n|\r|\n/);
                                var countDefaultMiddleCodeAfterChange = headLines.length;
                                var cursorPos =  editor.getCursorPosition();

                                $("#RowNum").text(countDefaultMiddleCodeAfterChange);
                                $("#ColsNum").text(cursorPos.column);
                                editor.getSession().selection.on('changeCursor', function(e) {
                                    var cursorPos =  editor.getCursorPosition();
                                    $("#RowNum").text(cursorPos.row+1);
                                    $("#ColsNum").text(cursorPos.column);
                                });

                            }
                            $('#auto-complete').trigger('click');
                            updateUserCode();
                            $instance.setModeFromHash();
                        }
                    });
    };
    
    $instance.init = function(default_selected_language, defaultCode, defaultLanguage, defaultHeadCode, defaultTailCode) {
        
        $(document).on('click', '.save-user-code-diff', function(){
        var encrypt_token = $('#encrypt_token').val();
        var code = editor.getValue();
        $.ajax({
                type: "POST",
                url: base_url + '/ajax_files/saas_corporate_function.php?action=save_user_code_on_click',
                data: {encrypt_token: encrypt_token, code:code},
                dataType: 'json',
                cache: false,
                success: function (data) {
                    $('.saved-code-diff').text(data.cnt)
                    $('.diff-btn').parent().show();
                 }
            });
    });
    
    $(document).on('click', '.get-user-code-diff', function(){
        var encrypt_token = $('#encrypt_token').val();
        $.ajax({
                type: "POST",
                url: base_url + '/ajax_files/saas_corporate_function.php?action=get_user_code_on_click',
                data: {encrypt_token: encrypt_token},
                dataType: 'json',
                cache: false,
                success: function (data) {
               
                    if(data.cnt != 0){
                        $('.saved-code-diff').text(data.cnt)
                        $('.code-compare-elements').find('option').remove();
                        $('.code-compare-elements').append(data.options);
                        $('.diff-btn').parent().show();
                     }else{
                        $('.diff-btn').parent().hide();
                     }
                 }
            });
    });
    
    $(document).on('change', '.code-compare-elements', function(){
        
        var encrypt_token = $('#encrypt_token').val();
        var file_name =  $(".code-compare-elements option:selected" ).val();
        
        $.ajax({
                type: "POST",
                url: base_url + '/ajax_files/saas_corporate_function.php?action=get_user_code_for_diff',
                data: {encrypt_token: encrypt_token,file_name:file_name},
                dataType: 'json',
                cache: false,
                success: function (data) {
                    var practiceDiff = $('#practice-diff-click-btn').val();
                    if(practiceDiff != '1'){
                     var ace_editor2 = ace.edit('ace-editor2');
                     ace_editor2.setValue(data.code);
                    }
                 }
            });
        
    });
    
    $('.get-user-code-diff').trigger('click');
        
        
        $(document).on('click', '.save-compare-change', function(){
            
            var ace_editor1 = ace.edit('ace-editor1');
            var code =  ace_editor1.getValue();
            editor.setValue(code);
            $('.compare-code-full').removeClass('hide');
            $('.compare-code-header').addClass('hide');
            $('#flex-container').addClass('hide-compare');
			
			var maxQustionWidth = $("#maxquestion-width").val();
			Tg_ChallengeDetailPage.resizeEditor(maxQustionWidth);
            
        });
        
        $(document).on('click', '.discard-compare-change', function(){
           
            $('.compare-code-full').removeClass('hide');
            $('.compare-code-header').addClass('hide');
            $('#flex-container').addClass('hide-compare'); 

			var maxQustionWidth = $("#maxquestion-width").val();
			Tg_ChallengeDetailPage.resizeEditor(maxQustionWidth);
            
        });
        
        $(document).on('click', '.diff-btn', function(){
        
         $('.code-compare-elements').find('option').remove();
         $('.get-user-code-diff').trigger('click');
        
        setTimeout(function(){
            var encrypt_token = $('#encrypt_token').val();
            var file_name =  $(".code-compare-elements option:first").val();
            
            $.ajax({
                    type: "POST",
                    url: base_url + '/ajax_files/saas_corporate_function.php?action=get_user_code_for_diff',
                    data: {encrypt_token: encrypt_token,file_name:file_name},
                    dataType: 'json',
                    cache: false,
                    success: function (data) {
                         var practiceDiff = $('#practice-diff-click-btn').val();
                    if(practiceDiff != '1'){
                        var ace_editor2 = ace.edit('ace-editor2');
                        ace_editor2.setValue(data.code);
                    }
                    }
                });
        },500);
            
        var evaluationType = $('option:selected', $('.change-language-confirmation-testcase')).attr('evaluationType');
        var editorBoxWidth = $('#editor-box').innerWidth();
		
        $('.compare-code-full').addClass('hide');
        $('.compare-code-header').removeClass('hide');
		
		$("#full-screen-question.expanded #question-area").animate({ width : 30 + '%' }, 500);
		$("#full-screen-question.expanded #editor-box").animate({ width : 70 + '%' }, 500);
           
            
         var code = editor.getValue();
        var lang = $(".change-language-confirmation-testcase option:selected" ).val();
        var practiceDiff = $('#practice-diff').val();
        if(practiceDiff != 1){
            setTimeout(function(){
            var aceDiffer = new AceDiff({
                    mode: "ace/mode/"+lang,
                    left: {
                        id: "ace-editor1",
                        content: code
                        },
                    right: {
                        id: "ace-editor2",
                        content: ''
                        },
                    classes: {
                        gutterID: "gutter"
                        }
                    });
            },500);
        }
        $('#flex-container').removeClass('hide-compare');
       // $('#flex-container').css('postion','relative').css('top','auto');
		
		setTimeout(function(){
			if($('#editor-box').width() > resizeEditorWidth ){
				$("#question-area").addClass("extra-small-view");
				$("#editor-box").addClass("large-view");
				$("#show-tab-lists").css('display','block');
			}else{
				$("#question-area").removeClass("extra-small-view");
				$("#editor-box").removeClass("large-view");
				$("#show-tab-lists").css('display','none');
				$(".tabs1 .nav-tabs").removeAttr("style");	
			}
		}, 500);
		

        setTimeout(function(){
			var maxQustionWidth = $("#full-screen-question.expanded #question-area").innerWidth();
			//$("#maxquestion-width").val(maxQustionWidth);
			Tg_ChallengeDetailPage.resizeEditor(maxQustionWidth);
			$("#question-area").trigger('resize');
		}, 1000);
		
        });
		
		
		$(document).on('click', '.practice-diff-btn', function(){

        setTimeout(function(){
            var encrypt_token = $('#encrypt_token').val();
            var file_name =  $(".code-compare-elements option:first").val();
            
            $.ajax({
                    type: "POST",
                    url: base_url + '/ajax_files/saas_corporate_function.php?action=get_user_code_for_diff',
                    data: {encrypt_token: encrypt_token,file_name:file_name},
                    dataType: 'json',
                    cache: false,
                    success: function (data) {
                        var practiceDiff = $('#practice-diff-click-btn').val();
                    if(practiceDiff != '1'){
                        var ace_editor2 = ace.edit('ace-editor2');
                        ace_editor2.setValue(data.code);
                    }
                    }
                });
        },500);
            
        var evaluationType = $('option:selected', $('.change-language-confirmation-testcase')).attr('evaluationType');
		
        $('.compare-code-full').addClass('hide');

         var code = editor.getValue();
        var lang = $(".change-language-confirmation-testcase option:selected" ).val();
        var practiceDiff = $('#practice-diff-click-btn').val();
        if(practiceDiff != '1'){
         setTimeout(function(){
        var aceDiffer = new AceDiff({
                mode: "ace/mode/"+lang,
                left: {
                    id: "ace-editor1",
                    content: code
                    },
                right: {
                    id: "ace-editor2",
                    content: ''
                    },
                classes: {
                    gutterID: "gutter"
                    }
                });
         },500);
        }
        $('#flex-container').removeClass('hide-compare');
		
        });
        
        
        $(document).on('change', '.change-language-confirmation-testcase', function(){
            var question_id = $('option:selected', this).attr('question_id');
            var evaluationType = $('option:selected', this).attr('evaluationType');
            var lang_id = $('option:selected', this).attr('lang_id');
            var season_id = $("#season_id").val();            
            var attempt_id = $("#attempt_id").val();            
            var newVal = $(this).val();
            default_selected_language = newVal;
            $("#defaultlanguage").val(newVal);
			
            var url = base_url+'/ajax_files/saas_candidate_function.php?action=selectTemplate';
            
            $.ajax({
                type: "POST",
                url: url,
                data: ({'question_id':question_id,'lang_id':lang_id,'evaluationType': evaluationType,'season_id': season_id,'attempt_id': attempt_id,'language': newVal}),
                success: function(data) {
           
                    var data = data;
                    if($.trim(data.headTemplate) !=='' || $.trim(data.footTemplate) !==''){
                        $instance.setOtherEditorConfig();
                        
                        headditor.setValue(data.headTemplate, 1);
                        taileditor.setValue(data.footTemplate, 1)

                        $(".tail-split-editor").show();$(".tail-split-editor").show();
                        $("#split-editor").show();
                        var headLines = data.headTemplate.split(/\r\n|\r|\n/);
                        var countDefaultHeadCodeAfterChange = headLines.length;

                        var tailLines = data.footTemplate.split(/\r\n|\r|\n/);
                        var countDefaultTailCodeAfterChange = tailLines.length;

                        } else {
                            $("#split-editor").hide();
                            $(".tail-split-editor").hide();

                        }

                        if(data.middleTemplate !==''){
                            editor.setValue(data.middleTemplate, 1);
                            $('#defaultlen').val(data.middleTemplate.length);
                        }

                        if($.trim(data.headTemplate) !=='' || $.trim(data.footTemplate) !==''){
                            $('#editor').addClass('for-split-editors');
                            var headLines = data.headTemplate.split(/\r\n|\r|\n/);
                            var countDefaultHeadCodeAfterChange = headLines.length;
                            $instance.handleLanguageCursor(countDefaultHeadCodeAfterChange);
                                    
                        } else {
                            $('#editor').removeClass('for-split-editors');
                            editor.setOption("firstLineNumber",  1);
                            var headLines = data.middleTemplate.split(/\r\n|\r|\n/);
                            var countDefaultMiddleCodeAfterChange = headLines.length;
                            var cursorPos =  editor.getCursorPosition();

                            $("#RowNum").text(countDefaultMiddleCodeAfterChange);
                            $("#ColsNum").text(cursorPos.column);
                            editor.getSession().selection.on('changeCursor', function(e) {
                                var cursorPos =  editor.getCursorPosition();
                                $("#RowNum").text(cursorPos.row+1);
                                $("#ColsNum").text(cursorPos.column);
                            });

                        }
                        $instance.setModeFromHash();
                        updateUserCode();
                        $('#auto-complete').trigger('click');
                }
            });
        });
        
        
    $('#uploadUserCode').click(function(){
		$('#upload-user-code-attention').modal('hide');
		$('#upload-user-code').modal('show');
	});
	
	$('#uploadUserCodeFile').click(function(){
		//$('#uploadUserCodeFile').val( "Processing..." );
		//$('#uploadUserCodeFile').addClass( "disabled" );
		var encrypt_token = $('#encrypt_token').val();
		var extension = $('#extension').val();
		var language = $('#select-language').val();
		var file_data = $('#code_upload').prop('files')[0];   
		var form_data = new FormData();                  
		form_data.append('file', file_data);
		form_data.append('encrypt_token', encrypt_token);  
		form_data.append('language', language);	
		$('#upload-user-code .alert').remove();
		$('p .alert').remove();
		$.ajax({
				url: base_url+'/ajax_files/saas_candidate_function.php?action=UploadUserCode', 
				dataType: 'text',  // what to expect back from the PHP script, if anything
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,                         
				type: 'post',
				success: function(data){
					var msg = data; 
					if(msg.status == 'success') {
						$( "<span class='alert alert-success left'> "+msg.message+" </span>" ).insertBefore("#uploadUserCodeFile");
						
						$("#modeSelect").find('option').removeAttr("selected");
						 //editor.setValue(msg.code);
						 $('#modeSelect option[value='+msg.language+']').prop('selected', true);
						 $("#defaultlanguage").val(msg.language);
                                            
                         $instance.SetEditorValuesOnCodeUpload(msg);
                         
						 //editor.session.setMode("ace/mode/" + msg.language);
						 setTimeout(function(){$('#upload-user-code').modal('hide');}, 1000);	
					} else {
						$( "<p class='alert alert-info' style='word-break:break-all;'> "+msg.message+" like ("+extension+") </p>" ).insertAfter("#upload-dialogue #uploadUserCodeFile");
						//$('#upload-user-code .alert-info').show();
					}
				}
		 });
	});
    
		$(document).on("click", ".rating1" , function() {
            
            var season_id = $(this).data('season_id');
            var question_id = $(this).data('question_id');
            var attempt_id = $(this).data('attempt_id');
            var user_id = $(this).data('user_id');
            var rating = $('#rating_area .rating1 > ul > li.active').length;
			var url = base_url+'/ajax_files/saas_corporate_function.php?action=submit_rating';
            $.post(url,{'user_id':user_id,'attempt_id':attempt_id,'feedback':'','season_id':season_id, 'question_id':question_id,'rating':rating},function(data) {
		
				});
        });
        $(document).on("click", ".submit-rating-feedback" , function() {
            
            var season_id = $(this).data('season_id');
            var question_id = $(this).data('question_id');
            var attempt_id = $(this).data('attempt_id');
            var user_id = $(this).data('user_id');
            var rating = $('.rating1 > ul > li.active').length;
            var feedback = $.trim($('.feedback-suggestion').val());
            
            var checkedValue = $("[name=improve]:checked").length; 
		checkedValue = $.trim(checkedValue);

                
		$("#deactivate_warning").hide();
		$("#deactivate_error").hide();
		
		var obj = $('input[name=improve]');
		var selectedImproves = '';

		// Loop through all check boxes and prepare string for selected reasons
		for (i = 0; i < obj.length; i++) {
			if (obj[i].type == "checkbox" && obj[i].checked == true) {

				var reason = obj[i].value; 
				if (reason != '') {
					if (selectedImproves == "") {
						selectedImproves = reason;
					} else {
						selectedImproves = selectedImproves + ',' + reason;
					}
				}
			}
            }
            
            
            var url = base_url+'/ajax_files/saas_corporate_function.php?action=submit_rating';
            $.post(url,{'selectedImproves':selectedImproves,'user_id':user_id,'attempt_id':attempt_id,'feedback':feedback,'season_id':season_id, 'question_id':question_id,'rating':rating},function(data) {
		 var data = data;
                    if(data.status == 'success'){
			$('.msgErrortop .message-box').addClass('success-msg').find('p').text(data.msg);
                        Tg_CommonFunction.clearMessage();
                        $('#how-to-improve').modal('hide');
                    }else{
                        $('.msgErrortop .message-box').addClass('error-msg').find('p').text(data.msg);
                        Tg_CommonFunction.clearMessage();
                    }
		});
        });
        
		
		$('.submit-user-feedback').on('click' ,function(){
            var feedback = $.trim($('#feedback').val());
			if(feedback==''){
				$('#feedback').next(".error_msg").show();
			}
			var matches = [];
			$("input[name='rating_criteria[]']:checked").each(function() {
				matches.push(this.value);
			});
			$('#improvement_id').hide();
			$('#feedback').next(".error_msg").hide();
	
			if(matches==''){
				$('#improvement_id').show();
			}
		
            var season_id = $.trim($("#season_id").val());
            var question_id = $.trim($("#question_id").val());
            var attempt_id = $.trim($("#attempt_id").val());
            var user_id = $.trim($("#user_id").val());
		    var rating = $('#rating_area .rating1 > ul > li.active').length;
			
	        if(feedback != '' && matches!=''){
                var url = base_url+'/ajax_files/saas_corporate_function.php?action=submit_user_suggestions';
                $.post(
                        url,{'user_id':user_id,
                            'attempt_id':attempt_id,
                            'feedback':feedback,
                            'season_id':season_id,
                            'question_id':question_id,
                            'rating_criteria':matches,
                            'rating':rating
                        },function(data) {
                    var data = data;
                    if(data.status == 'success'){
						$('#success_msg').show();
						$('#success_msg').html(data.msg);
                        $('#suggest-edits').modal('hide');
						setTimeout(function() {
                            $("#user-feedback-form").hide();
                            }, 2000);
	                 }else{
						$('#success_msg').show();
						$('#success_msg').html(data.msg);
                        $('#suggest-edits').modal('hide');
						setTimeout(function() {
                                $("#user-feedback-form").hide();
                        }, 2000);
						
	                }
		});
            }else{
				
                $('#feedback').next(".error_msg").show();
             	return false;
            }
        });
		
		
	$('.submit-feedback').on('click' ,function(){
            var feedback = $.trim($('.textarea-helpus').val());
            var season_id = $(this).attr('season_id');
            var question_id = $(this).attr('question_id');
            var attempt_id = $(this).attr('attempt_id');
            var user_id = $(this).attr('user_id');
            var rating = $('.rating1 > ul > li.active').length;
            if(feedback != ''){
                var url = base_url+'/ajax_files/saas_corporate_function.php?action=submit_suggestions';
                $.post(
                        url,{'user_id':user_id,
                            'attempt_id':attempt_id,
                            'feedback':feedback,
                            'season_id':season_id,
                            'question_id':question_id,
                            'rating':rating
                        },function(data) {
                    var data = data;
                    if(data.status == 'success'){
			$('.msgErrortop .message-box').addClass('success-msg').find('p').text(data.msg);
                        Tg_CommonFunction.clearMessage();
                        
                        $('#suggest-edits').modal('hide');
                    }else{
                        $('.msgErrortop .message-box').addClass('error-msg').find('p').text(data.msg);
                        Tg_CommonFunction.clearMessage();
                        $('#suggest-edits').modal('hide');
                    }
		});
            }else{
                $('.msgErrortop .message-box').addClass('error-msg').find('p').text("Please provide feedback!!");
                Tg_CommonFunction.clearMessage();
            }
        });
		
		$("#use_custom_input").change(function() {
			if ($("#use_custom_input").is(':checked')) {
				$('.tabs1 .nav-tabs > li > a[href="#custom-input-content"]').tab('show');
				$('.tabs1 .nav-tabs > li > a[href="#custom-input-content"]').parent().removeClass("hide");
			}else{
				$('#own_testcase_input').val('');	
				$('.tabs1 .nav-tabs > li > a[href="#console-content"]').tab('show');
				$('.tabs1 .nav-tabs > li > a[href="#custom-input-content"]').parent().addClass("hide");
			}
		});
		
		$(document).on('click', 'a[href="#custom-input-content"]', function () {
			$("#custom-input-testing").show();
			$('#use_custom_input').prop("checked",true);
		});
		
		$(document).on('click', '#show_owntestcase, #show_owntestcase_btn', function () {
			$("#testcase_status_heading, #code_result_heading, #testcase_status, #code_result").hide(); 
			
			
			$(".user-action-tabs").show();
			$('.user-action-tabs .nav-tabs > li a[href="#custom-input-content"]').tab('show');	
			
			if ($(this).hasClass('show')) {
                $(this).removeClass('show');
				//$('#own_testcase').hide();
            } else {
                $(this).addClass('show');
				//$('#own_testcase').show();
            }


			setTimeout(function(){ 
				var href= "#editor-bottom-move";
				var target=$(href).parents(".mCustomScrollbar"); 
				target.mCustomScrollbar("scrollTo",href);
				$('html, body').animate({scrollTop: $("#editor-main-footer").offset().top - 25}, 1000);
			}, 800);
			 
			 $("#editor-box .editor-controllers.dropdown-mode > ul").hide();
			
		});
		
		$(document).on('click', '.user-action-tabs button.close', function () {
			$(".user-action-tabs").hide();
			$('#own_testcase_input').val('');
			$("#custom-input-testing").hide();
			$('#use_custom_input').prop("checked",false);
			$('.tabs1 .nav-tabs > li > a[href="#custom-input-content"]').parent().addClass("hide");
		});
		
		$(document).on('click', '.timeline-version ul li a', function () {
			$(".timeline-version ul li").removeClass('active');
			$(this).parent().addClass('active');	
			
			if($(this).parent().hasClass("current")){
				$("#delete-buffer").hide();
			}else{
				$("#delete-buffer").show();
			}
		});
		
		var attempt_encrypt_token = $('#encrypt_token').val();
		$instance.loadBufferCode(attempt_encrypt_token);
			
		$(document).on('click', '#delete-buffer', function () {
			$("#delete-buffer-code").modal('show');
			var bufferTargetValue = $(".timeline-version ul li.active a").attr('data-target');
			$("#delete-buffer-code span.buffer-cnt").text(bufferTargetValue);
		});

			
		$(document).on('click', '#create-new-buffer', function () {
			$("#create-buffer").modal('show');
			var bufferTargetValue = $(".timeline-version ul li.active a").attr('data-target');
			$("#create-buffer span.buffer-cnt").text(bufferTargetValue);
			
		});
		
                //auto suggestion display in editor
                $(document).on('click','#auto-complete',function(){
                   
                    var autoCodeEnbaled = $('#auto-complete').is(':checked');
                    if(autoCodeEnbaled == true){
                            editor.setOptions({
                                enableBasicAutocompletion: true,
                                enableSnippets: true
                        });
                    }
                    
                });
                
                
                $(document).on('change','.tab_space',function(){
                   var tabsize =  $(".tab_space option:selected" ).val();
                   
                            editor.setOptions({
                                tabSize: tabsize,
                    });
                    
                });
                
                
		$(document).on('click','.set-original-code',function(){
                var question_id = $(this).attr("question_id");
                var lang_id = $(".change-language-confirmation-testcase option:selected" ).attr('lang_id');
                var evaluationType = $(".change-language-confirmation-testcase option:selected" ).attr('evaluationType');
                var url = base_url+'/ajax_files/saas_candidate_function.php?action=selectTemplate';
                
                $.ajax({
                        type: "POST",
                        url: url,
                        data: ({'question_id':question_id,'lang_id':lang_id, 'evaluationType':evaluationType}),
                        success: function(data) {
                            var response = $.trim(data);
                            var data = response;
                            $("#initial_code").html('');	
                            $("#initial_code").html(data.middleTemplate);	
                            $instance.setModeFromHash();
                            
                            $('textarea').mousedown(function(event) {
                                if(event.which == 3){
                                        var THIS = $(this);
                                        THIS.focus();
                                        THIS.select();
                                        javascript:void(document.oncontextmenu=null);
                                }
                                });
                                $("#user-original-code-attention").modal('show');
                        }
                    });
                
                });
                
        $.getScript(theme_url + "/javascript/bootbox.min.js")
            .done(function() {	
                            
				var evaluation_type = $('#evaluation_type').val();
                                var autoCodeEnbaled = $('#auto-complete').is(':checked');
                                
				//create editor
				//#region not relevant to tern, just some deafults I prefer
                if(typeof editor !== "undefined"){
                    
    				editor.setTheme("ace/theme/xcode");
    				editor.getSession().setUseWrapMode(true);
    				editor.getSession().setWrapLimitRange(null, null);
    				editor.setShowPrintMargin(false);
    				editor.$blockScrolling = Infinity;
    				
                                    var modeVal = "ace/mode/" + defaultLanguage;

    				if(defaultLanguage == 'objc') {
                                        modeVal = "ace/mode/c";
    				} else if (defaultLanguage == 'go') {
                                        modeVal = "ace/mode/golang";
    				}else if (defaultLanguage == 'php7') {
                                        modeVal = "ace/mode/php";
                                    }
                                    editor.session.setMode(modeVal);

    				ace.config.loadModule('ace/ext/tern', function () {
    					editor.setOptions({
    						/**
    						 * Either `true` or `false` or to enable with custom options pass object that
    						 * has options for tern server: http://ternjs.net/doc/manual.html#server_api
    						 * If `true`, then default options will be used
    						 */
    						enableTern: {
    							/* http://ternjs.net/doc/manual.html#option_defs */
    							defs: ['browser', 'ecma5'],
    							/* http://ternjs.net/doc/manual.html#plugins */
    							plugins: {
    								doc_comment: {
    									fullDocs: true
    								}
    							},
                                                    
                                                    switchToDoc: function (name, start) {
                                                                console.log('switchToDoc called but not defined. name=' + name + '; start=', start);
                                                    },
                                                    startedCb: function () {
                                                            //once tern is enabled, it can be accessed via editor.ternServer
                                                            console.log('editor.ternServer:', editor.ternServer);
                                                    }
    						}
    					});
    				});
    				
                                    $('#auto-complete').trigger('click');
                                    
    				//#region not relevant to tern (custom beautify plugin) and demo loading
    				ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
    					editor.setOptions({
    						autoBeautify: true
    					});
    					
    					//modify beautify options as needed:
    					window.beautifyOptions = beautify.options;
    				});
                                    
                                    
                                    
    				editor.setOptions({
    					maxLines: Infinity,
    					minLines: 20,
    					fontSize: '16px',
                                            tabSize: 4,
                                            useSoftTabs: true,
                                            useWorker:true
                                            
    				});
                                    
                                    
    				editor.setValue(defaultCode, 1);

    				if(evaluation_type ==2){

                        if($.trim(defaultHeadCode)) {
                            var headLines = defaultHeadCode.split(/\r\n|\r|\n/);
                            var countDefaultHeadCode = headLines.length;

                            headditor.renderer.$cursorLayer.element.style.display = "none";

                            headditor.setOptions({
                                maxLines: Infinity,
                                minLines: 5,
                                readOnly: true,
                                highlightActiveLine: false,
                                highlightGutterLine: false,
                                useWorker: false,
                                fontSize: '16px'
                            });
                            headditor.setValue(defaultHeadCode, 1);
                            headditor.getSession().foldAll();
                            $("#split-editor").show();
                        }else{
                            $("#split-editor").hide();
                        }
                        if($.trim(defaultTailCode)) {
                            var tailLines = defaultTailCode.split(/\r\n|\r|\n/);
                            var countDefaultTailCode = tailLines.length;
                            taileditor.renderer.$cursorLayer.element.style.display = "none";

                            taileditor.setOptions({
                                maxLines: Infinity,
                                minLines: 5,
                                readOnly: true,
                                highlightActiveLine: false,
                                highlightGutterLine: false,
                                useWorker: false,
                                fontSize: '16px'
                            });
                            taileditor.setValue(defaultTailCode, 1);
                            taileditor.getSession().foldAll();
                            $(".tail-split-editor").show();
                        }else{

                            $(".tail-split-editor").hide();
                        }


                    }

    				//Default
    				var range = editor.getSelectionRange();
    				var Rowscount = range.start;
                    var rowscnt = Rowscount.row;
                    $("#RowNum").text(rowscnt+1);
    				var colscnt = Rowscount.column;
    				$("#ColsNum").text(colscnt+1);
    				
    				//on-change cursor
    				editor.getSession().selection.on('changeCursor', function(e) {
    				var range = editor.getSelectionRange();
    				var Rowscount = range.start;

                    var rowscnt = Rowscount.row;
                    $("#RowNum").text(rowscnt+1);
    				var colscnt = Rowscount.column;
    				
    				$("#ColsNum").text(colscnt+1);
    				$("#code_execute").val(1);

                        if(evaluation_type == 2) {
                            if($.trim(defaultTailCode) && $.trim(defaultHeadCode)) {
                                var cursorPos = editor.getCursorPosition();
                                var mainEditorLength = editor.session.getLength();

                                $("#RowNum").text(cursorPos.row + countDefaultHeadCode + 1);
                                $("#ColsNum").text(cursorPos.column);
                                taileditor.setOption("firstLineNumber", cursorPos.row + countDefaultHeadCode + 2);
                                taileditor.getSession().foldAll();
                                headditor.getSession().foldAll(1, 28);
                            }
                        }
    				});

    				
                    if(evaluation_type ==2){
                        if($.trim(defaultTailCode) && $.trim(defaultHeadCode)) {
                            headditor.session.setMode(modeVal);
                            taileditor.session.setMode(modeVal);

                            headditor.setReadOnly(true);
                            taileditor.setReadOnly(true);

                            var cursorPos = editor.getCursorPosition();
                            var mainEditorLength = editor.session.getLength();

                            editor.setOption("firstLineNumber", countDefaultHeadCode + 1);
                            taileditor.setOption("firstLineNumber", countDefaultHeadCode + mainEditorLength + 1);

                            $("#RowNum").text(cursorPos.row + countDefaultHeadCode + 1);
                            $("#ColsNum").text(cursorPos.column);
                            taileditor.getSession().foldAll();
                            headditor.getSession().foldAll(1, 28);
                        }
                    }
                    
                }
                //editor.setOption("firstLineNumber", headlines);

            })
            .fail(function() {
                console.log('JS not loaded');
            })
		
        
		
    }		
	
	$instance.findTextInsideUrl = function(person){	
		if (window.location.toString().indexOf(person) >= 0) {
			//active tab sample problem
			$('#need-help .nav-tabs li:eq(2)').find('a').trigger('click'); // Select first tab
		} else {
			//nothing
		}
	}
	
	$instance.setModeFromHash = function(){	
		
            var available = [];
            var modeSelect = document.getElementById('modeSelect');
            var evaluation_type = $('#evaluation_type').val();
            for (var i = 0; i < modeSelect.options.length; i++) {
                available.push(modeSelect.options[i].value);
            }
           // var mode = window.location.hash.replace('#', '');
		    var mode = modeSelect.options[modeSelect.selectedIndex].value;
            if (!mode || available.indexOf(mode) === -1) {
                window.location.hash = modeSelect.value;
                $instance.setModeFromHash();
                return;
            }
			
            if (modeSelect.value != mode)
                modeSelect.options[available.indexOf(mode)].selected = true;
			
			if(mode == 'objc') {
				editor.session.setMode("ace/mode/c");
			} else if (mode == 'go') {
				editor.session.setMode("ace/mode/golang");
			} else {
				editor.session.setMode("ace/mode/" + mode);
			}
			  /*           	 	
			 var f = $("#" + mode + "_template").val();
			 editor.setValue(f);
			 //$("#own_testcase").hide();
			 $("#testcase_status_heading").hide();
			 $("#testcase_status").hide();
			 $("#code_result_heading").hide();
			 $("#code_result").hide();
			 if(evaluation_type==2){
				 
				var default_Head_Code = $("#" + mode + "_head_template").val();
			    if(default_Head_Code.replace(/\s/g,"")==''){
					 var headlines = 1;
					 editor.setOption("firstLineNumber", headlines)
				} else {
					var lines = default_Head_Code.split(/\r\n|\r|\n/); 
					var headlines = lines.length+1;
					editor.setOption("firstLineNumber", headlines)
				}	

				editor.on('change', function() { 
					var countlines = editor.session.getLength();
					$instance.setTailFirstLine(countlines);
				});	 

				 
			 } */
	}
	
	$instance.setHeadTailCode = function(countlines){	
	
			var available = [];
            var modeSelect = document.getElementById('modeSelect');
            for (var i = 0; i < modeSelect.options.length; i++) {
                available.push(modeSelect.options[i].value);
            }
        
		    var mode = modeSelect.options[modeSelect.selectedIndex].value;
                  
			var default_Head_Code = $("#" + mode + "_head_template").val();
			var default_Tail_Code = $("#" + mode + "_tail_template").val();
			 
			if(default_Head_Code.replace(/\s/g,"")==''){
				$("#split-editor").hide();
			} else {
				$("#split-editor").show();
			}
			
			if(default_Tail_Code.replace(/\s/g,"")==''){
				$(".tail-split-editor").hide();
			} else {
				$(".tail-split-editor").show();
			}
			
			// Set ace editor-box
			
			
			var headeditor = ace.edit("split-editor");
			headeditor.setTheme("ace/theme/monokai");
			headeditor.getSession().setMode("ace/mode/javascript");
			headeditor.setTheme("ace/theme/xcode");
			
			ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
				headeditor.setOptions({
					autoBeautify: true
				});
				
				//modify beautify options as needed:
				window.beautifyOptions = beautify.options;
			});
			headeditor.renderer.$cursorLayer.element.style.display = "none";
				
			headeditor.setOptions({
				maxLines: Infinity,
				minLines: 5,
				readOnly: true,
				highlightActiveLine: false,
				highlightGutterLine: false,
				useWorker: false,
				fontSize: '16px'
			});
			
			headeditor.setValue(default_Head_Code, 1);
			headeditor.getSession().foldAll(1, 28);
			headeditor.getReadOnly(true);
			var lines = default_Head_Code.split(/\r\n|\r|\n/);
			var headlines = lines.length;
			
			// Call Tail editor
			$instance.setTailFirstLine(countlines);
	}
	
	
	$instance.setTailFirstLine = function(countlines){	
	
			var available = [];
            var modeSelect = document.getElementById('modeSelect');
            for (var i = 0; i < modeSelect.options.length; i++) {
                available.push(modeSelect.options[i].value);
            }
            // var mode = window.location.hash.replace('#', '');
		    var mode = modeSelect.options[modeSelect.selectedIndex].value;
			var default_Head_Code = $("#" + mode + "_head_template").val();
			var default_Tail_Code = $("#" + mode + "_tail_template").val();
			
			var lines = default_Head_Code.split(/\r\n|\r|\n/);
			var headlines = lines.length;    
		
			
			if(default_Tail_Code.replace(/\s/g,"")==''){
				$(".tail-split-editor").hide();
			} else {
				$(".tail-split-editor").show();
			}
			
			var lineNumberTailCounter = countlines+headlines+1;
			
				var taileditor = ace.edit('split-tail-editor');
				taileditor.setTheme("ace/theme/monokai");
				taileditor.getSession().setMode("ace/mode/javascript");
				taileditor.setTheme("ace/theme/xcode");
				taileditor.setOptions({
					maxLines: Infinity,
					minLines: 5,
					readOnly: true,
					highlightActiveLine: false,
					highlightGutterLine: false,
					useWorker: false,
					fontSize: '16px'
				});
				
				ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
					taileditor.setOptions({
						autoBeautify: true
					});
					
					//modify beautify options as needed:
					window.beautifyOptions = beautify.options;
				});
				taileditor.renderer.$cursorLayer.element.style.display = "none";
				taileditor.setValue(default_Tail_Code, 1);
				taileditor.setOption("firstLineNumber", lineNumberTailCounter)
				taileditor.getReadOnly(true);
				taileditor.getSession().foldAll();
				
	
	}
	
//	$instance.setOriginalCode = function(){
//                var question_id=$("")
//                var url = base_url+'/ajax_files/saas_candidate_function.php?action=selectTemplate';
//                $.post(url,{'question_id':question_id,'lang_id':lang_id},function(data) {
//                    var data = data;
//                        $("#initial_code").html('');	
//                        $("#initial_code").html(data.middleTemplate);	
//                        
//                        $('textarea').mousedown(function(event) {
//                            if(event.which == 3){
//                                    var THIS = $(this);
//                                    THIS.focus();
//                                    THIS.select();
//                                    javascript:void(document.oncontextmenu=null);
//                              }
//                            });
//                            $("#user-original-code-attention").modal('show');
//                        });	
//                
//	}
	
	// delete current buffer code
	$instance.deleteCurrentBufferCode = function(){
		
		try {
				var save_for_language = $( "#defaultlanguage" ).val();
				var default_Code = $("#" + save_for_language + "_template").val();
				var current_buffer_id = $(".timeline-version ul li.active a").attr('id');
				var attempt_encrypt_token = $('#encrypt_token').val();
				current_buffer_id = (typeof current_buffer_id === "undefined") ? "" : current_buffer_id;
				
				if(current_buffer_id==''){
					return false;
				}
				
				var url = base_url+'/ajax_files/saas_corporate_function.php?action=delete_user_buffer';
				$.post(url,{'encrypt_token':attempt_encrypt_token,'current_buffer_id':current_buffer_id},function(data) {
					var data = data;
					if(data.status=='success'){
						$instance.loadBufferCode(attempt_encrypt_token);
						$instance.viewBufferCode();
						editor.setValue(default_Code, 1);
						editor.getReadOnly(false);
						
						// load buffer
						$instance.loadBufferCode(attempt_encrypt_token);
						$("#delete-buffer-code").modal('hide');	
						$("#delete-buffer").hide();
					}
					
				});
			
			} catch(e){
				//alert(e.description);
			}
		
	}
	
	
	/*
	* Save code buffer code
	*/
	$instance.showBufferCode = function(bufferStatus){

		try {
		
			var code  = editor.getValue();
			if(!code) {
				return false;
			}
			var save_for_language = $( "#defaultlanguage" ).val();
			var attempt_encrypt_token = $('#encrypt_token').val();
			var contest_current_link = $('#contest_current_link').val();
			var default_Code = $("#" + save_for_language + "_template").val();
			var url = base_url+'/ajax_files/saas_corporate_function.php?action=save_user_buffer';
			$.post(url,{'encrypt_token':attempt_encrypt_token,'code':code,'save_for_language':save_for_language,'contest_current_link':contest_current_link,'buffer_status':bufferStatus},function(data) {
				var data = data;
				if(data.status=='success'){
					// load buffer
					$instance.loadBufferCode(attempt_encrypt_token);
					
					if(bufferStatus=='E'){
						editor.setValue(code, 1);
						$("#create-buffer").modal('hide');			
					} else if(bufferStatus=='N'){
						editor.setValue(default_Code, 1);
						$("#create-buffer").modal('hide');					
					} else if(bufferStatus=='D'){
						("#show_confrim_delete").modal('show');
					}
				}
				
			});
		
		}catch(e){
			//alert(e.description);
		}

		
	}
	
	/*
	* Save code buffer code
	*/
	$instance.loadBufferCode = function(attempt_encrypt_token){

		try {
			
			var save_for_language = $( "#defaultlanguage" ).val();
			var contest_current_link = $('#contest_current_link').val();
			var default_Code = $("#" + save_for_language + "_template").val();
			var url = base_url+'/ajax_files/saas_corporate_function.php?action=load_buffer_snapshot';
			$.post(url,{'encrypt_token':attempt_encrypt_token,'save_for_language':save_for_language,'contest_current_link':contest_current_link},function(data) {
				var data = data;
				if(data.status=='success'){
					$('#show_buffer_div').toggle().html(data.buffer_slot);
				}
			});
		
		}catch(e){
			//alert(e.description);
		}
	}
	$instance.viewLatestBufferCode = function(encrypt_token){
        
        var url = base_url+'/ajax_files/saas_corporate_function.php?action=get_user_code';
			$.post(url,{'encrypt_token':encrypt_token},function(data) {
				var data = data;
				editor.setValue(data.code, 1);
				editor.setOptions({ readOnly: false });
			});
        
    };
	/*
	* view code buffer code
	*/
	$instance.viewBufferCode = function(bufferid){
		
		try {
			var save_for_language = $( "#defaultlanguage" ).val();
			var attempt_encrypt_token = $('#encrypt_token').val();
			var contest_current_link = $('#contest_current_link').val();
			var available = [];
            var modeSelect = document.getElementById('modeSelect');
            for (var i = 0; i < modeSelect.options.length; i++) {
                available.push(modeSelect.options[i].value);
            }
			
			var default_Code = $("#" + save_for_language + "_template").val();
			bufferid = (typeof bufferid === "undefined") ? "" : bufferid;
			if(bufferid==''){
				var code  = editor.getValue();
                $instance.viewLatestBufferCode(attempt_encrypt_token);
				$('#current_buffer_div').html('<strong>Current Buffer</strong><small> (saved locally, editable)</small>');
                $('.change-language-confirmation').prop('disabled', false);
				return false;
			}
			
			var bufferNo = $("#buffer_count_"+bufferid).val();
			bufferNo = (typeof bufferNo === "undefined") ? "" : bufferNo;
			var url = base_url+'/ajax_files/saas_corporate_function.php?action=view_buffer_snapshot_code';
			$.post(url,{'encrypt_token':attempt_encrypt_token,'save_for_language':save_for_language,'contest_current_link':contest_current_link,'buffer_id':bufferid},function(data) {
				var data = data;
				if(data.status=='success'){
                    $('.change-language-confirmation').prop('disabled', 'disabled');
					var current_language = data.language;
					current_language = (typeof current_language === "undefined") ? "" : current_language;
					if (modeSelect.value != current_language && current_language!=''){
						modeSelect.options[available.indexOf(current_language)].selected = true;
					}
					var head_default_Code = $("#" + data.language + "_head_template").val();
					var tail_default_Code = $("#" + data.language + "_tail_template").val();

					// Set head block
					if(head_default_Code){
						$("#split-editor").show();
						var headeditor = ace.edit("split-editor");
						headeditor.setValue(head_default_Code, 1);
						headeditor.setOptions({ readOnly: true });	
                        
					}
					
					// Set Body block
					editor.setValue(data.buffer_code, 1);
					editor.setOptions({ readOnly: true });

					// Set Tail block
                    if(tail_default_Code){
						$(".tail-split-editor").show();
						taileditor.setValue(tail_default_Code, 1);
						taileditor.setOptions({ readOnly: true });	
					}
					
					
					$('#current_buffer_div').html('<strong>Buffer #'+bufferNo+'</strong> (saved on cloud, read-only)');
				}
			});
		
		}catch(e){
			//alert(e.description);
		}
	}
	
	
};


Tg_QuestionList = new function() {
    var $instance = this;
    $instance.init = function () {
        setTimeout(function(){ 
            $('.list-full-module').first().trigger("click");
        }, 200);
        
        
        $(document).on('click','.list-full-module' ,function(){
            
            var question_id = $(this).data('question_id');
            var question_no = $(this).data('question_no');
            var question_category = $(this).data('question_category');
            var invitation_id = $(this).data('token');
            $(".questions-list li").removeClass('current');
            $("#listing_number_"+question_no).parent().addClass('current');
            
            /* $('html, body').animate({
                scrollTop: $("#coding-content-area").offset().top - 46
            }); */
            
            //Close submit code pop up modal of coding, approximate, bot type question
			$('#code-submit-popup').modal('hide');

			$("html, body").animate({ scrollTop: 0 }, 100);
            
            

                    
            var params = {};
            var modules = 'SaasCandidateQuestionDetail';
            params.question_id = question_id;
            params.question_no = question_no;
            params.question_category = question_category;
            params.invitation_id = invitation_id;
            $instance.makeAjaxrequestForCoding(params, modules);  
        });
    };
    
    $instance.makeAjaxrequestForCoding = function(parameter, modules){
        
        var me = $(this);
        //e.preventDefault();

        if ( me.data('requestRunning') ) {
            console.log('same request');
            return;
        }

        me.data('requestRunning', true);
            
        $.ajax({
            type: "POST",
            url: base_url + "/ajax_files/load_question_module.php",
            data: {params: parameter, modules: modules},
            dataType: 'html',
            cache: false,
            success: function (data) {
                $('#coding-content-area').html('');
                $('#coding-content-area').html(data);

                $("#listing_number_"+parameter.question_no).parent().parent().parent().parent().collapse('show');
				$(".questions-list li").removeClass('current');
				$("#listing_number_"+parameter.question_no).parent().addClass('current');
            
                //$('#accordion .panel-collapse.in').collapse('hide');
                 //var parent_accordian = $("#listing_number_"+parameter.question_no).parents('.collapse.in');
                // $('.collapse.in').not(parent_accordian).collapse('hide');
                 
				  $('[data-toggle="tooltip"]').tooltip();
     
                 setTimeout(function(){ 

                    var check_category_count = $('#question-controller .panel-default').length;
                    var check_category_li_count = $("#listing_number_"+parameter.question_no).parents("ul").find("li").length;
					
                    if(check_category_li_count > 6){
						$('#question-controller .scroll').mCustomScrollbar('scrollTo', $("#listing_number_"+parameter.question_no).parent());
					}else if(check_category_count > 0){
                        $('#question-controller .scroll').mCustomScrollbar('scrollTo', $("#listing_number_"+parameter.question_no).parents('.collapse.in'));
                    }else{
						$('#question-controller .scroll').mCustomScrollbar('scrollTo', $("#listing_number_"+parameter.question_no).parent());
					}
                }, 400);
                
                
            },
            complete: function() {
                me.data('requestRunning', false);
            }
        });
    };
};