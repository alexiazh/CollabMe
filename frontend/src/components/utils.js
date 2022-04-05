import { format, parseISO } from "date-fns";
import { formatDate, formatRange } from '@fullcalendar/react';

export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}`,
  };
}

export function colorEvents(events) {
  if (events.length === 0)
    return events;

  let eventsWithColor = [];
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const newEvent = {...event, color: stringToColor(event.title)};
    eventsWithColor.push(newEvent);
  }
  return eventsWithColor;
}

export function formatTasks(tasks) {
  if (tasks.length === 0)
    return tasks;

  let formattedTasks = [];
  let taskTitles = [];
  for (let i = 0; i < tasks.length; i++) {
    let formattedTask = [];
    let newSubTaskTitle = [];
    let newMember = [];
    let newSubTask = [];
    let newSubTasks = [];
    const task = tasks[i];
    if (taskTitles.indexOf(task.title) > -1) {
      formattedTask = (formattedTasks.find(formattedTask => formattedTask.title === task.title));
      newSubTasks = formattedTask.subtasks.filter(subtask => subtask.title !== '');
      formattedTasks = formattedTasks.filter(formattedTask => formattedTask.title !== task.title);
    } else {
      const { id, title, description, assigned, completed, created_at } = task;
      formattedTask = { id, title, description, assigned, completed, created_at };
      taskTitles.push(task.title);
    }
    newSubTaskTitle = task.subtask;
    newMember = task.member;
    newSubTask = {member: newMember, title: newSubTaskTitle};
    newSubTasks.push(newSubTask);
    formattedTask = {...formattedTask, subtasks: newSubTasks};
    formattedTasks.push(formattedTask);
  }
  formattedTasks.sort((a, b) => new Date(b.created_at.split('/').reverse()) - new Date(a.created_at.split('/').reverse()));
  return formattedTasks;
}

export function formatGroup(members) {
  if (members.length === 0)
    return members;

  let formattedGroup = [];
  for (let i = 0; i < members.length; i++) {
    const { id, username, first_name, last_name, email, contact } = members[i];
    let newMember = { id, username, first_name, last_name, email, contact };
    const date = format(new Date(members[i].created_at), "MM/d/yyyy");
    newMember = {...newMember, created_at: date}
    formattedGroup.push(newMember);
  }
  return formattedGroup;
}

export function formatTimeRange(start, end) {
  const localStart = start.substring(0, start.length - 1);
  const localEnd = end.substring(0, end.length - 1);
  const range = formatRange(localStart, localEnd, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // separator: ' - ',
    hour12: false,
    meridiem: false,
  })
  return range;
}

export function formatLogs(logs) {
  if (logs.length === 0)
    return logs;

  let formattedLogs = [];
  for (let i = 0; i < logs.length; i++) {
    const { id, notes, start, end, created_at } = logs[i];
    let newLog = { id, notes };
    const date = format(new Date(created_at), "MM/d/yyyy eee HH:mm ");
    const range = formatTimeRange(start, end);
    newLog = {...newLog, created_at: date, session: range};
    formattedLogs.push(newLog);
  }
  return formattedLogs;
}

export function getUsernames(members) {
  if (members.length === 0)
    return members;

  let usernames = [];
  for (let i = 0; i < members.length; i++) {
    const { username } = members[i];
    usernames.push(username);
  }
  return usernames;
}

// export function availableUsers(dateInfo, events) {
//   const year = dateInfo.date.getFullYear();
//   const month = dateInfo.date.getMonth();
//   const date = dateInfo.date.getDate();
//   const hours = dateInfo.date.getHours();
//   const minutes = dateInfo.date.getMinutes();
//   const eventDate = new Date('2022-03-28T10:30:00');
//   console.log(date.getHours());
//   console.log(events);
//   for (const event of events) {
//     const start = new Date(event.start);
//     console.log(start);
//   }
// }