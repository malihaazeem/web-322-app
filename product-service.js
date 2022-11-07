const fs = require("fs")
let products = []
let categories = []

exports.initialize = ()=> {
    return new Promise((resolve, reject) => {
        fs.readFile("./data/products.json", 'UTF-8', (err, data) => {
            if (err) {
                reject(err)
                return

            }
            try {
                products = JSON.parse(data)
            }
            catch (err) {
                console.log( err)
            }
        })

        fs.readFile("./data/categories.json", 'UTF-8', (err, data)=> { 
            if (err) {
                reject(err)
                return

            }
            try {
                categories = JSON.parse(data)
            }
            catch (err) {
                console.log( err)
            }
        })
        
        resolve()
    })
}

exports.getAllProducts = ()=> {
    return new Promise(function(resolve, reject){
        if (products.length == 0){
            reject("No results returned")
            return
        }
 
        resolve(products)
    })
}

exports.getPublishedProducts = ()=> {
    return new Promise(function(resolve, reject) {
      let published = products.filter(function(products){ return products.published == true})
      if (published.length == 0) {
        reject("No results returned")
        return
      }
      resolve(published)
    })
  }

exports.getCategories = ()=> {
    return new Promise(function(resolve, reject){
        if (categories.length == 0){
            reject("No results returned")
            return
        }
 
        resolve(categories)
    })
}