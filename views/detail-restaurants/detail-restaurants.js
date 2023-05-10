const table = document.querySelector('.table')
const url = window.location.search
const currentId = url.slice(4)

function renderInfo() {
    fetch('http://localhost:8000/api/info/' + currentId)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            var Info = Array.from(data).find(item => {
                if(item.NAME === item.NAME) {
                    return{
                        ID: item.ID,
                        NAME: item.NAME,
                        BOROUGH: item.BOROUGH,
                        CUISINE: item.CUISINE,
                        COORD: item.COORD,
                        BUILDING: item.BUILDING,
                        STREET: item.STREET,
                        ZIPCODE: item.ZIPCODE,
                    }
                }
            })

            var grades = Array.from(data).map(item => {
                return{
                        Date: item.DATE,
                        Grade: item.GRADE,
                        Score: item.SCORE,
                }
            })

            const output = grades.map(value => {
                const date = new Date(value.Date)
                return ` 
                <tr>
                <td></td>
                    <td style="display: flex; flex-direction: column;">
                        <table>
                            <tr>
                                <td style="display: flex; flex-direction: column;">${date.toLocaleDateString()} ${date.toLocaleTimeString()}</td>
                                <td style="display: flex; flex-direction: column;">${value.Grade}</td>
                                <td style="display: flex; flex-direction: column;">${value.Score}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                `
            })

            const result =  ` 
            <tr>
                <td><b>ID</b></td>
                <td>${Info.ID}</td>
            </tr>
            <tr>
                <td><b>Tên</b></td>
                <td>${Info.NAME}</td>
            </tr>
            <tr>
                <td><b>Quận</b></td>
                <td>${Info.BOROUGH}</td>
            </tr>
            <tr>
                <td><b>Ẩm thực</b></td>
                <td>${Info.CUISINE}</td>
            </tr>

            <tr>
                <td><b>Địa chỉ</b></td>
                <td>
                    <table>
                        <tr>
                            <td><b>Đường</b></td>
                            <td>${Info.STREET}</td>
                        </tr>

                        <tr>
                            <td><b>Tòa nhà</b></td>
                            <td>${Info.BUILDING}</td>
                        </tr>

                        <tr>
                            <td><b>Mã bưu chính</b></td>
                            <td>${Info.ZIPCODE}</td>
                        </tr>
                            
                        <tr>
                            <td><b>Tọa độ</b></td>
                            <td>[ ${Info.COORD} ]</td>
                        </tr>
                    </table>
                </td>
            </tr>
            </tr>
            ${output.join(' ')}
            `
            table.innerHTML = result
    })

}
renderInfo()


