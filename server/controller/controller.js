const {connection, connectDB} = require('../model/modelInfoRes')

const RestaurantInfo = {
    getInfoRes(req, res) {
            connection.query(`SELECT * FROM information
            INNER JOIN grades ON information.ID = grades.INFO_ID
            INNER JOIN address ON information.ID = address.INFO_ID`, 
             (err, result) => {
                try{
                    res.status(200).json(result)
                } catch(err) {
                    console.log(err)
                }
            })
    },

    FindRes(req, res) {
        const q = req.params.id
        const rexNum = /[1-9]/g
        const rexString = /^[a-zA-Z\s]+$/g
        const qr = `SELECT * FROM restaurantdb.information
        INNER JOIN restaurantdb.grades ON information.ID = grades.INFO_ID
        INNER JOIN restaurantdb.address ON information.ID = address.INFO_ID
        where information.NAME LIKE `+ `N'%${q.match(rexString) ? q : '0'}%'` + ` OR information.ID LIKE '%${q.match(rexNum) ? q : '00000'}%'`
        connection.query(qr, (err, result) => {
            try{
                res.status(200).json(result)

            } catch(err) {
                res.status(500).json({message: err.message || `Not find with ${id}`})

            }
        })  
    },

    CreateRes(req, res){
        const qr = `INSERT INTO restaurantdb.information(ID, NAME, BOROUGH, CUISINE)
        VALUES( ${req.body.ID},'${req.body.NAME}', '${req.body.BOROUGH}', '${req.body.CUISINE}');
        
        INSERT INTO restaurantdb.address(COORD, BUILDING, STREET, ZIPCODE, INFO_ID)
        VALUES('${req.body.COORD}', '${req.body.BUILDING}', '${req.body.STREET}', ${req.body.ZIPCODE}, ${req.body.INFO_ID});
        
        INSERT INTO restaurantdb.grades(DATE, GRADE, SCORE, INFO_ID)
        VALUES('${req.body.DATE}', '${req.body.GRADE}', ${req.body.SCORE}, ${req.body.INFO_ID});`
        connection.query(qr, (err, data) => {
        try{
            res.redirect('/')
        } catch(err) {
            console.log(err)
        }
        })
    }, 
    
    UpdateRes(req, res) {
        const id = req.params.id
        const qr = `UPDATE restaurantdb.information ,restaurantdb.grades, restaurantdb.address
        SET information.NAME= '${req.body.NAME}', information.BOROUGH =  '${req.body.BOROUGH}', CUISINE = '${req.body.CUISINE}',
			grades.DATE= '${req.body.DATE}', grades.GRADE =  '${req.body.GRADE}', grades.SCORE = ${req.body.SCORE},
			address.COORD= '${req.body.COORD}', address.BUILDING = '${req.body.BUILDING}', address.STREET = '${req.body.STREET}', address.ZIPCODE = ${req.body.ZIPCODE}
		WHERE information.ID = ${id}
			AND grades.INFO_ID = information.ID
            AND address.INFO_ID = information.ID`
        connection.query(qr ,(err, data) => {
            try{
                res.send(data)
            } catch(err) {
                throw err
            }
        }) 
    }, 
    DeleteRes(req, res) {
        const id = req.params.id
        const qr = `
        DELETE restaurantdb.grades FROM restaurantdb.grades WHERE grades.INFO_ID  = ${id};
        DELETE restaurantdb.address FROM restaurantdb.address WHERE address.INFO_ID  = ${id};
        DELETE restaurantdb.information FROM restaurantdb.information WHERE information.ID  = ${id};`
        connection.query(qr, (err, data) => {
            try{
                res.send(data)
            } catch(err) {
                res.status(500).json({message: err.message || 'Can not delete user'})
            }
        })
    }
}

module.exports = RestaurantInfo  