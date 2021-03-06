$(document).ready(function() {
  var database = firebase.database();
  $('.sidenav').sidenav();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $('#email-profile').text(user.email);
      var showPost = firebase.database().ref('usuarios');
      showPost.on('child_added', function(data) {
        if (data.val().uid === user.uid) {
          $('#name-profile').text(data.val().name);
        }
      });
    } else {

    }
  });

  getNews3();
  function handleError1() {
    console.log('Se ha presentado un error');
  }
  function getNews3() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `https://newsapi.org/v2/everything?q=${localStorage.categorys}&sources=el-mundo&apiKey=5bc8597ff85946f48100561b36f359b6`);
    articleRequest.onload = addNews3;
    articleRequest.onerror = handleError1;
    articleRequest.send();
  }
  function addNews3() {
    let data1 = JSON.parse(this.responseText);
    let article1 = data1.articles;
    let title2 = article1[localStorage.idNoticia].title;
    let description2 = article1[localStorage.idNoticia].description;
    let imagenNews = article1[localStorage.idNoticia].urlToImage;
    let url = article1[localStorage.idNoticia].url;
    let news2 = `<div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
        <h5 class="center-align">${title2}</h5>
          <img src=${imagenNews}>
        </div>
        <div class="card-content">
          <p >${description2}</p>
        </div>
        <div class="card-action">
          <a href=${url} target="_blank">Ver más</a>
        </div>
      </div>
    </div>
  </div>`

    /* `<div class="col s12 m7">

    <div class="card horizontal">
      <div class="card-image">
        <img src="${imagenNews}">
      </div>
      <div class="card-stacked">
        <div class="card-content">
        <h6 class="header">${title2}</h6>
          <p class="descriptionNews">${description2}</p>
        </div>

        <div class="card-action">
          <a class="linkNews" href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>`;*/
    $('.news-container').append(news2);
  };
  $(function() {
    $('#rateYo').rateYo({
      rating: 3.6
    });
  });


  $('.postext').on('click', function () {
    var $content = $('#textarea1').val();
    var time=moment().format('LTS')
    firebase.database().ref('coments').push({
      textpost: $content,
      time:time
    });

    $('#textarea1').val('');
      firebase.auth().onAuthStateChanged(function (user) {
      if (user) { }
    })
  });
  var showComents = firebase.database().ref('coments');
  showComents.on('child_added', function(data) {
    // console.log(data.val().textpost);
      $('.content-text').prepend(`<div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s2">
              <img src="../assets/images/profile.jpg" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
            </div>
            <div class="col s10">
              <span class="black-text">
              ${data.val().textpost}
              </span>
              <br>
              <span class="black-text">
              ${data.val().time }
              </span>
            </div>
          </div>
        </div>
      </div>`)


      /*'  <div class="">'+data.val().textpost+'</div>'*/
  });

});
