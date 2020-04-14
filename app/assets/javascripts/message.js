$(function(){
  function buildHTML(message) {
    if (message.image) {
      var html = 
       `<div class="messages__details">
          <div class="messages__details__upper">
            <div class="messages__details__upper__contributor">
              ${message.user_name}
            </div>
            <div class="messages__details__upper__date">
              ${message.created_at}
            </div>
          </div>
          <div class="messages__details__text">
            <img class="messages__details__text__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      var html =
       `<div class="messages__details">
          <div class="messages__details__upper">
            <div class="messages__details__upper__contributor">
              ${message.user_name}
            </div>
            <div class="messages__details__upper__date">
              ${message.created_at}
            </div>
          </div>
          <div class="messages__details__text">
            <p class="messages__details__text__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop('disabled', false);
    })
  });
});