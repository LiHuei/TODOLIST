angular.module('todoApp', [])
    .controller('todoController', function () {
        var todoList = this;
        this.todos = [
            new Todo('TODO 1'),
            new Todo('TODO 2'),
            new Todo('TODO 3'),
        ]

        this.tabs = [
            new Tab('My task'),
            new Tab('In progress'),
            new Tab('Completed'),
        ]


        // this.currentTab = 'all';

        todoList.addTodo = function () {
            var newTodo = { text: todoList.newTodoText, done: false, clickStar: false };
            todoList.todos.push(newTodo);
            todoList.newTodoText = '';
        }

        todoList.totalTodo = function () {
            var left = todoList.todos.filter(todo => todo.done == false);
            return left.length;
        }

        // this.inProgress = function () {
        //     this.inProgressTodos = todoList.todos.filter(todo => todo.done == false);
        //     this.currentTab = 'inProgress';
        // }

        // this.toMyTasks = function () {
        //     this.currentTab = 'myTask';
        // }

        // this.toCompleted = function () {
        //     this.allTodos = todoList.todos.filter(todo => todo.done == true);
        //     this.currentTab = 'completed';
        // }

        this.selectTab = function (tab) {
            todoList.tabs.forEach(item => item.active = false)
            tab.select();
            this.currentTab = tab.text;

            if (tab.isInProgress) {
                this.filterTodos = todoList.todos.filter(todo => todo.done == false);
            }
            if (tab.isCompleted) {
                this.filterTodos = todoList.todos.filter(todo => todo.done == true);
            }

        }

        this.selectTab(this.tabs[0])
    })

class Todo {
    text;
    done = false;
    clickStar = false;
    constructor(text) {
        this.text = text;
    }
}

class Tab {
    text;
    active;
    constructor(text) {
        this.text = text;
    }

    select() {
        this.active = true;
    }

    get isInProgress() {
        return this.text == 'In progress'
    }

    get isCompleted() {
        return this.text == 'Completed'
    }
}