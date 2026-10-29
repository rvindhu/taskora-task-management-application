# Taskora — Smart Task & Life Management

A responsive, portfolio-ready task manager built with React, Vite, JavaScript, CSS, Lucide React icons, and browser LocalStorage. No backend or paid API is used.

## Features

- Dashboard statistics, completion progress, daily priorities, and weekly calendar
- Create, edit, delete, complete, search, filter, sort, and reschedule tasks
- Due dates, priority, category, description, recurring tasks, and subtasks
- Today, Upcoming, Completed, and Recovery Center views
- Recovery plan ordered by priority and deadline, split using a configurable daily limit
- Repeated-postponement indicators and weekly recovery summary
- Daily focus mode, light/dark themes, responsive sidebar, and mobile navigation
- JSON backup export/import with validation and confirmation before replacing tasks
- Sample tasks can be added and removed independently
- LocalStorage persistence and accessible labels/focus states

## Requirements

Install a current Node.js LTS release (npm is included). Verify installation:

```bash
node -v
npm -v
```

## Run in VS Code

1. Extract the `taskora.zip` archive.
2. Open the extracted `taskora` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed by Vite (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Folder structure

```text
taskora/
├── index.html
├── package.json
├── README.md
└── src/
    ├── main.jsx                 # React entry point
    ├── App.jsx                  # App state, page views, task workflows
    ├── index.css                # Design tokens, layout, responsive and dark themes
    ├── components/
    │   ├── ConfirmDialog.jsx    # Reusable confirmation dialog
    │   ├── EmptyState.jsx       # Friendly empty states
    │   ├── FilterBar.jsx        # Status/priority/category/sort controls
    │   ├── Sidebar.jsx          # Desktop sidebar and mobile navigation
    │   ├── StatisticsCard.jsx   # Dashboard metric card
    │   ├── TaskCard.jsx         # Task row and subtask controls
    │   └── TaskForm.jsx         # Create/edit task form
    ├── hooks/
    │   └── useLocalStorage.js   # Persistent React state
    └── utils/
        └── taskUtils.js         # Date, sample, recurring, recovery helpers
```

## Recovery scheduling logic

The Recovery Center selects incomplete tasks whose due date is before today. It sorts these by priority (High, Medium, Low), then oldest deadline. It assigns up to the chosen daily limit to today, then the next day, and so on. Rescheduling increments the task's postponement count; two or more postponements are highlighted. These are deterministic rules, not AI predictions.

## Data and privacy

Tasks and preferences are saved in LocalStorage on the current browser/device. They are not synced to other devices. Browser site-data cleanup can erase them, so use **Settings → Export JSON** to keep a backup. Importing a JSON backup requires confirmation before current tasks are replaced.

## Manual test checklist

- [ ] Create a task with title, description, due date, category, and priority.
- [ ] Edit it and verify changes are saved after refresh.
- [ ] Complete it, then mark it incomplete.
- [ ] Delete a task and cancel/confirm the dialog.
- [ ] Search by both title and description.
- [ ] Filter by status, priority, and category; sort by deadline, creation date, priority, and title.
- [ ] Add subtasks, check/uncheck them, and edit the task.
- [ ] Create a recurring task and complete it; verify the next occurrence is created.
- [ ] Add sample tasks and remove only samples.
- [ ] Create an overdue task and try Move to today, Tomorrow, and In 3 days.
- [ ] Change the daily limit and verify the recovery plan changes.
- [ ] Switch light/dark themes and refresh.
- [ ] Export JSON, import it, and verify replacement confirmation.
- [ ] Try malformed JSON and confirm a friendly error appears.
- [ ] Test narrow/mobile width and keyboard focus states.

## GitHub and free deployment

1. Create a new GitHub repository named `taskora-smart-task-manager`.
2. In the project folder, run:

   ```bash
   git init
   git add .
   git commit -m "Build Taskora task management app"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/taskora-smart-task-manager.git
   git push -u origin main
   ```

3. For free deployment, use Netlify or Vercel. Import the GitHub repository and set the build command to `npm run build` and the publish/output directory to `dist`. No environment variables are needed.

## Customization

Edit the CSS variables at the top of `src/index.css` to adjust colors, surfaces, borders, and shadows. Component styling uses reusable class names, and the main task logic is kept in `src/App.jsx` with date and recovery helpers in `src/utils/taskUtils.js`.
