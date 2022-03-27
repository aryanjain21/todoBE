const List = require('../models/list');
const User = require('../models/user');

module.exports = {
    addTask: async (req, res) => {
        try {
            if (!req.body.task) {
                throw { message: 'Task should not be empty.' }
            }
            req.body.userId = req.user._id;
            const task = new List(req.body);
            let newTask = await task.save();
            return res.json({
                status: 200,
                message: 'Task Added successfully',
                data: newTask
            });
        } catch (error) {
            return res.status(400).json({
                message: (error && error.message) || 'Oops!! failed to add task'
            });
        }
    },

    getTaskList: async (req, res) => {
        try {
            let list = await List.find({ userId: req.user._id });
            return res.json({
                status: 200,
                message: 'Task list fetched successfully',
                data: list
            });
        } catch (error) {
            return res.status(400).json({
                message: (error && error.message) || 'Oops!! failed to fetch task list'
            });
        }
    },

    updateTask: async (req, res) => {
        try {
            if (!req.body.taskId) {
                throw { message: 'Task id is required.' };
            }
            let task = await List.findById({ _id: req.body.taskId });
            if (!task) {
                throw { message: 'Task does not exist.' };
            }
            let updatedTask = await List.findByIdAndUpdate(task._id, req.body, { new: true });
            if (!updatedTask) {
                throw { message: 'Failed to update task.' };
            }
            return res.json({
                status: 200,
                message: 'Task updated successfully!',
                data: updatedTask
            });
        } catch (error) {
            return res.status(400).json({
                message: (error && error.message) || 'Oops!! failed to update task'
            });
        }
    },

    deleteTask: async (req, res) => {
        try {
            if (!req.body.taskId) {
                throw { message: 'Task id required.' }
            }
            let task = await List.findByIdAndDelete(req.body.taskId);
            if(!task) {
                throw { message: 'Task does not exist.' }
            }
            return res.json({
                status: 200,
                message: 'Task deleted successfully',
                data: task
            });
        } catch (error) {
            return res.status(400).json({
                message: (error && error.message) || 'Oops!! failed to delete task'
            });
        }
    }
}