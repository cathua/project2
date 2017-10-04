$(function() {
  $('#login').on('submit', function() {
    event.preventDefault();
    var $inputs = $('#login :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    $.ajax({
      url:"http://localhost:3000/login",
      method: "POST",
      data: values
    })
    .done(results => {
      localStorage.setItem('token', results.token);
      console.log('set token');
    })
    .fail(err => {
      console.log('error');
    })
  })

});
