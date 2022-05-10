$(document).ready(function() {

   // функция для LocalStorage
   // начальное состояние
   function initialState() {
      if (localStorage.getItem('comments') == null) { //getItem получение ключа, сам ключ - comments
         $('.comments__none').show();
      } else {
         $('.comments__list').html(localStorage.getItem('comments'));
         $('.comments__none').hide();
      }
   }

   initialState();

   function addToStorage() {
      let content = $('.comments__list').html(); //получаем html код
      localStorage.setItem('comments', content);
   }

   function addComment() {
      let name = $('input').val(); //на странице только один input поэтому без класса, здесь получаем значение val()
      let text = $('textarea').val();
      let date = new Date().toLocaleString(); //дату приводим к строке

      if (name && text) {

         $('input').removeClass('error'); //убираем ошибку в виде красных бордеров, если поле не заполнено
         $('textarea').removeClass('error');

         // метод append позволяет добавить что-то во что-то. 
         $('.comments__list').append(`  



            <div class="comments__item">
               <button class="comments__delete"></button>
               <div class="comments__author">${name}</div>
               <div class="comments__text">${text}</div>
               <div class="comments__date">${date}</div>
           </div>
         `);



         $('.comments__none').hide(); // скрываем надпись об отсуствии комментариев

          name = $('input').val(' '); // передаем пустую строку, чтобы очистились данные
          text = $('textarea').val(' ');

          addToStorage();
      } else {
         $('input').addClass('error'); //добавляем ошибку в виде красных бордеров, если поле не заполнено
         $('textarea').addClass('error');
      }

   }

   function deleteComment(item) {
      item.remove();

      let items = $('.comments__item');

      addToStorage();

      if (items.length == 0) {
         $('.comments__none').show(); //показывает надпись об отсутствии комментариев, если их нет
         localStorage.removeItem('comments');
      }
   }

   $('body').on('click', '.comments__add', addComment);

   $('body').on('click', '.comments__delete', function() {
      let item = $(this).parents('.comments__item'); //находим родителя кнопки

      deleteComment(item); // передаем текущий элемент
   });

});