# mantary-platformer
Mantary Platformer: A finite scroller

# Time management

A fireball can fire every 250ms let's say. Do we specify 250ms in terms of recharge game ticks * ms
per tick or performance.now()? For determinism let's do the former.
TODO: Fix fireball timing to comply witht this.

Can we speed up the game? Changing the number of ms per tick shouldn't slow down the game.
We should interpolate between frames using requestAnimationFrame. But there should be a way
to slow time, for fun, and maybe we'll have an effect in the game that does that.

There are bugs in the game currently. We do not interpolate between frames. Also collision detection
doesn't consider the bounding box to be the encapsulation of the two bounding boxes in adjacent
states. Also we need immutable data because we need to preserve two adjacent states to interpolate.

# Entity: game object

An entity is a game object that has a position, a velocity, and a bounding box.
Let's limit the scope to say that it's for 2D games only.
The bounding box is used for collision detection.

It does not have a type, instead it has a dictionary (for easy deletion) of entity components,
not to be confused with game components, which comprise the game system and are singletons.
Entities are indexed by entity components, for quick lookup.
This means each entity component class must have a unique identifier.
Components can have behaviour, which is specific to each component, but not to each entity.
Components can have data, which is specific to each entity.

Dependency resolution and behaviour invocation for entity components? How should it be done?
It is simple to invoke behaviour specific to an entity, but for relations between components it's not so obvious.

We can start by looking at performance. Will we allow objects that don't collide to affect each other?
Probably not. If they need to just increase their bbox size beyond the size of the object.
We can then use Mikola Lysenko's box-intersect for performant AABB collision detection.

We want to somehow specify the relations between entities inspired by a relational database,
but for functions instead of data. We can let components have Start and Update functions, like Unity.
We can also think of a virtual dispatch table as a relation between entity component types.
We can for example register a function that takes (player, platform) and one that takes
(player, coin) and one that takes (fireball, enemy). Can we think of "input" and "gravity"
also as entity relation functions? Input operates only on the player
(PlayerComponent, InputFunction) (is input an entity, there is one for each button no so it has data and is not a pure function). Gravity operates on all entities which have mass (PlayerComponent, MassComponent)
but it interacts with collision detection. Just make platforms mass-less if they shouldn't fall.
Movement operates on all entities which have velocity (MovementFunction, VelocityComponent). Enemies have
agency so we have (agent, enemy) relations.

entity = {
    id,
    x,
    y,
    vx,
    vy,
    width,
    height,
    components,
};

components = [
    {
        id,
        behaviour,
        data,
    },
];

# Refactoring and tech TODO
 - New entity system for game objects and uniform lookup and processing.
 - Add dependency resolution and topological sorting
 - Add automatic resolution of nested dependencies, i.e. dictionaries
   that are sent to functions without being unpacked.
 - Refactor Player.js to be smaller by extracting pure functions

# Game features TODO
 - Add bounding box (done)
 - Add gravity (done)
 - Add jumping (done)
 - Add coins
 - Add enemies
 - Add loot
 - Add multiplayer
 - Add trading
 - Add auction house

 # Testing TODO
  - Add more unit tests
  - Add test for moving player from starting position to goal