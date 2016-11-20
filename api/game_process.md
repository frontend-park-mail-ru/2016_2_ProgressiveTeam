Game process
============
[Schemes](https://github.com/ElusiveSpirit/2016_2_ProgressiveTeam/blob/master/api/game_schemes.md)  
  
0. Server recieves data with units' positions from both clients
1. The game starts and server pushes data of new turn
   data includes:
     - Turn's number
     - All units with all properties
     - Last action (That in first turn = null)
     - Extra timeline cell (20 cells in first turn)
2. Client animates new data (Both his and opponent turns are animated in this time)
3. If current turn is client's then he can do it
4. Released turn is sended to server:
     - action
     - coords (move to)
     - [optional] coords of attack (if unit attack someone)
5. Goto 2
