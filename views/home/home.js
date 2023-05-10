const listRes= document.querySelector('.restaurant-list' )
function renderInfo() {
    fetch('http://localhost:8000/api/info')
    .then(res => res.json())
    .then(data => {
            const key = 'ID';
            const unique = [...new Map(data.map(item =>
            [item[key], item])).values()];
            const html = Array.from(unique).map((item, index) => {
                return ` 
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item.ID}</td>
                        <td>${item.NAME}</td>
                        <td>${item.BOROUGH}</td>
                        <td>${item.CUISINE}</td>
                        <td>${item.STREET}</td>
                        <td>${item.BUILDING}</td>

                        <td class="restaurant-item_action">    
                            <a href="/detail-restaurants?id=${item.ID}" class="btn border-shadow update">
                                <span class="text-gradient">
                                    Chi tiết
                                </span>
                            </a>

                            <a href="/update-infoRes?id=${item.ID}" class="btn border-shadow update">
                                <span class="text-gradient">
                                    <i class="fa-solid fa-pencil"></i>
                                </span>
                            </a>

                            <a class="btn border-shadow delete" onclick="handleDelete(${item.ID})" %>
                                <span class="text-gradient">
                                    <i class="fa-solid fa-xmark"></i>
                                </span>
                            </a>
                        </td>
                    </tr>
                    `
            })
            listRes.innerHTML = html.join(' ')
        })
        .catch(err => {
            console.log(err)
        })
}
renderInfo()

const btnSearch = document.querySelector('.btn-search')
const formSearch = document.querySelector('#form-search')
const inputFind = document.querySelector('.inputFind')
const iconSearch = document.querySelector('#site-main .icon-search')
const divSearch = document.querySelector('#search')

btnSearch.onclick = function(e) {
    e.preventDefault()
}
iconSearch.addEventListener('click', function() {
    divSearch.classList.toggle('active')
})
inputFind.oninput = function(e) {
    e.preventDefault()
    if(inputFind.value === '' || undefined || null) {
        renderInfo()
        inputFind.focus()
    } else {
        fetch('http://localhost:8000/api/info/' + inputFind.value)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const key = 'ID';
                const unique = [...new Map(data.map(item =>
                [item[key], item])).values()];

                const html = Array.from(unique).map((item, index) => {
                    return ` 
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.ID}</td>
                            <td>${item.NAME}</td>
                            <td>${item.BOROUGH}</td>
                            <td>${item.CUISINE}</td>
                            <td>${item.STREET}</td>
                            <td>${item.BUILDING}</td>
    
                            <td class="restaurant-item_action">    
                                <a href="/detail-restaurants?id=${item.ID}" class="btn border-shadow update">
                                    <span class="text-gradient">
                                        Chi tiết
                                    </span>
                                </a>
    
                                <a href="/update-infoRes?id=${item.ID}" class="btn border-shadow update">
                                    <span class="text-gradient">
                                        <i class="fa-solid fa-pencil"></i>
                                    </span>
                                </a>
    
                                <a class="btn border-shadow delete" onclick="handleDelete(${item.ID})" %>
                                    <span class="text-gradient">
                                        <i class="fa-solid fa-xmark"></i>
                                    </span>
                                </a>
                            </td>
                        </tr>
                        `
                })
                listRes.innerHTML = html.join(' ')
        })
    }
    // formSearch.reset()
    inputFind.focus()
}

//Delete
function handleDelete(id) {
    if(confirm('Xác nhận xóa trường này?')) {
        fetch('http://localhost:8000/api/info' + `/${id}`, 
        {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            }
        }) 

        alert('Xóa thành công!')
        window.location.reload()
    }
}











