var express = require('express');
var router  = express.Router();
var con_db  = require('../db');
 

/* GET home page. */
router.get('/Product-list', function(req, res, next) {
    var query = "Select * from products"; 
    con_db.query(query , function(err , rows , field){
        res.render('product_view', { title: 'Product List' , product_res : rows , dropdownVals: rows.recordset  });
    });  
});

router.get('/Product-Add', function(req , res , next){ 
   
    res.render('product_add' , {title : 'Product Add' });
});

router.post('/Product_save', function(req , res , next){
    var id                  = req.body.uid ;
    var productname         = req.body.productname ; 
    var product_comp_nm     = req.body.product_comp_nm ; 
    var manufacture_country = req.body.manufacture_country ; 
    var manufacture_city    = req.body.manufacture_city ; 
    var manufacture_month   = req.body.manufacture_month ; 
    var manufacture_year    = req.body.manufacture_year ; 
    var product_rate        = req.body.product_rate ; 
    if(id == ""){
    var query = `INSERT INTO products (product_name,product_rate,product_company,manufacture_country,manufacture_city,manufacture_month,manufacture_year) 
    VALUES ("${productname}", "${product_rate}", "${product_comp_nm}","${manufacture_country}", "${manufacture_city}","${manufacture_month}", "${manufacture_year}")` ; 
    }else{
        var query = `update products set product_name = "${productname}"  , product_rate = "${product_rate}"  , 
        product_company = "${product_comp_nm}"  ,manufacture_country = "${manufacture_country}" ,
        manufacture_city = "${manufacture_city}" , manufacture_month = "${manufacture_month}" , 
        manufacture_year = "${manufacture_year}" Where id = ${id}` ; 
    }
    con_db.query(query , function(err , result){
        if(err){
            throw err ; 
        }else{  
            if(result.insertId == 0 ){
                req.flash('error', 'Record Update Successfully');
            }else{
                req.flash('info', 'Record Save Successfully');
            }
            console.log(result.insertId) ; 
            res.redirect('/Products/Product-Add');
        }
    });
});

router.get('/get_product/:id', function(req , res , next){
    var id = req.params.id ; 
    var query = `Select * from products where id = ${id}`; 
    con_db.query(query , function(err , rows , field){
        res.render('product_add', { title: 'Product Edit' , productedit: rows[0]  });
    });  
});

module.exports = router;