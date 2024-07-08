$('#set-status .btn').on('click', (e) => {
    let data = {
        postId: '<%= app._id %>',
        status:  e.target.value
    };
    $.ajax({
        type:'POST',
        url: '/iha-admin/application/setStatus',
        data: data,
        dataType: 'json',
        success: (response) => {
            $('#succesmsg').children('.toast-body').text(response.message);
            $('#succesmsg').toast('show');
            setTimeout(() => {
                location.reload();
            }, 2000);
        }

    });
});