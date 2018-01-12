import React from 'react';
import { Link } from 'react-router-dom';
import { Collection, Pagination } from 'react-materialize';

const CardsList = ({ cards, updateCards }) => {

    // debugger;
    if (cards.cards && cards.cards.length > 0) {
        let renderCards = cards.cards.map(card => 
            // listgroupitem with key of card.id
                // link with key of card.id to card show page, by name for now
            // close list
            <Collection key={ card.id }>
                <Link key={ card.id } to={`/cards/${card.id}`}>{ card.name } - { card.set }</Link>
            </Collection>
        );

        let changePage = (event) => {
            updateCards(event)
        }
    
        return (
            <div>
                { renderCards }
                <Pagination items={cards.totalPages / 10} activePage={1} maxButtons={8} onSelect={changePage}/>
            </div>
            // list
              // { renderCards }   
            // end list
        )
    } else {
        return (
            <div>
                <h1>JUST GET IT</h1>
            </div>
        )
    }
}

export default CardsList;