angular.module('todoApp', [])
    .controller('todoController', function () {
        var todoList = this;
        todoList.todos = [
            { text: 'TODO 1', done: false, clickStar: false, },
            { text: 'TODO 2', done: false, clickStar: false, },
            { text: 'TODO 3', done: false, clickStar: false, },
        ]

        todoList.addTodo = function () {
            var newTodo = { text: todoList.newTodoText, done: false, clickStar: false};
            todoList.todos.push(newTodo);
            todoList.newTodoText = '';
        }

        todoList.totalTodo = function () {
            var left = todoList.todos.filter(todo => todo.done == false);
            return left.length;
        }
    })