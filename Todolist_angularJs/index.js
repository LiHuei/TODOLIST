angular.module('todoApp', [])
    .controller('todoController', function () {
        var todoList = this;
        todoList.todos = [
            { text: 'TODO 1', done: false, clickStar: false, },
            { text: 'TODO 2', done: false, clickStar: false, },
            { text: 'TODO 3', done: false, clickStar: false, },
        ]

        todoList.clickStar = function (todo) {
            todo.clickStar = true;
        }
    })