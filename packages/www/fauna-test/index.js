const faunadb = require('faunadb');
const q=faunadb.query;

var client = new faunadb.Client({secret:process.env.FAUNA});
console.log('connection established')
async function run(){
    const results = await client.query(
        q.Paginate(q.Match(q.Index("todos_by_user"),"user_test"))
    );
    console.log(results)
}

run()