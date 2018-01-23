import React from 'react';
import { CardPanel, Button } from 'react-materialize';

export const Card = ({ card, inCollection, add }) => (

    <CardPanel key={ card.id }>
        <div>
            <img src={ card.image_url } alt="" />
        </div>

        <div className="card-details">
            <h1>{ card.name }</h1>
            <p>
                <small><em>{ card.supertype } - { card.subtype }</em></small>
            </p>
            
            <br/>
            <span><b>Series - Set: </b>{ card.series } - { card.set }</span>
            <br/>
            <span><b>Number: </b>{ card.number }</span>
            <br/>
            <span><b>Rarity: </b>{ card.rarity }</span>
            <br/>
            <span><b>National Pokedex Number: </b>{ card.national_pokedex_number }</span>
            <br/>
            <span><b>Artist: </b>{ card.artist }</span>

            {/* In the CardShow container we need to send down a dispatch action or two here */}
            <div className="button-container">
                <Button>Add to Wishlist</Button>
                { !inCollection ?
                    <Button onClick={add}>Add to Collection</Button>
                  :
                    <Button>In Your Collection!</Button>
                }
            </div>
        </div>
    </CardPanel>
);