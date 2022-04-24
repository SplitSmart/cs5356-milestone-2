const {request} = require('gaxios');

const calculate = async (who_paid, users_sharing, amount, purpose) => {
    try {
        const response = await request({url:'https://ruffhouse-cd734-default-rtdb.firebaseio.com/.json'});
        data = response.data;
        console.log(data)
        user_count = users_sharing.length
        amt = amount/(user_count+1)
        users_sharing.forEach(u => {
            data.users[u] = data.users[u] || {}
            data.users[who_paid] = data.users[who_paid] || {}

            data.users[u][who_paid] = data.users[u][who_paid] || 0
            data.users[u][who_paid] += amt

            data.users[who_paid][u] = data.users[who_paid][u] || 0
            data.users[who_paid][u] -= amt
        });
        data.history = data.history || []
        data.history.push({"date":Date(),"who_paid":who_paid,"amount":amount,"purpose":purpose,"shared_with":users_sharing})
        const feedback = await request({url:'https://ruffhouse-cd734-default-rtdb.firebaseio.com/.json', method:"PUT", data:data});
      } catch (error) {
        console.error(error);
      }
  };

calculate("alice",["bob","carol"],500,"lunch")