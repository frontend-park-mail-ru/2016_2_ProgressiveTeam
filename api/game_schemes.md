Game schemes
============
Units' positions for server.  
Server generates and add ids for each unit
```
[{
  type: 'warrior',
  coords: [1, 2]
},{
  type: 'warrior',
  coords: [2, 2]
}]
```
Turn
```
{
  id: 1,
  units: [{
    id: 0,
    type: 'warrior',
    coords: [1, 2],
    user_id: 1
  },{
    id: 1,
    type: 'warrior',
    coords: [2, 2],
    user_id: 2
  }],
  action: {...},
  timelline: [...] 
}
```
Action
  - In attack unit first move to coords, than attack unit in action to
```
{
  type: 'move',
  coords: [1, 2]
}
{
  type: 'attack',
  coords: [1, 2],
  action_to: [2, 2]
}
```
Timeline
  - id - number of turn
When unit dies timeline will be update. So server sends updated ids and new one.  
Whose turn is can be got from unit id in client.units array
```
[{
  id: 1,
  unit_id: 1,
  user_id: 1
}, {
  id: 2,
  unit_id: 3,
  user_id: 1
}, {
  id: 3,
  unit_id: 2,
  user_id: 2
}]
```
