import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanBoard.css'

const KanbanBoard = ({ groupedTickets }) => {
  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([group, tickets]) => (
        <div key={group} className="kanban-column">
          <h2 className="group-header">{group}</h2>
          <div className="group-tickets">
            {tickets.map(ticket => (
              <KanbanCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export default KanbanBoard;
