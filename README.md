# Coder Management

## Description
CoderManagement is a platform that helps individuals and teams manage their tasks.
These are more than just simple to-do lists. Task management tools allow teams to collaborate digitally by organizing, prioritizing, and assigning tasks to each other.

## Features

- **User Management**
  - Create a new user with the user's name. The default role is employee.
  - Get all users with filters. You can decide yourself which queries you allow in the request based on the User schema.
  - Search for an employee by name.
  - Get all tasks of 1 user (Decide which one is better: by name or by id?).

- **Task Management**
  - Create a task with the required information.
  - Browse your tasks with filter allowance (name, status, createdAt,…). The following attributes are required to help filter tasks by status, and help sort by createdAt, updatedAt.
    - status
    - createdAt
    - updatedAt
  - Get a single task by id.
  - Assign a task to a user or unassign them.
  - Update the status of a task. There's a rule for updating task status: when the status is set to done, it can't be changed to other value except archive.
  - Soft delete a task.
