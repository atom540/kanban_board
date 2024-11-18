import React, { useEffect, useState } from 'react';
import './App.css';
import KanbanBoard from './component/KanbanBoard';


const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('none'); // Default: no grouping

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();

        // Map user names to tickets
        const mappedTickets = data.tickets.map(ticket => {
          const user = data.users.find(u => u.id === ticket.userId);
          return {
            ...ticket,
            userName: user ? user.name : 'Unknown User',
          };
        });

        setTickets(mappedTickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Group tickets dynamically
  const groupTickets = (tickets, groupBy) => {
    if (groupBy === 'priority') {
      const priorityLabels = {
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No Priority',
      };

      return tickets.reduce((groups, ticket) => {
        const priority = priorityLabels[ticket.priority] || 'Unknown Priority';
        if (!groups[priority]) groups[priority] = [];
        groups[priority].push(ticket);
        return groups;
      }, {});
    }

    if (groupBy === 'userName') {
      return tickets.reduce((groups, ticket) => {
        const user = ticket.userName || 'Unknown User';
        if (!groups[user]) groups[user] = [];
        groups[user].push(ticket);
        return groups;
      }, {});
    }

    return { 'All Tickets': tickets }; // Default: no grouping
  };

  const groupedTickets = groupTickets(tickets, groupBy);

  return (
    <div>
      <h1>Kanban Board</h1>

     
      <div className="grouping-options">
        <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
          <option value="none">No Grouping</option>
          <option value="priority">Group by Priority</option>
          <option value="userName">Group by User</option>
        </select>
      </div>

      
      <KanbanBoard groupedTickets={groupedTickets} />
    </div>
  );
};
export default App;
