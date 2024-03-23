I wass accidentally submitting assignment work time to time to the wrong repository, thats why it delayed to push into this repository.
Kindly check follwing repository check the timestamps of me commits:
    https://github.com/kirusanth-08/labsheet2-AF.git

Seperate Folders, files created for Models, Controllers, Routes, Middleware, configuration file(.env)


"npm start": Start development server
"npm run devStart":  Start development server, automatically restarts whenever code changes occur.


## API Routes

### Login Routes    [Login Route file](./routes/loginRoute.js)
- `POST /login`: Logs in a user. No authentication or authorization required.
- `POST /logout`: Logs out a user. Authentication required.

### User Routes     [User Route file](./routes/userRoutes.js)
- `POST /api/users`: Creates a new user. Requires authentication and admin role.
- `GET /api/users`: Gets all users. Requires authentication and either admin or faculty role.
- `GET /api/users/faculty/:faculty`: Gets all users for a specific faculty. Requires authentication and either admin or faculty role.
- `GET /api/users`: Gets a user by their ID. Requires authentication and user verification.
- `PUT /api/users/:id`: Updates a user by their ID. Requires authentication and user verification.
- `DELETE /api/users/:id`: Deletes a user by their ID. Requires authentication and admin role.

### Course Routes   [Course Route File](./routes/courseRoutes.js)
- `POST /api/courses`: Creates a new course. Requires authentication and admin role.
- `GET /api/courses/faculty/:faculty`: Gets all courses for a specific faculty. No authentication or authorization required.
- `GET /api/courses/:code`: Gets a course by its course code. No authentication or authorization required.
- `PUT /api/courses/:code`: Updates a course by its course code. Requires authentication and admin role.
- `DELETE /api/courses/:code`: Deletes a course. Requires authentication and admin role.

### Enrollment Routes   [Enrollment Route file](./routes/enrollmentRoutes.js)
- `POST /api/enrollment`: Creates a new enrollment. Requires authentication and admin role.
- `GET /api/enrolledStudents/:id`: Gets all students enrolled in a specific course. Requires authentication and admin role.
- `GET /api/enrolledCourses/:id`: Gets all courses that a specific student is enrolled in. Requires authentication.
- `DELETE /api/enrollment/:id`: Deletes an enrollment. Requires authentication and admin role.

### Timetable Routes    [Timetable Route file](./routes/timetableRoutes.js)
- `GET /api/timetable/:faculty/:year/:semester`: Gets the timetable for a specific faculty, year, and semester. No authentication or authorization required.
- `GET /api/timetable/user`: Gets the timetable for a specific student. Authentication and user verification required.
- `GET /api/timetable/:id`: Gets a single timetable entry. No authentication or authorization required.
- `POST /api/timetable`: Creates a new timetable for a course. Requires authentication and either admin or faculty role.
- `PUT /api/timetable/timechange/:id` and `PUT /api/timetable/locationChange/:id`: Updates the time and location of a timetable entry, respectively. Requires authentication and either admin or faculty role.
- `DELETE /api/timetable/:id`: Deletes a timetable entry. Requires authentication and either admin or faculty role.

### Room Routes     [Room Route file](./routes/roomRoutes.js)
- `POST /api/room`: Creates a new room. Requires authentication and admin role.
- `GET /api/room`: Gets all rooms. Requires authentication and either admin or faculty role.
- `GET /api/room/:id`: Gets a room by its ID. Requires authentication and either admin or faculty role.
- `PUT /api/room/:id`: Updates a room by its ID. Requires authentication and admin role.
- `DELETE /api/room/:id`: Deletes a room by its ID. Requires authentication and admin role.

### Notification Routes     [Notification Route file](./routes/notificationRoutes.js)
- `GET /api/notifications`: Gets the notifications for a specific user. Requires authentication and user verification.
- `DELETE /api/notifications/:id`: Deletes a notification. Requires authentication and either admin or faculty role.