let p  = new Promise((resolve , reject) => {
let x = 1;
if(x===1)
{
    resolve({
        message:'message',
        name: 'ahmed'
    });
}
else
{
    reject('Faild');
}
})
let p2  = new Promise((resolve , reject) => {
    let x = 1;
    if(x===2)
    {
        resolve({
            message:'message',
            name: 'ahmed'
        });
    }
    else
    {
        reject('Faild');
    }
    })
Promise.all((message) =>{
console.log(message[0]);
}).then((message) => {
    console.log('Error' + message[0]);
})