// govnokod begin

;(function() {
  var STATES = {
    DONE  : 1,
    UNDONE: 2,
    CANCEL: 3,
  }

  toDo = {
    lines    : [],
    form     : {
      submit   : null,
      clear    : null,
      name     : null,
    },

    rootElem : null,

    init: function() {
      this.lines = this.load();
      this.rootElem = document.getElementById('toDo');
      this.buildHtml();
      this.addListeners();
    },

    addListeners: function() {
      this.form.submit = document.getElementById('toDoSubmit');
      this.form.clear  = document.getElementById('toDoClear');
      this.form.name   = document.getElementById('name');


      this.form.clear.addEventListener('click', this.clear.bind(this));

      this.form.submit.addEventListener('click', function(){
        if (this.form.name.value !== '') {
          this.lines.push({
            name     : this.form.name.value,
            completed : false,
          });

          this.save();
          this.buildHtml();
          this.form.name.value = '';
        }
      }.bind(this));

      this.rootElem.addEventListener('click', function(env){
        if (env.target.className === "delete" && env.target.dataset.id !== undefined) {
          this.delLine(env.target.dataset.id);
        }

        if (env.target.className === "check" && env.target.dataset.id !== undefined) {
            this.checkLine(env.target.dataset.id, env.target.checked);
        }

      }.bind(this));
    },

    load: function() {
      return JSON.parse(window.localStorage.getItem('toDo-lines')) || [];
    },

    save: function() {
      window.localStorage.setItem('toDo-lines', JSON.stringify(this.lines));
    },

    clear: function() {
      this.lines = [];
      this.save();
      this.buildHtml();
    },

    buildHtml: function() {

      if(!this.lines.length) {
        this.rootElem.innerHTML = '<li class="center">Ничего нет</li>';
        return;
      }

      //draw
      var html = '';
      this.lines.forEach(function(elem, key , arr) {
        html += '<li>'+
                  '<input class="check" data-id="'+ key +'" type="checkbox"' + (elem.completed? 'checked' : '') + '>' +
                    elem.name + ' ' +
                  '<span data-id="'+ key +'" class="delete"> ' +
                    '&#xD7; ' +
                  '</span>' +
                '</li>';
      });

      this.rootElem.innerHTML = html;
    },

    delLine: function(id) {
      this.lines.splice(id,1);
      this.save();
      this.buildHtml();
    },

    checkLine: function(id, state) {
      this.lines[id].completed = state;
      this.save();
    },

    moveLine: function() {
// i like to move it move it
    },

    sortLines: function() {
// sort me gently kudasai
    },
  };

  window.toDo = toDo;
})();

var data = [
  {
    name: 'Создать данные',
    completed: true,
  },
  {
    name: 'Создать форму',
    completed: true,
  },
    {
    name: 'Создать ещё что-то',
    completed: false,
  }
];

toDo.init();

// govnokod end
