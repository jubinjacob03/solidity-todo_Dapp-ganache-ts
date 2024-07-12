// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    event TaskCreated (
        uint id,
        string content,
        bool completed
    );

    event TaskToggled (
        uint id,
        bool completed
    );

    event TaskDeleted (
        uint id
    );

    event TaskUpdated (
        uint id,
        string content
    );

    mapping(address => mapping(uint => Task)) public tasks;
    mapping(address => uint) public tasksCount;
    mapping(address => uint) public completedTasksCount;

    constructor() {
        createTask("Hello World!!!");
    }

    modifier taskExists(uint _id) {
        require(_id < tasksCount[msg.sender], "Task does not exist");
        _;
    }

    function createTask(string memory _content) public {
        uint taskCount = tasksCount[msg.sender];
        tasks[msg.sender][taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
        tasksCount[msg.sender]++;
    }

    function toggleCompleted(uint _id) public taskExists(_id) {
        Task storage task = tasks[msg.sender][_id];
        task.completed = !task.completed;
        tasks[msg.sender][_id] = task;
        if (task.completed) {
            completedTasksCount[msg.sender]++;
        } else {
            completedTasksCount[msg.sender]--;
        }
        emit TaskToggled(_id, task.completed);
    }

    function deleteTask(uint _id) public taskExists(_id) {
        delete tasks[msg.sender][_id];
        emit TaskDeleted(_id);
    }

    function updateTaskContent(uint _id, string memory _content) public taskExists(_id) {
        Task storage task = tasks[msg.sender][_id];
        task.content = _content;
        emit TaskUpdated(_id, _content);
    }

    function getCompletedTasksCount() public view returns (uint) {
        return completedTasksCount[msg.sender];
    }

    function getAllTasks() public view returns (Task[] memory) {
        uint taskCount = tasksCount[msg.sender];
        Task[] memory allTasks = new Task[](taskCount);
        for (uint i = 0; i < taskCount; i++) {
            allTasks[i] = tasks[msg.sender][i];
        }
        return allTasks;
    }
}
