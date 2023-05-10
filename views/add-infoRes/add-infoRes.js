const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const inputs = $$('input')
const inputID = $('#ID')
const inputName = $('#NAME')
const inputBorough = $('#BOROUGH')
const inputCuisine = $('#CUISINE')
const inputCoord = $('#COORD')
const inputBuilding = $('#BUILDING')
const inputStreet = $('#STREET')
const inputZipcode = $('#ZIPCODE')
const inputDate = $('#DATE')
const inputGrade = $('#GRADE')
const inputScore = $('#SCORE')
const btnAddUser = $('#btnAddUser')

function validate() {
    Array.from(inputs).find(input => {
    if(input.value == '' || input.value == undefined || input.value == null || input.value.length <= 0) {
        input.parentElement.querySelector('.err-message').innerText = 'Vui lòng nhập trường này'
        input.parentElement.querySelector('.err-message').style.color = 'red'
        input.style.outline = '1px solid red'
    }
    })
    
    Array.from(inputs).forEach(input => {
        input.oninput = function() {
            const spanEle = input.parentElement.querySelector('.err-message')
            spanEle.innerText = ''
            input.style.outline = '1px solid #dee2e6'
        }
    })
}

btnAddUser.onclick = function() {
    validate()
    Array.from(inputs).every(input => {
        if(input.value == '') {
            validate()
            return false
        }
        if(input.value.length > 0){
            const s = new Date()
            const seconds = s.getSeconds()
            const date = inputDate.value;
            const datearray = date.split('T');
            const newdate =  datearray[0] + ' ' + datearray[1] + ':' + seconds 
                
            const Data = {
                ID: inputID.value,
                NAME: inputName.value, 
                BOROUGH: inputBorough.value,
                CUISINE: inputCuisine.value,
                COORD: inputCoord.value,
                BUILDING: inputBuilding.value,
                STREET: inputStreet.value,
                ZIPCODE: inputZipcode.value,
                DATE: newdate,
                GRADE: inputGrade.value,
                SCORE: inputScore.value,
                INFO_ID: inputID.value,
            }
            console.log(Data)
            fetch('http://localhost:8000/api/info', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(Data)
            })  .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
            
            alert('Thêm nhà hàng thanh công!')
            window.location.replace('/')
        }
    }) 
}


    




