import React from 'react';
import { Link } from 'react-router-dom';
import { Collection, Pagination, ProgressBar, Card } from 'react-materialize';
import '../styles/cards-list.css'

const CardsList = ({ cards, updateCards }) => {

    // if we have cards, create this html and render it
    if (cards.cards && cards.cards.length > 0) {
        let renderCards;

        if (cards.viewType === "list") {
            renderCards = cards.cards.map(card => 
                <Collection key={ card.id }>
                    <Link key={ card.id } to={`/cards/${card.id}`} className="collection-item">
                        { card.name } - { card.set }
                    </Link>
                </Collection>
            );
        } else if (cards.viewType === "grid") {  
            renderCards = (
                <div className="cards-flex-container">
                    {cards.cards.map(card => 
                        <div key={ card.id } className="cards-flex-item">
                            <Card className="grey lighten-3">
                                <Link key={ card.id } to={`/cards/${card.id}`} className="collection-item">
                                    <img src={card.image_url} className="image-resize" alt=""/>
                                    <br />
                                    { card.name } - { card.set }
                                </Link>
                           </Card>
                        </div>
                    )}
                </div>
            )
        }


        let changePage = (event) => {
            updateCards(event)
        }
    
        return (
            <div className="cards-list">
                { renderCards }
                <Pagination items={cards.totalPages / 12} activePage={1} maxButtons={8} onSelect={changePage}/>
            </div>
        )
    } else {
        // we don't have cards yet so show a loading bar
        return (
            <div>
                <ProgressBar />
            </div>
        )
    }
}

export default CardsList;