import React from 'react';
import FilterModal from './FilterModal';
import { Button, Dropdown, NavItem } from 'react-materialize';

export const Filters = ({sortBy, updateSortFilters, show, onClick, onClose, updateFilters }) => {

    let sortFilters = [
        "Name A-Z",
        "Name Z-A",
        "Number(lowest)",
        "Number(highest)"
    ]

    // There are a lot of these. Would it be better to use the API to get this? It wouldn't be ordered like this though...
    let filtersList = [
        "Crimson Invasion", "Shining Legends", "Burning Shadows", "Guardians Rising",
        "Sun & Moon", "Evolutions", "Steam Siege", "Fates Collide", "Generations",
        "BREAKpoint", "BREAKthrough", "Ancient Origins", "Roaring Skies", "Primal Clash",
        "Phantom Forces", "Furious Fists", "Flashfire", "XY", "Legendary Treasures",
        "Plasma Blast", "Plasma Freeze", "Plasma Storm", "Boundaries Crossed"
    ]

    let renderSortFilters = (
        <Dropdown trigger={<Button>{ sortBy }</Button>}>
            {sortFilters.map((filter, index) =>
                <div key={index}>
                    <NavItem onClick={updateSortFilters}>{filter}</NavItem>
                    <NavItem divider />
                </div>
            )}
        </Dropdown>
    )

    let renderFilters = (
        <div>
            <Button onClick={onClick}>Filters</Button>
            <FilterModal show={show} onClose={onClose} filtersList={filtersList} updateFilters={updateFilters}>
                <h3>Filters</h3>
            </FilterModal>
        </div>
    )
    
    return (
        <div className="filter-container">
            { renderSortFilters }
            { renderFilters }
        </div>
    )
}