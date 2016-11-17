Server - Client
1. <- My units positions
2. -> Opponent units positions
3. -> timeline for 20 units

My turn:
    1. -> Info that my turn now
    2. <- Unit and coords, action (move in this case)
    3. -> Are coords correct
    4. -> Update units data if changed
    5. -> New timeline or one more unit in timeline

Opponents turn:
    1. -> Unit and coords, action
    2. -> Update units data if changed
    3. -> New timeline or one more unit in timeline


{
  "type": "",
  "data": {

  }
}
1. {[
    {
      "class": "warrior",
      "position": [1, 2],
      "id": 1
    },
    {
      "class": "archer",
      "position": [1, 2],
      "id": 2
    },
    {
      "class": "warrior",
      "position": [1, 2],
      "id": 3
    }
  ]}]
response
{
  "status": "ok",
  "opponent": [
      {
        "class": "warrior",
        "position": [1, 2]
      },
      {
        "class": "archer",
        "position": [1, 2]
      },
      {
        "class": "warrior",
        "position": [1, 2]
      }
    ]
}
{
  "status": "error",
  "code": 10,
  "description": "description"
}


timeline = {
  "id": 1,
  "own": true
}
