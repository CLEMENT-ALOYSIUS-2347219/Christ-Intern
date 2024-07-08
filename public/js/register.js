$('#register_form').on('submit', (e) => {
    e.preventDefault();
    let data = $('#register_form').serializeArray();
    let formData = {};
    data.forEach(ele => {
        formData[ele.name] = ele.value;
    });
    $.ajax({
        type: 'POST',
        url: '/user/register',
        data: formData,
        encode: true,
        dataType: 'json',
        success: (response) => {
            if(response.err) {
                $('#res_container').removeAttr('class');
                $('#res_container').addClass('invalid-feedback');
                $('#res_container').text(response.error.message);
            }
            else {
                $('#res_container').removeAttr('class');
                $('#res_container').addClass('valid-feedback');
                $('#res_container').text(response.msg);
                setTimeout(() => {
                    location.replace('/user');
                },2000);
            }
        }
    });
});