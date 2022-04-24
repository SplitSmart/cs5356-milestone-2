const {request} = require('gaxios');

const calculate = async (who_paid, users_sharing, amount) => {
    try {
        const response = await request({url:'https://ruffhouse-cd734-default-rtdb.firebaseio.com/.json'});
        users = response.data;
        user_count = users_sharing.length
        amt = amount/(user_count+1)
        users_sharing.forEach(u => {
            console.log(u)
            users[u][who_paid] += amt
            users[who_paid][u] -= amt
        });
        const feedback = await request({url:'https://ruffhouse-cd734-default-rtdb.firebaseio.com/.json', method:"PUT", data:users});
      } catch (error) {
        console.error(error);
      }
  };

calculate(0,[1,2],500)