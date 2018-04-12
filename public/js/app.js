$(document).ready(function () {
  $('.modal').modal();
  $('#login').on('click', function () {
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function () {
        $('#ok').on('click', function () {
          $(location).attr('href', '../view/profile.html');
          $('.perfil').attr('src', '../assets/images/foto1.jpg');
        })
      })
      .catch(function (error) {
        alert('Ingrese correo y contraseña valido ');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
  });

  function watcher() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        appears();
        console.log('usuario activo');
        // ...
      } else {
        // User is signed out.
      }
    });
  }
  watcher();
  // Funcion para pasar a la siguiente vista una vez confirmado usuario activo
  function appears() {
    var content = $('#sign-out');
    content.text('Sign Out');
    $('#sign-out').on('click', function () {
      firebase.auth().signOut()
        .then(function () {
          $(location).attr('href', 'index.html');
          $('#sign-out').text('Sign-In');
          var email2 = $('#email2').val('');
          var password2 = $('#password2').val('');
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  let cambio = false;
  let pass1, pass2, pass3 = false;
  firebase.auth().onAuthStateChanged(function (user) {
    // if (user) {
    //   $('.modal').modal();
    //   console.log('usuario activo aa');

    //   if ($('#password1') == '123456') {
    //     pass1 = true;
    //   }
    //   if (($('#password2').val).length > 5) {
    //     pass2 = true;
    //   }
    //   if ($('#password3').val == $('#password2').val) {
    //     pass3 = true;
    //   }

    //   if (pass1 && pass2 && pass3) {
    //     alert('ya está!!')
    //     cambio = true;
    //     $('#ok').click(function(){
    //       window.location.href = '../view/profile.html';
    //     })
    //
  });


});