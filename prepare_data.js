'use strict';

const fs = require('fs');

const filenames = ['africa.json', 'asia.json', 'europe.json', 'southamerica.json', 'usa.json']

// Remove unneeded fields
filenames.forEach(region => {
    let rawdata = fs.readFileSync(region);
    let dealers = JSON.parse(rawdata);
    
    delete dealers['status'];
    dealers['results'].forEach(element => {
        delete element['distance'];
        delete element['poi']['icon'];
        delete element['poi']['additional_information']['idIconGroup'];
        delete element['poi']['address_components'];
    });
    
    fs.writeFileSync(region, JSON.stringify(dealers['results']));
})

// Remove duplicate records
let merged = [];
let map = new Map();

filenames.forEach(region => {
    const rawdata = fs.readFileSync(region);
    const dealers = JSON.parse(rawdata);
    dealers.forEach(element => {
        if (!map.has(element['poi']['id'])){
            map.set(element['poi']['id'], true);
            merged.push(element);
        } else {
            console.log("Found duplicate");
        }
    })
});

fs.writeFileSync('total.json', JSON.stringify(merged));