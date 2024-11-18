import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanBoard.css';
import  Urgent  from '../assets/Urgent.svg';
import  High  from '../assets/High.svg';
import  Medium  from '../assets/Medium.svg';
import  NoPriority from '../assets/No Priority.svg';
import  Low from '../assets/Low.svg';

import  Backlog  from '../assets/Backlog.svg';
import  Todo  from '../assets/Todo.svg';
import  InProgress  from '../assets/InProgress.svg';
import  Done  from '../assets/Done.svg';
import  Cancelled  from '../assets/Cancelled.svg';
import  add  from '../assets/add.svg';
import dot from '../assets/3dot.svg';
import User from '../assets/User.svg';


const KanbanBoard = ({  priorityScores, grouping, ordering }) => {
  const [tickets, setTickets] = React.useState([]);
  const statuses = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
  const priorities = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };

  // Icons mapping
  const priorityIcons = {
    "Urgent": Urgent,
    "High": High,
    "Medium": Medium,
    "Low": Low,
    "No priority": NoPriority
  };

  const statusIcons = {
    "Backlog": Backlog,
    "Todo": Todo,
    "In progress": InProgress,
    "Done": Done,
    "Canceled": Cancelled
  };

  // Fetch data on mount
  React.useEffect(() => {
    const fetchTickets = async () => {  
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        const data = await response.json();
        console.log('Fetched Data:', data); // Debugging line

        const mappedTickets = data.tickets.map((ticket) => {
          const user = data.users.find((u) => u.id === ticket.userId);
          return { ...ticket, userName: user ? user.name : "Unknown User" };
        });
        setTickets(mappedTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  // Group tickets
  const groupTickets = (tickets) => {
    if (grouping === "Priority") {
      return priorityScores.reduce((acc, score) => {
        const groupName = priorities[score];
        acc[groupName] = tickets.filter((ticket) => ticket.priority === score);
        return acc;
      }, {});
    }

    if (grouping === "User") {
      return tickets.reduce((acc, ticket) => {
        const groupName = ticket.userName || "Unknown User";
        if (!acc[groupName]) acc[groupName] = [];
        acc[groupName].push(ticket);
        return acc;
      }, {});
    }

    if (grouping === "Status") {
      return statuses.reduce((acc, status) => {
        acc[status] = tickets.filter((ticket) => ticket.status === status);
        return acc;
      }, {});
    }

    return { "All Tickets": tickets };
  };

  // Order tickets
  const orderTickets = (groupedTickets) => {
    return Object.entries(groupedTickets).reduce((acc, [group, groupTickets]) => {
      const orderedTickets = [...groupTickets].sort((a, b) => {
        if (ordering === "Priority") return b.priority - a.priority;
        if (ordering === "Title") return a.title.localeCompare(b.title);
        return 0;
      });
      acc[group] = orderedTickets;
      return acc;
    }, {});
  };

  const groupedTickets = groupTickets(tickets);
  const orderedTickets = orderTickets(groupedTickets);

  return (
    <div className="dashboard">
      {Object.entries(orderedTickets).map(([group, tickets], idx) => (
        <div className="dashboard-group" key={idx}>
          <div className="dashboard-header">
            <div className="dashboard-group2">
              {/* Dynamically render priority or status icons */}
              {(grouping === "Priority" && priorityIcons[group]) ? (
                <img src={priorityIcons[group]} alt={`${group} Icon`} className="icon_bar" />
              ) : null}
              {(grouping === "Status" && statusIcons[group]) ? (
                <img src={statusIcons[group]} alt={`${group} Icon`} className="icon_bar" />
              ) : null}
              {(grouping === "User" ) ? (
              <img src={User} alt={`${group} Icon`} className="icon_bar" />
              ) : null}

              <h2 className="dashboard-group-title">{group}</h2>
              <span className="icon_bar">{tickets.length}</span>
            </div>
            <div className="dashboard-group2">
              <img src={add} alt="Add Icon" className="icon_bar" />
              <img src={dot} alt="More Options Icon" className="icon_bar" />
            </div>
          </div>
          <div className="dashboard-group-cards">
            {tickets.map((ticket) => (
              <KanbanCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
