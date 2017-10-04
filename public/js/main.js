// $(function() {
//   $('#login').on('submit', function() {
//     event.preventDefault();
//     var $inputs = $('#login :input');
//     var values = {};
//     $inputs.each(function() {
//         values[this.name] = $(this).val();
//     });
//     $.ajax({
//       url:"http://localhost:3000/login",
//       method: "POST",
//       data: values
//     })
//     .done(results => {
//       localStorage.setItem('token', results.token);
//       console.log('set token');
//       $.ajax({
//         method: "GET",
//         url: 'http://localhost:3000/users/api',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         },
//         json: true
//       })
//       .done(user => {
//         console.log(user);
//       })
//
//     })
//     .fail(err => {
//       console.log('error');
//     })
//   })
//
// });
