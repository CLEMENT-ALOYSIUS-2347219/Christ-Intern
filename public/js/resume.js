$(document).ready(() => {
    $('#add-education').on('click', () => {
        $.ajax({
            type: 'GET',
            url: '/ajax',
            dataType: 'json',
            success: function (response) {
                let res = response.data.resume.education;
                var arr = [];
                if (res.graduation) arr.push('grad');
                if (res.post_graduation) arr.push('post_grad');
                if (res.secondary) arr.push('sec');
                if (res.sen_secondary) arr.push('sen_sec');
                if (res.diploma) arr.push('dip');
                if (res.phd) arr.push('phd');
                arr.forEach(element => {
                    $('#add-' + element).hide();
                });
                if (arr.length == 6) {
                    $('#add-educaion-wrapper').html("<lottie-player src='https://assets1.lottiefiles.com/packages/lf20_XQIB2p.json' class='lottie-animate' background='transparent' speed='1' loop autoplay></lottie-player>");
                }
            }
        });
    });

});

function ale() {
    $('#succesmsg').toast('show');
}

function radiocheck(btName, idName) {
    let radioValue = $("input[name=" + btName + "]:checked").val();
    if (radioValue == 'Pursuing') {
        $('#' + idName).text("Expected end year");
    } else {
        $('#' + idName).text("End year");
    }
}

function formSubmit(event) {
    event.preventDefault();
    let data = $('#' + event.target.id).serializeArray();
    let formData = {};
    data.forEach(ele => {
        formData[ele.name] = ele.value;
    });
    $.ajax({
        type: 'POST',
        url: '/ajax/' + event.target.id,
        data: formData,
        encode: true,
        dataType: 'json',
        success: function (response) {
            $('#' + event.target.id + '-modal').modal('hide');
            $('#succesmsg').children('.toast-body').text(response.message);
            $('#succesmsg').toast('show');
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    });
}

function edit(event, arg) {
    event.preventDefault();
    $.ajax({
        type: 'GET',
        url: '/ajax/' + arg,
        dataType: 'json',
        success: function (response) {
            Object.keys(response).forEach(key => {
                $("input[type='text'][name=" + key + "]").val(response[key]);
                $('select[name=' + key + ']').val(response[key]);
                if ($("input[type='radio'][name=" + key + "][id='radio1']").val() == response[key] && 'Pursuing' == response[key]) {
                    $("input[type='radio'][name=" + key + "][id='radio1']").prop("checked", true);
                } else if ('Completed' == response[key]) {
                    $("input[type='radio'][name=" + key + "][id='radio2']").prop("checked", true);
                }
            });

        }
    });
    $('#' + arg + '_form-modal').modal('show');
}

function del(event, arg) {
    if (confirm("Are you sure you want to delete this? ")) {
        event.preventDefault();
        $.ajax({
            type: 'DELETE',
            url: '/ajax/' + arg,
            dataType: 'json',
            success: function (response) {
                $('#succesmsg').children('.toast-body').text(response.message);
                $('#succesmsg').toast('show');
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        });
    } else {
        event.preventDefault();
    }
}


$("input[name='isWFH']").on('change', () => {
    if($("input[name='isWFH']:checked").val()) {
        $("input[name='location']").val('Work from home'); 
        $("input[name='location']").attr('disabled', true);
    } else {
        $("input[name='location']").val(''); 
        $("input[name='location']").attr('disabled', false);
    }
});
$("input[name='cWorking']").on('change', () => {
    if($("input[name='cWorking']:checked").val()) {
        $("input[name='endD']").val('Present'); 
        $("input[name='endD']").attr('disabled', true);
    } else {
        $("input[name='endD']").val(''); 
        $("input[name='endD']").attr('disabled', false);
    }
});
$('#job_form').on('submit', (e) => {
    e.preventDefault();
    let data = $('#job_form').serializeArray();
    let formData = {},myUrl;
    data.forEach(ele => {
        formData[ele.name] = ele.value;
    });
    if(formData.cWorking) formData.cWorking = true;
    if(formData.isWFH) formData.isWFH = true;
    if($('#job_form').attr('class')) {
        myUrl = '/ajax/job/'+ $('#job_form').attr('class');
    }
    else {
        myUrl = '/ajax/job_form';
    }
    $.ajax({
        type: 'POST',
        url: myUrl,
        data: formData,
        encode: true,
        dataType: 'json',
        success: function (response) {
            $('#' + e.target.id + '-modal').modal('hide');
            $('#succesmsg').children('.toast-body').text(response.message);
            $('#succesmsg').toast('show');
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    });
});

function del_job(e, arg) {
    if (confirm("Are you sure you want to delete this? ")) {
      e.preventDefault();
      $.ajax({
        type: 'DELETE',
        url: '/ajax/job/'+arg,
        dataType: 'json',
        success: function (response) {
            $('#succesmsg').children('.toast-body').text(response.message);
            $('#succesmsg').toast('show');
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
      });
    } else {
      e.preventDefault();
    }
  }
  
  function edit_job(e, arg) {
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: '/ajax/job/'+ arg,
      dataType: 'json',
      success: function (response) {
        $('#job_form')[0].reset();
        $('#job_form').find('input').removeAttr('disabled');
        $('#job_form').addClass(arg);
        Object.keys(response).forEach(key => {
          
            $("input[type='text'][name=" + key + "]").val(response[key]);
          if(key == 'startD' || key == 'endD' ) return $("input[type='date'][name=" + key + "]").val(convertToDate(response[key]));
            $("textarea[name=" + key + "]").val(response[key]);
            $("input[type='checkbox'][name=" + key + "]").prop('checked', true); 
        });
  
        if($("input[name='isWFH']:checked").val()) {
          $("input[name='location']").val('Work from home');  
          $("input[name='location']").attr('disabled', true);
        }
        if($("input[name='cWorking']:checked").val()) {
          $("input[name='endD']").val('Present'); 
          $("input[name='endD']").attr('disabled', true);
        }
      }
    });
    
    $('#job_form-modal').modal('show');
  }
  
  
  function convertToDate(date) { 
    date = new Date(date);
    let y=date.getFullYear(),
      m=date.getMonth()<9? '0' + (date.getMonth()+1) : date.getMonth()+1,
      d=date.getDate()< 10 ? '0' + date.getDate()  : date.getDate(); 
      return(y+'-'+m+'-'+d);
  }
  
  $(document).ready(() => {
    $('#add-job').on('click', () => {
      $('#job_form').removeAttr('class');
      $('#job_form')[0].reset();
      $('#job_form').find('input').removeAttr('disabled');
    });
  });

  function del_internship(e, arg) {
    if (confirm("Are you sure you want to delete this? ")) {
      e.preventDefault();
      $.ajax({
        type: 'DELETE',
        url: '/ajax/internship/'+arg,
        dataType: 'json',
        success: function (response) {
            $('#succesmsg').children('.toast-body').text(response.message);
            $('#succesmsg').toast('show');
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
      });
    } else {
      e.preventDefault();
    }
  }
  
  function edit_internship(e, arg) {
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: '/ajax/internship/'+ arg,
      dataType: 'json',
      success: function (response) {
        $('#internship_form')[0].reset();
        $('#internship_form').find('input').removeAttr('disabled');
        $('#internship_form').addClass(arg);
        Object.keys(response).forEach(key => {
          
            $("#internship_form input[type='text'][name=" + key + "]").val(response[key]);
          if(key == 'startD' || key == 'endD' ) return $("#internship_form input[type='date'][name=" + key + "]").val(convertToDate(response[key]));
            $("#internship_form textarea[name=" + key + "]").val(response[key]);
            $("#internship_form input[type='checkbox'][name=" + key + "]").prop('checked', true); 
        });
  
        if($("#internship_form input[name='isWFH']:checked").val()) {
          $("#internship_form input[name='location']").val('Work from home');  
          $("#internship_form input[name='location']").attr('disabled', true);
        }
        if($("input[name='cWorking']:checked").val()) {
          $("#internship_form input[name='endD']").val('Present'); 
          $("#internship_form input[name='endD']").attr('disabled', true);
        }
      }
    });
    
    $('#internship_form-modal').modal('show');
  }
  
  

$(document).ready(() => {
  $('#add-internship').on('click', () => {
    $('#internship_form').removeAttr('class');
    $('#internship_form')[0].reset();
    $('#internship_form').find('input').removeAttr('disabled');
  });
});

$('#internship_form').on('submit', (e) => {
  e.preventDefault();
  let data = $('#internship_form').serializeArray();
  let formData = {},myUrl;
  data.forEach(ele => {
      formData[ele.name] = ele.value;
  });
  if(formData.cWorking) formData.cWorking = true;
  if(formData.isWFH) formData.isWFH = true;
  if($('#internship_form').attr('class')) {
      myUrl = '/ajax/internship/'+ $('#internship_form').attr('class');
  }
  else {
      myUrl = '/ajax/internship_form';
  }
  $.ajax({
      type: 'POST',
      url: myUrl,
      data: formData,
      encode: true,
      dataType: 'json',
      success: function (response) {
          $('#' + e.target.id + '-modal').modal('hide');
          $('#succesmsg').children('.toast-body').text(response.message);
          $('#succesmsg').toast('show');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }
  });
});

function del_responsibility(e, arg) {
  if (confirm("Are you sure you want to delete this? ")) {
    e.preventDefault();
    $.ajax({
      type: 'DELETE',
      url: '/ajax/responsibility/'+arg,
      dataType: 'json',
      success: function (response) {
          $('#succesmsg').children('.toast-body').text(response.message);
          $('#succesmsg').toast('show');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }
    });
  } else {
    e.preventDefault();
  }
}

function edit_responsibility(e, arg) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: '/ajax/responsibility/'+ arg,
    dataType: 'json',
    success: function (response) {
      $('#responsibility_form')[0].reset();
      $('#responsibility_form').find('input').removeAttr('disabled');
      $('#responsibility_form').addClass(arg);
      Object.keys(response).forEach(key => {
        
          $("#responsibility_form textarea[name=" + key + "]").val(response[key]);
      });
    }
  });
  
  $('#responsibility_form-modal').modal('show');
}

$(document).ready(() => {
  $('#add-responsibility').on('click', () => {
    $('#responsibility_form').removeAttr('class');
    $('#responsibility_form')[0].reset();
    $('#responsibility_form').find('input').removeAttr('disabled');
  });
});

$('#responsibility_form').on('submit', (e) => {
  e.preventDefault();
  let data = $('#responsibility_form').serializeArray();
  let formData = {},myUrl;
  data.forEach(ele => {
      formData[ele.name] = ele.value;
  });
  if($('#responsibility_form').attr('class')) {
      myUrl = '/ajax/responsibility/'+ $('#responsibility_form').attr('class');
  }
  else {
      myUrl = '/ajax/responsibility_form';
  }
  $.ajax({
      type: 'POST',
      url: myUrl,
      data: formData,
      encode: true,
      dataType: 'json',
      success: function (response) {
          $('#' + e.target.id + '-modal').modal('hide');
          $('#succesmsg').children('.toast-body').text(response.message);
          $('#succesmsg').toast('show');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }
  });
});


function del_training(e, arg) {
  if (confirm("Are you sure you want to delete this? ")) {
    e.preventDefault();
    $.ajax({
      type: 'DELETE',
      url: '/ajax/training/'+arg,
      dataType: 'json',
      success: function (response) {
          $('#succesmsg').children('.toast-body').text(response.message);
          $('#succesmsg').toast('show');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }
    });
  } else {
    e.preventDefault();
  }
}

function edit_training(e, arg) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: '/ajax/training/'+ arg,
    dataType: 'json',
    success: function (response) {
      $('#training_form')[0].reset();
      $('#training_form').find('input').removeAttr('disabled');
      $('#training_form').addClass(arg);
      Object.keys(response).forEach(key => {
        
          $("#training_form input[type='text'][name=" + key + "]").val(response[key]);
        if(key == 'startD' || key == 'endD' ) return $("#training_form input[type='date'][name=" + key + "]").val(convertToDate(response[key]));
          $("#training_form textarea[name=" + key + "]").val(response[key]);
          $("#training_form input[type='checkbox'][name=" + key + "]").prop('checked', true); 
      });

      if($("#training_form input[name='isOnline']:checked").val()) {
        $("#training_form input[name='location']").val('Online');  
        $("#training_form input[name='location']").attr('disabled', true);
      }
      if($("input[name='cWorking']:checked").val()) {
        $("#training_form input[name='endD']").attr('disabled', true);
      }
    }
  });
  
  $('#training_form-modal').modal('show');
}



$(document).ready(() => {
$('#add-training').on('click', () => {
  $('#training_form').removeAttr('class');
  $('#training_form')[0].reset();
  $('#training_form').find('input').removeAttr('disabled');
});
});

$('#training_form').on('submit', (e) => {
e.preventDefault();
let data = $('#training_form').serializeArray();
let formData = {},myUrl;
data.forEach(ele => {
    formData[ele.name] = ele.value;
});
if(formData.cWorking) formData.cWorking = true;
if(formData.isOnline) formData.isOnline = true;
if($('#training_form').attr('class')) {
    myUrl = '/ajax/training/'+ $('#training_form').attr('class');
}
else {
    myUrl = '/ajax/training_form';
}
$.ajax({
    type: 'POST',
    url: myUrl,
    data: formData,
    encode: true,
    dataType: 'json',
    success: function (response) {
        $('#' + e.target.id + '-modal').modal('hide');
        $('#succesmsg').children('.toast-body').text(response.message);
        $('#succesmsg').toast('show');
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
});
});

    $("#training_form input[name='isOnline']").on('change', () => {
    if($("#training_form input[name='isOnline']:checked").val()) {
        $("#training_form input[name='location']").val('Online'); 
        $("#training_form input[name='location']").attr('disabled', true);
    } else {
        $("#training_form input[name='location']").val(''); 
        $("#training_form input[name='location']").attr('disabled', false);
    }
});


function del_project(e, arg) {
  if (confirm("Are you sure you want to delete this? ")) {
    e.preventDefault();
    $.ajax({
      type: 'DELETE',
      url: '/ajax/project/'+arg,
      dataType: 'json',
      success: function (response) {
          $('#succesmsg').children('.toast-body').text(response.message);
          $('#succesmsg').toast('show');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }
    });
  } else {
    e.preventDefault();
  }
}

function edit_project(e, arg) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: '/ajax/project/'+ arg,
    dataType: 'json',
    success: function (response) {
      $('#project_form')[0].reset();
      $('#project_form').find('input').removeAttr('disabled');
      $('#project_form').addClass(arg);
      Object.keys(response).forEach(key => {
        
          $("#project_form input[type='text'][name=" + key + "]").val(response[key]);
        if(key == 'startD' || key == 'endD' ) return $("#project_form input[type='date'][name=" + key + "]").val(convertToDate(response[key]));
          $("#project_form textarea[name=" + key + "]").val(response[key]);
          $("#project_form input[type='checkbox'][name=" + key + "]").prop('checked', true); 
      });

      if($("input[name='cWorking']:checked").val()) {
        $("#project_form input[name='endD']").attr('disabled', true);
      }
    }
  });
  
  $('#project_form-modal').modal('show');
}

$('#project_form').on('submit', (e) => {
  e.preventDefault();
  let data = $('#project_form').serializeArray();
  let formData = {},myUrl;
  data.forEach(ele => {
      formData[ele.name] = ele.value;
  });
  if(formData.cWorking) formData.cWorking = true;
  if($('#project_form').attr('class')) {
      myUrl = '/ajax/project/'+ $('#project_form').attr('class');
  }
  else {
      myUrl = '/ajax/project_form';
  }
  $.ajax({
      type: 'POST',
      url: myUrl,
      data: formData,
      encode: true,
      dataType: 'json',
      success: function (response) {
          $('#' + e.target.id + '-modal').modal('hide');
          $('#succesmsg').children('.toast-body').text(response.message);
          $('#succesmsg').toast('show');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }
  });
  });

  $(document).ready(() => {
    $('#add-project').on('click', () => {
      $('#project_form').removeAttr('class');
      $('#project_form')[0].reset();
      $('#project_form').find('input').removeAttr('disabled');
    });
    });


function del_skill(e, arg) {
  if (confirm("Are you sure you want to delete this? ")) {
    e.preventDefault();
    $.ajax({
      type: 'DELETE',
      url: '/ajax/skill/'+arg,
      dataType: 'json',
      success: function (response) {
          $('#succesmsg').children('.toast-body').text(response.message);
          $('#succesmsg').toast('show');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }
    });
  } else {
    e.preventDefault();
  }
}

function edit_skill(e, arg) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: '/ajax/skill/'+ arg,
    dataType: 'json',
    success: function (response) {
      $('#skills_form')[0].reset();
      $('#skills_form').find('input').removeAttr('disabled');
      $('#skills_form').addClass(arg);
      Object.keys(response).forEach(key => {
        
          $("#skills_form input[type='text'][name=" + key + "]").val(response[key]);
          $('#skills_form select[name=' + key + ']').val(response[key]);
      });

    }
  });
  
  $('#skills_form-modal').modal('show');
}

$('#skills_form').on('submit', (e) => {
  e.preventDefault();
  let data = $('#skills_form').serializeArray();
  let formData = {},myUrl;
  data.forEach(ele => {
      formData[ele.name] = ele.value;
  });
  if(formData.cWorking) formData.cWorking = true;
  if($('#skills_form').attr('class')) {
      myUrl = '/ajax/skill/'+ $('#skills_form').attr('class');
  }
  else {
      myUrl = '/ajax/skills_form';
  }
  $.ajax({
      type: 'POST',
      url: myUrl,
      data: formData,
      encode: true,
      dataType: 'json',
      success: function (response) {
          $('#' + e.target.id + '-modal').modal('hide');
          $('#succesmsg').children('.toast-body').text(response.message);
          $('#succesmsg').toast('show');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }
  });
});

$(document).ready(() => {
    $('#add-skills').on('click', () => {
      $('#skills_form').removeAttr('class');
      $('#skills_form')[0].reset();
      $('#skills_form').find('input').removeAttr('disabled');
    });
});



function del_additional(e, arg) {
  if (confirm("Are you sure you want to delete this? ")) {
    e.preventDefault();
    $.ajax({
      type: 'DELETE',
      url: '/ajax/additional/'+arg,
      dataType: 'json',
      success: function (response) {
          $('#succesmsg').children('.toast-body').text(response.message);
          $('#succesmsg').toast('show');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }
    });
  } else {
    e.preventDefault();
  }
}

function edit_additional(e, arg) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: '/ajax/additional/'+ arg,
    dataType: 'json',
    success: function (response) {
      $('#additional_form')[0].reset();
      $('#additional_form').find('input').removeAttr('disabled');
      $('#additional_form').addClass(arg);
      Object.keys(response).forEach(key => {
        
          $("#additional_form textarea[name=" + key + "]").val(response[key]);
      });
    }
  });
  
  $('#additional_form-modal').modal('show');
}

$(document).ready(() => {
  $('#add-additional').on('click', () => {
    $('#additional_form').removeAttr('class');
    $('#additional_form')[0].reset();
    $('#additional_form').find('input').removeAttr('disabled');
  });
});

$('#additional_form').on('submit', (e) => {
  e.preventDefault();
  let data = $('#additional_form').serializeArray();
  let formData = {},myUrl;
  data.forEach(ele => {
      formData[ele.name] = ele.value;
  });
  if($('#additional_form').attr('class')) {
      myUrl = '/ajax/additional/'+ $('#additional_form').attr('class');
  }
  else {
      myUrl = '/ajax/additional_form';
  }
  $.ajax({
      type: 'POST',
      url: myUrl,
      data: formData,
      encode: true,
      dataType: 'json',
      success: function (response) {
          $('#' + e.target.id + '-modal').modal('hide');
          $('#succesmsg').children('.toast-body').text(response.message);
          $('#succesmsg').toast('show');
          setTimeout(() => {
              location.reload();
          }, 2000);
      }
  });
});