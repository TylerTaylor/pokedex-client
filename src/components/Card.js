import React from 'react';
import { CardPanel, Button } from 'react-materialize';
import CardModal from './CardModal';

export const Card = ({ card, inCollection, add, remove, showModal, show }) => (

    <CardPanel key={ card.id } className="grey lighten-3 card-panel">
        <div onClick={showModal}>
            <img src={ card.image_url } alt="" className="card-show-expand"/>
            <CardModal show={show} card={card}/>
        </div>

        <div className="card-details">
            <h1>{ card.name }</h1>
            <p>
                <small><em>{ card.supertype } - { card.subtype }</em></small>
            </p>
            <br className="hide-on-med-and-down"/>
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
                {/* Wishlist doesn't exist yet */}
                {/* <Button>Add to Wishlist</Button> */}
                { !inCollection ?
                    <Button onClick={add}>Add to Collection</Button>
                  :
                    <Button onClick={remove}>In Your Collection!</Button>
                }
            </div>
        </div>
    </CardPanel>
);