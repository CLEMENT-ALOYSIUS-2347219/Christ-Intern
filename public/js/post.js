$('#reset-link').click(() => {
    $('#search-form')[0].reset();
    $('.selectpicker').selectpicker('refresh');
    let data = $('#search-form').serializeArray();
   let formData = {};
   data.forEach(ele => {
       formData[ele.name] = ele.value;
   });
   console.log(formData);
   $.ajax({
       method:'POST',
       url: '/internships/ajax/all',
       data: formData,
       encode: true,
       success: (response) => {
           $('#all_internships').html(response);
       }
   });
});
$('#search-form .search-input').on('change', () => {
   let data = $('#search-form').serializeArray();
   let formData = {};
   data.forEach(ele => {
       formData[ele.name] = ele.value;
   });
   console.log(formData);
   $.ajax({
       method:'POST',
       url: '/internships/ajax/all',
       data: formData,
       encode: true,
       success: (response) => {
           $('#all_internships').html(response);
       }
   });
});