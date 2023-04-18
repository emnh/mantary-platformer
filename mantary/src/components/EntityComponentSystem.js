export function EntityComponentSystem() {

    let idCounter = 0;
    const entitiesById = {};
    const entitiesByComponent = {};

    function addEntity(entity) {
        entitiesById[idCounter] = entity;
    }
    
    function destroyEntity(entityId) {
        for (component in entitiesById[entityId]) {
            
        }
        delete entitiesById[idCounter];
    }

    function addEntityComponent() {

    }

    return {
        addEntityComponent
    };
}