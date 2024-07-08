

$('#contact-form').on('submit', (e) => {
    e.preventDefault();
    let data = $('#contact-form').serializeArray();
    let formData = {};
    data.forEach(ele => {
        formData[ele.name] = ele.value;
    });
    console.log(formData);
    $.ajax({
        type: 'POST',
        url: "https://docs.google.com/forms/u/3/d/e/1FAIpQLScl_ZZVxZdHDLDrpTVZCdJi9Y313SbsaGSxIpxjfqLsRDLnng/formResponse",
        data: formData,
        dataType: "xml",
        statusCode: {
          0: function() {
            //Success message
            console.log('hello');
            $('#contact-toast').toast('show');
          },
          200: function() {
            //Success Message
            console.log('world');
            $('#contact-toast').toast('show');
          }
        }
      });
});