
const $ = document.querySelector.bind(document)

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
const btnUpdate = $('#btnUpdate')
const url = window.location.search
const currentId = url.slice(4)

function getValueUpdateOld() {
    fetch(`http://localhost:8000/api/info/${currentId}`)
        .then(res => res.json())
        .then(data => {
            data.map(item => {
                const date = new Date(item.DATE)
                const cutDate = item.DATE.slice(0, 10)
                const cutTime = date.toLocaleTimeString().slice(0, 8)
                inputID.setAttribute('value', `${item.ID}`)
                inputName.setAttribute('value', `${item.NAME}`)
                inputBorough.setAttribute('value', `${item.BOROUGH}`)
                inputCuisine.setAttribute('value', `${item.CUISINE}`)

                inputCoord.setAttribute('value', `${item.COORD}`)
                inputBuilding.setAttribute('value', `${item.BUILDING}`)
                inputStreet.setAttribute('value', `${item.STREET}`)
                inputZipcode.setAttribute('value', `${item.ZIPCODE}`)

                inputDate.setAttribute('value', `${cutDate} ${cutTime}`)
                inputGrade.setAttribute('value', `${item.GRADE}`)
                inputScore.setAttribute('value', `${item.SCORE}`)
            })
        })
        .catch(err => {
            console.log(err)
        })
}
getValueUpdateOld()


btnUpdate.onclick = function() {
    const dataUpdate = {
        NAME: inputName.value,
        BOROUGH: inputBorough.value,
        CUISINE: inputCuisine.value,
        COORD: inputCoord.value,
        BUILDING: inputBuilding.value,
        STREET: inputStreet.value,
        ZIPCODE: inputZipcode.value,
        DATE: inputDate.value,
        GRADE: inputGrade.value,
        SCORE: inputScore.value,
    }   
    fetch(`http://localhost:8000/api/info/${currentId}`, {
        method: 'PUT',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(dataUpdate)
    })  
        
    alert('Cập nhật nhà hàng thành công')
    window.location.replace('/')
}


 