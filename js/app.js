(function() {

  'use strict';

  const ENTER_KEY = 13;
  let newTodoDom = document.getElementById('new-todo');
  let syncDom = document.getElementById('sync-wrapper');

  // EDITING STARTS HERE (you dont need to edit anything above this line)

  let db = new PouchDB('todos');
  const remoteCouch = 'http://127.0.0.1:5984/todos';

  db.changes({
    since: 'now',
    live: true
  }).on('change', showTodos);

  // We have to create a new todo document and enter it in the database
  function addTodo(text) {
    const todo = {
      _id: new Date().toISOString(),
      title: text,
      completed: false,
      removed: false,
    };

    db.put(todo).then(function (response) {
      console.log('Successfully posted a todo!');
    }).catch(function(err) {

      console.log(err);
      syncError();

    });
  }

  // Show the current list of todos by reading them from the database
  function showTodos() {
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
      redrawTodosUI(doc.rows);
    });
  }

  function checkboxChanged(todo, event) {
    todo.completed = event.target.checked;
    db.put(todo);
  }

  // User pressed the delete button for a todo, delete it
  function deleteButtonPressed(todo) {

    todo.removed = !todo.removed;
    db.put(todo);
    //db.remove(todo);
  }

  // The input box when editing a todo has blurred, we should save
  // the new title or delete the todo if the title is empty
  function todoBlurred(todo, event) {
    const trimmedText = event.target.value.trim();
    if (!trimmedText) {
      db.remove(todo);
    } else {
      todo.title = trimmedText;
      db.put(todo);
    }
  }

  function onSyncPaused(err) {
    if (err) {
        console.log(err);
        syncError();
      }
  }

  function onSyncActive() {
    syncSuccess();
  }

  // Initialise a sync with the remote server
  function sync() {
    syncDom.setAttribute('data-sync-state', 'syncing');
    const opts = {live: true, retry: true};
    db.replicate.to(remoteCouch, opts).on('paused', onSyncPaused).on('active', onSyncActive).on('error', syncError);
    db.replicate.from(remoteCouch, opts).on('paused', onSyncPaused).on('active', onSyncActive).on('error', syncError);;
  }

  // EDITING STARTS HERE (you dont need to edit anything below this line)

  //
  function syncSuccess() {
    syncDom.setAttribute('data-sync-state', 'syncing');
  }

  // There was some form or error syncing
  function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
  }

  // User has double clicked a todo, display an input so they can edit the title
  function todoDblClicked(todo) {
    let div = document.getElementById('li_' + todo._id);
    let inputEditTodo = document.getElementById('input_' + todo._id);
    div.className = 'editing';
    inputEditTodo.focus();
  }

  // If they press enter while editing an entry, blur it to trigger save
  // (or delete)
  function todoKeyPressed(todo, event) {
    if (event.keyCode === ENTER_KEY) {
      let inputEditTodo = document.getElementById('input_' + todo._id);
      inputEditTodo.blur();
    }
  }

  // Given an object representing a todo, this will create a list item
  // to display it.
  function createTodoListItem(todo) {
    //var checkbox = document.createElement('input');
    //checkbox.className = 'toggle';
    //checkbox.type = 'checkbox';
    //checkbox.addEventListener('change', checkboxChanged.bind(this, todo));

    let timer = 0;
    const delay = 200;
    let prevent = false;

    let label = document.createElement('label');
    label.appendChild( document.createTextNode(todo.title));

    label.addEventListener('click', function() {
      timer = setTimeout(function() {
      if (!prevent) {
        deleteButtonPressed.call(this, todo);
      }
        prevent = false;
      }, delay);
    });
    label.addEventListener('dblclick', function() {
      clearTimeout(timer);
      prevent = true;
      todoDblClicked.call(this, todo);
    });

    //label.addEventListener('click', deleteButtonPressed.bind(this, todo));
    //label.addEventListener('dblclick', todoDblClicked.bind(this, todo));
    //label.addEventListener('touch', todoDblClicked.bind(this, todo));


    //var deleteLink = document.createElement('button');
    //deleteLink.className = 'destroy';
    //deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, todo));

    let divDisplay = document.createElement('div');
    divDisplay.className = 'view';

    //divDisplay.appendChild(checkbox);
    divDisplay.appendChild(label);
    //divDisplay.appendChild(deleteLink);

    let inputEditTodo = document.createElement('input');
    inputEditTodo.id = 'input_' + todo._id;
    inputEditTodo.className = 'edit';
    inputEditTodo.value = todo.title;
    inputEditTodo.addEventListener('keypress', todoKeyPressed.bind(this, todo));
    inputEditTodo.addEventListener('blur', todoBlurred.bind(this, todo));

    let li = document.createElement('li');
    li.id = 'li_' + todo._id;
    li.appendChild(divDisplay);
    li.appendChild(inputEditTodo);

    //if (todo.completed) {
    //  li.className += 'complete';
      //checkbox.checked = true;
    //}

    if (todo.removed) {
      li.className += ' removed';
    }

    return li;
  }

  function redrawTodosUI(todos) {
    let ul = document.getElementById('todo-list');
    ul.innerHTML = '';
    todos.forEach(function(todo) {
      ul.appendChild(createTodoListItem(todo.doc));
    });
  }

  function newTodoKeyPressHandler( event ) {
    if (event.keyCode === ENTER_KEY) {
      addTodo(newTodoDom.value);
      newTodoDom.value = '';
    }
  }

  function addEventListeners() {
    newTodoDom.addEventListener('keypress', newTodoKeyPressHandler, false);
  }

  addEventListeners();
  showTodos();

  if (remoteCouch) {
    sync();
  }

})();
