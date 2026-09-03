'use strict'

function MyArray(...args){
    this.length = 0
    // this.push = function(item){
    //     this[this.length] = item
    //     return ++this.length
    // }
    for(let i = 0; i < args.length; i++){
        this.push(args[i])
    }
}

MyArray.isMyArray = function(obj){
    return obj instanceof MyArray
}

MyArray.prototype = new MyArrayProto()

const myArr = new MyArray(10)
const myArr1 = new MyArray(100, 500, 700, 1000)

const arr = [20, 30]

console.log(MyArray)
console.dir(MyArray)
console.log(myArr1.pop())
console.log(MyArray.isMyArray(arr))




function MyArrayProto(){
    this.push = function(){
        if(arguments){
            for(let i = 0; i < arguments.length; i++){
                this[this.length++] = arguments[i]
            }
        }
        return this.length
    }
    this.pop = function(){
        if(this.length === 0){
            return
        }
        const lastItem = this[this.length - 1]
        delete this[--this.length]
        return lastItem
    }
    this.forEach = function(fn){
        for(let i = 0; i < this.length; i++){
            fn(this[i], i, this)
        }
    }
    this.some = function(fn){
        for(let i = 0; i < this.length; i++){
            if(fn(this[i], i, this)){
                return true
            }
        }
        return false
    }

    this.every = function(fn){
        for(let i = 0; i < this.length; i++){
            if(!fn(this[i], i, this)){
                return false
            }
        }
        return true
    }

    this.map = function(fn){
        const res = new MyArray()
        for(let i = 0; i < this.length; i++){
            res.push(fn(this[i], i, this))
        }
        return res
    }

    //concat
    this.concat = function(...args){
        const res = new MyArray()
        for(let i = 0; i < this.length; i++){
            if(Array.isArray(args[i])){
                res.push(...args[i])
            }else if(MyArray.isMyArray(args[i])){
                for(let j = 0; j < args[i].length; j++){
                    res.push(args[i][j])
                }
            }else{
                res.push(args[i])
            }
        }
        return res
    }
}

// const MyArrMix = new MyArray(1)
console.log(myArr.concat([1, 3], true, myArr1))




const myReduceRight = (arr, callback, startValue) => {
    let result
    if(startValue){
        result = startValue
        //arr.length -1 -> длина масива на 1 больше чем знач. индекса
        for(let i = arr.length - 1; i >= 0; i--){
            result = callback(result, arr[i], i, arr)
        }
    }else{
        result = arr[arr.length - 1]
        for(let i = arr.length - 2; i >= 0; i--){
            result = callback(result, arr[i], i, arr)
        }
    }
    return result
}