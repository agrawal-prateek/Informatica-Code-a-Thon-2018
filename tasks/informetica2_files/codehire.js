
function show_instructions(id) {
    $('#' + id).show();
}
function hide_popup_box(id) {
    if ((id == undefined) || (id == '')) {
        $("#instructions_data, #save_info_box").hide();
    } else {
        $("#" + id).hide();
    }
}

function save_user_info(each_season_id) {

    var official_email_id = $('#official_email_id_' + each_season_id).val();
    var resend = $('#resend_' + each_season_id).val();
    var contest_name = $('#contest_name_' + each_season_id).val();
    var link = $('#link_' + each_season_id).val();
    var company_name = $('#company_name_' + each_season_id).val();
    var level = $('#level_' + each_season_id).val();
    var domain_name = $.trim($('#company_domain_' + each_season_id).val());

    if (official_email_id == '') {
        alert('Please enter your official email id');
        return false;
    }

    var split_email = official_email_id.split('@');
    var split_ext = domain_name.split(',');

    // company domain name validation		
    if (split_ext.indexOf(split_email[1]) == -1) {
        alert('Please enter correct official email id');
        return false;
    }



    $('#instructions_official_' + each_season_id).html('<div style="text-align:center;padding:30px 0;">Loading <img src="' + THEME_PATH + '/images/loadingAnimation.gif" align="absmiddle" /></div>');

    var url = base_url + "/ajax_files/save_user_verification_info.php";
    $.post(url, {'official_email_id': official_email_id, 'resend': resend, 'season_id': each_season_id, 'contest_name': contest_name, 'link': link, 'level': level}, function (data) {
        if (data.length > 0) {
            if ($.trim(data) == 'success') {
                $('#instructions_official_' + each_season_id).html('<a href="javascript:void(0);" class="close-btn" onclick="javascript:hide_popup_box(\'save_info_box_' + each_season_id + '\');"></a><span style="color:#2e8403;font-size: 20px;" class="thnksMsg"><br/><br/>Thanks for providing us your information.</span><br/><br/> <span style="font-weight:normal;">We have sent you a confirmation mail. Please click on the link in the mail to proceed further.</span>');
            } else {
                alert('Some error occured');
            }

        }
    });


}

function proceed_test(content_id, is_season_id) {

    if ($("#mobile_no_" + content_id).val() != undefined) {
        var user_mobile_no = $("#mobile_no_" + content_id).val();

        if (user_mobile_no == '') {
            alert("Please enter phone number.");
            return false;
        }
        if (isNaN(user_mobile_no)) {
            alert("Please enter numeric value.");
            return false;
        }
        if (user_mobile_no.length != 10) {
            alert("Please enter 10 digit valid mobile number.");
            return false;
        }
        $("#user_mobile_no").val(user_mobile_no);
    }
    // Start By Nirbhav
    if ($('#share_info').is(':checked')) {
        $("#share_info_details").val('Y');
    } else {
        $("#share_info_details").val('N');
    }
    // End By Nirbhav
    $("#content_id").val(content_id);
    $("#is_season_id").val(is_season_id);
    $("#News_TB_overlay, #coding_instructions").remove();
    $("#launch_test_form").submit();
    return true;
}
function check_alert(type, content_id) {
    if (type == 'yes') {
        $("#yes_job_alert_" + content_id).val('1');
        $("#user_job_alert").val('1');
        $("#no_job_alert_" + content_id).val('0');
        $("#no_job_alert_" + content_id).attr('checked', false);
    } else {
        $("#yes_job_alert_" + content_id).val('0');
        $("#user_job_alert").val('0');
        $("#no_job_alert_" + content_id).val('1');
        $("#yes_job_alert_" + content_id).attr('checked', false);
    }
}

$(function () {

    $(".cc-cont-grid").hover(function () {
        $(this).find(".cc-cont-options").show();
    }, function () {
        $(this).find(".cc-cont-options").hide();
    });


    $(".skl-tip").hover(function () {
        $("#skl_score_tooltip").show().css({top: $(this).offset().top + 30 + "px", left: $(this).offset().left + "px"});
    }, function () {
        $("#skl_score_tooltip").hide();
    });

});

function change_tab(type) {
    $('#' + previous_tab + '_data').hide();
    $('#' + previous_tab + '_pagination').hide();
    $('#' + previous_tab).removeClass();

    $('#' + type + '_data').show();
    $('#' + type + '_pagination').show();
    $('#' + type).addClass('sltd');

    previous_tab = type;

}

function sort_recent_users_landing(pages, sort_by, order_id, content_id, is_season_id, language) {
    var order_by = $('#' + order_id).val();
    if (order_id == 'recent_submitted_order') {
        $('#recent_marks_col').removeClass();
        if (order_by == 'ASC') {
            $('#' + order_id).val('DESC');
            $('#recent_submitted_col').addClass('up-arrow-sl');
        } else if (order_by == 'DESC') {
            $('#' + order_id).val('ASC');
            $('#recent_submitted_col').removeClass();
            $('#recent_submitted_col').addClass('dn-arrow-sl');
        }
    } else if (order_id == 'recent_marks_order') {
        $('#recent_submitted_col').removeClass();
        if (order_by == 'ASC') {
            $('#' + order_id).val('DESC');
            $('#recent_marks_col').addClass('up-arrow-sl');
        } else if (order_by == 'DESC') {
            $('#' + order_id).val('ASC');
            $('#recent_marks_col').removeClass();
            $('#recent_marks_col').addClass('dn-arrow-sl');
        }
    }

    var pages_url = new Array(pages);
    for (var page_no = 1; page_no <= pages; page_no++) {
        pages_url[page_no - 1] = base_url + '/ajax_files/assessment_recent_activity.php?page_no=' + page_no + '&file_name=' + file_name + '&sort_by=' + sort_by + '&order_by=' + order_by + '&content_id=' + content_id + '&is_season_id=' + is_season_id + '&language=' + language;
    }

    var recent = {
        pages: pages_url,
        selectedpage: 0
    };

    var recent_users = new ajaxpageclass.createBook(recent, "recent_users", ["recent_pagination"]);
}

function sort_overall_skill_scorers_users(pages, skill_id, sort_by, order_id) {
    var order_by = $('#' + order_id).val();
    if (order_id == 'overall_skill_rank_order') {
        $('#tq_col').removeClass();
        if (order_by == 'ASC') {
            $('#' + order_id).val('DESC');
            $('#rank_col').addClass('up-arrow-sl');
        } else if (order_by == 'DESC') {
            $('#' + order_id).val('ASC');
            $('#rank_col').removeClass();
            $('#rank_col').addClass('dn-arrow-sl');
        }
    } else if (order_id == 'overall_skill_tq_order') {
        $('#rank_col').removeClass();
        if (order_by == 'ASC') {
            $('#' + order_id).val('DESC');
            $('#tq_col').addClass('up-arrow-sl');
        } else if (order_by == 'DESC') {
            $('#' + order_id).val('ASC');
            $('#tq_col').removeClass();
            $('#tq_col').addClass('dn-arrow-sl');
        }
    }
    var pages_url = new Array(pages);
    for (var page_no = 1; page_no <= pages; page_no++) {
        pages_url[page_no - 1] = base_url + '/ajax_files/assessment_top_scorers.php?page_no=' + page_no + '&skill_id=' + skill_id + '&sort_by=' + sort_by + '&order_by=' + order_by;
    }

    var overall_skill_scorers = {
        pages: pages_url,
        selectedpage: 0
    };

    var overall_skill_scorers_users = new ajaxpageclass.createBook(overall_skill_scorers, "overall_skill_scorers_users", ["overall_skill_scorers_pagination"]);
}

function change_skill(skill_id, type, language) {
    var loading_img_path = skin_path + '/images/preloader-rectpic.gif';
    if (type == 'tq') {
        $('#overall_skill_scorers_all_data').html("<img src=" + loading_img_path + ">");
        $("#overall_skill_scorers_all_data").load(base_url + "/ajax_files/assessment_skillwise_tq.php?skill_id=" + skill_id);
    } else if (type == 'recent') {
        $('#recent_scorers_all_data').html("<img src=" + loading_img_path + ">");
        $("#recent_scorers_all_data").load(base_url + "/ajax_files/assessment_skillwise_recent_scores.php?skill_id=" + skill_id + "&file_name=" + file_name + '&language=' + language);
    }
}

function sort_coding_scorers_users(pages, skill_id, sort_by, order_id) {
    var order_by = $('#' + order_id).val();
    if (order_id == 'coding_marks_order') {
        if (order_by == 'ASC') {
            $('#' + order_id).val('DESC');
            $('#coding_marks_col').addClass('up-arrow-sl');
        } else if (order_by == 'DESC') {
            $('#' + order_id).val('ASC');
            $('#coding_marks_col').removeClass();
            $('#coding_marks_col').addClass('dn-arrow-sl');
        }
    }
    var pages_url = new Array(pages);
    for (var page_no = 1; page_no <= pages; page_no++) {
        pages_url[page_no - 1] = base_url + '/ajax_files/assessment_top_scorers.php?page_no=' + page_no + '&is_season_id=Y&skill_id=' + skill_id + '&sort_by=' + sort_by + '&order_by=' + order_by;
    }

    var coding_scorers = {
        pages: pages_url,
        selectedpage: 0
    };

    var coding_scorers_users = new ajaxpageclass.createBook(coding_scorers, "coding_scorers_users", ["coding_scorers_pagination"]);
}

function sort_top_scorers_users(pages, content_id, is_season_id, sort_by, order_id, order_by, skill_count, skill) {

    $('#toppers_link_' + previous_toppers_class).removeClass();
    $('#toppers_link_' + content_id).addClass('sltd');
    $('#top_scorers_heading_' + previous_toppers_class).hide();
    $('#top_scorers_heading_' + content_id).show();
    if (skill == '') {
        $('#tech_leader_count').html('No. of records found :' + skill_count);
    } else {
        $('#tech_skill_score_count').html('No. of records found in ' + skill + ': ' + skill_count);
    }
    previous_toppers_class = content_id;

    if (order_by == '' || order_by == undefined) {
        order_by = $('#' + order_id).val();
    }
    if (order_id == 'top_scorers_marks_order_' + content_id) {
        if (order_by == 'ASC') {
            $('#' + order_id).val('DESC');
            $('#top_scorers_marks_col_' + content_id).addClass('up-arrow-sl');
        } else if (order_by == 'DESC') {
            $('#' + order_id).val('ASC');
            $('#top_scorers_marks_col_' + content_id).removeClass();
            $('#top_scorers_marks_col_' + content_id).addClass('dn-arrow-sl');
        }
    }

    var pages_url = new Array(pages);
    for (var page_no = 1; page_no <= pages; page_no++) {
        pages_url[page_no - 1] = base_url + '/ajax_files/assessment_top_scorers.php?page_no=' + page_no + '&content_id=' + content_id + '&is_season_id=' + is_season_id + '&sort_by=' + sort_by + '&order_by=' + order_by;
    }

    var top_scorers = {
        pages: pages_url,
        selectedpage: 0
    };

    var top_scorers_users = new ajaxpageclass.createBook(top_scorers, "top_scorers_users", ["top_scorers_pagination"]);
}

function sort_overall_scorers_users(pages, skill_id, sort_by, order_id, order_by, skill_count) {

    $('#overall_toppers_link_' + previous_overall_toppers_class).removeClass();
    $('#overall_toppers_link_' + skill_id).addClass('sltd');
    $('#overall_scorers_heading_' + previous_overall_toppers_class).hide();
    $('#overall_scorers_heading_' + skill_id).show();
    $('#tech_skill_count').html('No. of records found :' + skill_count);

    previous_overall_toppers_class = skill_id;

    if (order_by == '' || order_by == undefined) {
        order_by = $('#' + order_id).val();
    }
    if (order_id == 'overall_skill_rank_order_' + skill_id) {
        $('#tq_col_' + skill_id).removeClass();
        if (order_by == 'ASC') {
            $('#' + order_id).val('DESC');
            $('#rank_col_' + skill_id).addClass('up-arrow-sl');
        } else if (order_by == 'DESC') {
            $('#' + order_id).val('ASC');
            $('#rank_col_' + skill_id).removeClass();
            $('#rank_col_' + skill_id).addClass('dn-arrow-sl');
        }
    } else if (order_id == 'overall_skill_tq_order_' + skill_id) {
        $('#rank_col_' + skill_id).removeClass();
        if (order_by == 'ASC') {
            $('#' + order_id).val('DESC');
            $('#tq_col_' + skill_id).addClass('up-arrow-sl');
        } else if (order_by == 'DESC') {
            $('#' + order_id).val('ASC');
            $('#tq_col_' + skill_id).removeClass();
            $('#tq_col_' + skill_id).addClass('dn-arrow-sl');
        }
    }

    var pages_url = new Array(pages);
    for (var page_no = 1; page_no <= pages; page_no++) {
        pages_url[page_no - 1] = base_url + '/ajax_files/assessment_top_scorers.php?page_no=' + page_no + '&skill_id=' + skill_id + '&sort_by=' + sort_by + '&order_by=' + order_by;
    }

    var overall_top_scorers = {
        pages: pages_url,
        selectedpage: 0
    };

    var overall_scorers_users = new ajaxpageclass.createBook(overall_top_scorers, "overall_scorers_users", ["overall_scorers_pagination"]);
}

function sort_recent_users(pages, content_id, is_season_id, sort_by, order_id, order_by, skill_count, skill) {

    $('#recent_link_' + previous_recent_class).removeClass();
    $('#recent_link_' + content_id).addClass('sltd');
    $('#recent_heading_' + previous_recent_class).hide();
    $('#recent_heading_' + content_id).show();
    if (skill == '') {
        $('#tech_recent_count').html('No. of records found : ' + skill_count);
    } else {
        $('#tech_skill_result_count').html('No. of records found in ' + skill + ': ' + skill_count);
    }
    previous_recent_class = content_id;

    if (order_by == '' || order_by == undefined) {
        order_by = $('#' + order_id).val();
    }
    if (order_id == 'recent_marks_order_' + content_id) {
        $('#recent_submitted_col_' + content_id).removeClass();
        $('#recent_marks_col_' + content_id).removeClass();
        if (order_by == 'ASC') {
            $('#' + order_id).val('DESC');
            $('#recent_marks_col_' + content_id).addClass('up-arrow-sl');
        } else if (order_by == 'DESC') {
            $('#' + order_id).val('ASC');
            $('#recent_marks_col_' + content_id).removeClass();
            $('#recent_marks_col_' + content_id).addClass('dn-arrow-sl');
        }
    } else if (order_id == 'recent_submitted_order_' + content_id) {
        $('#recent_marks_col_' + content_id).removeClass();
        $('#recent_submitted_col_' + content_id).removeClass();
        if (order_by == 'ASC') {
            $('#' + order_id).val('DESC');
            $('#recent_submitted_col_' + content_id).addClass('up-arrow-sl');
        } else if (order_by == 'DESC') {
            $('#' + order_id).val('ASC');
            $('#recent_submitted_col_' + content_id).removeClass();
            $('#recent_submitted_col_' + content_id).addClass('dn-arrow-sl');
        }
    }

    var pages_url = new Array(pages);
    for (var page_no = 1; page_no <= pages; page_no++) {
        pages_url[page_no - 1] = base_url + '/ajax_files/assessment_recent_activity.php?page_no=' + page_no + '&content_id=' + content_id + '&is_season_id=' + is_season_id + '&file_name=' + file_name + '&sort_by=' + sort_by + '&order_by=' + order_by;
    }

    var recent = {
        pages: pages_url,
        selectedpage: 0
    };

    var recent_users = new ajaxpageclass.createBook(recent, "recent_users", ["recent_pagination"]);
}
function get_certificates(skill_id) {
    var url = base_url + "/ajax_files/assessment_get_result.php";
    $.post(url, {'action': 'certificates', 'skill_id': skill_id}, function (data) {
        if (data.length > 0) {
            data.trim();
            if (data != 0) {
                var all_info = data.split(",");
                var certificate_url = base_url + "/assessment_certificate.php?rank=" + all_info[0] + "&skill=" + all_info[1];
                var myWindow = window.open("", "", "width=700, height=600, scrollbars=yes");
                $.get(certificate_url, function (my_var) {
                    myWindow.document.write(my_var);
                });
            }
        }
    });
}
function get_certificates_paper(attempt_id) {
    var url = base_url + "/ajax_files/assessment_get_result.php";
    $.post(url, {'action': 'percent', 'attempt_id': attempt_id}, function (data) {
        var details = data.split(",");
        if (parseInt(details[0]) != 0) {
            var certificate_url = base_url + "/assessment_certificate.php?percent=" + details[0] + "&title=" + details[1];
            var myWindow = window.open("", "", "width=700, height=600, scrollbars=yes");
            $.get(certificate_url, function (my_var) {
                myWindow.document.write(my_var);
            });
        }
    });
}
function isEmpty(str) {
    return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null;
}

$(document).on('click', '.view-more-click', function () {

    var params = {};
    var modules = '';
    var clickedItem = '';
    params.season_id = $(this).attr('data-val');
    params.question_id = $('#question_submit_id').val();
    params.user_id = $('#user_submit_id').val();
    params.encrypt_token = $('#invitation_id').val();
    
    clickedItem = $(this).attr('data-render');

    switch (clickedItem) {
        case 'leaderboard':
            modules = "ContestLeaderBoardNewModule";
            break;
		case 'practice-leaderboard':
            modules = "ContestPreLeaderBoardNewModule";
            break;	
        case 'recenttaker':
            modules = "ContestRecentTakerNewModule";
            break;
    }
    var page_no = $('.page-number-val').val();
    if(page_no == '1'){
        page_no = '2';
    }
    params.page_no = parseInt(page_no);

    makeAjaxrequest(params, modules, clickedItem);
});

function makeAjaxrequest(parameter, modules, clickedItem) {
    
    $.ajax({
        type: "POST",
        url: base_url + "/ajax_files/load_module.php",
        data: {params: parameter, modules: modules},
        dataType: 'json',
        cache: false,
        success: function (data) {
           var  response = data;
            if (!isEmpty(response.html)) {
                $(response.html).insertBefore(".ajax_data");
                var page_no = parseInt(response.page_no)+1;
                $('.page-number-val').val(page_no);
            } else {
                $("#view-more-click").hide();
                $("#view-more-click").parent().append("<p class='text-center'>No more users to display!!</p>");
            }
        }
    });
}
$(document).on('click', '.domain-tab-click', function () {
	
    var params = {};
    var modules = '';
    params.season_id = $(this).attr('data-val');
    params.question_id = $('#question_submit_id').val();
    params.user_id = $('#user_submit_id').val();
    params.encrypt_token = $('#invitation_id').val();

	var tg_event_name = $('#tg_event_name').val();
	params.event_name = (typeof tg_event_name === "undefined") ? "" : tg_event_name;

    var clickedItem = $(this).attr('data-attr');
	
    switch (clickedItem) {
        case 'leaderboard':
            modules = "ContestLeaderBoardNewModule";
            break;
        case 'practice-leaderboard':
            modules = "ContestPreLeaderBoardNewModule";
            break;	
			
        case 'comments':
            params.module_name = "practiceandlearn";
            modules = "ContestCommentsModule";
            break;
        case 'submission':
            modules = "ContestRecentTakerNewModule";
            break;
        case 'video':
            modules = "VideoTutorialModule";
            break;
        case 'editorial':
            modules = "PracticeEditorialModule";
            break;
		case 'build-team':
            modules = "BuildHackathaonTeam";
            break;
		case 'join-team':
            modules = "JoinHackathaonTeam";
            break;
        case 'about-hackathon':
            modules = "EventAboutHackathonModule";
            break;
    }

    makeAjaxrequestForCoding(params, modules, clickedItem);
});

function makeAjaxrequestForCoding(parameter, modules, clickedItem) {
    $('.leaderboard').html('');
    $('.practice-leaderboard').html('');
    $('.comments').html('');
    $('.submission').html('');
    $('.build-team').html('');
    $('.join-team').html('');
    $.ajax({
        type: "POST",
        url: base_url + "/ajax_files/load_module.php",
        data: {params: parameter, modules: modules},
        dataType: 'html',
        cache: false,
        success: function (data) {
            $('.' + clickedItem).html(data);
        }
    });
}

function timer() {
    var days = Math.floor(seconds / 24 / 60 / 60);
    var hoursLeft = Math.floor((seconds) - (days * 86400));
    var hours = Math.floor(hoursLeft / 3600);
    var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
    var minutes = Math.floor(minutesLeft / 60);
    var remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    document.getElementById('countdown').innerHTML = hours + " hours " + minutes + " minutes " + remainingSeconds + " seconds ";
    if (seconds == 0) {
        clearInterval(countdownTimer);
        if (days == 0 && hours == 0 && minutes == 0) {
            $("#auto_submit_code").val('Y');
            bootbox.alert({
                //size: 'small',
                title: "Contest time is over",
                message: "<p class='alert alert-warning'>Warning : Contest time is over. Click OK to see the result</p>",
                callback: function (result) {
                    $('.submit-trigger').trigger('click');
                    $('#codejudge_requirement').submit();

                }
            });
        }
    } else {
        seconds--;
    }
}

function disableCtrlKeyCombination(e) {

    var forbiddenKeys = new Array('a', 'n', 'x', 'j', 'w', 'c');
    var key;
    var isCtrl;
    if (window.event)
    {
        key = window.event.keyCode;     //IE
        if (window.event.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    else
    {
        key = e.which;     //firefox
        if (e.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }

    //if ctrl is pressed check if other key is in forbidenKeys array
    if (isCtrl)
    {
        for (i = 0; i < forbiddenKeys.length; i++)
        {
            //case-insensitive comparation
            if (forbiddenKeys[i] == String.fromCharCode(key).toLowerCase())//.toLowerCase()
            {
                var key_ctrl_disable = 'Key combination CTRL + ' + String.fromCharCode(key) + ' has been disabled.';
                e.preventDefault();
                return false;
            }
        }
    }
    return true;
}
;

OtherCategory = new function () {
    $instance = this;

    $instance.dbRank = function (startingValue) {
        if (!startingValue.trim()) {
            startingValue = '-- Write your query statement here';
        }

        var editor = CodeMirror.fromTextArea(document.getElementById("demotext1"), {
            mode: "text/x-mysql",
            lineNumbers: true,
            lineWrapping: true,
            smartIndent: true
        });

        editor.setValue(startingValue);
        CodeMirror.autoLoadMode(editor, 'sql');
    };

    $instance.init = function (editor, question_id, invitation_id) {

        $(document).on('click', '#submit_button_db', function () {
            var answer_option = '';
            var answer = editor.getValue();
            var answer_option = $.trim(answer);
            var form_key_post = $('#form_key_post').val();
            if (answer_option == '-- Write your query statement here') {
                $('.submit-error').modal('show');
                return false;
            }

            var platform_type = $('#platform_type').val();
            var webcam_val = $('#webcam_enable').val();
            var form_key_post = $('#form_key_post').val();
            var page_number = $('#next_page_count').val();
            $("#submit_button").addClass("disabled");
            $("#submit_button").val("Submitting...");

            //check here platform_type 
            var contest_redirect_url = base_url + '/practice';

            try {
                var url = base_url + '/ajax_files/saas_candidate_function.php?action=DatabaseSubmission';

                $.post(url, {'question_id': question_id, 'answer_option': answer_option, 'invitation_id': invitation_id, 'form_key_post': form_key_post, 'platform_type': platform_type}, function (data) {

                    var msg = data;

                    $("#submit_button").val("Done, redirecting...");
                    if (msg.status == 'error') {
                        $("#submit_button").removeClass("disabled");
                        $("#submit_button").val("Submit answer & continue");
                        $('.submit-error .modal-body p').html(msg.error);
                        $('.submit-error').modal('show');
                    } else if (msg.status == 'timeout') {
                        alert('Contest Time is over. Click OK to see the result');
                        $('#codejudge_requirement').submit();
                    } else if (webcam_val == 1) {
                        if (page_number != 'none') {
                            var action_url = contest_redirect_url + '/ajax/' + invitation_id + '/' + page_number;
                            $('#user-panel').load(action_url, function (e) {
                                //
                            });
                        } else {
                            $("#submit_button").removeClass("disabled");
                            $("#submit_button").val("Submit answer");
                        }
                    } else if (msg.status == 'success') {
                        $('#codejudge_requirement').submit();
                    }
                });
            } catch (e) {
                //alert(e.description);
            }
        });
        $(document).on('click', '#verify_schema_practice', function () {
            $('#output_show').hide();
            $('.alert-danger').hide();
            $('.alert-success').hide();
            $('.alert').html();
            $('#output_show').html();
            var code = editor.getValue();
            var question_id = $('#question_id').val();
            var select_query = $('#select_query').val();
            var action_url = base_url + '/ajax_files/saas_candidate_function.php?action=runDbStatement';
            $.ajax({
                type: "POST",
                url: action_url,
                data: {code: code, question_id: question_id, select_query: select_query},
                success: function (data) {
                    var msg =data;
                    if (msg.status == 'success') {
                        $('#output_show').show();
                        $('#user_output').html(msg.output);
                        $('.alert-success').show();
                        $("#table_info").load(base_url + '/ajax_files/saas_database_info.php?question_id=' + question_id, function () {
                            //alert( "Load was performed." );
                        });
                    } else {
                        $('.alert-danger').show();
                    }
                    $('.alert').html(msg.message);
                }
            });
        });

    };
};

Coding_Editor = new function () {
    var $instance = this;
    var editor = null;
    $instance.loadInitial = function (result) {
        $('#feedback').hide();
        
        if (result.trim()) {
            editor.textInput.getElement().disabled = true
            $('#modeSelect').attr('disabled', 'disabled');
        }

    };
    $instance.init = function (default_selected_language, defaultCode, defaultLanguage, defaultTheme ) {
        editor = ace.edit("editor");
		var default_theme = (typeof defaultTheme === "undefined") ? "xcode" : defaultTheme;
		//xcode
        //#region not relevant to tern, just some deafults I prefer
        editor.setTheme("ace/theme/"+default_theme);
        editor.getSession().setUseWrapMode(true);
        editor.getSession().setWrapLimitRange(null, null);
        editor.setShowPrintMargin(false);
        editor.$blockScrolling = Infinity;
        editor.setOptions({
                fontSize: '16px'
            });
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
                    /**
                     * (default is true) If web worker is used for tern server.
                     * This is recommended as it offers better performance, but prevents this from working in a local html file due to browser security restrictions
                     */
                    // useWorker: useWebWorker,
                    /* if your editor supports switching between different files (such as tabbed interface) then tern can do this when jump to defnition of function in another file is called, but you must tell tern what to execute in order to jump to the specified file */
                    switchToDoc: function (name, start) {
                        //console.log('switchToDoc called but not defined. name=' + name + '; start=', start);
                    },
                    /**
                     * if passed, this function will be called once ternServer is started.
                     * This is needed when useWorker=false because the tern source files are loaded asynchronously before the server is started.
                     */
                    startedCb: function () {
                        //once tern is enabled, it can be accessed via editor.ternServer
                        //console.log('editor.ternServer:', editor.ternServer);
                    },
                },
                /**
                 * when using tern, it takes over Ace's built in snippets support.
                 * this setting affects all modes when using tern, not just javascript.
                 */
                enableSnippets: true,
                /**
                 * when using tern, Ace's basic text auto completion is enabled still by deafult.
                 * This settings affects all modes when using tern, not just javascript.
                 * For javascript mode the basic auto completion will be added to completion results if tern fails to find completions or if you double tab the hotkey for get completion (default is ctrl+space, so hit ctrl+space twice rapidly to include basic text completions in the result)
                 */
                enableBasicAutocompletion: true,
            });
        });


        //#region not relevant to tern (custom beautify plugin) and demo loading
        ace.config.loadModule('ace/ext/html_beautify', function (beautify) {
            editor.setOptions({
                autoBeautify: true
            });
            
            //modify beautify options as needed:
            window.beautifyOptions = beautify.options;
            //console.log('beautifyOptions:', beautifyOptions);
        });
        if (default_selected_language == 'objc') {
            editor.session.setMode("ace/mode/c");
        } else if (default_selected_language == 'go') {
            editor.session.setMode("ace/mode/golang");
        } else {
            editor.session.setMode("ace/mode/" + default_selected_language);
        }
        var range = editor.getSelectionRange();
        var Rowscount = range.start;
        var rowscnt = Rowscount.row;
        var colscnt = Rowscount.column;
        $("#RowNum").text(rowscnt + 1);
        $("#ColsNum").text(colscnt + 1);

        //on-change cursor
        editor.getSession().selection.on('changeCursor', function (e) {

            var range = editor.getSelectionRange();
            var Rowscount = range.start;
            var rowscnt = Rowscount.row;
            var colscnt = Rowscount.column;
            $("#RowNum").text(rowscnt + 1);
            $("#ColsNum").text(colscnt + 1);
            $("#code_execute").val(1);

        });

        $('#settings-dropdown .btn-group .btn').each(function () {
            $(this).click(function () {
                var btnValue = $(this).html();
                var btnEditorValue = $(this).data('value');
                $("#editor-box .editor-footer .editor-mode").html(btnValue);
                editor.setKeyboardHandler("ace/keyboard/" + btnEditorValue);
                $('#settings-dropdown').hide();
            });

        });
        $("#change_editor_themes").change(function () {
            var btnthemeValue = $(this).val();
            editor.setTheme(btnthemeValue);
            $('#settings-dropdown').hide();
        });

        $("#auto-complete").click(function () {

            var autocomplete_type = $("input:checkbox[name=auto_complete_snippet]:checked").val();
            if (autocomplete_type == 1) {
                editor.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true
                });
            } else {
                editor.setOptions({
                    enableBasicAutocompletion: false,
                    enableSnippets: false
                });
            }
            editor.setShowPrintMargin(true);
            $('#settings-dropdown').hide();
        });

        $("#fontsize").change(function () {
            var fontValue = $(this).val();
            editor.setOptions({
                //fontFamily: "tahoma",
                fontSize: fontValue
            });

            $('#settings-dropdown').hide();
        });

        $("#tab_space").keyup(function () {
            var tabValue = $(this).val();
            editor.getSession().setTabSize(tabValue);
            $('#settings-dropdown').hide();
        });
        editor.setValue(defaultCode, 1);

        if (defaultLanguage == 'objc') {
            editor.session.setMode("ace/mode/c");
        } else if (defaultLanguage == 'go') {
            editor.session.setMode("ace/mode/golang");
        } else {
            editor.session.setMode("ace/mode/" + defaultLanguage);
        }
        $(".change-language-confirmation").change(function () {
            var newVal = $(this).val();
            bootbox.confirm({
                //size: 'small',
                title: "Are you sure you wish to change language?",
                message: "<p class='alert alert-warning'>Warning : Existing code will be overwritten!</p>",
                callback: function (result) {
                    if (result) {
                        //destroy old language
                        default_selected_language = newVal;
                        $("#defaultlanguage").val(newVal);
                        $instance.setModeFromHash(param = 0);
                    } else {
                        $(".change-language-confirmation").val(default_selected_language); //set back
                        return; //abort!
                    }
                }
            });
        });

        $(".change-approx").change(function () {
            var newVal = $(this).val();
            bootbox.confirm({
                //size: 'small',
                title: "Are you sure you wish to change language?",
                message: "<p class='alert alert-warning'>Warning : Existing code will be overwritten!</p>",
                callback: function (result) {
                    if (result) {
                        //destroy old language
                        default_selected_language = newVal;

                        $("#defaultlanguage").val(newVal);
                        $instance.setModeFromHash(param = 1);
                    } else {
                        $(".change-language-confirmation").val(default_selected_language); //set back
                        return; //abort!
                    }
                }
            });
        });

        $(".match-box #editor-box").innerHeight($(window).height() - ($("#header").innerHeight() + $("#user-nav").innerHeight() + $(".user-info-bar").innerHeight()));

        $instance.CommonFunctionForEditorAdustment(".match-box #editor-box #editor", 19);

        $(".match-box .tabs2 > .tab-content").innerHeight($(window).height() - ($("#header").innerHeight() + $("#user-nav").innerHeight() + $(".user-info-bar").innerHeight() + $(".match-box .task-info .tabs2 .nav-tabs").innerHeight()));


        $(document).on('click', '#editor-box #editor-actions .btn', function () {
            $(".match-box #editor-box #editor").innerHeight(185);
            editor.setOptions({
                maxLines: 11,
                minLines: 11,
                fontSize: '14px'
            });

            $(window).trigger('resize');
            $instance.CommonFunctionForEditorAdustment(".match-box #editor-box .inner-editor", 0);
            $(".match-box #editor-box .inner-editor").css("padding", "10px 15px");
        });
    };

    $instance.CommonFunctionForEditorAdustment = function (selector, val) {
        $(selector).innerHeight($(window).height() - ($("#header").innerHeight() + $("#user-nav").innerHeight() + $(".user-info-bar").innerHeight() + $("#editor-box .header").innerHeight() + $("#editor-box #editor").innerHeight() + $("#editor-box .editor-footer").innerHeight() + $("#editor-box #editor-actions").innerHeight()) + val);
    };

    $instance.setModeFromHash = function (param) {

        var available = [];
        var modeSelect = document.getElementById('modeSelect');
        for (var i = 0; i < modeSelect.options.length; i++) {
            available.push(modeSelect.options[i].value);
        }
        
        // var mode = window.location.hash.replace('#', '');
        var mode = modeSelect.options[modeSelect.selectedIndex].value;
        if (!mode || available.indexOf(mode) === -1) {
            window.location.hash = modeSelect.value;
            $instance.setModeFromHash(param);
            return;
        }

        if (modeSelect.value != mode)
            modeSelect.options[available.indexOf(mode)].selected = true;

        if (mode == 'objc') {
            editor.session.setMode("ace/mode/c");
        } else if (mode == 'go') {
            editor.session.setMode("ace/mode/golang");
        } else {
            editor.session.setMode("ace/mode/" + mode);
        }
        var f = '';

        if (param === 1) {
            f = $("#approx_" + mode).attr('data');
        } else {
            f = $("#" + mode + "_template").val();
        }

        editor.setValue(f);


    };
    
    $instance.submitResult = function(defaultCode, defaultLanguage,encrypt_token,platform_type){
        var url = base_url + "/ajax_files/codejudge_compiletest.php";
            $.ajax({
                type: "POST",
                url: url,
                data: {code: defaultCode, action: 'run', language: defaultLanguage, encrypt_token: encrypt_token, platform_type: platform_type},
                success: function (data) {
                    $('.log-output').html('');
                        $('.files-output').html('');
                        $('.run-data').html('');
                    var data = $.trim(data);
                    if(data == "0*||*failure"){
                         $('.log-output').append("<p class='alert alert-warning'> Some technical issue occured. </p>");
                    }else{
                    data = data;
                    
                        
                        $('.log-output').append(data.log);
                        $('.files-output').append(data.file);
                        $('.run-data').append(data.val);
                    }
                }
            });
    };
};
