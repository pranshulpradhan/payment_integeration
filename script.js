let form = document.querySelector("form");


// var rzp1 = new Razorpay(options);
// document.getElementById('rzp-button1').onclick = function(e){
//     rzp1.open();
//     e.preventDefault();
// }

const username = 'rzp_test_fVf9IWxfnAHqiV';
const password = '1XRpJwd4lLqRoGEzBJmQiYrI';
const credentials = btoa(`${username}:${password}`);
// console.log("creds", credentials);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("target",e.target);
    let name = e.target.children[1].innerText;
    // console.log("name1",e.target.children[1]);
    console.log("name",name);
    let amountpaid = e.target.children[2].innerText;
    amountpaid *=100;
    console.log("amountpaid",amountpaid);
    const postData = {
        "amount": amountpaid,
        "currency": "INR",
        "receipt": "qwsaq1",
        "partial_payment": true,
        "first_payment_min_amount": 230
    };
    console.log(postData);
    console.log("type",typeof(postData));
    console.log("stringify", JSON.stringify(postData));
    const reqOption = {
        method: 'POST',
        // 'Access-Control-Allow-Origin': '*',
        // mode: 'no-cors',
        headers: {'content-type': 'application/json','Authorization': `Basic ${credentials}`},
        body: postData
    };
    console.log("reqOpt", reqOption);
    const url = 'https://api.razorpay.com/v1/orders';
    console.log("url", url);
    fetch(url,reqOption)
    .then(
        response =>{ 
            console.log(response.status);
        if(!response.ok){
            console.log("hi");
            console.log(response.status);
        }
        response.json();
        console.log("response", response);
})
    .then(
        data => {
            
            console.log("data", data);
            const orderId = data.id;
            console.log("id", orderId);
        }
    ).catch(
        error => {
            console.log(error);
        }
    );
    var options = {
        "key": "rzp_test_fVf9IWxfnAHqiV", // Enter the Key ID generated from the Dashboard
        "amount": amountpaid, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Acme Corp", //your business name
        "description": name,
        "image": "https://example.com/your_logo",
        "order_id": "order_N0EaOw1cAURsYL", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
})
