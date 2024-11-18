import './KanbanCard.css';

// Import SVG files directly
import AccountCircle from '../assets/User.svg'; // User icon SVG (can be replaced with a different SVG if needed)
import Urgent from '../assets/Urgent.svg';
import Completed from '../assets/Completed.svg';

import Backlog from '../assets/Backlog.svg';
import Todo from '../assets/Todo.svg';
import InProgress from '../assets/InProgress.svg';
import Done from '../assets/Done.svg';
import Cancelled from '../assets/Cancelled.svg';

import High from '../assets/High.svg';
import Medium from '../assets/Medium.svg';
import NoPriority from '../assets/No Priority.svg';
import Low from '../assets/Low.svg';

const KanbanCard = ({ ticket }) => {
  const isUrgent = ticket.priority === 'High'; // Example check for urgent tasks
  const isCompleted = ticket.status === 'Completed'; // Example check for completed tasks

  const statusIcons = {
    "Backlog": Backlog,
    "Todo": Todo,
    "In progress": InProgress,
    "Done": Done,
    "Canceled": Cancelled
  };

  const priorityIcons = {
    0: NoPriority,   
    1: Low,         
    2: Medium,      
    3: High,       
    4: Urgent       
  };


  return (
    <div className="ticket-main">
      {/* Ticket Header: Display ID and User Icon */}
      <div className="ticket-header">
        <div className="ticket-id">{ticket.id}</div>
        <img src={AccountCircle} className="ticket-icon" alt="User Icon" />
      </div>

      {/* Ticket Content: Title and Status Icon */}
      <div className="ticket-content">
        <div className="ticket-content-title">
          <div className="ticket-title">
            <img src={statusIcons[ticket.status]} className="icon-bar" alt="status-icon" />
            <b>{ticket.title}</b>
          </div>

          {/* Conditionally render urgency and completion icons */}
          {isUrgent && <img src={Urgent} className="ticket-icon urgent-icon" alt="urgent-icon" />}
          {isCompleted && <img src={Completed} className="ticket-icon completed-icon" alt="completed-icon" />}
        </div>
      </div>

      {/* Ticket Metadata: Tags Section */}
      <div className="ticket-metadata">
        <div className="ticket-tags">
          {/* Display priority icon */}
          <div className="ticket-tag">
            <img src={priorityIcons[ticket.priority]} className="icon-bar" alt="priority-icon" />
          </div>

          {/* Render tags with circular indicators */}
          {ticket.tag && ticket.tag.map((tag, key) => (
            <div key={key} className="ticket-tag">
              <div>{tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
